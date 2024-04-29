import { API } from "@/libs/api";
import { IThreadCard, IThreadPost } from "@/types/Thread";
import { ChangeEvent, useState, useRef } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export function useThreads() {
  const queryClient = useQueryClient();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [form, setForm] = useState<IThreadPost>({
    content: "",
    image: "",
  });

  const getThreadRes = async () => {
    const response = await API.get("/threads");
    // alert(JSON.stringify(response));
    return response.data;
  };

  const { data: getThreads, refetch } = useQuery({
    queryKey: ["threads"],
    queryFn: getThreadRes,
  });
  // ["threads"] sebagai queryKey
  // getThreadRes sebagai queryFn

  // const { data: getThreads, refetch } = useQuery<IThreadCard[]>({
  //   queryKey: ["threads"],
  //   queryFn: async () =>
  //     await API.get("/threads").then((response) => response.data),
  // });

  const getThreadUserId = async (userId: any) => {
    try {
      const threadsById = await API.get(`/thread/${userId}`);
      return threadsById.data;
    } catch (err) {
      throw err;
    }
  };

  const handlePost = useMutation({
    mutationFn: postTodo,
    onSuccess: async () => {
      queryClient.invalidateQueries({ queryKey: ["threads"] });
      setForm({
        content: "",
        image: "",
      });
      setIsLoading(true);
      setTimeout(() => {
        refetch();
      }, 5000);
    },
    onError: (error) => {
      console.error("Mutation error:", error);
      setIsLoading(false);
    },
  });

  async function postTodo() {
    const formData = new FormData();
    const file = form.image;
    const options = {
      image: file,
    };
    formData.append("content", form.content);
    // formData.append("image", options.image);
    formData.append("image", form.image as File);

    console.log("isinya formData", options);
    console.log("isinya form", form);

    alert(JSON.stringify(form.content));

    for (var key of formData.entries()) {
      // console.log(key[0] + ", " + JSON.stringify(key[1]));
    }

    // alert(JSON.stringify(form.content));

    try {
      const response = await API.post("/thread", formData);
      console.log("Image upload response:", response.data);
    } catch (error) {
      console.log("isinya formData", formData);
      console.log("isinya form", form);
      console.error("Image upload error:", error);
      throw error;
    }
    setIsLoading(true);
  }

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    const { name, value, files } = event.target;

    if (files) {
      setForm({
        ...form,
        [name]: files[0],
      });
    } else {
      setForm({
        ...form,
        [name]: value,
      });
    }
  }

  const fileInputRef = useRef<HTMLInputElement>(null);

  function handleButtonClick() {
    fileInputRef.current?.click();
  }

  return {
    form,
    getThreads,
    getThreadUserId,
    handleChange,
    handlePost,
    fileInputRef,
    handleButtonClick,
    refetch,
    isLoading,
  };
}
