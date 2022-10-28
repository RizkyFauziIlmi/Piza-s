import {
  Button,
  Flex,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  useToast,
} from "@chakra-ui/react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import React from "react";
import { AiOutlineMail } from "react-icons/ai";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../firebase/config";

export const RegisterWithEmailPassword = () => {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");
  const [show, setShow] = React.useState(false);
  const toast = useToast();
    const navigate = useNavigate()

  const makeUserNewField = async () => {
    await setDoc(doc(db, "infoAccount", auth.currentUser.email), {
      email: auth.currentUser.email,
      activities: [],
    });
  };

  const register = () => {
    if (password === confirmPassword) {
      createUserWithEmailAndPassword(auth, email, password).then((credential) => {
        toast({
            title: "Registration Success",
            status: "success",
            description: `Login with this email : ${credential.user.email}`
        })
        if (
          credential.user.metadata.creationTime ===
          credential.user.metadata.lastSignInTime
        ) {
          makeUserNewField();
        }
        navigate('/login')
      })
      .catch((error) => {
        toast({
            title: "Registration Failed",
            status: "error",
            description: error.message
        })
      })
    } else {
        toast({
            title: "Registration Failed",
            status: "error",
            description: "password and confirm password different"
        })
    }
  };

  return (
    <Flex flexDir={"column"} gap={"0.3rem"}>
      <InputGroup>
        <InputLeftElement pointerEvents={"none"} children={<AiOutlineMail />} />
        <Input
          onChange={(event) => setEmail(event.target.value)}
          type={"text"}
          placeholder="Enter email..."
        />
      </InputGroup>
      <InputGroup>
        <InputLeftElement
          pointerEvents={"none"}
          children={show ? <FaEyeSlash /> : <FaEye />}
        />
        <Input
          onChange={(event) => setPassword(event.target.value)}
          type={show ? "text" : "password"}
          placeholder="Enter password..."
        />
        <InputRightElement width={"4.5rem"}>
          <Button h="1.75rem" size="sm" onClick={() => setShow(!show)}>
            {show ? "Hide" : "Show"}
          </Button>
        </InputRightElement>
      </InputGroup>
      <InputGroup>
        <InputLeftElement
          pointerEvents={"none"}
          children={show ? <FaEyeSlash /> : <FaEye />}
        />
        <Input
          onChange={(event) => setConfirmPassword(event.target.value)}
          type={show ? "text" : "password"}
          placeholder="Enter confirm password..."
        />
      </InputGroup>
      <Button mt={"0.2rem"} onClick={register}>Register</Button>
    </Flex>
  );
};
