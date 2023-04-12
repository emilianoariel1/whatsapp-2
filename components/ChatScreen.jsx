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

function ChatScreen({ chat, messages }) {

   const [user] = useAuthState(auth);
   const router = useRouter();
   const [messagesSnapshot] = useCollection(db.collection("chats").doc(router.query.id).collection("messages").orderBy("timestamp", "asc"));

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

   }

  return (
    <Container>
       <Header>
          <Avatar />

          <HeaderInfo>
            <h3>Rec Email</h3>
            <p>Last Seen ..</p>
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
         <EndOfMessage />
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

  > h3 {
    margin-bottom: 3px;
  }

  > p {
    font-size: 14px;
    color: gray;
  }
`;

const HeaderIcons = styled.div``;

const EndOfMessage = styled.div``;

const MessageContainer = styled.div`
 padding: 30px;
 background-color: #e5ded8;
 min-height: 90vh;
`;

const InputContainer = styled.form`
 display: flex;
 align-items: center;
 padding: 10px;
 position: sticky;
 bottom: 0;
 background-color: blue;
 z-index: 100;
`;

const Input = styled.input`
 flex: 1;
 outline: 0;
 border: none;
 border-radius: 10px;
 padding: 20px;
 background-color: whitesmoke;
 margin-left: 15px;
 margin-right: 15px;
 `;