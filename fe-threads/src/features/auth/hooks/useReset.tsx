import React, { useState } from "react";
import { API } from "@/libs/api";
import { useNavigate } from "react-router-dom";

const useReset = () => {
  const navigate = useNavigate();

  const [formReset, setFormReset] = useState({
    createPassword: "",
    newPassword: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormReset({ ...formReset, [name]: value });
  };

  const handleSubmit = async (): Promise<void> => {
    // eslint-disable-next-line no-useless-catch
    try {
      const response = await API.post("/auth/reset", formReset);

      console.log(response);

      if (response.status === 201) {
        alert("Reset Password success");
        navigate("/auth/login");
      }
    } catch (error) {
      throw error;
    }
  };

  return {
    handleReset
    handleChange,
  };
};

export default useReset;
