const GET_MESSAGES = "messages/GET_MESSAGES"
const SET_MESSAGE = 'message/SET_MESSAGE'
const DELETE_MESSAGE = 'message/DELETE_MESSAGE'

const setMessages = (messages) => ({
    type: GET_MESSAGES,
    messages
})

const setMessage = (message) => ({
    type: SET_MESSAGE,
    message
})

const deleteMessage = (message) => ({
    type: DELETE_MESSAGE,
    message
})

export const getMessages = (chat_id) => async (dispatch) => {
    const res = await fetch(`/api/messages/${chat_id}`)

    try{
        if(!res.ok) throw res
        const messages = await res.json()
        dispatch(setMessages(messages))
        return messages
    } catch(err) {
        console.log(err)
    }
}

export const editMessageThunk = (message_id, body, updated_at) => async (dispatch) => {
    const res = await fetch(`/api/messages/${message_id}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            message_id,
            body,
            updated_at
        })
    })

    try {
        if (!res.ok) throw res
        const message = await res.json()
        dispatch(setMessage(message))
        return message
    } catch (err) {
        console.log(err)
    }

}

export const deleteMessageThunk = (message_id) => async (dispatch) => {
    const res = await fetch(`/api/messages/${message_id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            message_id,
        })
    })
    try {
        if (!res.ok) throw res
        const message = await res.json()
        dispatch(deleteMessage(message))
        return message
    } catch (err) {
        console.log(err)
    }
}

export default function messages(state = {}, action) {
    const state_dup = {...state}
    switch(action.type) {
        case GET_MESSAGES:
            return {...action.messages}
        case SET_MESSAGE:
            state_dup[action.message.id] = action.message
            return state_dup
        case DELETE_MESSAGE:
            delete state_dup[action.message.id]
            return state_dup
        default:
            return state;
    }
}
