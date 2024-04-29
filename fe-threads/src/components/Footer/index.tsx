import { Box, Image, Text } from "@chakra-ui/react";
import { BsDot } from "react-icons/bs";

// import DW from "../assets/img/dw.png";
import {
  AiFillGithub,
  AiFillLinkedin,
  AiFillFacebook,
  AiFillInstagram,
} from "react-icons/ai";

export const Footer = (): React.JSX.Element => {
  return (
    <Box
      w={"100%"}
      p={"15px"}
      backgroundColor={"rgba(38, 38, 38, 1)"}
      display={"flex"}
      flexDir={"column"}
      borderRadius={"lg"}
    >
      <Box display={"flex"}>
        <Text fontSize={"12px"}>Developed by Aviicn</Text>
        <BsDot color="gray" />
        <Box display={"flex"} gap={"1"}>
          <AiFillGithub />
          <AiFillLinkedin style={{ marginLeft: "3px" }} />
          <AiFillFacebook style={{ marginLeft: "3px" }} />
          <AiFillInstagram style={{ marginLeft: "3px" }} />
        </Box>
      </Box>
      <Box display={"flex"} alignItems={"center"}>
        <Text fontSize={"12px"}>Poweredby</Text>
        <Box mx={"2px"}>
          <Image
            src="https://dumbways.id/assets/images/brandred.png"
            w="18px"
            h={3}
            ml={1}
            mt="5px"
          />
        </Box>
        <Text fontSize={"12px"}>Dumbways Indonesia</Text>
        <BsDot color="gray" />
        <Text fontSize={"12px"}>#1 Coding Bootcamp</Text>
      </Box>
    </Box>
  );
};
