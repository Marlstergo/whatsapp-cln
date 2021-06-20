import Head from 'next/head'
import Sidebar from '../../components/Sidebar'
import ChatScreen from '../../components/ChatScreen'
import { db } from '../../firebase'
import firebase from 'firebase'

function Chat({messages, chat}) {
  return (
    <div className=' flex h-screen'>
      <Head>
        <title>Chat</title>
      </Head>
      <Sidebar/>
      <div className="flex flex-col w-full">
        <div className="screen flex-1 overflow-y-scroll h-screen">
          <ChatScreen/>
        </div>
      </div>

    </div>
  )
}

export default Chat

export async function getServerSideProps(context) {
  const ref = db.collection("chats").doc(context.query.id)

  const messagesRes = await ref
  .collection("messages")
  .orderBy("timestamp" , "asc")
  .get()

  const messages = messagesRes.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  })
  ).map((messages) => ({
    ...messages,
    timestamp: messages.timeStamp.toDate().getTime()
  }))

  //prep the chatsSnapshot
  const chatRes= await ref.get()
  const chat = {
    id: chatRes.id,
    ...chatRes.data(),
  }
  console.log(messages, chat)
  return {
    props: {
      messages: JSON.stringify(messages),
      chat:chat
    }
  }
}
