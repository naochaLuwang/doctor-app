import {
  Box,
  Heading,
  HStack,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Tag,
  TagLabel,
  Text,
  VStack,
} from "@chakra-ui/react";
import { EditorContent } from "@tiptap/react";
import Image from "next/image";
import React from "react";
import Document from "@tiptap/extension-document";
import Paragraph from "@tiptap/extension-paragraph";
import { Text as Texts } from "@tiptap/extension-text";
import BulletList from "@tiptap/extension-bullet-list";
import OrderedList from "@tiptap/extension-ordered-list";
import ListItem from "@tiptap/extension-list-item";
import Bold from "@tiptap/extension-bold";
import Underline from "@tiptap/extension-underline";
import { Image as Images } from "@tiptap/extension-image";
import Typography from "@tiptap/extension-typography";

import TextAlign from "@tiptap/extension-text-align";

import { Editor } from "@tiptap/core";
import StarterKit from "@tiptap/starter-kit";

const Preview = ({
  isOpen,
  onClose,
  topic,
  tags,
  imageUrl,

  imageFlag,
  html,
  json,
  articleSubtitle,
}) => {
  const editor = new Editor({
    extensions: [
      StarterKit,
      Document,
      Paragraph,
      Texts,
      Images,
      Bold,
      Underline,
      TextAlign,
      BulletList,
      OrderedList,
      ListItem,
      Typography,

      // add more extensions here
    ],

    content: json,
    editable: false,
  });
  return (
    <>
      <Modal
        size="full"
        onClose={onClose}
        isOpen={isOpen}
        scrollBehavior="inside"
      >
        <ModalOverlay>
          <ModalContent>
            <ModalHeader shadow="sm">Preview</ModalHeader>
            <ModalCloseButton />
            <ModalBody bg="gray.50">
              <Box maxW="5xl" mx="auto" bg="white" minH="auto">
                <VStack alignItems="start">
                  {imageFlag == "Y" && (
                    <Box position="relative" h={"60"} w="5xl">
                      <Image src={imageUrl} alt="Banner Image" layout="fill" />
                    </Box>
                  )}
                  <Heading>{topic}</Heading>
                  <VStack align="start">
                    <Text fontSize="12pt">{articleSubtitle}</Text>
                    <HStack>
                      {tags?.map((tag, i) => (
                        <Tag
                          key={i}
                          size="md"
                          borderRadius="full"
                          variant="outline"
                          colorScheme="blue"
                        >
                          <TagLabel>{tag}</TagLabel>
                        </Tag>
                      ))}
                    </HStack>
                  </VStack>
                </VStack>
                <Box ml={-3}>
                  <EditorContent editor={editor} />
                </Box>
              </Box>
            </ModalBody>
            <ModalFooter></ModalFooter>
          </ModalContent>
        </ModalOverlay>
      </Modal>
    </>
  );
};

export default Preview;
