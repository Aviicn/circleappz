import { RootState } from "@/store/type/RootState";
import {
  UnorderedList,
  ListItem,
  Box,
  Avatar,
  Button,
  FormControl,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalOverlay,
  WrapItem,
  useDisclosure,
} from "@chakra-ui/react";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import { AiOutlineHeart } from "react-icons/ai";
import { BiLogOut, BiSolidHomeCircle } from "react-icons/bi";
// import { FaImage } from "react-icons/fa6";

import { TbUserSearch } from "react-icons/tb";
import { CgProfile } from "react-icons/cg";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { setAuthToken } from "@/libs/api";
import { AUTH_LOGOUT } from "@/store/RootReducer";

export function Navbar() {
  // const { pathname } = useLocation();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(AUTH_LOGOUT());
    setAuthToken("");
    window.location.reload();
  };
  const auth = useSelector((root: RootState) => root.auth);

  return (
    <Box
      bg="black"
      w="320px"
      p={3}
      height="100%"
      // borderRight="1px"
      borderColor="#313131"
      color="white"
    >
      <UnorderedList
        listStyleType="none"
        display="flex"
        flexDir={"column"}
        gap={"5"}
      >
        <ListItem color={"green"} fontSize={"50px"} fontWeight={"bold"}>
          circle
        </ListItem>
        <Link to="/">
          <ListItem
            color={"white"}
            display={"flex"}
            alignItems={"center"}
            gap={"2"}
            cursor={"pointer"}
          >
            <BiSolidHomeCircle style={{ fontSize: "25px" }} />
            Home
          </ListItem>
        </Link>

        <Link to="/search">
          <ListItem
            color={"white"}
            display={"flex"}
            alignItems={"center"}
            gap={"2"}
          >
            <TbUserSearch style={{ fontSize: "25px" }} /> Search
          </ListItem>
        </Link>

        <Link to="/follow">
          <ListItem
            color={"white"}
            display={"flex"}
            alignItems={"center"}
            gap={"2"}
          >
            <AiOutlineHeart style={{ fontSize: "25px" }} />
            {/* {pathname === "/follow" ? <AiFillHeart /> : <AiOutlineHeart />} */}
            Follows
          </ListItem>
        </Link>

        <Link to={`/profile/:id`}>
          <ListItem
            color={"white"}
            display={"flex"}
            alignItems={"center"}
            gap={"2"}
            cursor={"pointer"}
            onClick={() => navigate("profile  ")}
          >
            <CgProfile style={{ fontSize: "25px" }} />
            Profile
          </ListItem>
        </Link>

        <WrapItem>
          <Button
            onClick={onOpen}
            bg={"green"}
            width="55%"
            color={"white"}
            mt={4}
            ml={3}
            borderRadius="20"
          >
            Create Post
          </Button>
          <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent bg="#262626" color="white" borderRadius="15px">
              <ModalCloseButton />
              <ModalBody pb={6}>
                <WrapItem
                  mt={6}
                  p={2}
                  fontSize="2xl"
                  display="flex"
                  borderBottom="1px"
                  borderColor="#313131"
                >
                  <FormControl margin="3">
                    <Avatar
                      size="md"
                      mt={-2}
                      name="Dan Abrahmov"
                      src="https://i.pinimg.com/236x/41/2f/95/412f951a84614f3eaa634b44b7514e0e.jpg"
                    />
                    <Input
                      ml={3}
                      mt={1}
                      mr={3}
                      width="60%"
                      variant="unstyled"
                      placeholder="What is happening?"
                    />
                    <AddPhotoAlternateIcon fontSize="large" />
                  </FormControl>
                </WrapItem>
              </ModalBody>
              <ModalFooter>
                <Button mb="2" bg={"green"} borderRadius="20px" mr={3}>
                  Reply
                </Button>
              </ModalFooter>
            </ModalContent>
          </Modal>
        </WrapItem>

        <Link to={"/auth/login"} onClick={handleLogout}>
          <ListItem
            color={"white"}
            display={"flex"}
            alignItems={"center"}
            gap={"2"}
            mt={"200px"}
          >
            <BiLogOut />
            Log Out
          </ListItem>
        </Link>
      </UnorderedList>
    </Box>
  );
}
