// import { Container } from "@chakra-ui/react";
import { ReactNode } from "react";
import { MyProfile, Navbar } from "@/components";
import { Box } from "@chakra-ui/react";

export default function Main({ children }: { children: ReactNode }) {
  return (
    <Box display="flex" h="100vh">
      <Box display={"flex"} justifyContent={"start"}>
        <Navbar />
      </Box>

      {children}

      <Box display={"flex"} flexDirection={"column"} justifyContent={"end"}>
        <MyProfile />
      </Box>
    </Box>
  );
}
