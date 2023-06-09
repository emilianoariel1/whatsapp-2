import React from 'react'
import styled from 'styled-components'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth, db } from '/firebase'
import { useRouter } from 'next/router'
import { Avatar, IconButton } from '@mui/material'
import { MoreVert, AttachFile, InsertEmoticon } from '@mui/icons-material'
import { useCollection } from 'react-firebase-hooks/firestore'
import { Mic } from '@mui/icons-material'
import { useState } from 'react'
import firebase from 'firebase/compat/app';
import Message from './Message'
import getRecipientEmail from '@/utils/getRecipientEmail'
import TimeAgo from 'timeago-react'
import { useRef } from 'react'

function ChatScreen({ chat, messages }) {

   const [user] = useAuthState(auth);
   const router = useRouter();
   const [messagesSnapshot] = useCollection(db.collection("chats").doc(router.query.id).collection("messages").orderBy("timestamp", "asc"));

   const endOfMessagesRef = useRef(null);

   const [recipientSnapshot] = useCollection(
    db.collection("users").where("email", "==", getRecipientEmail(chat.users, user))
   );

   const [input, setInput] = useState("");

   const showMessages = () => {
      if(messagesSnapshot) {
        return messagesSnapshot.docs.map(message => (
            <Message 
             key={message.id}
             user={message.data().user}
             message={{
                ...message.data(),
                timestamp: message.data().timestamp?.toDate().getTime(),
 
             }}
            />
        ));
      } else {
        return JSON.parse(messages).map(message => (
            <Message key={message.id} user={message.user} message={message} />
        ))
      }
   };

   const scrollToBottom = () => {
    endOfMessagesRef.current.scrollIntoView({ 
      behavior: "smooth",
      block: "start",
     });
   }

   const sendMessage = (e) => {
 
    e.preventDefault();

    // actualizar "ultima vez visto"
    db.collection("users").doc(user.uid).set({
        lastSeen: firebase.firestore.FieldValue.serverTimestamp(),
    }, { merge: true })

    db.collection("chats").doc(router.query.id).collection("messages").add({
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        message: input,
        user: user.email,
        photoURL: user.photoURL,
    });

    setInput("");
    scrollToBottom();

   }

   const recipient = recipientSnapshot?.docs?.[0]?.data();
   const recipientEmail = getRecipientEmail(chat.users, user);

  return (
    <Container>
       <Header>
       { recipient ? ( <Avatar src={recipient?.photoURL} />) : ( <Avatar>{recipientEmail[0]}</Avatar>)}

          <HeaderInfo>
            <h3>{recipientEmail}</h3>
            {recipientSnapshot ? (
               <p>Ultima vez {" "}
                {recipient?.lastSeen?.toDate() ? (
                  <TimeAgo datetime={recipient?.lastSeen?.toDate()} />
                ) : "no disponible"}
               </p>
            ) : (
              <p>Cargando...</p>
            )}
          </HeaderInfo>

          <HeaderIcons>
            <IconButton>
                <AttachFile />
            </IconButton>

            <IconButton>
                <MoreVert />
            </IconButton>
          </HeaderIcons>
       </Header>

       <MessageContainer>
         {showMessages()}
         <EndOfMessage ref={endOfMessagesRef}/>
       </MessageContainer>

       <InputContainer>
         <InsertEmoticon />
         <Input value={input} onChange={e => setInput(e.target.value)}/>
         <button hidden disabled={!input} type="submit" onClick={sendMessage}>Enviar Mensaje</button>
         <Mic />
       </InputContainer>
    </Container>
  )
}

export default ChatScreen

const Container = styled.div``;

const Header = styled.div`
 position: sticky;
 background-color: white;
 z-index: 100;
 top: 0;
 display: flex;
 padding: 11px;
 height: 80px;
 align-items: center;
 border-bottom: 1px solid whitesmoke;
`;

const HeaderInfo = styled.div`
  margin-left: 15px;
  flex: 1;
  color: black;

  > h3 {
    margin-bottom: 3px;
  }

  > p {
    font-size: 14px;
    color: gray;
  }
`;

const HeaderIcons = styled.div``;

const EndOfMessage = styled.div`
 margin-bottom: 50px;
`;

const MessageContainer = styled.div`
 padding: 30px;
 background-color: #e5ded8;
 min-height: 90vh;
 color: black;
`;

const InputContainer = styled.form`
 display: flex;
 align-items: center;
 padding: 10px;
 position: sticky;
 bottom: 0;
 background-color: white;
 z-index: 100;
 border-top: 1px solid whitesmoke;
 color: gray;
`;

const Input = styled.input`
 flex: 1;
 outline: 0;
 border: none;
 border-radius: 10px;
 padding: 20px;
 background-color: #e5ded8;
 margin-left: 15px;
 margin-right: 15px;
 color: black;
 `;