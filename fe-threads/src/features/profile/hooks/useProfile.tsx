import React, { ChangeEvent } from "react";
import { IUser } from "@/types/User";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/store/type/RootState";
import { API } from "@/libs/api";
import { useMutation } from "@tanstack/react-query";
import { AUTH_EDIT } from "@/store/RootReducer";

export function useProfile() {
  const dispatch = useDispatch();
  const auth = useSelector((state: RootState) => state.auth);
  const [form, setForm] = React.useState<IUser>(auth);
  const [preview, setPreview] = React.useState<string>();
  const [coverPreview, setCoverPreview] = React.useState<string>();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setForm({
      ...form,
      [e.target.name]:
        e.target.type === "file" ? e.target.files?.[0] : e.target.value,
    });

    // Create image url f or preview
    if (e.target.type === "file" && e.target.files?.[0]) {
      let url = URL.createObjectURL(e.target.files[0]);
      setPreview(url);
    }
    console.log("xixixi", e);
  };

  const handleChangeCover = (e: ChangeEvent<HTMLInputElement>) => {
    setForm({
      ...form,
      [e.target.name]:
        e.target.type === "file" ? e.target.files?.[0] : e.target.value,
    });
    // Create image url f or preview
    if (e.target.type === "file" && e.target.files?.[0]) {
      let url = URL.createObjectURL(e.target.files[0]);
      setCoverPreview(url);
    }
    console.log("wkwkwk", e);
  };

  const handleSubmit = useMutation({
    mutationFn: postTodo,
    onSuccess: async () => {},
    onError: (error) => {
      console.error("Mutation error:", error);
    },
  });

  async function postTodo() {
    // alert(JSON.stringify(preview));
    // alert(JSON.stringify(coverPreview));
    // alert("HHHH");
    // alert(JSON.stringify(form.image));

    // alert(JSON.stringify(form.cover));

    const formData = new FormData();
    formData.append("image", form.image as string);
    formData.append("cover", form.cover as string);
    formData.append("fullname", form.fullname as string);
    formData.append("username", form.username as string);
    formData.append("description", form.description as string);

    try {
      console.log("Image upload response:", formData);
      // alert(JSON.stringify(formData));

      const response = await API.patch(`/user/${form.id}`, formData);
      dispatch(AUTH_EDIT(response.data));
      // console.log("Image upload response:", response.data);
    } catch (error) {
      console.error("Image upload error:", error);
      throw error;
    }
  }

  return {
    form,
    preview,
    coverPreview,
    handleChange,
    handleChangeCover,
    handleSubmit,
  };
}
