// import React from "react";
// import {
//   Input,
//   Button,
//   Box,
//   Heading,
//   Text,
//   Flex,
//   Alert,
//   AlertDescription,
//   AlertIcon,
//   AlertTitle,
//   CloseButton,
// } from "@chakra-ui/react";
// import { Link } from "react-router-dom";
// import useForget from "../hooks/useForget";

// const FormForget: React.FC = () => {
//   const {
//     handleSubmit,
//     handleChange,
//     isOpen: isVisible,
//     onClose,
//     onOpen,
//   } = useForget();

//   const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     handleSubmit.mutate();
//   };

//   return (
//     <Box w={"100%"} h={"100vh"}>
//       <Flex
//         direction="column"
//         alignItems="center"
//         justifyContent="center"
//         h="100%"
//       >
//         <Box w={"412px"} position={"fixed"}>
//           <Heading fontSize="5xl" fontWeight="black" color="green">
//             Circle
//           </Heading>

//           <Heading fontSize="3xl" fontWeight="medium" color="white" mt={5}>
//             Forget Password{" "}
//           </Heading>

//           <form onSubmit={onSubmit}>
//             <Box mb={4} mt={10}>
//               <Input
//                 type="email"
//                 id="email"
//                 name="email"
//                 placeholder="Email"
//                 textColor={"white"}
//                 onChange={handleChange}
//               />
//             </Box>
//             {isVisible ? (
//               <Alert
//                 status="success"
//                 variant="subtle"
//                 flexDirection="column"
//                 alignItems="center"
//                 justifyContent="center"
//                 textAlign="center"
//                 h={"100px"}
//               >
//                 <CloseButton
//                   alignSelf="flex-end"
//                   position="relative"
//                   onClick={onClose}
//                 />
//                 <AlertIcon boxSize="20px" mr={0} />
//                 <AlertTitle fontSize="lg">Reset Password!</AlertTitle>
//                 <AlertDescription maxWidth="sm">
//                   Forgot Password?
//                   <Link to="/auth/reset" style={{ color: "green" }}>
//                     {"Reset Password "}
//                   </Link>
//                 </AlertDescription>
//               </Alert>
//             ) : (
//               <Button
//                 type="submit"
//                 textColor={"white"}
//                 bg={"#04A51E"}
//                 borderRadius={"full"}
//                 width="100%"
//                 onClick={onOpen}
//               >
//                 Send Instruction
//               </Button>
//             )}
//           </form>
//           <Text mt={4} textColor={"white"}>
//             Already have an account ?{" "}
//             <Link to="/" style={{ color: "green" }}>
//               Forget
//             </Link>
//           </Text>
//         </Box>
//       </Flex>
//     </Box>
//   );
// };

// export default FormForget;

import { KeyboardEvent } from "react";
import { FormControl, Input, Text, Button, Box } from "@chakra-ui/react";
import { useForget } from "../hooks/useForget";
import { useNavigate } from "react-router-dom";

const FormForget = (): React.JSX.Element => {
  const navigate = useNavigate();

  const { handleChange, handleSubmit } = useForget();
  const handleKeyPress = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      handleSubmit();
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
        color={"green"}
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
        placeholder="email"
        name="email"
        onChange={handleChange}
        onKeyDown={handleKeyPress}
      />

      <Button
        backgroundColor={"green"}
        colorScheme="green"
        color={"white"}
        onClick={handleSubmit}
      >
        Send Instruction !
      </Button>
      {/* <Box display="flex" justifyContent={"flex-end"} fontSize={"sm"}>
        <Text
          color={"green"}
          cursor={"pointer"}
          onClick={() => navigate("/auth/forget")}
        >
          Forget Password
        </Text>
      </Box> */}
    </FormControl>
  );
};

export default FormForget;
