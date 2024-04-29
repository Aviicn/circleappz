import { useState, useEffect } from "react";
import { Box, Text, Spinner } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import FormForget from "@/features/auth/components/FormForget";

export default function Forget() {
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
      <Spinner color="green.500" />
      <Text mt={2}>Please wait...</Text>
    </Box>
  ) : (
    <Box
      display={"flex"}
      flexDirection={"column"}
      justifyContent={"center"}
      alignItems={"center"}
      h={"100vh"}
      w={"full"}
    >
      <FormForget />
      <Box display={"flex"} gap={2} mt={4}>
        <Text>Already have account?</Text>
        <Text
          color={"green"}
          cursor={"pointer"}
          onClick={() => navigate("/auth/login")}
        >
          Login
        </Text>
      </Box>
    </Box>
  );
}
