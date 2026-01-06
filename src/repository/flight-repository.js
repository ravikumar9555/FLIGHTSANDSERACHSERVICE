const {Flights} = require('../models/index');
const { Op } = require('sequelize');
const { Airport } = require("../models/index");
class FlightRepository {


  #createFilter(data) {
    let filter = {};
    let andConditions = [];

    const parseArray = (val) => {
      if (!val) return null;
      if (Array.isArray(val)) return val.map(Number);
      if (typeof val === "string")
        return val.split(",").map(v => Number(v.trim()));
      return [Number(val)];
    };

    /* 🛫 FROM AIRPORT */
    const depIds = parseArray(data.departureAirportId);
    if (depIds?.length) {
      andConditions.push({
        departureAirportId: { [Op.in]: depIds }
      });
    }

    /* 🛬 TO AIRPORT */
    const arrIds = parseArray(data.arrivalAirportId);
    if (arrIds?.length) {
      andConditions.push({
        arrivalAirportId: { [Op.in]: arrIds }
      });
    }

    /* 💰 PRICE FILTER */
    if (data.minPrice || data.maxPrice) {
      const price = {};
      if (data.minPrice) price[Op.gte] = Number(data.minPrice);
      if (data.maxPrice) price[Op.lte] = Number(data.maxPrice);
      andConditions.push({ price });
    }

    if (data.date && data.date !== "") {
  const start = new Date(data.date);
  start.setHours(0, 0, 0, 0);

  const end = new Date(data.date);
  end.setHours(23, 59, 59, 999);

  andConditions.push({
    departureTime: { [Op.between]: [start, end] }
  });
}

    /* 💺 SEAT AVAILABILITY */
    if (data.minSeats) {
      andConditions.push({
        totalSeats: { [Op.gte]: Number(data.minSeats) }
      });
    }

    if (andConditions.length) {
      filter[Op.and] = andConditions;
    }

    console.log("FINAL FLIGHT FILTER 👉", JSON.stringify(filter, null, 2));
    return filter;
  }

    async createFlight(data) {
        try {
            const flight = await Flights.create(data);
            return flight;
        } catch (error) {
            console.log("Something went wrong in the repository layer");
            throw {error};
        }
    }

    async getFlight(flightId) {
        try {
            const flight = await Flights.findByPk(flightId);
            return flight;
        } catch (error) {
            console.log("Something went wrong in the repository layer");
            throw {error};
        }
    }

    async getAllFlights(data) {
    try {
      // 🔥 DO NOT await createFilter
      const whereFilter = this.#createFilter(data);

      // 🔥 CITY-BASED FILTER (JOIN AIRPORT)
      const airportWhere = {};
      if (data.fromCityId) airportWhere.cityId = Number(data.fromCityId);
      if (data.toCityId) airportWhere.cityId = Number(data.toCityId);

      const flights = await Flights.findAll({
        where: whereFilter,
        include: [
          {
            model: Airport,
            as: "departureAirport",
            required: !!data.fromCityId,
            where: data.fromCityId ? { cityId: Number(data.fromCityId) } : undefined
          },
          {
            model: Airport,
            as: "arrivalAirport",
            required: !!data.toCityId,
            where: data.toCityId ? { cityId: Number(data.toCityId) } : undefined
          }
        ]
      });

      return flights;

    } catch (error) {
      console.error("Repository Error 👉", error);
      throw error;
    }
  }

    async updateFlights(flightId, data) {
         try {
            await Flights.update(data, {
                where: {
                    id: flightId
                }
            });
            return true;
        } catch (error) {
            console.log("Something went wrong in the repository layer");
            throw {error};
        }
    }


}

module.exports = FlightRepository;
/*
{
    where: {}
}

*/