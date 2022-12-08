import { Button, Icon, Tooltip } from "@chakra-ui/react";
import React from "react";
import { FiYoutube } from "react-icons/fi";

const YoutubeButton = ({ editor }) => {
  const widthRef = React.useRef(null);
  const heightRef = React.useRef(null);

  React.useEffect(() => {
    if (widthRef.current && heightRef.current) {
      widthRef.current.value = 640;
      heightRef.current.value = 480;
    }
  }, []);

  if (!editor) {
    return null;
  }

  const addYoutubeVideo = () => {
    const url = prompt("Enter YouTube URL");

    editor.commands.setYoutubeVideo({
      src: url,
      width: Math.max(320, parseInt(widthRef?.current?.value, 10)) || 640,
      height: Math.max(180, parseInt(heightRef?.current?.value, 10)) || 480,
    });
  };
  return (
    <>
      <Tooltip label="Youtube video">
        <Button
          size="sm"
          id="add"
          onClick={addYoutubeVideo}
          variant="outline"
          colorScheme="blue"
        >
          <Icon as={FiYoutube} h={6} w={6} />
        </Button>
      </Tooltip>
    </>
  );
};

export default YoutubeButton;
