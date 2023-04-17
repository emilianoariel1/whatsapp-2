import Head from 'next/head'
import { Inter } from 'next/font/google'
import Sidebar from '@/components/Sidebar'
import styled from'styled-components'


const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <>
      <Container>
      <Head>
        <title>Whatsapp 2</title>
        <meta name="description" content="Created by Emiliano Ariel" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta property="og:image" content="https://img.icons8.com/ultraviolet/512/whatsapp--v1.png" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
      <Sidebar />

      <NoChatScreen>
         <Logo src="https://img.icons8.com/ultraviolet/512/whatsapp--v1.png" />
      </NoChatScreen>
        
      </Container>
    </>
  )
}

const Container = styled.div`
 display: flex;
`;

const NoChatScreen = styled.div`
 display: grid;
 place-items: center;
 background-color: #e5ded8;
 flex: 1
`;

const Logo = styled.img`
 height: 200px;
 width: 200px;
 margin-bottom: 50px;
`;
