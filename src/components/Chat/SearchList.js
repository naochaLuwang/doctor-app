import {
  Avatar,
  Box,
  Flex,
  HStack,
  Icon,
  Text,
  VStack,
} from "@chakra-ui/react";
import React from "react";
import ReactTimeAgo from "react-time-ago";

const SearchList = ({ filteredUsers }) => {
  return (
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
        <Box>
          {filteredUsers?.length > 0 ? (
            <>
              {filteredUsers.map((chat) => (
                <Box
                  key={chat._id}
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
                    onClick={() => handleChats(chat.fromId, chat.messages)}
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
                <Text>Not found</Text>
              </Flex>
            </>
          )}
        </Box>
      </>
    </Box>
  );
};

export default SearchList;
