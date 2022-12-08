import { Box, Button, Flex, Text } from "@chakra-ui/react";
import Image from "next/image";
import React from "react";
import { uuid } from "uuidv4";
import { useRouter } from "next/router";
const EmptyArticle = () => {
  const router = useRouter();
  const addNewArticle = () => {
    const id = uuid();
    router.push(`/articles/${id}`);
  };
  return (
    <Flex direction="column" align="center" width="100%" justify="center">
      <Box position="relative" width="md" height="md">
        <Image
          src={"/articleempty.png"}
          alt="Empty article"
          layout="fill"
          objectFit="contain"
        />
      </Box>
      <Text mt={-10} fontSize="lg">
        This is where you can manage your articles. But you haven&apos;t written
        anything yet.
      </Text>

      <Button size="lg" colorScheme="facebook" mt={5} onClick={addNewArticle}>
        Write your first article now
      </Button>
    </Flex>
  );
};

export default EmptyArticle;
