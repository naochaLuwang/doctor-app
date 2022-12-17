/* eslint-disable react-hooks/exhaustive-deps */
import {
  Avatar,
  Box,
  Button,
  Center,
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
import { useFilePicker } from "use-file-picker";

import { useEffect, useState } from "react";

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
  setprofileOpen,
  setProfile,
  isChatOpen,
  setIsChatOpen,
}) => {
  const socket = io.connect("http://localhost:4000");
  useEffect(() => {
    socket.on("receive_message", (data) => {
      if (data.fromId === regId) {
        setIsChatOpen(true);
      } else {
        setIsChatOpen(false);
      }

      if (chat.length > 0) {
        const newChat = [...chat, data.messages[0]];

        console.log(data);
        setChat(newChat);
      }
    });
  }, [socket]);

  const handleProfile = async () => {
    const response = await axios.get(`/api/getuserprofile/${regId}`);
    console.log("Response is", response.data);
    setProfile(response.data);
    setprofileOpen(true);
  };

  const getChat = async (regId) => {
    const chatsResponse = await axios.get(`/api/getchat/${regId}`);
    setChat(chatsResponse.data);

    const chatResponse = await axios.get("/api/getchat");
    setChats(chatResponse.data);
  };

  const handleMessage = (e) => {
    setMessage(e.target.value);
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
      // setChat(response.);

      if (response) {
        socket.emit("send_message", {
          _id: response.data._id,
          fromId: regId,
          firstName: response.data.firstName,
          lastName: response.data.lastName,
          messages: [
            {
              _id: response.data.messages[response.data.messages.length - 1]
                ._id,
              typeId: 2,
              regId: regId,
              firstName,
              lastName,
              msg: messages,
              statusId: 1,
              createdDate: new Date(),
              createdBy: "admin",
            },
          ],

          lastChatDate: response.data.lastChatDate,
          lastChatMessage: response.data.lastChatMessage,
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
        toId: 0,
        firstName,
        lastName,
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
      setChat(response.data.messages);

      if (response) {
        socket.emit("send_message", {
          _id: response.data._id,
          fromId: regId,
          toId: 0,
          firstName: response.data.firstName,
          lastName: response.data.lastName,
          messages: [
            {
              _id: response.data.messages[response.data.messages.length - 1]
                ._id,
              typeId: 2,
              regId: regId,
              firstName,
              lastName,
              msg: messages,
              statusId: 1,
              createdDate: new Date(),
              createdBy: "admin",
            },
          ],

          lastChatDate: new Date(),
          lastChatMessage: messages,
          lastChatBy: "admin",
          statusId: response.data.statusId,
          tenantId: response.data.tenantId,
          isActive: response.data.isActive,
          createdDate: new Date(),
        });
        const chatResponse = await axios.get("/api/getchat");
        setChats(chatResponse.data);
      }
    }
  };

  return (
    <Box width="74%" height="90vh" rounded="xl" bg="white">
      {isChatOpen ? (
        <>
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
              <HStack cursor="pointer" onClick={handleProfile}>
                <Avatar size="sm" name={`${firstName} ${lastName}`} />
                {/* {(firstName && lastName) || chat} */}
                <Text
                  fontSize="12pt"
                  fontWeight="semibold"
                  letterSpacing="3"
                  color="gray.600"
                >
                  {`${firstName} ${lastName}`}
                </Text>
              </HStack>

              <Box>
                <Button variant="ghost" size="sm">
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
              {isChatOpen && chat && (
                <Flex direction="column" px={3}>
                  {chat?.map((item) => (
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

            <Box
              mb={1}
              bg="white"
              roundedBottom="2xl"
              px={4}
              pb={5}
              shadow="2xl"
            >
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
            </Box>
          </Flex>
        </>
      ) : (
        <>
          <Center height="100%">Start a new chat</Center>
        </>
      )}
    </Box>
  );
};

export default ChatRight;
