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
  Text,
  VStack,
} from "@chakra-ui/react";
import axios from "axios";
import React from "react";

import { BsFillChatLeftDotsFill, BsThreeDotsVertical } from "react-icons/bs";
import { MdKeyboardBackspace } from "react-icons/md";
import ReactTimeAgo from "react-time-ago";
import TimeAgo from "javascript-time-ago";

import en from "javascript-time-ago/locale/en.json";

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
}) => {
  const handleChat = (id, fname, lname) => {
    setRegId(id);
    setFirstName(fname);
    setLastName(lname);
    setChat(null);
    console.log(id);
  };

  const handleChats = async (id) => {
    setRegId(id);
    const response = await axios.get(`/api/getchat/${id}`);
    setChat(response.data);
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
            p={2}
            justify="space-between"
          >
            <Avatar size="sm" src={user?.profileImage} />

            <Box>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setNewChat(true)}
              >
                <Icon as={BsFillChatLeftDotsFill} />
              </Button>
              <Button variant="ghost" size="sm">
                <Icon as={BsThreeDotsVertical} />
              </Button>
            </Box>
          </Flex>
        </CardBody>
      </Card>
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
          {newChat && (
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
                      handleChat(user.RegID, user.FirstName, user.LastName)
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
          )}

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
                        onClick={() => handleChats(chat.fromId)}
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
      </Box>
    </Flex>
  );
};

export default ChatLeft;
