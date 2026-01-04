const {AirplaneRepository} = require("../repository/index");
const CrudService = require('./crud-service');

class AirplaneService extends CrudService {
    constructor() {
        super(new AirplaneRepository());
    }
}

module.exports = AirplaneService;
