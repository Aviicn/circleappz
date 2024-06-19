import { Box, Image, Text } from "@chakra-ui/react";
import { AiFillHeart } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { IThreadCard } from "@/types/Thread";
import { BsCircleFill } from "react-icons/bs";
import useLikes from "../Hooks/useLikes";
import useTimes from "@/utils/useTimes";

export const ThreadCard = (props: IThreadCard): React.JSX.Element => {
  const navigate = useNavigate();
  const { handleIsLike } = useLikes();
  // alert(JSON.stringify(props));
  return (
    <Box
      display={"flex"}
      width="660px"
      borderBottom="1px"
      borderColor={"#3F3F3F"}
      padding={"10px 20px"}
    >
      <Image
        src={
          typeof props.users?.image === "string"
            ? props.users?.image
            : "https://i.pinimg.com/236x/41/2f/95/412f951a84614f3eaa634b44b7514e0e.jpg"
        }
        width={"50px"}
        height={"50px"}
        objectFit={"cover"}
        borderRadius={"50%"}
        marginInline={"20px"}
        style={{ boxShadow: "inset 0 0 50px rgba(0, 0, 0, 1)" }}
      />

      <Box w={"70%"}>
        <Box display={"flex"} alignItems={"center"}>
          <Text fontWeight={"bold"}>{props.users?.fullname}</Text>
          <Text ms={2} color="grey" fontSize={"sm"}>
            @{props.users?.username}
          </Text>
          <BsCircleFill
            style={{
              width: "5px",
              marginTop: 3,
              marginLeft: 10,
              color: "#dbdbdb",
            }}
          />
          <Text ms={2} color="grey" fontSize={"sm"}>
            {useTimes(props.posted_at)}
          </Text>
        </Box>
        <Text>{props.content}</Text>

        {props.image && (
          <Image
            mt={3}
            src={props.image}
            width={"80%"}
            height={"300px"}
            objectFit={"fill"}
            marginRight={"20px"}
            borderRadius={10}
          />
        )}
        <Box display={"flex"} gap={5} marginTop={"10px"}>
          <Box
            display={"flex"}
            alignItems={"center"}
            backgroundColor={"transparent"}
            cursor={"pointer"}
            color={props.is_liked ? "red" : "gray"}
            onClick={() => handleIsLike(props.id, props?.is_liked)}
            gap={1}
            _hover={{ color: "gray" }}
          >
            {props.likes_count}
            <AiFillHeart />
          </Box>

          <Box
            display={"flex"}
            alignItems={"center"}
            backgroundColor={"transparent"}
            cursor={"pointer"}
            onClick={() => navigate(`/thread/${props.id}`)}
            _hover={{ color: "gray" }}
          >
            {props.replies_count} Replies
          </Box>
        </Box>
      </Box>
    </Box>
  );
};
