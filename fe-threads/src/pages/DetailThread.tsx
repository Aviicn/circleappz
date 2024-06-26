import { Box, Input, FormControl, Image, Text, Button } from "@chakra-ui/react";
import { ThreadCard } from "@/features/threads";
import { useState, useEffect, ChangeEvent } from "react";
import { API } from "@/libs/api";
import { useParams } from "react-router-dom";
import { IThreadCard } from "@/types/Thread";
import { ReplyPost } from "@/types/Reply";
import { useQuery } from "@tanstack/react-query";

export default function DetailThread() {
  const { id } = useParams();
  const [data, setData] = useState<IThreadCard>();
  const [reply, setReply] = useState<ReplyPost>({
    content: "",
    thread_id: parseInt(id as string),
  });

  useEffect(() => {
    getOneThread();
  }, []);

  async function getOneThread() {
    try {
      const response = await API.get(`/detail-thread/${id}`);

      setData(response.data[0]);
    } catch (err) {
      console.log(err);
    }
  }

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    setReply({
      ...reply,
      [event.target.name]: event.target.value,
    });
  }

  async function handlePost(event: React.FormEvent<HTMLFormElement>) {
    try {
      event.preventDefault();

      await API.post("/reply", reply);
      setReply({
        content: "",
        thread_id: 0,
      });
      refetch();
    } catch (err) {
      console.log(err);
    }
  }

  const { data: getReply, refetch } = useQuery({
    queryKey: ["replies"],
    queryFn: async () =>
      await API.get(`/replies?thread_id=${id}`).then((res) => res.data),
  });

  return (
    <Box display={"flex"} justifyContent={"center"}>
      <Box
        display={"flex"}
        alignItems={"center"}
        flexDirection={"column"}
        paddingY={"20px"}
        width="660px"
        marginLeft={"-30px"}
        borderColor={"brand.grey"}
        overflowY="auto"
      >
        <ThreadCard
          id={data?.id}
          users={data?.user}
          content={data?.content}
          likes_count={data?.likes_count}
          posted_at={data?.posted_at}
          replies_count={data?.replies_count}
          image={data?.image}
          is_liked={data?.is_liked}
        />
        <Box marginTop={"20px"} width={"100%"} paddingX={5}>
          <form onSubmit={handlePost} encType="multipart/form-data">
            <FormControl display={"flex"} flexDirection={"column"} gap={2}>
              <Box
                display={"flex"}
                justifyContent={"center"}
                alignItems={"center"}
                gap={2}
              >
                <Input
                  placeholder="What is happening?!"
                  name="content"
                  onChange={handleChange}
                  value={reply.content}
                />
                <Button
                  type="submit"
                  bg={"linear-gradient(90deg, #63E5C5, #14366F)"}
                  colorScheme="linear-gradient(90deg, #63E5C5, #14366F)"
                  fontSize={"12px"}
                  width={"70px"}
                >
                  Post
                </Button>
              </Box>
            </FormControl>
          </form>

          {getReply?.map((data: any, index: any) => (
            <Box
              key={index}
              display={"flex"}
              width="660px"
              borderBottom={"1px solid #d3d3d3"}
              padding={"20px 0px"}
              bg={"transparent"}
              marginLeft={"-20px"}
            >
              <Image
                ms={6}
                src={
                  data.user?.image
                    ? data.user?.image
                    : "https://i.pinimg.com/236x/41/2f/95/412f951a84614f3eaa634b44b7514e0e.jpg"
                }
                width={"50px"}
                height={"50px"}
                objectFit={"cover"}
                borderRadius={"50%"}
                marginRight={"20px"}
              />

              <Box>
                <Box display={"flex"} alignItems={"center"}>
                  <Text fontWeight={"bold"}>{data.user?.fullname}</Text>
                  <Text ms={2} color="grey" fontSize={"sm"}>
                    @{data.user?.username}
                  </Text>
                </Box>

                <Text>{data?.content}</Text>
              </Box>
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  );
}
