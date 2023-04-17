import '@/styles/globals.css'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth, db } from '../firebase'
import Login from './login'
import Loading from '../components/Loading'
import firebase from 'firebase/compat/app';
import { useEffect } from 'react'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin']});

export default function App({ Component, pageProps }) {

 const [user, loading] = useAuthState(auth);

 useEffect(() => {
  
  if(user) {
    db.collection('users').doc(user.uid).set({
      email: user.email,
      lastSeen: firebase.firestore.FieldValue.serverTimestamp(),
      photoURL: user.photoURL,
    },
    { merge : true }
    )
  }

 }, [user]);

 if (loading) return <Loading />;

 if (!user) return <Login />;

  return (
    <main className={inter.className}>
       <Component {...pageProps} />
    </main>
  )
}
