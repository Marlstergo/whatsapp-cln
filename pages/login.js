import React from 'react'

import Head from 'next/head'
import styled from 'styled-components'
import { Button } from '@material-ui/core'
import { auth, provider } from '../firebase'


function Login() {

  const signIn = () => {
    auth.signInWithPopup(provider)
    .catch(alert)
  }

  return (
    <Container>
      <Head>
        <title>Login</title>
      </Head>

      <LoginContainer>
        <Logo src='https://th.bing.com/th/id/OIP.dD3KjCmsUWT72iB1LQmgfAHaHa?w=174&h=180&c=7&o=5&pid=1.7' />
        <Button onClick={signIn} variant='outlined'>Sign in with Google</Button>
      </LoginContainer>
      
    </Container>
  )
}

export default Login

const Container = styled.div`
  display: grid;
  place-items: center;
  height: 100vh;
  background-color: green;
`

const LoginContainer = styled.div`
  padding: 100px;
  background-color: white;
  display: flex;
  flex-direction: column;
  box-shadow: 0px 4px 14px -3px rgba(0, 0, 0, 0.7);
`

const Logo = styled.img`
  height: 200px;
  width: 200px;
  margin-bottom: 50px;

`
