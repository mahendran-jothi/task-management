let moment = require("moment-timezone");
moment.tz.setDefault("Asia/Kolkata");

class dateTimeHelper {


    static customDateTimeFormat = (date, format) => {
        const dateFormat = moment(date).format(format);
        return dateFormat;
    };

}

module.exports = dateTimeHelper;
