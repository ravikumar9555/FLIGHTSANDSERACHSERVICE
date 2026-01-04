const { Airplane } = require('../models/index');
const CrudRespository = require('./crud-repository');
class AirplaneRespository extends CrudRespository {
    constructor() {
        super(Airplane);
    }
}


module.exports = AirplaneRespository;