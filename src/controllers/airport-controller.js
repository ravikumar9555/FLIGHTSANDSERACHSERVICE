const { AirportService } = require('../services/index');

const airportService = new AirportService();

const create = async (req, res) => {
    try {
        const response = await airportService.create(req.body);
        return res.status(201).json({
            message: 'Successfully created the airport',
            err: {},
            data: response,
            success: true
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            data: {},
            success: false,
            err: error,
            message: 'Cannot create a new airport'
        })
    }
}

const getAirport = async (req, res) => {
    try {
        console.log(req.params);
        const response = await airportService.get(req.params.id);
        return res.status(201).json({
            message: 'Successfully created the airport',
            err: {},
            data: response,
            success: true
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            data: {},
            success: false,
            err: error,
            message: 'Cannot create a new airport'
        })
    }
}
const getAll = async (req, res) => {
    try {
        const cities = await airportService.getAll();
        return res.status(200).json({
            data: cities,
            success: true,
            message: 'Successfully fetched all cities',
            err: {}
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            data: {},
            success: false,
            message: 'Not able to fetch the airports',
            err: error
        });
    }
}

module.exports = {
    create,
    getAirport,
    getAll
}