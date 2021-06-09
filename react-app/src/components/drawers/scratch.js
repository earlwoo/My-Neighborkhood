<>
    <div key={idx} ref={messageRef} className="message" id={`${message.id}`}>
        <div className="message__avatar">
            <Avatar size="xl" src={users[message?.user_id]?.avatar} alt="" />
        </div>
        <div className="message__content">
            <h2 className="quick">
                {users[message?.user_id]?.firstname}
                <br></br>
                <span>{format(new Date(message?.created_at), "MMM dd, hh:mm a")}</span>
                {(Number(user.id) === Number(message.user_id)) && loggedUserMsgOptions(message)}
            </h2>
            {editMessage && (Number(messageId) === Number(message.id)) ? (editInputBox(message)) : (<p>{message?.body}
                <span className="content__edited-tag">{(message.created_at !== message.updated_at) && " (edited)"}</span>
            </p>)}
        </div>
    </div>
</>
