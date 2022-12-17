import {
  Box,
  Button,
  Card,
  CardBody,
  Flex,
  HStack,
  Icon,
  Link,
  Menu,
  Image,
  MenuButton,
  MenuItem,
  MenuList,
  Select,
  Tag,
  TagLabel,
  Text,
  VStack,
  Center,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
} from "@chakra-ui/react";
import { getSession, useSession } from "next-auth/react";

import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import Article from "../../models/Article";
import DoctorMaster from "../../models/DoctorMaster";
import dbConnect from "../../utils/db";
import { useGlobalState } from "../../components/Layout";
import { RiArticleFill } from "react-icons/ri";
import { uuid } from "uuidv4";
import TimeAgo from "react-timeago";

import EmptyArticle from "../../components/EmptyArticle";
// import Image from "next/image";
import { BsThreeDotsVertical } from "react-icons/bs";
import { HiThumbUp, HiEye } from "react-icons/hi";
import axios from "axios";
import ArticleModal from "../../components/Modal";
import { ChatIcon, CheckIcon } from "@chakra-ui/icons";
import ReactTimeAgo from "react-time-ago";

const Articles = ({ articles, data, drArticles }) => {
  const [active, setActive] = useGlobalState("active");
  const [user, setUser] = useState(data);
  const [articlesList, setArticlesList] = useState(articles);
  const [draftArticles, setDraftArticles] = useState(drArticles);
  const [articleStatus, setArticleStatus] = useState(true);
  const [likesOpen, setLikeOpen] = useState(false);
  const [viewsOpen, setViewsOpen] = useState(false);
  const [commentsOpen, setCommentsOpen] = useState(false);

  const router = useRouter();

  const { status, data: session } = useSession();

  useEffect(() => {
    setActive("Article");
  }, [setActive]);

  console.log(user);

  const addNewArticle = () => {
    const id = uuid();
    router.push(`/articles/${id}`);
  };

  const onLikeClose = () => {
    setLikeOpen(false);
  };

  const onViewClose = () => {
    setViewsOpen(false);
  };

  const onCommentClose = () => {
    setCommentsOpen(false);
  };

  const handleDelete = async (articleId) => {
    const response = await axios.put("/api/article", {
      articleId,
    });

    setArticlesList(response.data);
  };

  if (status === "unauthenticated") {
    router.push("/signin");
  }

  const approveComment = async (id, cid) => {
    const response = await axios.put(`/api/approvecomment`, {
      id: id,
      cid: cid,
    });
    console.log(response);
  };

  const onSelectStatusChange = async (e) => {
    if (e.target.value === "published") {
      setArticleStatus(true);
    } else if (e.target.value === "draft") {
      setArticleStatus(false);
    } else {
      setArticleStatus(true);
    }
  };

  if (articlesList.length <= 0 && draftArticles.length <= 0) {
    return <EmptyArticle />;
  }

  if (status === "authenticated") {
    return (
      <>
        <Box width="100%" height="90vh" px={8} py={6} overflow="hidden">
          <Flex flex="1" align="center" justify="end" px={4}>
            {/* <Text fontSize="2xl" fontWeight={500} color="gray.600">
              Articles
            </Text> */}

            <HStack spacing={5} w="400px" align="center" justify="end">
              <Select
                size="sm"
                w="200px"
                variant="outline"
                bg="purple.50"
                onChange={onSelectStatusChange}
                rounded="md"
              >
                <option value="published">Published</option>
                <option value="draft">Draft</option>
              </Select>
              <Button
                size="sm"
                variant="outline"
                colorScheme="purple"
                onClick={addNewArticle}
              >
                New Article
              </Button>
            </HStack>
          </Flex>

          {articleStatus && articlesList.length > 0 && (
            <Box
              mt={5}
              width="100%"
              height="100vh"
              overflowY="scroll"
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
              {articlesList.map((article) => (
                <Card key={article._id} bg="white" shadow="md" mb={4}>
                  <CardBody>
                    <Flex align="center" justify="space-between">
                      {/* <Icon as={RiArticleFill} w={8} h={8} /> */}
                      <Flex flex="1" mr="10">
                        {article.imageFlag == "Y" && (
                          <Image
                            src={article.imageUrl}
                            alt="imageFlag"
                            htmlHeight="20px"
                            htmlWidth="150px"
                            rounded="md"
                            // boxSize={{ width: "50px", height: "20px" }}
                            objectFit="fill"
                          />
                        )}

                        <VStack align="start" ml={8} spacing={0.5}>
                          <Text fontSize="lg" fontWeight="bold">
                            {article.articleTitle}
                          </Text>
                          {article.articleSubtitle && (
                            <Text noOfLines={1}>{article.articleSubtitle}</Text>
                          )}
                          <HStack>
                            {article.tags.map((tag) => (
                              <Tag
                                size="sm"
                                key={tag}
                                borderRadius="full"
                                px="2"
                                variant="solid"
                                colorScheme="blue"
                              >
                                <TagLabel fontSize="10pt">{tag}</TagLabel>
                              </Tag>
                            ))}
                          </HStack>

                          <Flex
                            align="center"
                            width="100%"
                            justify="space-between"
                          >
                            <HStack spacing={3}>
                              <HStack spacing={1} cursor="pointer">
                                <Icon as={HiThumbUp} />
                                <Text>
                                  {article.likesArray.filter(
                                    (like) => like.statusId === 1
                                  ).length || 0}
                                </Text>
                              </HStack>

                              <HStack
                                onClick={() => setViewsOpen(true)}
                                spacing={1}
                                cursor="pointer"
                              >
                                <Icon as={HiEye} />
                                <Text>
                                  {
                                    article.viewedArray.filter(
                                      (view) => view.statusId === 1
                                    ).length
                                  }
                                </Text>
                              </HStack>

                              <HStack
                                spacing={1}
                                cursor="pointer"
                                onClick={() => setCommentsOpen(true)}
                              >
                                <ChatIcon fontSize={10} />
                                <Text>{article.commentsArray.length || 0}</Text>
                              </HStack>

                              <Flex align="center">
                                <HStack mr={2}>
                                  <Text>Published by </Text>
                                  <Link href={`/profile/${article.createdBy}`}>
                                    {article.createdBy}
                                  </Link>
                                </HStack>

                                <Box>
                                  <TimeAgo
                                    date={article.createdAt}
                                    style={{ fontSize: "12px", mt: "10px" }}
                                  />
                                </Box>
                              </Flex>
                            </HStack>
                            <HStack spacing={5}>
                              <Button
                                onClick={() => setLikeOpen(true)}
                                size="sm"
                                variant="ghost"
                                colorScheme="blue"
                              >
                                View Likes
                              </Button>
                              <Button
                                onClick={() => setCommentsOpen(true)}
                                size="sm"
                                variant="ghost"
                                colorScheme="blue"
                              >
                                View Comments
                              </Button>
                            </HStack>
                          </Flex>
                        </VStack>
                      </Flex>

                      <Flex align="right" width="xs" justify="space-between">
                        <Box pl={"28"}>
                          <Tag
                            colorScheme="green"
                            size="md"
                            rounded="full"
                            px={3}
                          >
                            Published
                          </Tag>
                        </Box>
                        <Menu>
                          <MenuButton pr={3}>
                            <Icon as={BsThreeDotsVertical} h={6} w={6} />
                          </MenuButton>
                          <MenuList px={2} shadow="lg">
                            <MenuItem
                              _hover={{
                                bg: "blue.50",
                                rounded: "lg",
                                color: "blue.800",
                              }}
                              fontSize="12pt"
                              fontWeight="medium"
                              bg="white"
                              onClick={() => {
                                router.push(
                                  `/articles/${article.articleId}/edit`
                                );
                              }}
                            >
                              Edit
                            </MenuItem>

                            <MenuItem
                              _hover={{
                                bg: "blue.50",
                                rounded: "lg",
                                color: "blue.800",
                              }}
                              fontSize="12pt"
                              fontWeight="medium"
                              bg="white"
                              onClick={() => handleDelete(article.articleId)}
                            >
                              Delete
                            </MenuItem>
                          </MenuList>
                        </Menu>
                      </Flex>
                    </Flex>
                  </CardBody>
                  <ArticleModal
                    isOpen={likesOpen}
                    isClose={onLikeClose}
                    title="Likes"
                    data={article.likesArray}
                  />

                  <ArticleModal
                    isOpen={viewsOpen}
                    isClose={onViewClose}
                    title="Views"
                    data={article.viewedArray}
                  />

                  {/* Comments */}

                  <Modal isOpen={commentsOpen} onClose={onCommentClose}>
                    <ModalOverlay>
                      <ModalContent>
                        <ModalHeader>
                          Comments ({article.commentsArray.length})
                        </ModalHeader>
                        <ModalCloseButton />
                        <ModalBody>
                          {article.commentsArray.map((comment) => (
                            <Flex
                              key={comment._id}
                              width="100%"
                              justify="space-between"
                              align="center"
                            >
                              <VStack align="start" spacing={0} mb={1}>
                                <Text fontSize="md" fontWeight="semibold">
                                  {`${comment.firstName} ${comment.lastName}`}
                                </Text>
                                <Text>{comment.comment}</Text>
                              </VStack>
                              <VStack>
                                {comment.statusId === 0 && (
                                  <Button
                                    onClick={() =>
                                      approveComment(article._id, comment._id)
                                    }
                                    variant="outline"
                                    colorScheme="green"
                                    size="sm"
                                  >
                                    <CheckIcon />
                                  </Button>
                                )}

                                <ReactTimeAgo
                                  date={comment.createdAt}
                                  locale="en-US"
                                />
                              </VStack>
                            </Flex>
                          ))}
                        </ModalBody>
                      </ModalContent>
                    </ModalOverlay>
                  </Modal>
                </Card>
              ))}
            </Box>
          )}

          {!articleStatus && draftArticles.length > 0 ? (
            <Box
              mt={5}
              width="100%"
              height="100vh"
              overflowY="scroll"
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
              {draftArticles.map((article) => (
                <Card key={article._id} bg="white" shadow="md" mb={4}>
                  <CardBody>
                    <Flex align="center" justify="space-between">
                      {/* <Icon as={RiArticleFill} w={8} h={8} /> */}
                      <Flex flex="1" mr="10">
                        {article.imageFlag == "Y" && (
                          <Image
                            src={`${article.imageFilePath}${article.imageFile}`}
                            alt="imageFlag"
                            htmlHeight="20px"
                            htmlWidth="150px"
                            rounded="md"
                            // boxSize={{ width: "50px", height: "20px" }}
                            objectFit="fill"
                          />
                        )}

                        <VStack align="start" ml={8}>
                          <Text fontSize="lg" fontWeight="bold">
                            {article.articleTitle}
                          </Text>
                          {article.articleSubtitle && (
                            <Text noOfLines={1}>{article.articleSubtitle}</Text>
                          )}
                          <HStack>
                            {article.tags.map((tag) => (
                              <Tag
                                size="sm"
                                key={tag}
                                borderRadius="full"
                                px="2"
                                variant="solid"
                                colorScheme="blue"
                              >
                                <TagLabel fontSize="10pt">{tag}</TagLabel>
                              </Tag>
                            ))}
                          </HStack>

                          <Box>
                            <HStack>
                              <Icon as={HiThumbUp} />
                              <Text>
                                {article.likesArray.filter(
                                  (like) => like.statusId === 1
                                ).length || 0}
                              </Text>

                              <Icon as={HiEye} />
                              <Text>
                                {
                                  article.viewedArray.filter(
                                    (view) => view.statusId === 1
                                  ).length
                                }
                              </Text>

                              <Flex align="center">
                                <HStack mr={2}>
                                  <Text>Published by </Text>
                                  <Link href={`/profile/${article.createdBy}`}>
                                    {article.createdBy}
                                  </Link>
                                </HStack>

                                <Box>
                                  <TimeAgo
                                    date={article.createdAt}
                                    style={{ fontSize: "12px", mt: "10px" }}
                                  />
                                </Box>
                              </Flex>
                            </HStack>
                          </Box>
                        </VStack>
                      </Flex>

                      <Flex align="right" width="xs" justify="space-between">
                        <Box pl={"28"}>
                          <Tag
                            colorScheme="yellow"
                            size="md"
                            rounded="full"
                            px={3}
                          >
                            Draft
                          </Tag>
                        </Box>
                        <Menu>
                          <MenuButton pr={3}>
                            <Icon as={BsThreeDotsVertical} h={6} w={6} />
                          </MenuButton>
                          <MenuList px={2} shadow="lg">
                            <MenuItem
                              _hover={{
                                bg: "blue.50",
                                rounded: "lg",
                                color: "blue.800",
                              }}
                              fontSize="12pt"
                              fontWeight="medium"
                              bg="white"
                              onClick={() => {
                                router.push(
                                  `/articles/${article.articleId}/edit`
                                );
                              }}
                            >
                              Edit
                            </MenuItem>

                            <MenuItem
                              _hover={{
                                bg: "blue.50",
                                rounded: "lg",
                                color: "blue.800",
                              }}
                              fontSize="12pt"
                              fontWeight="medium"
                              bg="white"
                              // onClick={() => {
                              //   router.push(
                              //     `/articles/${article.articleId}/edit`
                              //   );
                              // }}
                            >
                              Delete
                            </MenuItem>
                          </MenuList>
                        </Menu>
                      </Flex>
                    </Flex>
                  </CardBody>
                </Card>
              ))}
            </Box>
          ) : (
            <Center>
              <Text>No draft</Text>
            </Center>
          )}
        </Box>
      </>
    );
  }
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

  await dbConnect();

  const user = await DoctorMaster.findOne({ userName: session?.user.name });

  const publishedArticles = await Article.find({
    createdBy: session?.user.name,
    tenantId: user?.tenantId,
    isPublished: "Y",
    isActive: "Y",
  }).sort({ createdAt: -1 });

  console.log(publishedArticles);

  const draftArticles = await Article.find({
    createdBy: session?.user.name,
    tenantId: user?.tenantId,
    isPublished: "N",
    isActive: "Y",
  });

  return {
    props: {
      articles: JSON.parse(JSON.stringify(publishedArticles)),
      drArticles: JSON.parse(JSON.stringify(draftArticles)),
      data: JSON.parse(JSON.stringify(user)),
      session,
    },
  };
}

export default Articles;
