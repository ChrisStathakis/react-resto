import 'whatwg-fetch'


const loadUser = () =>{
    return(dispatch, getState) =>{
        const endpoint = '/auth/login/';
        const token = getState().auth.token;
        const lookupOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${token}`,
            }
        }
        fetch(endpoint, lookupOptions)
        .then(function(response){
            if(response.status <500){
                return response.json().then(
                    data=>{
                        return{status: res.status, data}
                    }
                )
            } else {
                console.log(response);
                throw response
            }
        }).then(function(res){
            if (res.status === 200) {
                dispatch({type: 'USER_LOADED', user: res.data });
                return res.data;
              } else if (res.status >= 400 && res.status < 500) {
                dispatch({type: "AUTHENTICATION_ERROR", data: res.data});
                throw res.data;
              }
        })
    }
}