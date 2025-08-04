
const TaskStatusModal = ({
  statusValue,
  setStatusValue,
  statusRemarks,
  setStatusRemarks,
  onClose,
  onUpdate,
}) => (
  <div
    className="modal fade show"
    style={{ display: "block", backgroundColor: "rgba(0,0,0,0.5)" }}
    tabIndex="-1"
  >
    <div className="modal-dialog">
      <div className="modal-content">
        <div className="modal-header">
          <h5 className="modal-title">Update Task Status</h5>
          <button
            type="button"
            className="btn-close"
            onClick={onClose}
          ></button>
        </div>
        <div className="modal-body">
          <div className="mb-3">
            <label className="form-label">
              Status <span className="text-danger">*</span>
            </label>
            <select
              className="form-select"
              value={statusValue}
              onChange={(e) => setStatusValue(e.target.value)}
            >
              <option value="pending">Pending</option>
              <option value="in_progress">In Progress</option>
              <option value="completed">Completed</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>
          <div className="mb-3">
            <label className="form-label">Remarks</label>
            <textarea
              className="form-control"
              rows="3"
              value={statusRemarks}
              onChange={(e) => setStatusRemarks(e.target.value)}
              placeholder="Enter any remarks..."
            />
          </div>
        </div>
        <div className="modal-footer">
          <button className="btn btn-secondary" onClick={onClose}>
            Cancel
          </button>
          <button className="btn btn-primary" onClick={onUpdate}>
            Update
          </button>
        </div>
      </div>
    </div>
  </div>
);

export default TaskStatusModal;
