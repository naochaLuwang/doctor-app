/* eslint-disable react-hooks/exhaustive-deps */
import {
  Avatar,
  Box,
  Button,
  Flex,
  HStack,
  Icon,
  IconButton,
  Input,
  Text,
} from "@chakra-ui/react";
import axios from "axios";
import React from "react";
import { BsFillChatLeftDotsFill, BsThreeDotsVertical } from "react-icons/bs";
import { RiSendPlaneFill } from "react-icons/ri";
import ReactTimeAgo from "react-time-ago";
import TimeAgo from "javascript-time-ago";
import { useEffect, useState } from "react";

import en from "javascript-time-ago/locale/en.json";

TimeAgo.addDefaultLocale(en);
import io from "socket.io-client";

const ChatRight = ({
  regId,
  setRegId,
  firstName,
  lastName,
  setMessage,
  messages,
  chat,
  setChat,
  setNewChat,
  setChats,
}) => {
  const socket = io.connect("http://localhost:4000");
  useEffect(() => {
    socket.on("receive_message", (data) => {
      getChat(data.fromId);
      setRegId(data.fromId);
    });
  }, [socket]);

  const getChat = async (regId) => {
    const chatsResponse = await axios.get(`/api/getchat/${regId}`);
    setChat(chatsResponse.data);

    const chatResponse = await axios.get("/api/getchat");
    setChats(chatResponse.data);
  };

  const handleMessage = (e) => {
    setMessage(e.target.value);
  };

  const sendMessage = () => {
    socket.emit("send_message", { message: "Hello", name: "Somojit" });
  };

  const handleChat = async (e) => {
    e.preventDefault();
    const chatsResponse = await axios.get(`/api/getchat/${regId}`);

    if (!chatsResponse.data) {
      const response = await axios.post(`/api/getchat/${regId}`, {
        fromId: regId,
        toId: 0,
        firstName,
        lastName,
        lastChatDate: new Date(),
        lastChatMessage: messages,
        lastChatBy: "admin",
        messages: [
          {
            typeId: 2,
            regId,
            firstName,
            lastName,
            msg: messages,
            statusId: 1,
            createdDate: new Date(),
            createdBy: "admin",
          },
        ],
        createdDate: new Date(),
      });

      setMessage("");
      setChat(response.data);

      if (response) {
        socket.emit("send_message", {
          fromId: regId,
          chats: {
            typeId: 2,
            regId: regId,
            firstName,
            lastName,
            msg: messages,
            statusId: 1,
            createdDate: new Date(),
            createdBy: "admin",
          },

          lastChatDate: new Date(),
          lastChatMessage: messages,
          lastChatBy: "admin",
        });
        const chatResponse = await axios.get("/api/getchat");
        setChats(chatResponse.data);
        setNewChat(false);
      }
    }

    if (chatsResponse.data) {
      const response = await axios.put(`/api/getchat/${regId}`, {
        fromId: regId,
        chats: {
          typeId: 2,
          regId: regId,
          firstName,
          lastName,
          msg: messages,
          statusId: 1,
          createdDate: new Date(),
          createdBy: "admin",
        },

        lastChatDate: new Date(),
        lastChatMessage: messages,
        lastChatBy: "admin",
      });

      setMessage("");
      console.log("Response is", response.data);
      // setChat(response.data);

      if (response) {
        socket.emit("send_message", {
          fromId: regId,
          chats: {
            typeId: 2,
            regId: regId,
            firstName,
            lastName,
            msg: messages,
            statusId: 1,
            createdDate: new Date(),
            createdBy: "admin",
          },

          lastChatDate: new Date(),
          lastChatMessage: messages,
          lastChatBy: "admin",
        });
        const chatResponse = await axios.get("/api/getchat");
        setChats(chatResponse.data);
      }
    }
  };

  return (
    <Box width="74%" height="90vh" rounded="xl">
      <Flex height="100%" direction="column">
        <Flex
          align="center"
          bg="gray.50"
          py={2}
          px={4}
          shadow="md"
          justify="space-between"
          roundedTop="2xl"
        >
          <HStack>
            <Avatar
              size="sm"
              name={
                chat
                  ? `${chat.firstName} ${chat.lastName}`
                  : `${firstName} ${lastName}`
              }
            />
            {/* {(firstName && lastName) || chat} */}
            <Text
              fontSize="12pt"
              fontWeight="semibold"
              letterSpacing="3"
              color="gray.600"
            >
              {chat
                ? `${chat.firstName} ${chat.lastName} `
                : `${firstName} ${lastName}`}
            </Text>
          </HStack>

          <Box>
            <Button variant="ghost" size="sm" onClick={sendMessage}>
              <Icon as={BsFillChatLeftDotsFill} />
            </Button>
            <Button variant="ghost" size="sm">
              <Icon as={BsThreeDotsVertical} />
            </Button>
          </Box>
        </Flex>
        <Flex
          direction="column-reverse"
          overflowY="scroll"
          flex="1"
          bg="white"
          px={4}
          pb={2}
          sx={{
            "&::-webkit-scrollbar": {
              width: "10px",
              borderRadius: "8px",
              backgroundColor: `gray.500`,
              display: "none",
            },
            "&::-webkit-scrollbar-thumb": {
              backgroundColor: `gray.400`,
              display: "hidden",
            },
          }}
        >
          {chat && (
            <Flex direction="column" px={3}>
              {chat?.messages.map((item) => (
                <Box
                  key={item._id}
                  // width="100%"
                  align={item.typeId === 2 ? "right" : "left"}
                  mb={3}
                >
                  <Text
                    fontSize="12pt"
                    fontWeight="md"
                    width="fit-content"
                    maxW="2xl"
                    bg="gray.600"
                    color="white"
                    rounded="xl"
                    px={3}
                    py={1}
                  >
                    {item.msg}
                  </Text>
                  <ReactTimeAgo
                    date={item.createdDate}
                    locale="en-US"
                    timeStyle="twitter-minute-now"
                  />
                </Box>
              ))}
            </Flex>
          )}
        </Flex>

        <Box mb={1} bg="white" roundedBottom="2xl" px={4} pb={5} shadow="2xl">
          {(firstName || lastName || chat) && (
            <form onSubmit={handleChat}>
              <Flex flex="1">
                <Input
                  flex="1"
                  type="text"
                  size="md"
                  fontSize="12pt"
                  rounded="full"
                  fontWeight="medium"
                  _placeholder={{ color: "gray.500" }}
                  _hover={{
                    bg: "white",
                    border: "1px solid",
                    borderColor: "blue.500",
                  }}
                  _focus={{
                    outline: "none",
                    bg: "white",
                    border: "1px solid",
                    borderColor: "blue.500",
                  }}
                  bg="gray.200"
                  mr={2}
                  value={messages}
                  onChange={handleMessage}
                />
                <IconButton
                  type="submit"
                  aria-label="Search database"
                  colorScheme="whatsapp"
                  rounded="full"
                  icon={<RiSendPlaneFill h={8} w={8} />}
                />
              </Flex>
            </form>
          )}
        </Box>
      </Flex>
    </Box>
  );
};

export default ChatRight;
