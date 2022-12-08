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

const Articles = ({ articles, data, drArticles }) => {
  const [active, setActive] = useGlobalState("active");
  const [user, setUser] = useState(data);
  const [articlesList, setArticlesList] = useState(articles);
  const [draftArticles, setDraftArticles] = useState(drArticles);
  const [articleStatus, setArticleStatus] = useState(true);

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

  if (status === "unauthenticated") {
    router.push("/signin");
  }

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
          )}

          {!articleStatus && draftArticles.length > 0 && (
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
  }).sort({ updatedAt: -1 });

  console.log(publishedArticles);

  const draftArticles = await Article.find({
    createdBy: session?.user.name,
    tenantId: user?.tenantId,
    isPublished: "N",
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