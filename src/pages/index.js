import { getSession, useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";

import { useRouter } from "next/router";
import { useGlobalState } from "../components/Layout";
import { Text } from "@chakra-ui/react";
import { useS3Upload } from "next-s3-upload";

const Home = ({ article }) => {
  const { status, data: session } = useSession();
  let [imageUrl, setImageUrl] = useState();
  let { FileInput, openFileDialog, uploadToS3 } = useS3Upload();

  let handleFileChange = async (file) => {
    let { url } = await uploadToS3(file);
    setImageUrl(url);
  };

  const [active, setActive] = useGlobalState("active");
  const router = useRouter();

  console.log(article);

  useEffect(() => {
    setActive("Home");

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (status === "loading") {
    return <Text>Loading ...</Text>;
  }

  if (status === "unauthenticated") {
    router.push("/signin");
  }

  console.log(imageUrl);

  return (
    <>
      {status === "authenticated" && (
        <div>
          Home
          {/* <FileInput onChange={handleFileChange} />

          <button onClick={openFileDialog}>Upload file</button>

          {imageUrl && <img src={imageUrl} />} */}
        </div>
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

export default Home;
