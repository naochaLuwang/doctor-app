import { Box, Button, Flex, Text } from "@chakra-ui/react";
import { getSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import ChatLeft from "../components/Chat/ChatLeft";
import ChatRight from "../components/Chat/ChatRight";
import DoctorMaster from "../models/DoctorMaster";
import Registration from "../models/Regsitration";
import Chat from "../models/Chat";
import dbConnect from "../utils/db";
import { useGlobalState } from "../components/Layout";
import ChatProfile from "../components/Chat/ChatProfile";

const ChatPage = ({ user, users, chatData }) => {
  const [regId, setRegId] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([]);
  const [active, setActive] = useGlobalState("active");
  const [newChat, setNewChat] = useState(false);
  const [chats, setChats] = useState(chatData);
  const [profileOpen, setprofileOpen] = useState(false);
  const [profile, setProfile] = useState(null);
  const [chatId, setChatId] = useState(null);
  const [userId, setUserId] = useState("");
  const [isChatOpen, setIsChatOpen] = useState(false);

  let socket;

  useEffect(() => {
    setActive("Chat");

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [setActive]);

  console.log("ChatId", chatId);

  return (
    <Box
      width="100%"
      bg="gray.200"
      height="92vh"
      overflow="hidden"
      px={6}
      py={2}
    >
      <Flex height="100%" overflow="hidden" justify="space-between">
        <ChatLeft
          user={user}
          users={users}
          regId={regId}
          setRegId={setRegId}
          setFirstName={setFirstName}
          setLastName={setLastName}
          chats={chats}
          setChat={setChat}
          newChat={newChat}
          setNewChat={setNewChat}
          setChatId={setChatId}
          setUserId={setUserId}
          setChats={setChats}
          setIsChatOpen={setIsChatOpen}
        />
        <ChatRight
          regId={regId}
          setRegId={setRegId}
          firstName={firstName}
          lastName={lastName}
          setMessage={setMessage}
          messages={message}
          chat={chat}
          setChat={setChat}
          setNewChat={setNewChat}
          setChats={setChats}
          socket={socket}
          profileOpen={profileOpen}
          setprofileOpen={setprofileOpen}
          setProfile={setProfile}
          chatId={chatId}
          userId={userId}
          isChatOpen={isChatOpen}
          setIsChatOpen={setIsChatOpen}
        />

        {profileOpen && (
          <ChatProfile
            profileOpen={profileOpen}
            setprofileOpen={setprofileOpen}
            profile={profile}
          />
        )}
      </Flex>
    </Box>
  );
};

export default ChatPage;

export async function getServerSideProps(context) {
  const session = await getSession(context);
  if (!session) {
    return {
      redirect: {
        permanent: false,
        destination: "/signin",
      },
    };
  }

  await dbConnect();

  const response = await DoctorMaster.findOne({ username: session?.user.name });

  const users = await Registration.find().sort({ FirstName: 1 });

  const chats = await Chat.find().sort({ lastChatDate: -1 });

  return {
    props: {
      user: JSON.parse(JSON.stringify(response)),
      users: JSON.parse(JSON.stringify(users)),
      chatData: JSON.parse(JSON.stringify(chats)),
      session,
    },
  };
}
