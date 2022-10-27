import {
  Flex,
  Heading,
  IconButton,
  useColorMode,
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure,
  Button,
  useToast,
  Text,
} from "@chakra-ui/react";
import React from "react";
import { FiSun } from "react-icons/fi";
import { BiMoon, BiMenuAltRight } from "react-icons/bi";
import { signOut } from "firebase/auth";
import { auth } from "../firebase/config";
import { LoginWithGoogle } from "./LoginWithGoogle";
import { useNavigate } from "react-router-dom";

export const Navbar = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = React.useRef();
  const toast = useToast();
    const navigate = useNavigate()

  const logout = () => {
    signOut(auth)
      .then(() => {
        toast({
          title: "Logout Successful",
          status: "success",
          isClosable: true,
        });
        localStorage.removeItem("email");
        navigate('/login')
      })
      .catch((error) => {
        toast({
          title: "Logout Failed",
          status: "error",
          description: `logout failed because : ${error.message}`,
          isClosable: true,
        });
      });
  };

  return (
    <Flex
      alignItems={"center"}
      justifyContent={"space-between"}
      boxShadow={"dark-lg"}
      p={"0.5rem"}
    >
      <Flex flexDir={'column'} >
        <Heading as="h6" fontSize={"1.5rem"}>
          Piza's
        </Heading>
        <Text opacity={0.8}>Piezoelectric Healthy Shoes</Text>
      </Flex>
      <Flex gap={"0.4rem"}>
        <IconButton
          onClick={toggleColorMode}
          icon={colorMode === "dark" ? <FiSun /> : <BiMoon />}
        />
        <IconButton onClick={onOpen} ref={btnRef} icon={<BiMenuAltRight />} />
      </Flex>
      <Drawer
        isOpen={isOpen}
        placement="right"
        onClose={onClose}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Profile</DrawerHeader>

          <DrawerBody></DrawerBody>

          <DrawerFooter>
            <Flex
              justifyContent={"center"}
              alignItems={"center"}
              gap={"0.3rem"}
            >
              <LoginWithGoogle secondaryAction={onclose} />
              {auth.currentUser === null ? (
                ""
              ) : (
                <Button onClick={logout}>Logout</Button>
              )}
            </Flex>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </Flex>
  );
};
