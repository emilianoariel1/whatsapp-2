import React from 'react'
import styled from 'styled-components';
import { Avatar } from '@mui/material';
import getRecipientEmail from '@/utils/getRecipientEmail';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, db } from '/firebase';
import { useCollection } from 'react-firebase-hooks/firestore';

function ContactChat({ id, users }) {
  const [user] = useAuthState(auth);
  const [recipientSnapshot] = useCollection(db.collection("users").where("email", "==", getRecipientEmail(users, user))
  );

  const recipient = recipientSnapshot?.docs?.[0]?.data();

  const recipientEmail = getRecipientEmail(users, user); 

  return (
    <Container>

      { recipient ? ( <UserAvatar src={recipient?.photoURL} />) : ( <UserAvatar>{recipientEmail[0]}</UserAvatar>)}
      <p>{recipientEmail}</p>

    </Container>
  )
}

export default ContactChat

const Container = styled.div`
  color: black;
  display: flex;
  align-items: center;
  cursor: pointer;
  padding: 15px;
  word-break: break-word;

  :hover {
    background-color: #e9eaeb;
  }
`;

const UserAvatar = styled(Avatar)`
  
  margin: 5px;
  margin-right: 15px;

`;