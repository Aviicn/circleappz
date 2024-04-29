import { Box, Card, CardBody, Text, Avatar, Button } from "@chakra-ui/react";
import useSuggestFollow from "../hooks/useSuggestFollow";
import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/store/type/RootState";

export const SuggestedFollow = (): React.JSX.Element => {
  const { suggestFollow, mutationFollow } = useSuggestFollow();
  const auth = useSelector((state: RootState) => state.auth);

  return (
    <Box
      display={"flex"}
      flexDirection={"column"}
      width={"300px"}
      height={"fit-content"}
    >
      <Card
        width={"100%"}
        bg={"transparent"}
        boxShadow={"0 0 6px rgba(0, 0, 0, 0.5)"}
        padding={5}
      >
        <Text color={"white"} fontWeight={"bold"} mb={1}>
          Suggested for You
        </Text>
        {/* {suggestFollow?.map((item: any) => { */}
        {suggestFollow
          ?.filter((item) => item.id !== auth?.id)
          ?.map((item: any) => {
            return (
              <CardBody
                display={"flex"}
                gap={2}
                p={0}
                my={1}
                alignItems={"center"}
                key={item.id}
              >
                <Avatar
                  src={
                    item.image
                      ? item.image
                      : "https://i.pinimg.com/236x/41/2f/95/412f951a84614f3eaa634b44b7514e0e.jpg"
                  }
                  border={"2px solid black"}
                  size={"sm"}
                />
                <Box
                  display={"flex"}
                  flexDirection={"column"}
                  flex={1}
                  overflow={"hidden"}
                >
                  <Text
                    color={"white"}
                    fontSize={"xs"}
                    fontWeight={"bold"}
                    overflow={"hidden"}
                    whiteSpace={"nowrap"}
                    textOverflow={"ellipsis"}
                  >
                    {item?.fullname}
                  </Text>
                  <Text fontSize={"xs"} color={"grey"}>
                    @{item?.username}
                  </Text>
                </Box>
                <Button
                  size={"xs"}
                  variant={item?.isFollowing ? "outline" : "solid"}
                  borderRadius={"full"}
                  colorScheme={item?.isFollowing ?? "green"}
                  bg={!item?.isFollowing ? "green" : "white"}
                  px={3}
                  onClick={() => mutationFollow.mutate(item?.id)}
                >
                  {item?.isFollowing ? "Unfollow" : "Follow"}
                </Button>
              </CardBody>
            );
          })}
      </Card>
    </Box>
  );
};
