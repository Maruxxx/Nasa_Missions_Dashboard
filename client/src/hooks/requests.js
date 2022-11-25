const HOST='https://nasamc.herokuapp.com'

async function httpGetPlanets() {
  const response = await fetch(`${HOST}/planets`);
  return await response.json()
}

async function httpGetLaunches() {
  const response = await fetch(`${HOST}/launches`)
  const fetchedLaunches = await response.json()
  return fetchedLaunches.sort((a, b) => {
    return a.flightNumber - b.flightNumber
  })
}

async function httpSubmitLaunch(launch) {
  
  try {  
    return await fetch(`${HOST}/launches`, {
      method: "POST",
      headers: {
        "Content-type": "application/json"
      },
      body: JSON.stringify(launch)
    })
  } catch (err) {
    return { ok: false, }
  }
}

async function httpAbortLaunch(id) {
  try {
      return await fetch(`${HOST}/launches/${id}`, {
      method: "DELETE"
    })
  } catch(err) {
    return {ok: false}
  }
}

export {
  httpGetPlanets,
  httpGetLaunches,
  httpSubmitLaunch,
  httpAbortLaunch,
};