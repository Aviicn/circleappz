import {
  Box,
  FormControl,
  // FormLabel,
  Input,
  WrapItem,
  Button,
  Avatar,
  Text,
  Flex,
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
      display="flex"
      w="100%"
      h="100vh"
      bg="black"
      className="beranda"
      overflow={"auto"}
    >
      <Flex justifyContent="center">
        <Box
          w="650px"
          position="relative"
          // right="70"
          // left="80"
          bg="black"
          color={"white"}
          borderRight="1px"
          borderColor="#313131"
          // overflowY="auto"
        >
          <Text
            // bgGradient="linear(to-l, #7928CA, #FF0080)"
            color={"white"}
            fontSize="2xl"
            // bgClip="text"
            // mt={4}
            // p={3}
            m="5"
            fontWeight="bold"
          >
            Home
          </Text>

          <WrapItem mt={6} p={4} fontSize="2xl" display="flex" mb={8}>
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
              gap={2}
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
                  border={"none"}
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
                    backgroundColor={"green"}
                    color={"white"}
                    colorScheme="green"
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
                x
              </Box>
            );
          })}
        </Box>
      </Flex>
    </Box>
  );
}
