import { Flex, useToast } from "@chakra-ui/react";
import { signOut } from "firebase/auth";
import React from "react";
import { useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase/config";
import { LoginWithGoogle } from "./LoginWithGoogle";

export const Login = () => {
  const toast = useToast();
  const id = "id";
  const [user] = useAuthState(auth)

  useEffect(() => {
    const logout = () => {
        if (user) {
            signOut(auth)
            .then(() => {
              if (!toast.isActive(id)) {
                toast({
                  id,
                  title: "Logout Successful",
                  status: "success",
                  isClosable: true,
                });
              }
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
      <Flex borderRadius={"0.5rem"} boxShadow={"dark-lg"} p={"2rem"}>
        <LoginWithGoogle />
      </Flex>
    </Flex>
  );
};
