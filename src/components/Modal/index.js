import {
  Avatar,
  Flex,
  HStack,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Text,
  VStack,
} from "@chakra-ui/react";
import React from "react";
import ReactTimeAgo from "react-time-ago";

const ArticleModal = ({ isOpen, isClose, title, data }) => {
  console.log("Data is", data);
  return (
    <>
      <Modal isOpen={isOpen} onClose={isClose}>
        <ModalOverlay>
          <ModalContent>
            <ModalHeader>{title}</ModalHeader>
            <ModalCloseButton />
            <ModalBody bg="gray.50">
              {data.reverse().map((user) => (
                <Flex
                  width="100%"
                  alignItems={"center"}
                  py={2}
                  justifyContent="space-between"
                  key={user._id}
                  _hover={{ bg: "gray.100", cursor: "pointer", rounded: "md" }}
                >
                  <HStack>
                    <Avatar
                      name={`${user.firstName} ${user.lastName}`}
                      size="sm"
                    />
                    <Text fontWeight={"semibold"}>
                      {user.firstName} {user.lastName}
                    </Text>
                  </HStack>

                  <Text fontSize="xs">
                    <ReactTimeAgo date={user.createdAt} />
                  </Text>
                </Flex>
              ))}
            </ModalBody>
          </ModalContent>
        </ModalOverlay>
      </Modal>
    </>
  );
};

export default ArticleModal;
