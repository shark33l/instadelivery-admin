const uri = "https://instabuy.lk/track/api/endpoints/";

// Add new Data
const databaseFunctions = { 
    loginUser : async(data, callback) => {
        const endpoint = uri + "login.php";

        try {
            const response = await fetch(endpoint, {
                method: 'POST',
                body: JSON.stringify(data)
            })
                .then( res => res.json())
                .then( (result) => {
                    if(result.jwt){
                        return {error: false, response: result};
                    } else {
                        return {error: result.message, response: null};
                    }
                },
                (error) => {
                    console.error(error);
                    return {error: error, response: null};
                })
                console.log(response)
                callback(response.error, response.response);
        } catch(error){
            console.error(error);
            callback(error, null);
        }
    },
    setTrackingData : async(data, token, callback) => {
        let dataBody = {
            invoice: null,
            name: null,
            ordered_date: null,
            processing_date: null,
            ontheway_date: null,
            pickup_date: null,
            delivered_date: null,

        }
        console.log(data)

        for (let key in dataBody){
            if(data[key] !== undefined && data[key]){
                dataBody[key] = data[key]
            }
        }
        
        const endpoint = uri + "upsert.php";

        try {
            const response = await fetch(endpoint,
                {
                    method: 'POST',
                    headers: {
                        "Authorization" : "Bearer " + token
                    },
                    body: JSON.stringify(dataBody)
                })
                .then( res => res.json())
                .then((result) => {
                    console.log(result);
                    callback(null);
                },
                (error) => {
                    console.log(error);
                    callback(error)
                })

            return response;
        } catch(error){
            console.error(error);
            callback(error);
        }
    },
    getAllTrackingData : async() => {
        const endpoint = uri + "read.php";

        try {
            const response = await fetch(endpoint,
                {
                    method: 'GET',
                })
                .then( res => res.json())
                .then((result) => {
                    console.log(result)
                    return {error: false, response: result};
                },
                (error) => {
                    console.log(error);
                    return {error: error}
                })

            return response;
        } catch(error){
            console.error(error);
            return {error: error};
        }
    },
    searchTrackingData : async(searchTerm) => {
        const endpoint = uri + "read.php?s=" + searchTerm;
        try {
            const response = await fetch(endpoint,
                {
                    method: 'GET'
                })
                .then( res => res.json())
                .then((result) => {
                    console.log(result)
                    return {error: false, response: result};
                },
                (error) => {
                    console.log(error);
                    return {error: error}
                })

            return response;
        } catch(error){
            console.error(error);
            return {error: error};
        }
    }
}

export default databaseFunctions;