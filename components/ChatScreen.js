import { useAuthState } from "react-firebase-hooks/auth";
import { auth , db } from "../firebase";
import { useRouter } from "next/router";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import { Avatar, Button } from "@material-ui/core";
import {
  AttachFileOutlined,
  EmojiEmotions,
  MicRounded,
  MoreVert,
  Send
} from "@material-ui/icons";
import { IconButton } from "@material-ui/core";
import { useCollection, useCollectionData } from "react-firebase-hooks/firestore";

import Message from '../components/Messages'
import { useRef, useState } from "react";

import firebase from "firebase";
import getRecipientEmail from "../utils/getRecipientEmail";

import TimeAgo from 'timeago-react'

function ChatScreen({ chat, messages }) {
  const [user] = useAuthState(auth);
  const router = useRouter();
  const [input, setInput] = useState()
  const [messagesSnapshot] = useCollection(
    db
    .collection("chats")
    .doc(router.query.id)
    .collection("messages")
    .orderBy("timestamp", "asc")
  )

  const showMessages = () => {
    if(messagesSnapshot) {
      return messagesSnapshot.docs.map((msg) => (
        <Message
          key = {msg.id}
          user = {msg.data().user}
          message = {{
            ...msg.data(),
            timestamp: msg.data().timestamp?.toDate().getTime()
          }}
        />
      ))
    }else{

      JSON.parse(messages).map(message =>(
        <div key={message.id} className="">
          <Message key={message.id} user={message.user} message={message}/>
          <p>second</p>
        </div>
      )
      )
    }
  }

  const sendMessage = (e) =>{
    e.preventDefault()
    // db.collection("users").doc(user.uid).update
    db.collection("users").doc(user.uid).set({
      
      lastSeen: firebase.firestore.FieldValue.serverTimestamp(),

    },
    {merge: true}
    )

    db.collection("chats").doc(router.query.id).collection('messages').add({
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      message: input,
      user: user.email,
      photoURL: user.photoURL,
      
    })

    setInput("")
    scrollToBottom()


  }
  const recipientEmail = getRecipientEmail(chat.users, user)

  const [recipientSnapshot] = useCollection(
    db.collection('users').where('email', '==', getRecipientEmail(chat.users, user))
  )
  // console.log(recipientSnapshot.docs.[0].data())
  const recipient = recipientSnapshot?.docs?.[0]?.data()
  // console.log(recipient?.photo)
  const endOfMessageRef = useRef(null)
  const scrollToBottom = () => {
    endOfMessageRef.current.scrollIntoView({
      behavior: "smooth",
      block: "start"
    })
  }
  return (
    <div className="h-screen flex flex-col">
      <div className="header h-14 flex w-full items-center justify-between px-4 sticky top-0 bg-white z-50">
        <div className="">
          {
            recipient ? (
              <Avatar src={recipient?.photo} />
            ) : (
              <Avatar>{recipientEmail[0]}</Avatar>
            )
          }
          {/* <Avatar /> */}
        </div>
        <div className="flex flex-col ml-5 flex-1">
          
          <p className="">{recipientEmail}</p>
          {
            recipientSnapshot ? (
              <p>Last Active: {' '}
                {
                  recipient?.lastSeen?.toDate() ? (
                    <TimeAgo datetime={recipient?.lastSeen?.toDate()} />
                  ) : "unavailable"
                }
              </p>
            ) : (
              <p>Loaading last active....</p>
            )
          }
        </div>
        <div className="icon space-x-3 mr-3">
          <IconButton>
            <AttachFileOutlined />
          </IconButton>
          <IconButton>
            <MoreVert />
          </IconButton>
        </div>
      </div>
      <div className="message-area flex flex-col flex-1">
        <div className="h-full bg-chat  bg-cover bg-bottom">
          {showMessages()}
          <div ref={endOfMessageRef} className="messageend mb-10"></div>
        </div>
        <div className="endofmessage z-50 bg-white sticky bottom-0 py-3 h-14">
          <form className="flex w-full items-center  ">
            <IconButton className="mx-4">
              <EmojiEmotions />
            </IconButton>
            <input
              className="flex-1 px-6 py-4 bg-gray-100 focus:ring-0 focus:outline-none rounded-2xl"
              type="text"
              name="message"
              id="message"
              placeholder="Type a message"
              value={input}
              onChange={
                (e) => setInput(e.target.value)
              }
            />
            <IconButton className="mx-8 flex items-center justify-center">
            <button  disabled={!input} type="submit" onClick={sendMessage} ><Send className=''/></button>
            </IconButton>

            <IconButton className="mx-8">
              <MicRounded />
            </IconButton>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ChatScreen;
