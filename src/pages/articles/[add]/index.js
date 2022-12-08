import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Button,
  Card,
  Flex,
  FormControl,
  FormErrorMessage,
  HStack,
  Icon,
  IconButton,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalOverlay,
  Select,
  Spinner,
  Tag,
  TagCloseButton,
  TagLabel,
  Text,
  Tooltip,
  useDisclosure,
  VStack,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import Image from "next/image";

import { AddIcon } from "@chakra-ui/icons";
import axios from "axios";
import { getSession, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { BubbleMenu, useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Document from "@tiptap/extension-document";
import Paragraph from "@tiptap/extension-paragraph";
import Texts from "@tiptap/extension-text";
import BulletList from "@tiptap/extension-bullet-list";
import OrderedList from "@tiptap/extension-ordered-list";
import ListItem from "@tiptap/extension-list-item";
import Bold from "@tiptap/extension-bold";
import Underline from "@tiptap/extension-underline";
import { Image as Images } from "@tiptap/extension-image";
import Typography from "@tiptap/extension-typography";

import TextAlign from "@tiptap/extension-text-align";

import Placeholder from "@tiptap/extension-placeholder";
import HorizontalRule from "@tiptap/extension-horizontal-rule";
import { FileUploader } from "react-drag-drop-files";
import { useGlobalState } from "../../../components/Layout";
import Heading from "../../../components/EditorButtons/Heading";
import TypographyButtons from "../../../components/EditorButtons/Typography";
import AlignmentButtons from "../../../components/EditorButtons/Alignment";
import ListButtons from "../../../components/EditorButtons/List";
import Blockquote from "@tiptap/extension-blockquote";
import { useRef } from "react";
import { BsBlockquoteLeft, BsImageFill } from "react-icons/bs";
import Dropcursor from "@tiptap/extension-dropcursor";
import Focus from "@tiptap/extension-focus";
import Youtube from "@tiptap/extension-youtube";
import YoutubeButton from "../../../components/EditorButtons/Youtube";
import Preview from "../../../components/Preview";
import uploadlogo from "../../../../public/upload.svg";

const Add = () => {
  const [value, setValue] = useState("");
  const [categoryName, setCategoryName] = useState("");
  const [category, setCategory] = useState("");
  const [categories, setCategories] = useState([]);
  const [subCategoryName, setSubCategoryName] = useState("");
  const [subCategory, setSubCategory] = useState("");
  const [subCategories, setSubCategories] = useState([]);
  const [topic, setTopic] = useState("");
  const [articleSubtitle, setArticleSubtitle] = useState("");
  const [isOpens, setIsOpen] = useState(false);
  const [tag, setTag] = useState("");
  const [tags, setTags] = useState([]);
  const [addCategory, setAddCategory] = useState(false);
  const [addSubCategory, setAddSubCategory] = useState(false);
  const [active, setActive] = useGlobalState("active");
  const [imageFile, setImageFile] = useState(null);
  const [imageFileName, setImageFileName] = useState("");
  const [imageFilePath, setImageFilePath] = useState("");
  const [imageFlag, setImageFlag] = useState("N");
  const [editorImageFileName, setEditorImageFileName] = useState("");
  const [editorImageFilePath, setEditorImageFilePath] = useState("");
  const [openImageModal, setImageOpenModal] = useState(false);
  const [url, setUrl] = useState("");

  const [topicError, setTopicEror] = useState(false);

  const { data: session, status } = useSession();

  const [userName, setUserName] = useGlobalState("userName");
  const [tenantId, setTenantId] = useGlobalState("tenantId");

  const { isOpen, onOpen, onClose } = useDisclosure();

  const onImageModalOpen = () => {
    setImageOpenModal(true);
  };

  const onImageModalClose = () => {
    setImageOpenModal(false);
  };

  const fileTypes = ["JPG", "PNG", "GIF", "JPEG"];

  const setImage = () => {
    if (url) {
      editor.chain().focus().setImage({ src: url }).run();
    }

    const image = `${editorImageFilePath}${editorImageFileName}`;

    editor.chain().focus().setImage({ src: image }).run();

    onImageModalClose();
  };

  const editor = useEditor({
    extensions: [
      Document,
      Paragraph.configure({
        inline: true,
      }),
      Texts,
      BulletList,
      ListItem,
      Bold,
      Underline,
      OrderedList,
      Images,
      HorizontalRule,
      Dropcursor,
      Blockquote,
      Typography,
      Youtube,

      Focus.configure({
        className: "has-focus",
        mode: "all",
      }),
      Placeholder.configure({
        placeholder: ({ node }) => {
          if (node.type.name === "heading") {
            return "Add a heading";
          } else {
            return "Write something";
          }
        },
      }),
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
      StarterKit.configure({
        heading: {
          levels: [1, 2, 3],
        },
      }),
    ],
    autofocus: true,
    content: "",
    editable: true,
  });

  const handlePreview = () => {
    onOpen();
    // editor.setEditable(false);
  };

  const html = editor?.getHTML();

  console.log(html);

  const json = editor?.getJSON();
  console.log(json);

  const onCloses = () => {
    setIsOpen(false);
  };

  const error = true;

  const router = useRouter();

  const articleId = router.query.add;

  console.log(articleId);

  useEffect(() => {
    setActive("Add a new Article");

    getUserInfo();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getUserInfo = async () => {
    const response = await axios.get(`/api/admin/${session?.user.name}`);
    const user = await response.data;
    setUserName(user.userName);
    setTenantId(user.tenantId);
  };

  const getCategories = async () => {
    const response = await axios.get(`/api/category`);
    const categories = await response.data;
    setCategories(categories);
  };

  const handleCategory = async (e) => {
    setCategoryName("");
    setCategory(e.target.value);

    const subCategoryResponse = await axios.get(
      `/api/subcategory/${e.target.value}`
    );

    console.log(subCategoryResponse);

    if (subCategoryResponse) {
      setSubCategories(subCategoryResponse.data);
    } else {
      setSubCategories([]);
    }
  };

  const handleCategoryName = (e) => {
    setCategory("");
    setCategoryName(e.target.value);
  };

  const handleSubCategory = (e) => {
    setSubCategoryName("");
    setSubCategory(e.target.value);
  };

  const handleSubCategoryName = (e) => {
    setSubCategory("");
    setSubCategoryName(e.target.value);
  };

  const handleImageFile = async (file) => {
    if (file) {
      const fd = new FormData();
      fd.append("myImage", file);
      let res = await fetch("/api/uploadimage", {
        method: "POST",

        body: fd,
      });

      let response = await res.json();
      console.log(response);

      if (response) {
        setEditorImageFileName(response.fileName.filename);
        setEditorImageFilePath(response.filePath);
      }
    }
  };

  const handleFile = async (file) => {
    if (file) {
      const fd = new FormData();
      fd.append("myImage", file);
      let res = await fetch("/api/upload", {
        method: "POST",

        body: fd,
      });

      let response = await res.json();
      console.log(response);

      if (response) {
        setImageFileName(response.fileName.filename);
        setImageFilePath(response.filePath);
        setImageFlag("Y");
      }
    }
  };

  useEffect(() => {
    getCategories();
  }, []);

  const likesArray = [
    {
      regId: 0,
      firstName: "",
      lastName: "",
      genderCode: "",
      imageUrl: "",
      longitude: "",
      latitude: "",
      address: "",
      statusId: 0,
      statusName: "",
      custom1: "",
      custom2: "",
      createdAt: new Date(),
      updatedAt: new Date(),
      tenantId: tenantId,
      isActive: "",
    },
  ];

  const viewedArray = [
    {
      regId: 0,
      firstName: "",
      lastName: "",
      genderCode: "",
      imageUrl: "",
      longitude: "",
      latitude: "",
      address: "",
      statusId: 0,
      statusName: "",
      custom1: "",
      custom2: "",
      createdAt: new Date(),
      updatedAt: new Date(),
      tenantId: tenantId,
      isActive: "",
    },
  ];

  const commentArray = [
    {
      regId: 0,
      firstName: "",
      lastName: "",
      genderCode: "",
      imageUrl: "",
      longitude: "",
      latitude: "",
      address: "",
      statusId: 0,
      statusName: "",
      comment: "",
      custom1: "",
      custom2: "",
      createdAt: new Date(),
      updatedAt: new Date(),
      tenantId: tenantId,
      isActive: "",
    },
  ];

  const reportArray = [
    {
      regId: 0,
      firstName: "",
      lastName: "",
      genderCode: "",
      imageUrl: "",
      longitude: "",
      latitude: "",
      address: "",
      statusId: 0,
      statusName: "",
      report: "",
      comment: "",
      custom1: "",
      custom2: "",
      createdAt: new Date(),
      updatedAt: new Date(),
      tenantId: tenantId,
      isActive: "",
    },
  ];

  const onHandleSubmit = async (e) => {
    e.preventDefault();
    setIsOpen(true);

    if (topic === "") {
      setTopicEror(true);
      setIsOpen(false);
      return;
    }

    try {
      const response = await axios.post("/api/category", {
        tenantId,
        isActive: "Y",
        catCode: "",
        categoryName: categoryName || category,

        createdBy: userName,
        updatedBy: userName,
      });

      console.log(response.data);

      const subCategoryResponse = await axios.post("/api/subcategory", {
        articleCatId: response.data.articleCatId,
        tenantId,
        isActive: "Y",
        subCatCode: "",
        subCategoryName: subCategoryName || subCategory,
        createdBy: userName,
        articleCatName: response.data.categoryName,
        updatedBy: userName,
      });

      if (response && subCategoryResponse) {
        const newArticleResponse = await axios.post("/api/article", {
          tenantId,
          articleId,
          articleCatId: response.data.articleCatId,
          articleCatName: response.data.categoryName,
          articleSubCatId: subCategoryResponse.data._id,
          articleSubCatName: subCategoryResponse.data.subCategoryName,
          articleTitle: topic,
          articleSubtitle,
          articleContent: html,
          articleContentJson: json.content,
          statusId: 1,
          imageFileName,
          imageFilePath,
          imageFlag,
          isPublished: "N",
          publishedDate: "",
          publishedBy: "",
          likedCount: 0,
          createdBy: userName,
          updatedBy: userName,
          likesArray,
          viewedArray,
          commentArray,
          reportArray,
          tags,
        });

        if (newArticleResponse) {
          router.push("/articles");
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const onHandlePublish = async (e) => {
    e.preventDefault();
    setIsOpen(true);

    if (topic === "") {
      setTopicEror(true);
      setIsOpen(false);
      return;
    }

    try {
      const response = await axios.post("/api/category", {
        tenantId,
        isActive: "Y",
        catCode: "",
        categoryName: categoryName || category,

        createdBy: userName,
        updatedBy: userName,
      });

      console.log(response.data);

      const subCategoryResponse = await axios.post("/api/subcategory", {
        articleCatId: response.data.articleCatId,
        articleCatName: response.data.categoryName,
        tenantId,
        isActive: "Y",
        subCatCode: "",

        subCategoryName: subCategoryName || subCategory,
        createdBy: userName,
        updatedBy: userName,
      });

      if (response && subCategoryResponse) {
        await axios.post("/api/article", {
          tenantId,
          articleId,
          articleCatId: response.data.articleCatId,
          articleCatName: response.data.categoryName,
          articleSubCatId: subCategoryResponse.data._id,
          articleSubCatName: subCategoryResponse.data.subCategoryName,
          articleTitle: topic,
          imageFlag,
          imageFileName,
          imageFilePath,
          articleSubtitle,
          articleContent: html,
          articleContentJson: json.content,
          statusId: 1,
          isPublished: "Y",
          publishedDate: new Date(),
          publishedBy: userName,
          likedCount: 0,
          createdBy: userName,
          updatedBy: userName,
          likesArray,
          viewedArray,
          commentArray,
          reportArray,
          tags,
        });

        router.push("/articles");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleTagSubmit = (e) => {
    e.preventDefault();
    setTags([...tags, tag]);
    setTag("");
  };

  const removeTag = (i) => {
    let tg = [...tags];
    if (tags.length >= 1) {
      tg.splice(i, 1);
      setTags(tg);
    }
  };

  if (!editor) {
    return null;
  }

  return (
    <>
      {status === "authenticated" && (
        <Box display="block" overflow="hidden">
          <Flex
            height="90vh"
            bg="WhiteAlpha.300"
            px={8}
            py={6}
            justify="space-between"
            overflow="hidden"
          >
            <Box display="flex" flex="1">
              <form style={{ width: "100%" }}>
                <FormControl mb={3} isInvalid={topicError}>
                  {/* <FormLabel fontSize="14pt">Topic</FormLabel> */}
                  <Input
                    placeholder="Enter Article Title"
                    required
                    errorBorderColor="red.300"
                    fontSize="14pt"
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
                    bg="gray.100"
                    value={topic}
                    onChange={(e) => {
                      setTopicEror(false);
                      setTopic(e.target.value);
                    }}
                  />
                  {topicError && (
                    <FormErrorMessage>Topic is required</FormErrorMessage>
                  )}
                </FormControl>

                <Input
                  placeholder="Enter Article Subtitle"
                  required
                  mb={3}
                  errorBorderColor="red.300"
                  fontSize="12pt"
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
                  bg="gray.100"
                  value={articleSubtitle}
                  onChange={(e) => {
                    setArticleSubtitle(e.target.value);
                  }}
                />
                {tags && (
                  <Box mb={3}>
                    <HStack spacing={3}>
                      {tags.map((tag, i) => (
                        <Tag
                          key={i}
                          size="md"
                          borderRadius="full"
                          variant="outline"
                          colorScheme="blue"
                        >
                          <TagLabel>{tag}</TagLabel>
                          <TagCloseButton onClick={() => removeTag(i)} />
                        </Tag>
                      ))}
                    </HStack>
                  </Box>
                )}

                <Box mb={3}>
                  <HStack>
                    <Heading editor={editor} />
                    <TypographyButtons editor={editor} />
                    <AlignmentButtons editor={editor} />
                    <ListButtons editor={editor} />

                    <Tooltip label="Block quote">
                      <Button
                        size="sm"
                        colorScheme="blue"
                        onClick={() =>
                          editor.chain().focus().toggleBlockquote().run()
                        }
                        variant={
                          editor.isActive("blockquote") ? "solid" : "outline"
                        }
                      >
                        <Icon as={BsBlockquoteLeft} w={6} h={6} />
                      </Button>
                    </Tooltip>

                    {/* <input
                      style={{ display: "none" }}
                      ref={inputRef}
                      type="file"
                      onChange={(e) => uploader(e)}
                    /> */}

                    <Button
                      size="sm"
                      colorScheme="blue"
                      variant="outline"
                      onClick={onImageModalOpen}
                    >
                      <Icon as={BsImageFill} w={6} h={6} />
                    </Button>

                    <Modal
                      isOpen={openImageModal}
                      onClose={onImageModalClose}
                      size="xl"
                    >
                      <ModalOverlay />
                      <ModalContent>
                        <ModalBody pt={8}>
                          <VStack w="lg" mx="auto">
                            <Input
                              type="text"
                              value={url}
                              onChange={(e) => setUrl(e.target.value)}
                              placeholder="Enter Image URL"
                            />
                            <Text
                              fontWeight="semibold"
                              fontSize="14pt"
                              color="gray.500"
                            >
                              OR
                            </Text>

                            <Box>
                              <Flex direction="column">
                                <FileUploader
                                  name="file"
                                  types={fileTypes}
                                  handleChange={handleImageFile}
                                >
                                  <Box
                                    w={"lg"}
                                    h="auto"
                                    border="4px dashed"
                                    borderRadius="xl"
                                    shadow="md"
                                    borderColor="gray.300"
                                  >
                                    <VStack mb={20}>
                                      <Box position="relative" w={"48"} h="48">
                                        <Image
                                          src={uploadlogo}
                                          alt="upload"
                                          layout="fill"
                                        />
                                      </Box>
                                      <Text position="absolute" bottom={20}>
                                        Choose / Drop an image here
                                      </Text>
                                    </VStack>
                                  </Box>
                                </FileUploader>

                                <Text mt={2} fontSize="8pt" width="100%">
                                  {editorImageFileName}
                                </Text>
                              </Flex>
                            </Box>
                          </VStack>
                        </ModalBody>
                        <ModalFooter>
                          <Button colorScheme="blue" onClick={setImage}>
                            Set Image
                          </Button>
                        </ModalFooter>
                      </ModalContent>
                    </Modal>

                    <YoutubeButton editor={editor} />
                  </HStack>
                </Box>
                <Box
                  h="400px"
                  w="100%"
                  border="1px solid"
                  borderColor="gray.200"
                  rounded="md"
                  shadow="md"
                  bg="white"
                  position="relative"
                  overflowY="scroll"
                  overflowX="hidden"
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
                  {editor && (
                    <BubbleMenu
                      editor={editor}
                      tippyOptions={{ duration: 100 }}
                    >
                      <Button
                        size="sm"
                        onClick={() =>
                          editor.chain().focus().toggleBold().run()
                        }
                        className={editor.isActive("bold") ? "is-active" : ""}
                      >
                        B
                      </Button>
                      <Button
                        size="sm"
                        onClick={() =>
                          editor.chain().focus().toggleItalic().run()
                        }
                        className={editor.isActive("italic") ? "is-active" : ""}
                      >
                        I
                      </Button>
                      <Button
                        size="sm"
                        onClick={() =>
                          editor.chain().focus().toggleUnderline().run()
                        }
                        className={editor.isActive("strike") ? "is-active" : ""}
                      >
                        U
                      </Button>
                    </BubbleMenu>
                  )}
                  <EditorContent editor={editor} />
                  <Modal
                    isOpen={isOpens}
                    isCentered
                    onClose={onCloses}
                    motionPreset="scale"
                  >
                    <ModalOverlay />
                    <ModalContent>
                      <ModalBody>
                        <Flex
                          flex="1"
                          flexGrow="1"
                          direction="column"
                          align="center"
                          py={10}
                        >
                          <Spinner
                            thickness="4px"
                            speed="0.65s"
                            emptyColor="gray.200"
                            color="blue.500"
                            size="xl"
                          />
                          <Text mt={2}>Saving article ...</Text>
                        </Flex>
                      </ModalBody>
                    </ModalContent>
                  </Modal>
                </Box>
              </form>
            </Box>

            {/* right side  */}
            <Box pl={8} width="400px">
              {/* Publish */}

              <Card>
                <Accordion>
                  <AccordionItem>
                    <>
                      <h2>
                        <AccordionButton _expanded={{ bg: "gray.100" }}>
                          <Box flex="1" textAlign="left">
                            Tags
                          </Box>
                          <AccordionIcon />
                        </AccordionButton>
                      </h2>

                      <AccordionPanel mt={2}>
                        <Box>
                          <form onSubmit={handleTagSubmit}>
                            <Flex>
                              <Input
                                size="sm"
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
                                bg="gray.100"
                                placeholder="Enter a tag"
                                mr={3}
                                value={tag}
                                onChange={(e) => setTag(e.target.value)}
                              />
                              <IconButton
                                type="submit"
                                size="sm"
                                variant="outline"
                                colorScheme="purple"
                                aria-label="Add tags"
                                fontSize="10px"
                                icon={<AddIcon />}
                              />
                            </Flex>
                          </form>
                        </Box>
                      </AccordionPanel>
                    </>
                  </AccordionItem>
                </Accordion>
              </Card>

              <Card mt={2}>
                <Accordion>
                  <AccordionItem>
                    <>
                      <h2>
                        <AccordionButton _expanded={{ bg: "gray.100" }}>
                          <Box flex="1" textAlign="left">
                            Image
                          </Box>
                          <AccordionIcon />
                        </AccordionButton>
                      </h2>

                      <AccordionPanel mt={2}>
                        <Box>
                          <Flex direction="column">
                            <FileUploader
                              name="file"
                              types={fileTypes}
                              handleChange={handleFile}
                            />

                            <Text mt={2} fontSize="8pt" width="100%">
                              {imageFileName}
                            </Text>
                          </Flex>
                        </Box>
                      </AccordionPanel>
                    </>
                  </AccordionItem>
                </Accordion>
              </Card>

              <Card mt={2}>
                <Accordion>
                  <AccordionItem>
                    <h2>
                      <AccordionButton _expanded={{ bg: "gray.100" }}>
                        <Box flex="1" textAlign="left">
                          Categories
                        </Box>
                        <AccordionIcon />
                      </AccordionButton>
                    </h2>
                    <AccordionPanel mt={2}>
                      <>
                        <Box display="flex">
                          <Select
                            size="sm"
                            placeholder="Choose Category"
                            value={category}
                            mr={3}
                            onChange={handleCategory}
                          >
                            {categories.map((category) => (
                              <option
                                key={category._id}
                                value={category.categoryName}
                              >
                                {category.categoryName}
                              </option>
                            ))}
                          </Select>
                          <Button
                            size="sm"
                            fontSize="10pt"
                            variant="outline"
                            colorScheme="purple"
                            onClick={() => setAddCategory(true)}
                          >
                            Add
                          </Button>
                        </Box>

                        {addCategory && (
                          <Input
                            mt={2}
                            placeholder="Enter a new Category"
                            fontSize="10pt"
                            size="sm"
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
                            bg="gray.100"
                            value={categoryName}
                            onChange={handleCategoryName}
                          />
                        )}

                        <Box display="flex" mt={2}>
                          <Select
                            size="sm"
                            placeholder="Choose Subcategory"
                            value={subCategory}
                            mr={3}
                            onChange={handleSubCategory}
                          >
                            {subCategories?.map((subCategory) => (
                              <option
                                key={subCategory._id}
                                value={subCategory.subCategoryName}
                              >
                                {subCategory.subCategoryName}
                              </option>
                            ))}
                          </Select>
                          <Button
                            size="sm"
                            fontSize="10pt"
                            variant="outline"
                            colorScheme="purple"
                            onClick={() => setAddSubCategory(true)}
                          >
                            Add
                          </Button>
                        </Box>

                        {addSubCategory && (
                          <Input
                            mt={2}
                            placeholder="Enter a new Sub category"
                            size="sm"
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
                            bg="gray.100"
                            value={subCategoryName}
                            onChange={handleSubCategoryName}
                          />
                        )}
                      </>
                    </AccordionPanel>
                  </AccordionItem>
                </Accordion>
              </Card>

              <Box flex="1">
                <Flex direction="column" mt={2}>
                  <Box display="flex" justifyContent="end" mt={2}>
                    <Button
                      variant="outline"
                      colorScheme="purple"
                      size="sm"
                      mr={3}
                      onClick={handlePreview}
                    >
                      Preview
                    </Button>
                    <Button
                      onClick={onHandleSubmit}
                      variant="outline"
                      type="submit"
                      colorScheme="blue"
                      size="sm"
                      mr={3}
                    >
                      Save Draft
                    </Button>
                    <Button
                      size="sm"
                      colorScheme="purple"
                      onClick={onHandlePublish}
                    >
                      Publish
                    </Button>
                  </Box>
                </Flex>
                <Preview
                  isOpen={isOpen}
                  onClose={onClose}
                  topic={topic}
                  tags={tags}
                  imageFileName={imageFileName}
                  imageFilePath={imageFilePath}
                  imageFlag={imageFlag}
                  html={html}
                  json={json}
                  articleSubtitle={articleSubtitle}
                />
              </Box>
            </Box>
          </Flex>
        </Box>
      )}
    </>
  );
};

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

  return {
    props: {
      session,
    },
  };
}

export default Add;
