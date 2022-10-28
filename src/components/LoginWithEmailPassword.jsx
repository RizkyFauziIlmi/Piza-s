import { Button, Flex, Input, InputGroup, InputLeftElement, InputRightElement, useToast } from '@chakra-ui/react'
import { signInWithEmailAndPassword } from 'firebase/auth'
import React from 'react'
import { AiFillMail } from 'react-icons/ai'
import { FaEye, FaEyeSlash } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'
import { auth } from '../firebase/config'

export const LoginWithEmailPassword = () => {
    const [show, setShow] = React.useState(false)
    const [email, setEmail] = React.useState("")
    const [password, setPassword] = React.useState("")
    const toast = useToast()
    const navigate = useNavigate()
    

    const LoginWithEmailPassword = () => {
        signInWithEmailAndPassword(auth, email, password)
        .then((credential) => {
            toast({
                title: "Login Successful",
                status: "success",
                description: `you login with ${credential.user.email}`,
                isClosable: true,
            })
            localStorage.setItem("email", credential.user.email)
            navigate("/")
        })
        .catch((error) => {
            toast({
                title: "Login Failed",
                status: "error",
                description: error.message,
                isClosable: true,
            })
        })
    }



  return (
    <Flex pb={'0.5rem'} flexDir={'column'} gap={'0.5rem'}>
        <InputGroup>
            <InputLeftElement pointerEvents={'none'} children={<AiFillMail />} />
            <Input onChange={(event) => setEmail(event.target.value)} type={'email'}  placeholder="Enter email..." />
        </InputGroup>
        <InputGroup>
            <InputLeftElement pointerEvents={'none'} children={show ? <FaEyeSlash /> : <FaEye />} />
            <Input onChange={(event) => setPassword(event.target.value)} type={show ? 'text' : 'password'} placeholder="Enter password..." />
            <InputRightElement width='4.5rem'>
                <Button h='1.75rem' size='sm' onClick={() => setShow(!show)}>{show ? "Hide" : "Show"}</Button>
            </InputRightElement>
        </InputGroup>
        <Button type='submit' onClick={LoginWithEmailPassword}>Login</Button>
    </Flex>
  )
}
