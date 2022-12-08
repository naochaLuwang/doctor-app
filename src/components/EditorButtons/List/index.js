import React from "react";
import { Button, Icon, Tooltip } from "@chakra-ui/react";
import { MdFormatListBulleted } from "react-icons/md";
import { AiOutlineOrderedList } from "react-icons/ai";

const ListButtons = ({ editor }) => {
  return (
    <>
      <Tooltip label="Bullet list">
        <Button
          size="sm"
          colorScheme="blue"
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          variant={editor.isActive("bulletList") ? "solid" : "outline"}
        >
          <Icon as={MdFormatListBulleted} w={6} h={6} />
        </Button>
      </Tooltip>

      <Tooltip label="Ordered List">
        <Button
          size="sm"
          colorScheme="blue"
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          variant={editor.isActive("orderedList") ? "solid" : "outline"}
        >
          <Icon as={AiOutlineOrderedList} w={6} h={6} />
        </Button>
      </Tooltip>
    </>
  );
};

export default ListButtons;
