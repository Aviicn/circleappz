import {
  Box,
  FormControl,
  // FormLabel,
  Input,
  WrapItem,
  Button,
  Avatar,
  Text,
} from "@chakra-ui/react";
import { ThreadCard } from "@/features/threads";
import { useThreads } from "@/features/threads/Hooks/useThreads";
import { BiSolidImageAdd } from "react-icons/bi";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/store/type/RootState";

export default function Home() {
  const {
    getThreads,
    form,
    handlePost,
    handleChange,
    fileInputRef,
    handleButtonClick,
    isLoading,
    refetch,
  } = useThreads();
  const auth = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    refetch();
  }, [isLoading]);

  return (
    <Box
      display={"flex"}
      justifyContent={"center"}
      alignContent={"center"}
      bg="black"
      className="beranda"
      overflow={"auto"}
      width="620px"
      borderRight="1px"
      borderColor={"#3F3F3F"}
    >
      <Box position="relative" bg="black" color={"white"}>
        <Text color={"white"} fontSize="3xl" mx="10" fontWeight="bold">
          Home
        </Text>

        <WrapItem
          p={9}
          fontSize="2xl"
          display="flex"
          borderBottom="1px"
          borderColor={"#3F3F3F"}
        >
          <Avatar
            src={
              typeof auth?.image === "string"
                ? auth?.image
                : "https://i.pinimg.com/236x/41/2f/95/412f951a84614f3eaa634b44b7514e0e.jpg"
            }
          />

          <FormControl
            display={"flex"}
            flexDirection={"column"}
            // gap={4}
            bg={"transparent"}
            width={"100%"}
          >
            <Box
              display={"flex"}
              justifyContent={"center"}
              alignItems={"center"}
            >
              <Input
                placeholder="What is happening?!"
                color={"white"}
                name="content"
                type="text"
                onChange={handleChange}
                value={form.content}
                borderColor={"white"}
                ml={2}
              />
              <Button
                variant={"ghost"}
                color={"brand.green"}
                onClick={handleButtonClick}
              >
                <BiSolidImageAdd
                  style={{
                    height: "50px",
                    width: "50px",
                  }}
                />
              </Button>
              <Input
                type="file"
                name="image"
                onChange={handleChange}
                style={{ display: "none" }}
                ref={fileInputRef}
              />

              <Box display={"flex"} justifyContent={"end"}>
                <Button
                  bg={"linear-gradient(90deg, #63E5C5, #14366F)"}
                  colorScheme="linear-gradient(90deg, #63E5C5, #14366F)"
                  onClick={() => handlePost.mutate()}
                  borderRadius={"full"}
                  px={6}
                >
                  Post
                </Button>
              </Box>
            </Box>
          </FormControl>
        </WrapItem>

        {getThreads?.map((item) => {
          return (
            <Box key={item.id}>
              <ThreadCard
                id={item.id}
                users={item?.user}
                content={item.content}
                likes_count={item.likes_count}
                posted_at={item.posted_at}
                replies_count={item.replies_count}
                image={item.image}
                is_liked={item.is_liked}
              />
            </Box>
          );
        })}
      </Box>
    </Box>
  );
}
