import moment from "moment";
import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase";

function Messages({ message, user }) {
  // console.log(message, user)

  const [userLoggedIn] = useAuthState(auth);

  const typeOfMessage = user === userLoggedIn.email ? "Sender" : "Receiver";
  return (
    <div
      className={`flex w-full ${
        typeOfMessage === "Receiver" ? "text-left " : " justify-end"
      } `}
    >
      <p
        className={`p-4 flex rounded-xl m-4 relative   ${
          typeOfMessage === "Receiver"
            ? "text-left bg-gray-100"
            : "bg-gray-300 text-right"
        }  `}
      >
        {message.message}
        <span className="absolute text-xs bottom-2">
          {message.timestamp
            ? moment(message.timestamp).format("LT")
            : "..."}
        </span>
      </p>
    </div>
  );
}

export default Messages;
