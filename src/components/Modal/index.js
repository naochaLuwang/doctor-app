import {
  HStack,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Text,
} from "@chakra-ui/react";
import React from "react";

const ArticleModal = ({ isOpen, isClose, title, data }) => {
  console.log("Data is", data);
  return (
    <>
      <Modal isOpen={isOpen} onClose={isClose}>
        <ModalOverlay>
          <ModalContent>
            <ModalHeader>{title}</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              {data.map((user) => (
                <Text key={user._id}>
                  {user.firstName} {user.lastName}
                </Text>
              ))}
            </ModalBody>
          </ModalContent>
        </ModalOverlay>
      </Modal>
    </>
  );
};

export default ArticleModal;
