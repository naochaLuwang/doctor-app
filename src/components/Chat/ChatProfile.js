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
import { CloseIcon, EmailIcon, PhoneIcon } from "@chakra-ui/icons";

const ChatProfile = ({ setprofileOpen, profile }) => {
  return (
    <Box width="30%" height="90vh" rounded="xl" bg="white" ml={2}>
      <Flex height="100%" direction="column">
        <Flex
          align="center"
          bg="gray.50"
          py={2}
          px={4}
          shadow="sm"
          roundedTop="xl"
        >
          <CloseIcon onClick={() => setprofileOpen(false)} cursor="pointer" />
          <Text
            fontSize="12pt"
            fontWeight="semibold"
            letterSpacing="3"
            color="gray.600"
            ml={4}
          >
            Contact Information
          </Text>
        </Flex>

        <VStack mt={5}>
          <Avatar
            size="2xl"
            name={`${profile?.FirstName} ${profile?.LastName}`}
          />
          <Text fontSize="xl">{`${profile?.FirstName} ${profile?.LastName}`}</Text>
        </VStack>

        <VStack align="left" px={6} mt={5}>
          <HStack>
            <PhoneIcon />
            <Text>{profile?.PrimaryMobileNo}</Text>
          </HStack>
          <HStack>
            <EmailIcon />
            <Text>{profile?.Email}</Text>
          </HStack>
        </VStack>
      </Flex>
    </Box>
  );
};

export default ChatProfile;
