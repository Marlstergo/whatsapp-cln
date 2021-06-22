import '../styles/globals.css'

import { useAuthState } from "react-firebase-hooks/auth"
import {auth, db} from '../firebase'
import firebase from 'firebase'

import Login from './login'

import Loading from '../components/loading'
import { useEffect } from 'react'

function MyApp({ Component, pageProps }) {
  
  const [user, loading] = useAuthState(auth)

  useEffect( () => {
    if (user) {
      db.collection("users").doc(user.uid).set(
        {
          email: user.email,
          lastSeen: firebase.firestore.FieldValue.serverTimestamp(),
          photo: user.photoURL,
        },
        {merge: true}
      )}
  }, [user])

  
  // const countdown = 6

  // function redCountdown(){
  //   countdown - 1
  // }
  // while (countdown > 0) {
  //   setTimeout(function () {
  //     redCountdown()
  //   }, 100)
  // }
  
  
  if(loading) {

    return <Loading/>
  }
  
  

  if (!user) {
    return <Login/>
  }
  return <Component {...pageProps} />

}

export default MyApp
