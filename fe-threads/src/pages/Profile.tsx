import React from "react";
import { Footer, SuggestedFollow } from "@/components";
import { RootState } from "@/store/type/RootState";
import {
  Box,
  Text,
  Avatar,
  useDisclosure,
  Image,
  Button,
  Grid,
  GridItem,
} from "@chakra-ui/react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { ThreadCard } from "@/features/threads";
import EditProfileModal from "@/features/profile/components/EditProfileModal";
import { API } from "@/libs/api";

export default function Profile() {
  const navigate = useNavigate();
  const auth = useSelector((state: RootState) => state.auth);

  const [isAllPost, setIsAllPost] = React.useState<boolean>(true);
  const [isMedia, setIsMedia] = React.useState<boolean>(false);
  const [threadByUser, setThreadByUser] = React.useState<any[]>();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const id = auth.id;

  const handleAllPostChange = (): void => {
    setIsAllPost(!isAllPost);
    setIsMedia(!isMedia);
  };

  const handleIsMediaChange = (): void => {
    setIsAllPost(!isAllPost);
    setIsMedia(!isMedia);
  };

  const getThreadByUser = async () => {
    try {
      const response = await API.get(`/thread/${id}`);
      // alert(JSON.stringify(response.data.user));
      setThreadByUser(response.data);
    } catch (error) {
      console.error("Error fetching thread by user:", error);
    }
  };

  const threadOnlyImg = threadByUser?.filter(
    (data: any) => data.image !== null
  );

  React.useEffect(() => {
    getThreadByUser();
  }, []);

  return (
    <Box
      w={"35%"}
      display={"flex"}
      color={"white"}
      m={"20px"}
      mt={"30px"}
      flexDir={"column"}
      gap={"3"}
      className="beranda"
      overflow={"auto"}
      textColor={"white"}
    >
      {/* <Box width={"100%"} display={"flex"} flexDirection={"column"} gap={2}>
        <Navbar />
      </Box> */}

      <Box display={"inline-block"}>
        <Box
          display={"flex"}
          alignItems={"center"}
          cursor={"pointer"}
          onClick={() => navigate("/")}
          mt={4}
        >
          <AiOutlineArrowLeft />
          <Text ms={4} fontWeight={"bold"} fontSize={"xl"}>
            {auth?.fullname}
          </Text>
        </Box>
      </Box>

      <Box>
        <Image
          src="https://i.pinimg.com/736x/17/09/8b/17098b12ca8434c726c63904831de42e.jpg"
          objectFit={"cover"}
          mt={4}
          borderRadius={"10px"}
          height={"100px"}
          width={"100%"}
        />

        <Avatar
          src={
            typeof auth?.image === "string"
              ? auth?.image
              : "https://i.pinimg.com/236x/41/2f/95/412f951a84614f3eaa634b44b7514e0e.jpg"
          }
          border={"4px solid white"}
          width={"80px"}
          height={"80px"}
          style={{ margin: "-45px 0 0 25px" }}
        />

        <Box display={"flex"} justifyContent={"end"}>
          <Button
            variant={"outline"}
            borderRadius={"full"}
            size={"s"}
            borderColor={"gray"}
            textColor={"white"}
            bg={"green"}
            mt={-5}
            h={10}
            paddingX={4}
            onClick={() => onOpen()}
          >
            Edit Profile
          </Button>

          <EditProfileModal isOpen={isOpen} onClose={onClose} />
        </Box>
      </Box>
      <Box>
        <Text fontWeight={"bold"} fontSize={"2xl"}>
          {auth?.fullname}
        </Text>
        <Text color={"white"} fontSize={"sm"}>
          @{auth?.username}
        </Text>
        {auth?.description ? (
          <Text>{auth?.description}</Text>
        ) : (
          <Text>Set your description...</Text>
        )}

        <Box display={"flex"} gap={5} mt={1}>
          <Box display={"flex"} gap={2} fontSize={"sm"}>
            <Text fontWeight={"bold"}>{0}</Text>
            <Text>Following</Text>
          </Box>
          <Box display={"flex"} gap={2} fontSize={"sm"}>
            <Text fontWeight={"bold"}>{0}</Text>
            <Text>Followers</Text>
          </Box>
        </Box>
      </Box>
      <Box display={"flex"} mt={5}>
        <Box
          w={"full"}
          onClick={handleAllPostChange}
          cursor={"pointer"}
          pb={2}
          borderBottom={isAllPost ? "1px solid red" : "1px solid #dbdbdb"}
        >
          <Text textAlign={"center"}>All Post</Text>
        </Box>
        <Box
          w={"full"}
          onClick={handleIsMediaChange}
          cursor={"pointer"}
          pb={2}
          borderBottom={isMedia ? "1px solid red" : "1px solid #dbdbdb"}
        >
          <Text textAlign={"center"}>Media</Text>
        </Box>
      </Box>
      <Box ms={-6}>
        {isAllPost ? (
          threadByUser && threadByUser.length > 0 ? (
            threadByUser.map((data: any) => (
              <ThreadCard
                key={data.id}
                id={data.id}
                users={data?.user}
                content={data.content}
                image={data.image}
                is_liked={data.is_liked}
                likes_count={data.likes_count}
                posted_at={data.posted_at}
                replies_count={data.replies_count}
                user={data.user}
              />
            ))
          ) : (
            <Text textAlign={"center"} fontWeight={"bold"} mt={10}>
              No Posts Yet
            </Text>
          )
        ) : threadOnlyImg && threadOnlyImg.length > 0 ? (
          <Grid templateColumns="repeat(3, 1fr)" gap={1} mt={2}>
            {threadOnlyImg.map((data: any) => (
              <GridItem w="100%" h="100%" border={"1px solid #dbdbdb"}>
                <Image
                  key={data.id}
                  src={data.image}
                  alt="thread"
                  w={"full"}
                  h={"full"}
                />
              </GridItem>
            ))}
          </Grid>
        ) : (
          <Text textAlign={"center"} fontWeight={"bold"} mt={10}>
            No Media Yet
          </Text>
        )}
        {/* <SuggestedFollow />
        <Footer /> */}
      </Box>
    </Box>
  );
}
