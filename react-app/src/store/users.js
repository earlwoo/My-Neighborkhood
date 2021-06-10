import Geocode from "react-geocode";

const GOOGLE_API = process.env.REACT_APP_GOOGLE_API
Geocode.setApiKey(GOOGLE_API);
Geocode.setLocationType("ROOFTOP")

const GET_USERS = 'users/GET_USERS'

const setUsers = (users) => ({
    type: GET_USERS,
    users
})

export const getUsers = () => async (dispatch) => {
    const res = await fetch('/api/all_users/')

    try {
        if (!res.ok) throw res
        const users = await res.json()

        //finding lat lng coordinates from address

        for (let user in users) {

            const res = await Geocode.fromAddress(`${users[user].address.street} ${users[user].address.city} ${users[user].address.state} ${users[user].address.zip}`)
            try{
                // if(!res.ok) throw res

                const { lat, lng } = await res.results[0].geometry.location;

                users[user].location = {lat, lng}
            }catch(err) {
                console.log(err)
            }


        }
        
        dispatch(setUsers(users))

    } catch(error) {
        console.log(error)
    }
}

export default function users(state = {}, action) {
    switch(action.type) {
        case GET_USERS:
            return {...state, ...action.users}
        default:
            return state;
    }
}
