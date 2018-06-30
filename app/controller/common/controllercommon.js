/**
 * Controllers Common functions
 */
class ControllerCommon {

    findSuccess(res) {
        return (result) => {
            res.status(200); // Found
            res.json(result);
        }
    }

    existsSuccess(res) {
        return (result) => {
            res.status(200); // Found
            res.json(result);
        }
    }

    editSuccess(res) {
        return (result) => {
            res.status(201); // Created/Updated/Deleted
            res.json(result);
        }
    }

    insertSuccess(res) {
        return (result) => {
            res.status(201); // Created/Updated/Deleted
            res.json(result);
        }
    }

    serverError(res) {
        return (error) => {
            res.status(500);
            res.json(error);
        }
    }

    findError(res) {
        return (error) => {
            res.status(404); // Not found
            res.json(error);
        }
    }
}

module.exports = ControllerCommon;