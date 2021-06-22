import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase";
import { useRouter } from "next/router";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import { Avatar, Button } from "@material-ui/core";
import { AttachFileOutlined, MoreVert } from "@material-ui/icons";
import { IconButton } from "@material-ui/core";

function ChatScreen({ chat, messages }) {
  const [user] = useAuthState(auth);
  const router = useRouter();

  return (
    <div>
      <div className="header h-20 flex w-full items-center justify-between px-4 sticky" >
        <div className="">
          <Avatar />
        </div>
        <div className="flex flex-col ml-5 flex-1">
          <p className="">last seen:</p>
          <p className="">Recipent email:</p>
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
      <div className="message-area">
        <div className="">
          
        </div>


        <div className="endofmessage">

        </div>
      </div>
    </div>
  );
}

export default ChatScreen;
