import { RootState } from "@/store/type/RootState";
import {
  Box,
  Card,
  Text,
  Image,
  useDisclosure,
  Avatar,
  // CardBody,
  Button,
} from "@chakra-ui/react";
import { useSelector } from "react-redux";
import { API } from "@/libs/api";
// import { useNavigate } from "react-router-dom";
import React from "react";
import { SuggestedFollow } from "@/components/SuggestedFollow";
import { Footer } from "@/components/Footer";
import EditProfileModal from "@/features/profile/components/EditProfileModal";

export function MyProfile() {
  // const navigate = useNavigate();
  const auth = useSelector((state: RootState) => state.auth);
  const { isOpen, onOpen, onClose } = useDisclosure();

  // const [countFollow, setCountFollow] = React.useState({
  //   followers: 0,
  //   followings: 0,
  // });

  React.useEffect(() => {
    async function fetchFollowCounts() {
      try {
        const sumFollowers = await API.get(`/follows?type=followers`);
        const sumFollowings = await API.get(`/follows?type=followings`);

        setCountFollow({
          followers: sumFollowers.data.length,
          followings: sumFollowings.data.length,
        });
      } catch (err) {
        // Handle error properly, e.g., display error message to user or log it
        console.error("Error fetching follow counts:", err);
      }
    }

    fetchFollowCounts();
  }, []);

  return (
    <Box bg="black" w="400px" justifyContent={"end"} p={4} h="100vh">
      <Card maxW="sm" bg="#262626" color="white" p={5} borderRadius={10}>
        <Text color={"white"} fontWeight={"bold"}>
          My Profile
        </Text>
        <Image
          src="https://i.pinimg.com/736x/17/09/8b/17098b12ca8434c726c63904831de42e.jpg"
          objectFit={"cover"}
          mt={2}
          borderRadius={"10px"}
          height={"60px"}
          width={"100%"}
        />
        <Box ml={5}>
          <Avatar
            src={
              typeof auth?.image === "string"
                ? auth?.image
                : "https://i.pinimg.com/236x/41/2f/95/412f951a84614f3eaa634b44b7514e0e.jpg"
            }
            // position={"absolute"}
            // border={"2px solid gray"}
            // width={"50px"}
            // height={"50px"}
            // style={{ top: "85px", left: "40px" }}
            mt={-5}
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
          </Box>
          <EditProfileModal isOpen={isOpen} onClose={onClose} />
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
      </Card>
      <SuggestedFollow />
      <Footer />
    </Box>
  );
}
