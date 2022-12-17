import { getSession, useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import Registration from "../models/Regsitration";

import {
  Box,
  Card,
  CardBody,
  Flex,
  HStack,
  Icon,
  Image,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  VStack,
} from "@chakra-ui/react";
import axios from "axios";
import { useRouter } from "next/router";
import { CgFileDocument } from "react-icons/cg";
import { TiGroup } from "react-icons/ti";
import Clock from "react-live-clock";
import { useGlobalState } from "../components/Layout";
import Article from "../models/Article";
import DoctorMaster from "../models/DoctorMaster";
import dbConnect from "../utils/db";
import moment from "moment";
import { BsThreeDotsVertical } from "react-icons/bs";
const Home = ({ session, articles, users }) => {
  const { status } = useSession();
  const [active, setActive] = useGlobalState("active");
  const [firstName, setFirstName] = useGlobalState("firstName");
  const [lastName, setLastName] = useGlobalState("lastName");
  const [likesOpen, setLikeOpen] = useState(false);
  const [viewsOpen, setViewsOpen] = useState(false);
  const [commentsOpen, setCommentsOpen] = useState(false);
  const [articlesList, setArticlesList] = useState(articles);
  const router = useRouter();

  useEffect(() => {
    setActive("Home");

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onLikeClose = () => {
    setLikeOpen(false);
  };

  const onViewClose = () => {
    setViewsOpen(false);
  };

  const onCommentClose = () => {
    setCommentsOpen(false);
  };

  const approveComment = async (id, cid) => {
    const response = await axios.put(`/api/approvecomment`, {
      id: id,
      cid: cid,
    });
    console.log(response);
  };

  const handleDelete = async (articleId) => {
    const response = await axios.put("/api/article", {
      articleId,
    });

    setArticlesList(response.data);
  };

  if (status === "loading") {
    return <Text>Loading ...</Text>;
  }

  if (status === "unauthenticated") {
    router.push("/signin");
  }

  const publishedDate = (dateString) => {
    var momentDateObj = moment(dateString).format("ll");
    return momentDateObj;
  };

  return (
    <>
      {status === "authenticated" && (
        <Box py={2} px={6}>
          <HStack fontSize="md" fontWeight="md">
            <Text fontSize="12pt" fontWeight="semibold" color="gray.600">
              Welcome, Dr. {firstName} {lastName}
            </Text>
            <Clock
              format={"HH:mm:ss"}
              ticking={true}
              timezone={"Asia/Kolkata"}
              noSsr={true}
            />
          </HStack>

          <HStack mt={5} spacing={5}>
            <Card bg="white" width="15%">
              <CardBody>
                <Flex align="center">
                  <Box bg="teal.50" p={2} rounded="2xl">
                    <Icon as={TiGroup} h={10} w={10} color="teal.400" />
                  </Box>
                  <VStack spacing={1} align="start" ml={5}>
                    <Text fontSize="xl" fontWeight="semibold">
                      {users.length}
                    </Text>
                    <Text>Users</Text>
                  </VStack>
                </Flex>
              </CardBody>
            </Card>
            <Card bg="white" width="15%">
              <CardBody>
                <Flex align="center">
                  <Box bg="orange.50" p={2} rounded="2xl">
                    <Icon
                      as={CgFileDocument}
                      h={10}
                      w={10}
                      color="orange.400"
                    />
                  </Box>
                  <VStack spacing={1} align="start" ml={5}>
                    <Text fontSize="xl" fontWeight="semibold">
                      {articlesList.length}
                    </Text>
                    <Text>Articles</Text>
                  </VStack>
                </Flex>
              </CardBody>
            </Card>
          </HStack>

          <Card width="100%" height="65vh" bg="white" mt={5}>
            <CardBody>
              <>
                <Text fontSize="lg" fontWeight="medium" ml="3" mb={2}>
                  Recent Article
                </Text>

                <TableContainer>
                  <Table size="sm">
                    <Thead>
                      <Tr>
                        <Th>No.</Th>
                        <Th>Article Title</Th>
                        <Th>Post Date</Th>
                        <Th>Category</Th>
                        <Th>Comment</Th>
                        <Th>Like</Th>
                        <Th>Viewers</Th>
                        <Th></Th>
                      </Tr>
                    </Thead>
                    <Tbody>
                      {articlesList.slice(0, 5).map((article, index) => (
                        <Tr key={article._id}>
                          <Td>
                            <Text
                              width="fit-content"
                              bg="blue"
                              py={1}
                              px={3}
                              rounded="md"
                              color="white"
                            >
                              {index + 1}
                            </Text>
                          </Td>
                          <Td>
                            <HStack>
                              <Box border="1px solid gray" rounded="lg">
                                <Image
                                  src={article.imageUrl}
                                  alt="article image"
                                  width="10"
                                  height="10"
                                  objectFit="fill"
                                  rounded="lg"
                                />
                              </Box>
                              <Text>{article.articleTitle}</Text>
                            </HStack>
                          </Td>
                          <Td>{publishedDate(article.publishedDate)}</Td>
                          <Td>{article.articleCatName}</Td>
                          <Td>{`${article.commentsArray.length} comments`}</Td>
                          <Td>{`${article.likesArray.length} likes`}</Td>
                          <Td>{`${article.viewedArray.length} views`}</Td>
                          <Td>
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
                                  onClick={() =>
                                    handleDelete(article.articleId)
                                  }
                                >
                                  Delete
                                </MenuItem>
                              </MenuList>
                            </Menu>
                          </Td>
                        </Tr>
                      ))}
                    </Tbody>
                  </Table>
                </TableContainer>
              </>
            </CardBody>
          </Card>
        </Box>
      )}
    </>
  );
};

export async function getServerSideProps(context) {
  const session = await getSession(context);
  console.log(session);
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

  const users = await Registration.find({
    TenantID: user?.tenantId,
    IsActive: "Y",
  });

  console.log(users);

  const publishedArticles = await Article.find({
    createdBy: session?.user.name,
    tenantId: user?.tenantId,
    isPublished: "Y",
    isActive: "Y",
  }).sort({ createdAt: -1 });

  return {
    props: {
      session,
      articles: JSON.parse(JSON.stringify(publishedArticles)),
      users: JSON.parse(JSON.stringify(users)),
    },
  };
}

export default Home;
