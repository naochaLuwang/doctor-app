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
  Modal,
  ModalBody,
  ModalContent,
  ModalOverlay,
  Text,
  VStack,
} from "@chakra-ui/react";
import axios from "axios";
import Image from "next/image";
import { useRef, useState } from "react";
import { BsFillChatLeftDotsFill, BsThreeDotsVertical } from "react-icons/bs";
import { FaFilePdf } from "react-icons/fa";
import { GrAttachment } from "react-icons/gr";
import { IoDocumentText } from "react-icons/io5";
import { RiSendPlaneFill } from "react-icons/ri";
import ReactTimeAgo from "react-time-ago";
import logo from "../../../public/logojnb.png";

// import io from "socket.io-client";

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
  const [uploading, setUploading] = useState(false);
  const [selectedFile, setSelectedFile] = useState("");
  const [fileData, setFileData] = useState();
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedFileName, setSelectedFileName] = useState("");

  const hiddenFileInput = useRef(null);

  const handleClick = (event) => {
    hiddenFileInput.current.click();
  };
  const handleChange = ({ target }) => {
    if (target.files && target.files[0]) {
      const file = target.files[0];
      setSelectedFile(URL.createObjectURL(file));
      setFileData(file);
      setModalOpen(true);
    }
  };

  const handleProfile = async () => {
    const response = await axios.get(`/api/getuserprofile/${regId}`);
    console.log("Response is", response.data);
    setProfile(response.data);
    setprofileOpen(true);
  };

  const handleMessage = (e) => {
    setMessage(e.target.value);
  };

  const handleModalClose = () => {
    setModalOpen(false);
  };

  const handleUploadCancel = () => {
    setSelectedFile("");
    setFileData("");
    setModalOpen(false);
  };
  function getFileExtension(filename) {
    // get file extension

    console.log(filename);

    const extension = filename.split(".").pop();
    return extension;
  }

  const handleUpload = async () => {
    setUploading(true);
    try {
      const body = new FormData();
      body.append("file", fileData);

      const response = await fetch("/api/uploadfiles", {
        method: "POST",
        body,
      });

      const data = await response.json();

      console.log(data.files.file.mimetype);

      const chatsResponse = await axios.get(`/api/getchat/${regId}`);

      if (!chatsResponse.data) {
        const response = await axios.post(`/api/getchat/${regId}`, {
          fromId: regId,
          toId: 0,
          firstName,
          lastName,
          lastChatDate: new Date(),
          lastChatMessage: "doc@!",
          lastChatBy: "admin",
          lastChatDateTxt: new Date().toLocaleDateString("en-US", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
          }),
          lastChatTimeTxt: new Date().toLocaleTimeString("en-US", {
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
          }),
          messages: [
            {
              typeId: 2,
              regId,
              firstName,
              lastName,
              msg: "",
              statusId: 1,
              createdDate: new Date(),
              createdBy: "admin",
              isRead: "N",
              readDate: "",
              attachFileFlag: "Y",
              attachFile: data.fileName,
              attachFileUrl: selectedFile,
            },
          ],
          createdDate: new Date(),
        });

        setMessage("");
        setChat(response.data.messages);
        getChats();
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
            msg: "",
            statusId: 1,
            createdDate: new Date(),
            createdBy: "admin",
            isRead: "N",
            readDate: "",
            attachFileFlag: "Y",
            attachFile: data.fileName,
            attachFileUrl: selectedFile,
          },

          lastChatDate: new Date(),
          lastChatMessage: "doc!@",
          lastChatBy: "admin",
          lastChatDateTxt: new Date().toLocaleDateString("en-US", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
          }),
          lastChatTimeTxt: new Date().toLocaleTimeString("en-US", {
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
          }),
        });

        setMessage("");
        console.log("Response is", response.data);
        setChat(response.data.messages);

        getChats();
      }
    } catch (error) {
      console.log(error.response?.data);
    }
    setUploading(false);
    setModalOpen(false);
  };

  const getChats = async (req, res) => {
    const chatResponse = await axios.get("/api/getchat");
    setChats(chatResponse.data);
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
        lastChatDateTxt: new Date().toLocaleDateString("en-US", {
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
        }),
        lastChatTimeTxt: new Date().toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        }),
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
            isRead: "N",
            readDate: "",
            attachFileFlag: "N",
            attachFile: "",
          },
        ],
        createdDate: new Date(),
      });

      setMessage("");
      getChats();
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
          isRead: "N",
          readDate: "",
          attachFileFlag: "N",
          attachFile: "",
        },

        lastChatDate: new Date(),
        lastChatMessage: messages,
        lastChatBy: "admin",
        lastChatDateTxt: new Date().toLocaleDateString("en-US", {
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
        }),
        lastChatTimeTxt: new Date().toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        }),
      });

      setMessage("");
      console.log("Response is", response.data);
      setChat(response.data.messages);
      getChats();
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
                  {chat?.map((item) =>
                    item.attachFileFlag === "Y" ? (
                      <>
                        {getFileExtension(item.attachFile) === "png" ||
                        getFileExtension(item.attachFile) === "jpeg" ||
                        getFileExtension(item.attachFile) === "jpg" ? (
                          <>
                            <Box
                              key={item._id}
                              // width="100%"

                              align={item.typeId === 2 ? "right" : "left"}
                              mb={3}
                            >
                              <Box
                                position="relative"
                                w="sm"
                                h="sm"
                                bg="gray.50"
                                border="1px solid gray"
                                rounded="2xl"
                              >
                                <Image
                                  src={logo}
                                  alt="image"
                                  layout="fill"
                                  objectFit="fit-content"
                                />
                              </Box>

                              <ReactTimeAgo
                                date={item.createdDate}
                                locale="en-US"
                                timeStyle="twitter-minute-now"
                              />
                            </Box>
                          </>
                        ) : (
                          <>
                            {getFileExtension(item.attachFile) === "docx" ? (
                              <Box
                                key={item._id}
                                // width="100%"

                                align={item.typeId === 2 ? "right" : "left"}
                                mb={3}
                              >
                                <Box
                                  position="relative"
                                  border="1px solid gray"
                                  w="sm"
                                  h="auto"
                                  pt={3}
                                  bg="gray.50"
                                  rounded="2xl"
                                >
                                  <VStack>
                                    <Icon
                                      as={IoDocumentText}
                                      w={20}
                                      h={20}
                                      color="blue.500"
                                    />
                                    <Box
                                      width="full"
                                      bg="white"
                                      roundedBottom="2xl"
                                      py={3}
                                    >
                                      <Text
                                        align="center"
                                        fontWeight="semibold"
                                        fontSize="sm"
                                        color="gray.600"
                                      >
                                        {item.attachFile}
                                      </Text>
                                    </Box>
                                  </VStack>
                                </Box>

                                <ReactTimeAgo
                                  date={item.createdDate}
                                  locale="en-US"
                                  timeStyle="twitter-minute-now"
                                />
                              </Box>
                            ) : (
                              <Box
                                key={item._id}
                                // width="100%"

                                align={item.typeId === 2 ? "right" : "left"}
                                mb={3}
                              >
                                <Box
                                  position="relative"
                                  border="1px solid gray"
                                  w="sm"
                                  h="auto"
                                  pt={3}
                                  bg="gray.50"
                                  rounded="2xl"
                                >
                                  <VStack>
                                    <Icon
                                      as={FaFilePdf}
                                      w={20}
                                      h={20}
                                      color="red.500"
                                    />
                                    <Box
                                      width="full"
                                      bg="white"
                                      roundedBottom="2xl"
                                      py={3}
                                    >
                                      <Text
                                        align="center"
                                        fontWeight="semibold"
                                        fontSize="sm"
                                        color="gray.600"
                                      >
                                        {item.attachFile}
                                      </Text>
                                    </Box>
                                  </VStack>
                                </Box>

                                <ReactTimeAgo
                                  date={item.createdDate}
                                  locale="en-US"
                                  timeStyle="twitter-minute-now"
                                />
                              </Box>
                            )}
                          </>
                        )}
                      </>
                    ) : (
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
                    )
                  )}
                </Flex>
              )}
            </Flex>
            )
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
                    aria-label="Search database"
                    colorScheme="gray"
                    rounded="full"
                    onClick={handleClick}
                    mr={3}
                    icon={<GrAttachment h={8} w={8} />}
                  />

                  <input
                    type="file"
                    onChange={handleChange}
                    ref={hiddenFileInput}
                    style={{ display: "none" }}
                  />

                  <IconButton
                    type="submit"
                    aria-label="Send message"
                    colorScheme="whatsapp"
                    rounded="full"
                    icon={<RiSendPlaneFill h={8} w={8} />}
                  />
                </Flex>
              </form>
            </Box>
            <Modal isOpen={modalOpen} onClose={handleModalClose}>
              <ModalOverlay>
                <ModalContent>
                  <ModalBody>
                    <VStack>
                      <Box position="relative" w="sm" h="sm" p={10}>
                        <Image
                          src={selectedFile}
                          alt="image"
                          layout="fill"
                          objectFit="fit-content"
                        />
                      </Box>
                      {uploading ? (
                        <Text>Sending file</Text>
                      ) : (
                        <HStack>
                          <Button
                            variant="solid"
                            bg="red.600"
                            color="white"
                            onClick={handleUploadCancel}
                          >
                            Cancel
                          </Button>
                          <Button
                            variant="solid"
                            colorScheme="facebook"
                            onClick={handleUpload}
                          >
                            Send
                          </Button>
                        </HStack>
                      )}
                    </VStack>
                  </ModalBody>
                </ModalContent>
              </ModalOverlay>
            </Modal>
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
