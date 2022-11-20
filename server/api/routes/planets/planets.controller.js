const {getAllPlanets} = require('../../models/planets.model')

function httpGetAllPlanets(req, res) {
    console.log(typeof(req.body))
    return res.status(200).json(getAllPlanets())
};

module.exports = {
    httpGetAllPlanets,
}