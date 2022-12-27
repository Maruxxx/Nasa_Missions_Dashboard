const launchesSchema = require('./launches.schema')
const planetsSchema = require('./planets.schema')

const axios = require('axios')

let DEFAULT_Flight_Number = 1

const launch = {
    flightNumber: 100, // flight_number
    mission: 'Kepler Exploration X', // name
    rocket: 'Explorer IS1', // rocket.name
    launchDate: new Date('September 21, 2031'), //date_local
    target: 'Kepler-442 b', //not applicable yet
    customers: ['Marux'], // payloads.customers
    upcoming: true, // upcoming
    success: true, // success
};

saveOne(launch)

const SPACEX_API_URL = 'https://api.spacexdata.com/v4/launches/query'

async function loadLaunchesData() {
    const response = await axios.post(SPACEX_API_URL, {
        query: {},
        options: {
            populate: [
                {
                    path: 'rocket',
                    select: {
                        name: 1
                    }
                },
                {
                    path: 'payloads',
                    select: {
                        customers: 1
                    }
                }
            ]
        }
    })

    const docs = response.data.docs
    for (const doc of docs) {
        const launch = {
            
            flightNumber: doc["flight_number"],
            mission: doc["name"],
            rocket: doc.rocket["name"],
            launchDate: doc["date_local"],
            target: 'Kepler-442 b', //not applicable yet
            customers: doc.payloads["customers"], // payloads.customers
            upcoming: doc["upcoming"], // upcoming
            success: doc["success"], // success
        
        }
    }
}

async function ifLaunchExists(launchId){
    return await launchesSchema.findOne({
        flightNumber: launchId
    })
}

async function saveOne(launch) {

    const planet = await planetsSchema.findOne({
        keplerName: launch.target
    })

    if(!planet) {
        throw new Error('No planet found!')
    }
    
    await launchesSchema.findOneAndUpdate({
    flightNumber: launch.flightNumber
        }, launch, {
    upsert: true
})
}

async function latestFlightId() {
    const latestlaunch = await launchesSchema.findOne().sort('-flightNumber')
    
    if(!latestlaunch) {
        return DEFAULT_Flight_Number
    }
    
    return latestlaunch.flightNumber
}




async function saveNewLaunch(launch) {
    const newFlightId = await latestFlightId() + 1

    const newLaunch = Object.assign(launch, {
        flightNumber: newFlightId,
        customers: ['Marux-Mongoose'],
        upcoming: true,
        success: true
    })

    await saveOne(newLaunch)
}


async function getAllLaunches() {
    return await launchesSchema.find({},{'__v': 0, '_id': 0,})
}



async function abortLaunchById(launchId) {
    
    const aborted = await launchesSchema.updateOne({
        flightNumber: launchId
    }, {
        upcoming: false,
        success: false,

    }) 

    return aborted.matchedCount === 1 && aborted.matchedCount === 1
}

module.exports = {
    loadLaunchesData,
    getAllLaunches,
    saveNewLaunch,
    ifLaunchExists,
    abortLaunchById
}