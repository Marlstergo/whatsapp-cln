import { Avatar } from "@material-ui/core";
import { useCollection } from "react-firebase-hooks/firestore";
import { db } from "../firebase";
import getRecipientEmail from "../utils/getRecipientEmail";

import {useRouter} from "next/router"

function Chat({id, users, user }) {
  // console.log(id)
  const router = useRouter()

  const recipentEmail = getRecipientEmail(users, user);
  // console.log(recipentEmail)

  const [recipientSnapshot] = useCollection(
    db.collection("users").where("email", "==", getRecipientEmail(users, user))
  );
  const recipent = recipientSnapshot?.docs?.[0]?.data()

  const enterChat = () => {
    router.push(`/chat/${id}`)
    console.log('pusshed')
  }

  return (
    <div onClick={enterChat} className="flex items-center border-b-2 border-gray-200 py-2 hover:bg-gray-200 pr-10 cursor-pointer">
      {
        recipent? <Avatar className="mx-5" src={recipent?.photo} />
        : <Avatar className="mx-5"> {recipentEmail[0]} </Avatar>
      }
      <p className="">  {recipentEmail}</p>
    </div>
  );
}

export default Chat;
  