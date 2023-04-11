import React from 'react'
import styled from 'styled-components';
import { Button } from '@mui/material';
import { auth, provider } from '../firebase';

function Login() {

  const signIn = () => {
    auth.signInWithPopup(provider).catch(alert)
  }

  return (
    <Container>

        <LoginContainer>
           <Logo src="https://www.pngmart.com/files/11/Chat-Logo-PNG-Photos.png" />
           <Button onClick={signIn} variant="outlined" >Iniciar Sesión con Google</Button>
        </LoginContainer>

    </Container>
  )
}

export default Login

const Container = styled.div`
 display: grid;
 place-items: center;
 height: 100vh;
 background-color: whitesmoke;
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

