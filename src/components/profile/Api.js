import Axios from "axios"

export const getUser = (token, id) => 
    Axios.get (       
        `http://localhost:5000/apiv1/vendors/${id}`,
        {
            headers: { "x-auth-token": token }
        }
    ).then(res => res.data)
        .catch(err => console.log(err))

export const getUserProfile = (token, id) => 
    Axios.get (       
        `http://localhost:5000/apiv1/vendors/${id}/profile`,
        {
            headers: { "x-auth-token": token }
        }
    ).then(res => res.data)
        .catch(err => console.log(err))

export const getWallets = (token, id) => 
    Axios.get (       
        `http://localhost:5000/apiv1/vendors/${id}/sub_account/all/find`,
        {
            headers: { "x-auth-token": token }
        }
    ).then(res => res.data)
        .catch(err => console.log(err))

export const updateUser = (token, id, userDetails) => 
    Axios.put (       
        `http://localhost:5000/apiv1/vendors/${id}`,
        userDetails,
        {
            headers: { "x-auth-token": token }
        }
        
        
    ).then(res => res.data)
        .catch(err => console.log(err))