import React from 'react'
import styled from 'styled-components'
import { Avatar, IconButton, Button } from '@mui/material'
import { MoreVert, Search, Logout } from '@mui/icons-material'
import * as EmailValidator from 'email-validator'
import { auth, db } from '/firebase'
import { useAuthState } from 'react-firebase-hooks/auth'
import { useCollection } from 'react-firebase-hooks/firestore'
import ContactChat from './ContactChat'

function Sidebar() {
  
  const [user] = useAuthState(auth);
  const userChatRef = db.collection("chats").where("users", "array-contains", user.email)
  const [chatsSnapshot] = useCollection(userChatRef);
  console.log(user);

  const createChat = () => {

    const input = prompt("Ingresa el correo del usuario con el que quieras hablar.")

    if (!input) return null;

    if(EmailValidator.validate(input) && !chatAlreadyExists(input) && input !== user.email) {
        
        db.collection("chats").add({
            users: [user.email, input],
        })
    }
  }

  const chatAlreadyExists = (recipientEmail) => !!chatsSnapshot?.docs.find(chat => chat.data().users.find(user => user === recipientEmail)?.length > 0);
  

  return (
    <Container>
       <Header>
        
        <UserAvatar src={user.photoURL} />
        <p>{user.displayName}</p>

        <IconsContainer>
            
            <IconButton onClick={() => auth.signOut()}>
                <Logout />
            </IconButton>
            
        </IconsContainer>

       </Header>

       <SearchBar>
         
         <Search />
         <SearchInput placeholder="Buscar chats" />

       </SearchBar>

       <SidebarButton onClick={createChat}>Nuevo Chat</SidebarButton>

       {chatsSnapshot?.docs.map((chat) => (
        <ContactChat key={chat.id} id={chat.id} users={chat.data().users} />
       ))}

    </Container>
  )
}

export default Sidebar

const Container = styled.div`
   
   background-color: white;

   flex: 0.45;
   border-right: 1px solid whitesmoke;
   height: 100vh;
   min-width: 300px;
   max-width: 350px;
   overflow-y: scroll;

  ::-webkit-scrollbar {
    display: none;
  }

  -ms-overflow-style: none;
  scrollbar-width: none;


`;

const Header = styled.div`
 display: flex;
 position: sticky;
 top: 0;
 background-color: white;
 z-index: 1;
 justify-content: space-between;
 align-items: center;
 padding: 15px;
 height: 80px;
 border-bottom: 1px solid whitesmoke;
 color: black;

`;

const UserAvatar = styled(Avatar)`
 cursor: pointer;

 :hover {
    opacity: 0.8;
 }
`;

const IconsContainer = styled.div``;

const SearchBar = styled.div`
 display: flex;
 align-items: center;
 padding: 20px;
 border-radius: 2px;
 color: black;

`;

const SearchInput = styled.input`
 outline-width: 0;
 border: none;
 flex: 1;
 background-color: whitesmoke;
 color: black;

`;

const SidebarButton = styled(Button)`
 width: 100%;
 
 &&& {
    border-top: 1px solid whitesmoke;
    border-bottom: 1px solid whitesmoke;
 }

`;