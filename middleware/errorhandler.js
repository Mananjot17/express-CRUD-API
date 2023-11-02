const { constants } = require("../constants")

const errorHandler = (err, req, res, next) => {
    const statusCode = res.statusCode ? res.statusCode : 500;


    switch (statusCode) {
        case constants.VALIDATION_ERROR:
            res.json({ message: "Validation Failed", stackTrace: err.stack });
            break;

        case constants.NOT_FOUND:
            res.json({ message: "Not Found", stackTrace: err.stack });
            break;

        case constants.UNAUTHORIZED:
            res.json({ message: "Unauthorized", stackTrace: err.stack });
            break;

        case constants.FORBIDDEN:
            res.json({ message: "Forbidden", stackTrace: err.stack });
            break;

        case constants.SERVER_ERROR:
            res.json({ message: "Server Error", stackTrace: err.stack });
            break;

        default:
            console.log("No Error, All Good");
            break;
    }


}

module.exports = { errorHandler }