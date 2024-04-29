import { IUserlogin } from "@/types/User";
import { useState, ChangeEvent } from "react";
import { API } from "@/libs/api";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { AUTH_LOGIN } from "@/store/RootReducer";
import { jwtDecode } from "jwt-decode";

export function useLogin() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // const [isLoading, setIsLoading] = useState<boolean>(true)
  const [form, setForm] = useState<IUserlogin>({
    username: "",
    password: "",
  });

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    setForm({
      ...form,
      [event.target.name]: event.target.value,
    });
  }

  async function handleLogin() {
    try {
      console.log("mmmmmm", form);
      const response = await API.post("/auth/login", form);
      console.log("llllll", response);
      const objDecode = jwtDecode(response.data.token);

      const obj = { ...response.data, ...objDecode };

      dispatch(AUTH_LOGIN(obj));

      navigate("/");
    } catch (error) {
      console.log(error);
    }
  }

  return { form, handleChange, handleLogin };
}
