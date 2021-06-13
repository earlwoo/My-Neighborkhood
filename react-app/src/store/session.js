import Geocode from "react-geocode";

const GOOGLE_API = process.env.REACT_APP_GOOGLE_API
Geocode.setApiKey(GOOGLE_API);
Geocode.setLocationType("ROOFTOP")

// constants
const SET_USER = "session/SET_USER";
const REMOVE_USER = "session/REMOVE_USER";

const setUser = (user) => ({
    type: SET_USER,
    payload: user
});

const removeUser = () => ({
    type: REMOVE_USER,
})

export const editMyBio = (bio, id) => async (dispatch) => {
  const res = await fetch(`/api/users/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      bio
    })
  })

  try{
    if(!res.ok) throw res
    const data = await res.json()
    dispatch(setUser(data))
    return data
  } catch(err) {
    console.log(err)
  }
}

export const editMyPet = (bio, id) => async (dispatch) => {
  const res = await fetch(`/api/users/pet`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      bio,
      user_id: id
    })
  })

  try {
    if(!res.ok) throw res
    const data = await res.json();

    if (data.errors) {
      return;
    }

    dispatch(setUser(data))
    return data

  } catch (err) {
    console.log(err)
  }
}

export const authenticate = () => async (dispatch) => {
    const res = await fetch('/api/auth/',{
      headers: {
        'Content-Type': 'application/json'
      }
    });
    try {
      if(!res.ok) throw res
      const data = await res.json();

      if (data.errors) {
        return;
      }

      dispatch(setUser(data))
      return data

    } catch (err) {
      console.log(err)
    }


  }

  export const login = (email, password) => async (dispatch)  => {
    const response = await fetch('/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email,
        password
      })
    });
    const data = await response.json();
    if (data.errors) {
        return data;
    }

    dispatch(setUser(data))
    return data;

  }

  export const logout = () => async (dispatch) => {
    const response = await fetch("/api/auth/logout", {
      headers: {
        "Content-Type": "application/json",
      }
    });

    const data = await response.json();
    dispatch(removeUser());
    return data
  };


  export const signUp = (firstname, lastname, email, password, street, city, state, zip, age, name) => async (dispatch)  => {

    let location;

    const res = await Geocode.fromAddress(`${street} ${city} ${state}, ${zip}`)
        // if(!res.ok) throw res
        const { lat, lng } = await res.results[0].geometry.location;
        location = {lat, lng}

    const response = await fetch("/api/auth/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        firstname,
        lastname,
        email,
        password,
        street, city, state, zip: String(zip),
        location,
        age,
        name
      }),
    });
    if(!response.ok) throw response;

    try{
      const data = await response.json();

      if (data.errors) {
        return data;
      }

      dispatch(setUser(data))

      return data

    } catch(err){
      console.log(err)
    }
  }

const initialState = { user: null };

export default function reducer(state=initialState, action) {
    switch (action.type) {
        case SET_USER:
            return {user: action.payload}
        case REMOVE_USER:
            return {user: null}
        default:
            return state;
    }
}
