import { Button, HStack } from "@chakra-ui/react";
import React from "react";

const HistoryButtons = ({ editor }) => {
  return (
    <>
      <HStack>
        <Button
          onClick={() => editor.chain().focus().undo().run()}
          disabled={!editor.can().undo()}
        >
          undo
        </Button>
        <Button
          onClick={() => editor.chain().focus().redo().run()}
          disabled={!editor.can().redo()}
        >
          redo
        </Button>
      </HStack>
    </>
  );
};

export default HistoryButtons;
