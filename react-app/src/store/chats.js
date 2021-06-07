const GET_CHATS = "chat/GET_CHATS"
const ADD_CHAT = "chat/ADD_CHAT"

const setChats = (chats) => ({
    type: GET_CHATS,
    chats
})

const addChat = (chat) => ({
    type: ADD_CHAT,
    chat
})

export const getChats = () => async (dispatch) => {
    const res = await fetch("/api/chats/")

    try {
        if (!res.ok) throw res
        const chats = await res.json()
        dispatch(setChats(chats))

    } catch (error) {
        console.log(error)
    }
}

export const createChat = (name, chat_type) => async (dispatch) => {
    const res = await fetch(`/api/chats/`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ name, chat_type })
    })
    try {
        if (!res.ok) throw res
        const chat = await res.json();
        if (chat.errors) {
            return chat;
        }
        dispatch(addChat(chat))
        return chat;
    } catch (error) {
        console.log(error)
    }
}

export const createDM = (user_ids) => async (dispatch) => {
    const res = await fetch(`/api/chats/dm`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ user_ids })
    })
    try {
        if (!res.ok) throw res
        const dm = await res.json();
        dispatch(addChat(dm))
        return dm;
    } catch (error) {
        console.log(error)
    }
}


export default function chats(state = {}, action) {
    switch (action.type) {
        case GET_CHATS:
            return { ...state, ...action.chats }
        case ADD_CHAT:
            const newChat = { ...state }
            newChat[action.chat.id] = action.chat
            return newChat;
        default:
            return state;
    }
}
