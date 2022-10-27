import { Button, useToast } from "@chakra-ui/react";
import { signInWithPopup } from "firebase/auth";
import React from "react";
import { useNavigate } from "react-router-dom";
import { auth, db, provider } from "../firebase/config";
import { FcGoogle } from "react-icons/fc";
import { doc, setDoc } from "firebase/firestore";

export const LoginWithGoogle = ({ secondaryAction = null }) => {
  const toast = useToast();
  const navigate = useNavigate();

  const makeUserNewField = async () => {
    await setDoc(doc(db, "infoAccount", auth.currentUser.email), {
        email: auth.currentUser.email,
      activities: [
      ],
    });
  };

  const loginWithGoogle = async () => {
    await signInWithPopup(auth, provider)
      .then((result) => {
        toast({
          title: "Login Successful",
          status: "success",
          description: `you login with ${result.user.email}`,
          isClosable: true,
        });
        if (auth.currentUser.metadata.creationTime === auth.currentUser.metadata.lastSignInTime) {
            makeUserNewField()
        }
        localStorage.setItem("email", result.user.email);
        navigate("/");
        secondaryAction();
      })
      .catch((error) => {
        toast({
          title: "Login Failed",
          status: "error",
          description: error.message,
          isClosable: true,
        });
      });
  };


  return (
    <Button leftIcon={<FcGoogle />} onClick={loginWithGoogle}>
      Login With Google
    </Button>
  );
};
