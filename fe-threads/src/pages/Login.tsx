import { Box, Text, Spinner } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import FormLogin from "@/features/auth/components/FormLogin";
import { useState, useEffect } from "react";

export default function Login() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const delay = setTimeout(() => {
      setIsLoading(false);
    }, 500);
    return () => clearTimeout(delay);
  }, []);

  return isLoading ? (
    <Box
      display={"flex"}
      flexDirection={"column"}
      justifyContent={"center"}
      alignItems={"center"}
      marginTop={"150px"}
    >
      <Spinner color="linear-gradient(90deg, #63E5C5, #14366F)" />
      <Text mt={2}>Please wait...</Text>
    </Box>
  ) : (
    <Box
      display={"flex"}
      flexDirection={"column"}
      justifyContent={"center"}
      alignItems={"center"}
      // marginTop={"100px"}
      h={"100vh"}
      w={"full"}
    >
      <FormLogin />
      <Box display={"flex"} gap={2} mt={4}>
        <Text>Don't have an account yet ?</Text>
        <Text
          color={"linear-gradient(90deg, #63E5C5, #14366F)"}
          cursor={"pointer"}
          onClick={() => navigate("/auth/register")}
        >
          Create account
        </Text>
      </Box>
    </Box>
  );
}
