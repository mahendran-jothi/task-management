const helper = require("@utils/helper");
const createError = require("http-errors");
const { createSchema } = require("@validation-schemas/taskSchema");
const { Types } = require("mongoose");
const db = require("@models");

class TaskController {

    static create = async (req, res, next) => {
        try {
            const userId = req.tokenInfo.audience;
            const payload = await createSchema.validateAsync(req.body);

            const slug = await helper.createSlug(payload.name);
            const task = await db.Task.findOne({ slug: slug });
            if (task) throw createError.Conflict("This task already exists.");

            const taskData = {
                name: payload.name,
                slug: slug,
                description: payload.description,
                startDate: payload.startDate,
                endDate: payload.endDate,
                totalTask: payload.totalTask,
                createdBy: userId,
            };

            const newTask = new db.Task(taskData);
            const savedTask = await newTask.save();

            if (!savedTask) {
                throw createError.InternalServerError('Failed to create a task.');
            }

            const taskTrackData = {
                task: newTask._id,
                updatedBy: userId,
                remarks: payload.remarks,
            };

            const newTaskTrack = new db.TaskTrack(taskTrackData);
            const savedTaskTrack = await newTaskTrack.save();

            if (!savedTaskTrack) {
                throw createError.InternalServerError('Failed to create a task.');
            }

            const data = {}

            // Send a success response with the generated data.
            res.status(201).send(helper.successResponse(data, 'Task created successfully.'));
        } catch (error) {
            await helper.handleControllerError(error, next);
        }
    };

    static findAll = async (req, res, next) => {
        try {
            const {
                page = 1,
                limit = 10,
                q = '',
            } = req.query;

            const skip = (parseInt(page) - 1) * parseInt(limit);

            const filter = {};

            if (q) {
                const normalizedStatus = q.trim().toLowerCase().replace(/\s+/g, '_');

                filter.$or = [
                    { name: { $regex: q, $options: 'i' } },
                    { status: { $regex: normalizedStatus, $options: 'i' } },
                ];
            }


            const [tasks, total] = await Promise.all([
                db.Task.find(filter)
                    .populate('createdBy', 'name email')
                    .populate('updatedBy', 'name email')
                    .sort({ createdAt: -1 })
                    .skip(skip)
                    .limit(parseInt(limit)),

                db.Task.countDocuments(filter),
            ]);

            const response = {
                tasks: tasks,
                pagination: {
                    total,
                    page: parseInt(page),
                    limit: parseInt(limit),
                    pages: Math.ceil(total / limit),
                },
            };

            res.status(200).send(helper.successResponse(response, 'Tasks fetched successfully.'));
        } catch (error) {
            await helper.handleControllerError(error, next);
        }
    };


    static findOne = async (req, res, next) => {
        try {
            const { id } = req.params;

            const task = await db.Task.findById(id)
                .select('-__v')
                .populate('createdBy', 'name email')
                .populate('updatedBy', 'name email');

            if (!task) {
                throw createError.NotFound('Task not found.');
            }

            res.status(200).send(helper.successResponse(task, 'Task fetched successfully.'));
        } catch (error) {
            await helper.handleControllerError(error, next);
        }
    };


    // UPDATE task by ID
    static update = async (req, res, next) => {
        try {
            const userId = req.tokenInfo.audience;
            const taskId = req.params.id;

            if (!Types.ObjectId.isValid(taskId)) {
                throw createError.BadRequest("Invalid Task ID.");
            }

            const payload = await createSchema.validateAsync(req.body);
            const task = await db.Task.findById(taskId);

            if (!task) {
                throw createError.NotFound("Task not found.");
            }

            const slug = await helper.createSlug(payload.name);

            const exists = await db.Task.findOne({
                slug,
                _id: { $ne: taskId },
            });
            if (exists) {
                throw new ConflictException('This task already exists.');
            }

            const updatedTask = await db.Task.findByIdAndUpdate(
                taskId,
                {
                    name: payload.name,
                    slug,
                    description: payload.description,
                    startDate: payload.startDate,
                    endDate: payload.endDate,
                    totalTask: payload.totalTask,
                    updatedBy: userId
                },
                { new: true }
            );

            res.status(200).send(helper.successResponse(updatedTask, 'Task updated successfully.'));
        } catch (error) {
            await helper.handleControllerError(error, next);
        }
    };

    // DELETE task by ID
    static delete = async (req, res, next) => {
        try {
            const taskId = req.params.id;

            if (!Types.ObjectId.isValid(taskId)) {
                throw createError.BadRequest("Invalid Task ID.");
            }

            const task = await db.Task.findByIdAndDelete(taskId);

            if (!task) {
                throw createError.NotFound("Task not found.");
            }

            await db.TaskTrack.deleteMany({ task: taskId });

            res.status(200).send(helper.successResponse({}, 'Task deleted successfully.'));
        } catch (error) {
            await helper.handleControllerError(error, next);
        }
    };

    // UPDATE status
    static updateStatus = async (req, res, next) => {
        try {
            const { status, remarks } = req.body;
            const userId = req.tokenInfo.audience;
            const taskId = req.params.id;

            if (!Types.ObjectId.isValid(taskId)) {
                throw createError.BadRequest("Invalid Task ID.");
            }

            const task = await db.Task.findById(taskId);
            if (!task) {
                throw createError.NotFound("Task not found.");
            }

            const lastTrack = await db.TaskTrack.findOne({ task: taskId })
                .sort({ createdAt: -1 });

            if (lastTrack?.status === status) {
                throw createError.Conflict("This status is already updated.");
            }

            const updatedTask = await db.Task.findByIdAndUpdate(
                taskId,
                {
                    status,
                },
                { new: true }
            );


            // Save status change to TaskTrack
            const track = new db.TaskTrack({
                task: taskId,
                updatedBy: userId,
                status,
                remarks
            });
            await track.save();

            res.status(200).send(helper.successResponse({}, 'Status updated successfully.'));
        } catch (error) {
            await helper.handleControllerError(error, next);
        }
    };

    static getTaskTrack = async (req, res, next) => {
        try {
            const taskId = req.params.id;

            if (!Types.ObjectId.isValid(taskId)) {
                throw createError.BadRequest("Invalid Task ID.");
            }

            const task = await db.Task.findById(taskId);
            if (!task) {
                throw createError.NotFound("Task not found.");
            }

            const trackRecords = await db.TaskTrack.find({ task: taskId })
                .select('-__v')
                .populate('task', 'name description')
                .populate('updatedBy', 'name email'); // optional: get updater's name/email


            res.status(200).send(helper.successResponse(trackRecords, 'Task track history fetched successfully.'));
        } catch (error) {
            await helper.handleControllerError(error, next);
        }
    };


}

module.exports = TaskController;
