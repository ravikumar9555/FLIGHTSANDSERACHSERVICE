const AirplaneService = require("../services/airplane-service");
const airplaneService = new AirplaneService(); // ✅ IMPORTANT

const create = async (req, res) => {
    try {
        const airplane = await airplaneService.create(req.body);
        return res.status(201).json({
            success: true,
            data: airplane,
            err: {},
            message: "Airplane created successfully"
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            data: {},
            err: error,
            message: "Failed to create airplane"
        });
    }
};

const getAll = async (req, res) => {
    try {
        const airplanes = await airplaneService.getAll();
        return res.status(200).json({
            success: true,
            data: airplanes,
            err: {},
            message: "Airplanes fetched successfully"
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            data: {},
            err: error,
            message: "Failed to fetch airplanes"
        });
    }
};

module.exports = { create, getAll };
