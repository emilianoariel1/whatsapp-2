import React from 'react'
import styled from 'styled-components'
import { Avatar, IconButton, Button } from '@mui/material'
import { Chat, MoreVert, Search } from '@mui/icons-material'

function Sidebar() {
  return (
    <Container>
       <Header>
        
        <UserAvatar />

        <IconsContainer>
            
            <IconButton>
                <Chat />
            </IconButton>
            
            <IconButton>
                <MoreVert />
            </IconButton>
            
        </IconsContainer>

       </Header>

       <SearchBar>
         
         <Search />
         <SearchInput placeholder="Buscar chats" />

       </SearchBar>

       <SidebarButton>Nuevo Chat</SidebarButton>

    </Container>
  )
}

export default Sidebar

const Container = styled.div``;

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

`;

const SearchInput = styled.input`
 outline-width: 0;
 border: none;
 flex: 1;

`;

const SidebarButton = styled(Button)`
 width: 100%;
 
 &&& {
    border-top: 1px solid whitesmoke;
    border-bottom: 1px solid whitesmoke;
 }

`;