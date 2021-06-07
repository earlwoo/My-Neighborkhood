import React, { useRef, useState, useEffect } from 'react';
import { io } from 'socket.io-client';
import { format } from "date-fns";
import { deleteMessageThunk, editMessageThunk, getMessages } from "../../store/messages"
import {
    Modal,
    Button,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    useDisclosure,
    Avatar
} from "@chakra-ui/react"
import { useSelector,useDispatch } from 'react-redux';
import { RiDeleteBack2Fill as DeleteIcon } from "react-icons/ri";
import { AiFillEdit as EditIcon } from "react-icons/ai";
import { IoMdSend as SendButton } from "react-icons/io";
import { AiOutlineEnter as SaveIcon } from "react-icons/ai";
import { TiCancel as CancelIcon } from "react-icons/ti";
import { authenticate } from '../../store/session';

let socket;
const MessageModal = ({ user, chat }) => {
    const currUser = useSelector(state => state.session.user)
    const users = useSelector(state => state.users)
    const messageStore = useSelector(state => state.messages)
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [chatInput, setChatInput] = useState("");
    const [messages, setMessages] = useState([])
    const [editChatInput, setEditChatInput] = useState('')
    const [editMessage, setEditMessage] = useState(false);
    const [messageId, setMessageId] = useState(null);
    const dispatch = useDispatch()
    const messageRef = useRef();

    useEffect(() => {
        (async () => {
           let fetcheddata = await dispatch(getMessages(chat.id))
            setMessages(Object.values(fetcheddata))
        })()

    }, [dispatch])

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

    const deleteMessage = async (message_id) => {
        await dispatch(deleteMessageThunk(message_id))
        await dispatch(authenticate())
        let fetcheddata = await dispatch(getMessages(chat.id))
        setMessages(Object.values(fetcheddata))
    }

    const messageToEdit = (message) => (e) => {
        setEditChatInput(message.body)
        setEditMessage(true)
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
                    <>
                        <div id="save__icon" onClick={handleEdit(message.id, editChatInput)}><SaveIcon />Save</div>
                        <div id="cancel__icon" onClick={() => setEditMessage(false)}><CancelIcon />Cancel</div>
                    </>
                    :
                    <>
                        <div id="edit__icon" className={`${message?.id} edit__icon`} onClick={messageToEdit(message)}><EditIcon />Edit</div>
                        <div id="delete__icon" onClick={() => deleteMessage(message.id)}><DeleteIcon />Delete</div>
                    </>
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
            <Button onClick={onOpen}>{chat.name}</Button>

            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Modal Title</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                    {messages.map((message, idx) => (
                            <div key={idx} ref={messageRef} className="message" id={`${message.id}`}>
                                <div className="message__avatar">
                                    <Avatar src={users[message?.user_id]?.avatar} alt="" />
                                </div>
                                <div className="message__content">
                                    <h2>
                                        {users[message?.user_id]?.firstname}
                                        <span>{format(new Date(message?.created_at), "MMM dd, hh:mm a")}</span>
                                        {(Number(user.id) === Number(message.user_id)) && loggedUserMsgOptions(message)}
                                    </h2>
                                    {editMessage && (Number(messageId) === Number(message.id)) ? (editInputBox(message)) : (<p>{message?.body}
                                        <span className="content__edited-tag">{(message.created_at !== message.updated_at) && " (edited)"}</span>
                                    </p>)}
                                </div>
                            </div>
                        ))}
                    </ModalBody>
                    <ModalFooter>
                        {inputBox()}
                            <Button colorScheme="blue" mr={3} onClick={onClose}>
                                Close
                            </Button>
                            <Button variant="ghost">Secondary Action</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}

export default MessageModal
