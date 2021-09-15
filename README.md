# My Neighborkhood
  My Neighborkhood is a fullstack front-end to back-end project.  It is a social interaction map focused on meeting the community through your dog.  
  
![ReadMeGif1](https://user-images.githubusercontent.com/73197963/121825391-1e3b1200-cc80-11eb-8503-504a5736faaf.gif))
![ReadMeGif2](https://user-images.githubusercontent.com/73197963/121825395-22ffc600-cc80-11eb-88e0-734c507ae580.gif)

* Live Link Address: https://my-neighborkhood.herokuapp.com/  
* Project Github: https://github.com/earlwoo/My-Neighborkhood
     

## MVP
  * Ability to create new users and have user login with authorization
  * Users can edit their own or their pet's info
  * Ability to login as a demo user with access to website
  * Users can view a map of Neighborks whom they can chat with
  * Users can create, update, delete a message in chat with other user 
  * Users can search through all neighbors

## BONUS / STRETCH GOALS
  * Search
  * Events
  * Dog specific map markers
      * doggy day care
      * pet sitters
      * parks
      * events
  * Adoption listings by neighborhoods
  
## TECHNOLOGIES USED
  * Python
  * Flask
  * SQLAlchemy
  * Docker
  * PSQL Database
  * CSS
  * JSX
  * React
  * Redux
  * Heroku

## ENVIORNMENT DEPENDENCIES/PACKAGES
  * Google Maps React
  * Socket-IO
  * React Geocode
  * Chakra UI
  * wtforms
  * React Icons
  * Font Awesome
  * Faker

  
## DATABASE SCHEMA

![NewDB](https://user-images.githubusercontent.com/73197963/121825419-43c81b80-cc80-11eb-8c9c-2f09c8bf712d.PNG)

## Technical Showcase

To prevent multiple sockets for chat rooms, a user is passed into a state set by useState to open a chat socket only when a user is selected. 
```javascript
   <Flex flexDirection="column" alignItems="flex-start">
     {Object.values(chats).map(chat => (
       <Box
       as="button"
       onClick={() => setShow(chat)}
       key={chat.id}
       fontWeight="semibold" letterSpacing="wide"
       fontSize="xs" marginBottom="10px" padding="10px" >
         <Avatar src={Object.values(chat.users)[1].avatar}></Avatar>
         <Box fontSize="14" paddingLeft="5" fontWeight="semibold" as="button" >{Object.values(chat.users)[1].name}
         </ Box>
         <Divider paddingTop="1" maxWidth="275px"/>
       </Box >
     ))}
       <Portal >
         {show.id && <MessageModal setShow={setShow} ref={ref} chat={show} user={user} />}
       </Portal>
   </Flex>
```

Python objects are converted to readable info when sent from the back-end to front-end using a to_dict method for applicable class instances.  Along with various properties through table relations.
```javascript
    pet = db.relationship(
        "Pet", uselist=False,
        back_populates="owner"
    )

    chats = db.relationship(
        'Chat',
        secondary=user_chats,
        back_populates='users'
    )



   def to_dict(self):
     return {
         "id": self.id,
         "firstname": self.firstname,
         "lastname": self.lastname,
         "email": self.email,
         "avatar": self.avatar,
         "address": json.loads(self.address),
         "location": json.loads(self.location),
         "bio": self.bio,
         "pet": self.pet.to_dict(),
         "chats": {chat.id: chat.to_dict() for chat in self.chats}
     } 
```
Websocket on the frontend: The `useEffect()` enables a new `chat` socket to be opened. We used the chat prop as an identifier for when we interact with the backend of the `chat` socket. When the selected chat changes, current socket `chat` socket is closed, and then reopens with the next chat passed in as a prop. Upon submission of a new message, we emit the message to the backend socket and sends the data to create and store the message into the database.
```js
useEffect(() => {       
        socket = io();        
        socket.on(chat.id, (data) => {          
            setMessages(messages => [...messages, data])
        })
        return (() => {
            socket.disconnect()
        })
    }, [messages.length, chat])

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
```

* Websocket on the backend: There's one socket that receives all `chat` events. After adding the emitted message to the database, we `emit` back to the frontend with additional data such as `chat_id`. That `chat_id` will be used to determine which frontend channel's `chat` socket we should broadcast the new message to. The data sent from the backend will now be received as the variable `chat` in the `useEffect()`.

`app/socketIO.py`
```js
@socketio.on("chat")
def handle_chat(data):
    new_message = Message(
        user_id=data['user_id'],
        chat_id=data['chat_id'],
        body=data['body'],
        created_at=data['created_at'],
        updated_at=data['updated_at']
    )

    db.session.add(new_message)
    db.session.commit()
    messages = Message.query.filter(Message.user_id == data['user_id'], Message.body == data['body']).all()
    ourMsg = messages[len(messages) - 1]
    data['id'] = ourMsg.id
    emit(data["chat_id"], data, broadcast=True)
```

## TABLE USERS
  * id (integer, primary key, not null)
  * firstName (string, not null)
  * lastName (string, not null)
  * email (string, unique, not null)
  * hashedPassword (string, not null)
  * address (string, unique, not null)
  * avatar (string)
  * bio (text, not null)
  * location (text, not null)
  * created_at (dateTime, not null)
  * updated_at (dateTime, not null)
## TABLE PETS
  * id (integer, primary key)
  * name (string, not null)
  * image (string)
  * owner_id (integer, not null, foreign key)
  * bio (text)
  * age (string )
  * created_at (dateTime, not null)
  * updated_at (dateTime, not null)
## TABLE CHATS
  * id (integer, primary key, not null)
  * name (string, not null)
  * created_at (dateTime, not null)
  * updated_at (dateTime, not null)
## TABLE MESSAGES
  * id (integer, primary key, not null)
  * user_id (integer, not null, foreign key)
  * chat_id (integer, not null, foreign key)
  * body (text, not null)
  * created_at (dateTime, not null)
  * updated_at (dateTime, not null)
## TABLE USER CHATS
  * id (integer, primary key, not null)
  * user_id (integer, not null, foreign key)
  * chat_id (integer, not null, foreign key)
  * created_at (dateTime, not null)
  * updated_at (dateTime, not null)

## BACKEND ROUTES    
### `auth`
* GET /api/auth/ - Authenticate
* POST /api/auth/login - Log in
* POST /api/auth/signup - Sign up
* DELETE /api/auth/logout - Log Out

### `users`
* GET /:id - Get specific user 
* PATCH /:id - Edit user bio
* PATCH /pet - Edit user pet
* POST /api/users - Sign Up

### `all_users`
* GET /api/all_users/ - Get all user profile

### `chats`
* GET /api/chats/ - Get all subscribed chats
* POST /api/chats/ - Create a chat

### `messages`
* GET /api/messages/:chatId - Fetch all messages for given chat
* PATCH /api/messages/:messageId - Edit a specific message
* DELETE /api/messages/:messageId - Delete a message

## PROJECT CHALLENGES
    * Figuring out how to make the least amount of calls to the database and utilizing the redux state for data
    * Deciding which components have access to which slice of state and how to make the data accessible to other components by either props, or subscribing to the store
    * The re-rendering nature of React, and understanding how those re-renders affect the entire components structure, while also being mindful of what causes the re-render
    
