import {
  Avatar,
  Box,
  Button,
  Card,
  CardBody,
  Center,
  Flex,
  HStack,
  Icon,
  Input,
  InputGroup,
  InputRightElement,
  Text,
  VStack,
} from "@chakra-ui/react";
import axios from "axios";
import React, { useEffect, useState } from "react";

import { BsFillChatLeftDotsFill, BsThreeDotsVertical } from "react-icons/bs";
import { MdKeyboardBackspace } from "react-icons/md";
import ReactTimeAgo from "react-time-ago";
import TimeAgo from "javascript-time-ago";

import en from "javascript-time-ago/locale/en.json";
import io from "socket.io-client";
import { Search2Icon } from "@chakra-ui/icons";
import SearchList from "./SearchList";

TimeAgo.addDefaultLocale(en);

const ChatLeft = ({
  user,
  users,
  setRegId,
  setFirstName,
  setLastName,
  chats,
  setChat,
  newChat,
  setNewChat,
  setChats,
  setIsChatOpen,
}) => {
  const socket = io.connect("http://localhost:4000");

  const [searchField, setSearchField] = useState("");

  const handleChange = (e) => {
    setSearchField(e.target.value);
  };

  const filteredUsers = chats.filter((user) => {
    return user.firstName.toLowerCase().includes(searchField.toLowerCase());
  });

  const searchList = () => {
    return <SearchList filteredUsers={filteredUsers} />;
  };

  useEffect(() => {
    socket.on("receive_message", (data) => {
      getChats();
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [socket]);

  const getChats = async (req, res) => {
    const chatResponse = await axios.get("/api/getchat");
    setChats(chatResponse.data);
  };

  const handleChat = (id, fname, lname, uid) => {
    setRegId(id);
    setFirstName(fname);
    setLastName(lname);
    setIsChatOpen(true);
    setChat([]);

    // setUserId(uid);
  };

  const handleChats = async (id) => {
    setIsChatOpen(true);
    setRegId(id);
    const response = await axios.get(`/api/getchat/${id}`);
    setFirstName(response.data.firstName);
    setLastName(response.data.lastName);
    setChat(response.data.messages);
    console.log(response.data);
  };

  return (
    <Flex
      width="sm"
      h="100%"
      direction="column"
      rounded="xl"
      shadow="base"
      mr={2}
      bg="white"
      outline="none"
      border="none"
    >
      <Card size="xs" roundedTop="xl">
        <CardBody>
          <Flex
            width="100%"
            align="center"
            bg="gray.50"
            roundedTop="3xl"
            py={2}
            px={4}
            justify="space-between"
          >
            <Text fontSize="md" fontWeight="bold" color="blue.800">
              Messages
            </Text>

            <Box>
              <Button variant="ghost" size="sm">
                <Icon as={BsThreeDotsVertical} />
              </Button>
            </Box>
          </Flex>
        </CardBody>
      </Card>
      {!newChat && (
        <Box px={2} py={2}>
          <InputGroup>
            <Input
              placeholder="Search"
              rounded="full"
              fontSize="10pt"
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
              type="search"
              onChange={handleChange}
            />
            <InputRightElement>
              <Search2Icon color="gray.500" />
            </InputRightElement>
          </InputGroup>
        </Box>
      )}

      <Box
        bg="white"
        height="100%"
        overflowY="scroll"
        roundedBottom="3xl"
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
        <>
          {/* {newChat && (
            <>
              <HStack spacing={2} px={2} pt={2} pb={2}>
                <Icon
                  as={MdKeyboardBackspace}
                  h={6}
                  w={6}
                  cursor="pointer"
                  onClick={() => setNewChat(false)}
                />
                <Text fontSize="md">New Chat</Text>
              </HStack>
              <Box>
                {users.map((user) => (
                  <Box
                    key={user._id}
                    px={3}
                    bg="white"
                    py={2}
                    shadow="base"
                    onClick={() =>
                      handleChat(
                        user.RegID,
                        user.FirstName,
                        user.LastName,
                        user._id
                      )
                    }
                  >
                    <HStack align="center">
                      <Avatar
                        size="sm"
                        name={`${user.FirstName} ${user.LastName}`}
                      />

                      <Text fontSize="md">
                        {user.FirstName} {user.LastName}
                      </Text>
                    </HStack>
                  </Box>
                ))}
              </Box>
            </>
          )} */}

          {searchField === "" ? (
            <>
              {!newChat && (
                <Box>
                  {chats?.length > 0 ? (
                    <>
                      {chats.map((chat) => (
                        <Box
                          key={user._id}
                          _hover={{ bg: "gray.50", cursor: "pointer" }}
                          pr={3}
                        >
                          <Flex
                            px={3}
                            // bg="white"

                            py={2}
                            // shadow="base"

                            overflowX="hidden"
                            rounded="lg"
                            onClick={() =>
                              handleChats(chat.fromId, chat.messages)
                            }
                          >
                            <HStack align="center" width="xs" overflow="hidden">
                              <Avatar
                                size="sm"
                                name={`${chat.firstName} ${chat.lastName}`}
                              />
                              <VStack spacing="0" align="start">
                                <Text fontSize="md">
                                  {chat.firstName} {chat.lastName}
                                </Text>
                                <Text noOfLines={1} fontSize="xs">
                                  {chat.lastChatMessage}
                                </Text>
                              </VStack>
                            </HStack>
                            <ReactTimeAgo
                              date={chat.lastChatDate}
                              locale="en-US"
                              timeStyle="twitter-now"
                            />
                          </Flex>
                        </Box>
                      ))}
                    </>
                  ) : (
                    <>
                      <Flex
                        height="80vh"
                        direction="column"
                        justify="center"
                        align="center"
                      >
                        <Text>Start a new Chat</Text>
                      </Flex>
                    </>
                  )}
                </Box>
              )}
            </>
          ) : (
            searchList()
          )}
        </>
      </Box>
    </Flex>
  );
};

export default ChatLeft;
