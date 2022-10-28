import { Flex, Text, useToast } from "@chakra-ui/react";
import { signOut } from "firebase/auth";
import React from "react";
import { useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Link } from "react-router-dom";
import { auth } from "../firebase/config";
import { LoginWithEmailPassword } from "./LoginWithEmailPassword";
import { LoginWithGoogle } from "./LoginWithGoogle";

export const Login = () => {
  const toast = useToast();
  const [user] = useAuthState(auth);

  useEffect(() => {
    const logout = () => {
      if (user) {
        signOut(auth)
          .then(() => {
            localStorage.removeItem("email");
          })
          .catch((error) => {
            toast({
              title: "Logout Failed",
              status: "error",
              description: `logout failed because : ${error.message}`,
              isClosable: true,
            });
          });
      }
    };

    logout();
  }, [toast, user]);

  return (
    <Flex height={"100vh"} alignItems={"center"} justifyContent={"center"}>
      <Flex
        flexDir={"column"}
        alignItems={"center"}
        justifyContent={"center"}
        borderRadius={"0.5rem"}
        boxShadow={"dark-lg"}
        p={"2rem"}
      >
        <LoginWithEmailPassword />
        <Text>- OR -</Text>
        <LoginWithGoogle />
        <Flex gap={"0.1rem"} fontSize={"0.8rem"} fontWeight={"semibold"} pt={'1.5rem'}>
          <Text opacity={0.5}>Not have an Account ?</Text>
          <Link to={"/register"}>
            <Text as={"u"}>Register now!</Text>
          </Link>
        </Flex>
      </Flex>
    </Flex>
  );
};
