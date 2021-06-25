import styled from "styled-components";

// material ui importts
import { Avatar, Button } from "@material-ui/core";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import ChatIcon from "@material-ui/icons/Chat";
import { IconButton } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";

// additonal packages
import * as EmailValidator from "email-validator";
import { auth, db } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollection } from "react-firebase-hooks/firestore";
import Chat from "./Chat";

function Sidebar() {
  const [user] = useAuthState(auth);
  const userChatRef = db
    .collection("chats")
    .where("users", "array-contains", user?.email);
  const [chatsSnapshot] = useCollection(userChatRef);

  const createchat = () => {
    const input = prompt(
      "Please eenter an eemail address for the useer you wish to chat with"
    );

    const chatAlreadyExists = (recipentEmail) =>
      !!chatsSnapshot?.docs.find(
        (chat) =>
          chat.data().users.find((user) => user === recipentEmail)?.length > 0
      );

    if (!input) {
      alert("no email inputed");
      return null;
    }

    if (
      EmailValidator.validate(input) &&
      input !== user.email &&
      !chatAlreadyExists(input)
    ) {
      db.collection("chats").add({
        users: [user.email, input],
      });
    }

    // if (!EmailValidator.validate(input)) {
    //   alert("incorrect email inputed");
    // }
  };
  return (
    <div className='flex flex-col overflow-hidden w-full'>
      <Header>
        <UseAvatar src={user.photoURL}
          onClick={() => {
            auth.signOut();
          }}
        />

        <IconsContainer>
          <IconButton>
            <ChatIcon />
          </IconButton>
          <IconButton>
            <MoreVertIcon />
          </IconButton>
        </IconsContainer>
      </Header>
      <Search>
        <SearchIcon />
        <SearchInput placeholder="Search in chats" />
      </Search>
      <SidebarButton onClick={createchat}>Start a new chat</SidebarButton>
      <div className="flex flex-col w-full ">
        {chatsSnapshot?.docs.map((chat) => (
          <Chat className='w-full' key={chat.id}  id={chat.id} users={chat.data().users} user={user} />
        ))}
      </div>
    </div>
  );
}

export default Sidebar;

const Container = styled.div`
  border-right: 2px solid gray;
`;
const Header = styled.div`
  display: flex;
  position: sticky;
  top: 0;
  background-color: white;
  z-index: 1;
  justify-content: space-between;
  align-items: center;
  padding: 15px;
  height: 80px;
  border-bottom: 1px solid whitesmoke;
`;

const UseAvatar = styled(Avatar)`
  cursor: pointer;
  :hover {
    opacity: 0.8;
  }
`;
const IconsContainer = styled.div``;

const Search = styled.div`
  display: flex;
  align-items: center;
  padding: 20px;
  border-radius: 2px;
`;

const SearchInput = styled.input`
  outline-width: 0;
  border: none;
  flex: 1;
`;
const SidebarButton = styled(Button)`
  width: 100%;
  &&& {
    border-top: 1px solid whitesmoke;
    border-bottom: 1px solid whitesmoke;
  }
`;
