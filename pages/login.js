import React from 'react'
import styled from 'styled-components';
import { Button } from '@mui/material';
import { auth, provider } from '../firebase';
import Head from 'next/head';

function Login() {

  const signIn = () => {
    auth.signInWithPopup(provider).catch(alert)
  }

  return (
    <Container>

      <Head>
        <title>Whatsapp 2</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

        <LoginContainer>
           <Logo src="https://img.icons8.com/ultraviolet/512/whatsapp--v1.png" />
           <Button onClick={signIn} variant="outlined" >Iniciar Sesión con Google</Button>
        </LoginContainer>

        <h3>Construido con Next.js © 2023</h3>

    </Container>
  )
}

export default Login

const Container = styled.div`
 display: grid;
 place-items: center;
 height: 100vh;
 background-color: whitesmoke;
 color: black;
`;

const LoginContainer = styled.div`
 display: flex;
 flex-direction: column;
 align-items: center;
 padding: 100px;
 background-color: white;
 border-radius: 5px;
 box-shadow: 0px 4px 14px -3px rgba(0, 0, 0, 0.7);
`;

const Logo = styled.img`
 height: 200px;
 width: 200px;
 margin-bottom: 50px;
`;

