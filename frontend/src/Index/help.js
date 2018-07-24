
function getData(endpoint, thisComp, key) {
    const lookupOptions = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: 'include'
    }

    fetch(endpoint, lookupOptions)
    .then(function(response){
        return response.json()
    }).then(function(responseData){
        thisComp.setState({
            [key]: responseData
        })
    })
}

export default getData;