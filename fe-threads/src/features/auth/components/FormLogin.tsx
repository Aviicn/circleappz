import { KeyboardEvent } from "react";
import { FormControl, Input, Text, Button, Box } from "@chakra-ui/react";
import { useLogin } from "../hooks/useLogin";
import { useNavigate } from "react-router-dom";

const FormLogin = (): React.JSX.Element => {
  const navigate = useNavigate();

  const { handleChange, handleLogin } = useLogin();
  const handleKeyPress = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      handleLogin();
    }
  };

  return (
    <FormControl
      isRequired
      display={"flex"}
      flexDirection={"column"}
      gap={3}
      width={"350px"}
      borderRadius={10}
      padding={5}
      boxShadow={
        "0 0px 6px rgba(50, 50, 93, 0.5), 0 1px 3px rgba(0, 0, 0, 0.08)"
      }
    >
      <Text
        color={"linear-gradient(90deg, #63E5C5, #14366F)"}
        fontSize={"2xl"}
        fontWeight={"bold"}
        textAlign={"center"}
        mb={3}
      >
        LOGIN
      </Text>
      <Input
        border={"2px solid #d3d3d3"}
        fontSize={"sm"}
        placeholder="username"
        name="username"
        onChange={handleChange}
        onKeyDown={handleKeyPress}
      />
      <Input
        border={"2px solid #d3d3d3"}
        fontSize={"sm"}
        type="password"
        placeholder="Password"
        name="password"
        onChange={handleChange}
        onKeyDown={handleKeyPress}
      />
      <Box display="flex" justifyContent={"flex-end"} fontSize={"sm"}>
        <Text
          color={"green"}
          cursor={"pointer"}
          onClick={() => navigate("/auth/forget")}
        >
          Forget Password
        </Text>
      </Box>
      <Button
        backgroundColor={"green"}
        colorScheme="green"
        color={"white"}
        onClick={handleLogin}
      >
        Login
      </Button>
    </FormControl>
  );
};

export default FormLogin;
