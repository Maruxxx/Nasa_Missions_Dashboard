const launchesSchema = require('./launches.schema')
const planetsSchema = require('./planets.schema')

const axios = require('axios')

let DEFAULT_Flight_Number = 1

const SPACEX_API_URL = 'https://api.spacexdata.com/v4/launches/query'

async function populateLaunches() {
    const response = await axios.post(SPACEX_API_URL, {
        query: {},
        options: {
            pagination: false,
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
    }, {
        headers: { "Accept-Encoding": "gzip,deflate,compress" }
    })
    const launchDocs = response.data.docs
    for (const doc of launchDocs) {
        const payloads = doc['payloads']
        const customers = payloads.flatMap((payload) => {
            return payload["customers"]
        } )
        const launch = {
            
            flightNumber: doc["flight_number"],
            mission: doc["name"],
            rocket: doc.rocket["name"],
            launchDate: doc["date_local"],
            customers,
            upcoming: doc["upcoming"], 
            success: doc["success"],
        
        }
        console.log(`${launch.flightNumber} ${launch.mission}`)
        await saveOne(launch)
    }

}

async function loadLaunchesData() {
    
    const firstLaunch = await findLaunch({
        flightNumber: 1,
        rocket: 'Falcon 1',
        mission: 'FalconSat',
    })

    if(firstLaunch) {
        console.log('Launch already existed!')
    } else {
        await populateLaunches()
    }

}

async function findLaunch(filter) {
    return await launchesSchema.findOne(filter)
}

async function ifLaunchExists(launchId){
    return await findLaunch({
        flightNumber: launchId
    })
}

async function saveOne(launch) {
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
    const planet = await planetsSchema.findOne({
        keplerName: launch.target
    })

    if(!planet) {
        throw new Error('No planet found!')
    }
    const newFlightId = await latestFlightId() + 1

    const newLaunch = Object.assign(launch, {
        flightNumber: newFlightId,
        customers: ['Marux'],
        upcoming: true,
        success: true
    })

    await saveOne(newLaunch)
}


async function getAllLaunches(skip, limit) {
    return await launchesSchema
        .find({},{'__v': 0, '_id': 0,})
        .sort({ flightNumber: 1 })
        .skip(skip)
        .limit(limit)
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