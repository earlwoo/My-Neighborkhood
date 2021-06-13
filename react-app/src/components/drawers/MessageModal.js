import React, { useRef, useState, useEffect } from 'react';
import { io } from 'socket.io-client';
import { format } from "date-fns";
import { deleteMessageThunk, editMessageThunk, getMessages } from "../../store/messages"
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalCloseButton,
    useDisclosure,
    Avatar,
    Box,
    Divider,
    Text
} from "@chakra-ui/react"
import { useSelector, useDispatch } from 'react-redux';
import { RiDeleteBack2Fill as DeleteIcon } from "react-icons/ri";
import { AiFillEdit as EditIcon, AiOutlineEnter as SaveIcon } from "react-icons/ai";
import { IoMdSend as SendButton } from "react-icons/io";
import { TiCancel as CancelIcon } from "react-icons/ti";
import { getChats } from '../../store/chats';
import "./Messages.css"


let socket;
const MessageModal = ({ setShow, chat, user }) => {
    const users = useSelector(state => state.users)
    const chats = useSelector(state => state.chats)
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [chatInput, setChatInput] = useState("");
    const [messages, setMessages] = useState([])
    const [editChatInput, setEditChatInput] = useState('')
    const [editMessage, setEditMessage] = useState(false);
    const [messageId, setMessageId] = useState(null);
    const dispatch = useDispatch()
    const messageRef = useRef();


    useEffect(() => {
        onOpen()

    }, [chat, onOpen])

    const chat1 = chats[chat.id]
    let otherUser = Object.values(chat1.users).find(el => el.id !== user.id)

    useEffect(() => {
        (async () => {
            let fetcheddata = await dispatch(getMessages(chat.id))
            if (fetcheddata) {
                setMessages(Object.values(fetcheddata))
            }
        })()

    }, [dispatch, chat])

    useEffect(() => {
        // create websocket
        socket = io();
        // listen for chat events
        socket.on(chat.id, (data) => {
            // when we recieve a chat, add it into our messages array in state
            setMessages(messages => [...messages, data])
        })
        // when component unmounts, disconnect
        return (() => {
            socket.disconnect()
        })
    }, [messages.length, chat])


    useEffect(() => {
        if (messageRef.current) {
            messageRef.current.scrollIntoView(
                {
                    behavior: 'auto',
                    block: 'end',
                    inline: 'nearest'
                })
        }
    }, [messages])

    const sendChat = (e) => {
        e.preventDefault()
        // check for user credential
        if (chatInput.length > 0) {
            socket.emit("chat", {
                user_id: user.id,
                chat_id: chat.id,
                body: chatInput,
                created_at: new Date().toGMTString(),
                updated_at: new Date().toGMTString()
            })
        }

        setChatInput("")
    }

    const handleEdit = (message_id, chatInput) => async (e) => {
        e.preventDefault()
        const updated_at = new Date().toGMTString()
        await dispatch(editMessageThunk(message_id, chatInput, updated_at))
        setEditMessage(false)
        setEditChatInput('')
        let fetcheddata = await dispatch(getMessages(chat.id))
        setMessages(Object.values(fetcheddata))
    }

    const deleteMessage = (message_id) => async (e) => {
        e.preventDefault()
        await dispatch(deleteMessageThunk(message_id))
        await dispatch(getChats())
        const fetchData = await dispatch(getMessages(chat.id))
        if (Object.values(fetchData).length) {
            setMessages(Object.values(fetchData))
        }
    }

    const messageToEdit = (message) => (e) => {
        e.preventDefault()
        setEditMessage(true)
        setEditChatInput(message.body)
        setMessageId(e.target.classList[0])
    }


    const inputBox = () => {
        return (
            <div className="input__wrap">
                <form method="post" action="" onSubmit={sendChat}>
                    <input
                        className="input__box"
                        placeholder="Write Message"
                        value={chatInput}
                        onChange={(e) => setChatInput(e.target.value)}
                        require="true" />
                    {chatInput ?
                        <button className="send__button enabled" type="submit"><SendButton /></button>
                        :
                        <button className="send__button" disabled={true}><SendButton /></button>
                    }
                </form>
            </div>
        )

    }

    const loggedUserMsgOptions = (message) => {
        return (
            <div className="message__options">
                {editMessage && Number(messageId) === Number(message.id) ?
                    <div >
                        <div id="save__icon" onClick={handleEdit(message.id, editChatInput)}><SaveIcon /></div>
                        <div id="cancel__icon" onClick={() => setEditMessage(false)}><CancelIcon /></div>
                    </div>
                    :
                    <div >
                        <div id="edit__icon" onClick={messageToEdit(message)} className={`${message?.id} edit__icon`} ><EditIcon />edit</div>
                        <div id="delete__icon" onClick={deleteMessage(message.id)}><DeleteIcon />del</div>
                    </div>
                }
            </div>)
    }

    const editInputBox = (message) => {
        return (
            <div className="input__edit__wrap">
                <form method="post" action="" onSubmit={handleEdit(message.id, editChatInput)}>
                    <input
                        className="input__edit__box"
                        value={editChatInput}
                        onChange={(e) => setEditChatInput(e.target.value)}
                    />
                </form>
            </div>
        )
    }




    return (
        <>
            {/* <Button backgroundColor={"rgb(0, 208, 111)"} onClick={onOpen}>{chat.name}</Button> */}

            <Modal maxH="500px" useInert={false} isOpen={isOpen} onClose={() => {
                onClose()
                setShow({})
            }} overflow="auto">
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader className="hi" backgroundColor="#92ddb6" >
                            <Avatar name={otherUser.firstname} src={otherUser.avatar}></Avatar>
                            <Text fontSize="3lg">{otherUser?.name}</Text>
                        <Box></Box>
                    </ModalHeader>
                    <ModalCloseButton />
                    <ModalBody overflow="auto" minH="500px"  maxH="500px" >
                        {messages.map((message, idx) => (
                            <div ref={messageRef} key={idx} className="container">
                                <div className="message" id={`${message.id}`}>
                                    <div className="message__avatar">
                                        <Avatar src={users[message?.user_id]?.avatar} alt="" />
                                        <div className="message__content">
                                            <h2 className="quick">
                                                {users[message?.user_id]?.firstname}
                                                <br></br>
                                                <span>{format(new Date(message?.created_at), "MMM dd, hh:mm a")}</span>
                                            </h2>
                                            {(Number(user.id) === Number(message.user_id)) && loggedUserMsgOptions(message)}
                                        </div>
                                    </div>
                                    {editMessage && (Number(messageId) === Number(message.id)) ? (editInputBox(message)) : (<p className="msg_body">{message?.body}
                                        <span className="content__edited-tag">{(message.created_at !== message.updated_at) && <Text as="sub">   (edited)</Text>}</span>
                                    </p>)}
                                </div>
                                <Divider></Divider>
                            </div>
                        ))}
                    </ModalBody>
                    <div>
                        {inputBox()}
                    </div>
                </ModalContent>
            </Modal>
        </>
    )
}

export default MessageModal
