const launchesSchema = require('./launches.schema')
const planetsSchema = require('./planets.schema')

let DEFAULT_Flight_Number = 1

const launch = {
    flightNumber: 100,
    mission: 'Kepler Exploration X',
    rocket: 'Explorer IS1',
    launchDate: new Date('September 21, 2031'),
    target: 'Kepler-442 b',
    customers: ['Marux'],
    upcoming: true,
    success: true,
};

saveOne(launch)


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
    // const aborted = launches.get(launchId)
    // aborted.upcoming = false;
    // aborted.success = false;
    // return aborted
}

module.exports = {
    getAllLaunches,
    saveNewLaunch,
    ifLaunchExists,
    abortLaunchById
}