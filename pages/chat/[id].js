import Head from "next/head";
import Sidebar from "../../components/Sidebar";
import ChatScreen from "../../components/ChatScreen";
import { auth, db } from "../../firebase";
import firebase from "firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import getRecipientEmail from "../../utils/getRecipientEmail";

function Chat({ messages, chat }) {

  const [user] = useAuthState(auth)
  // console.log(user)
  return (
    <div className=" flex h-screen">
      <Head>
        <title>Chat with {getRecipientEmail(chat.users, user)}</title>
      </Head>
      <div className="flex-shrink hidden md:block invisible md:visible md:w-5/12 lg:w-4/12 overflow-scroll ">
        <Sidebar />
      </div>
      <div className="flex flex-col md:w-7/12 lg:w-8/12">
        <div className="screen flex-1 overflow-y-scroll h-screen">
          <ChatScreen chat={chat} messages={messages} />
        </div>
      </div>
    </div>
  );
}

export default Chat;

export async function getServerSideProps(context) {
  const ref = db.collection("chats").doc(context.query.id);


  //prep messages on the server

  const messagesRes = await ref
    .collection("messages")
    .orderBy("timestamp", "asc")
    .get();

  const messages = messagesRes.docs
    .map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }))
    .map((messages) => ({
      ...messages,
      timestamp: messages.timestamp.toDate().getTime(),
    }));

  //prep the chats 
  const chatRes = await ref.get();
  const chat = {
    id: chatRes.id,
    ...chatRes.data(),
  };
  // console.log( messages);
  return {
    props: {
      messages: JSON.stringify(messages),
      chat: chat,
    },
  };
}
