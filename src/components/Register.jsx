import { Flex, Text } from '@chakra-ui/react'
import React from 'react'
import { Link } from 'react-router-dom'
import { LoginWithGoogle } from './LoginWithGoogle'
import { RegisterWithEmailPassword } from './RegisterWithEmailPassword'

export const Register = () => {
  return (
    <Flex height={"100vh"} alignItems={"center"} justifyContent={"center"}>
      <Flex flexDir={'column'} alignItems={'center'} justifyContent={'center'} borderRadius={"0.5rem"} boxShadow={"dark-lg"} p={"2rem"}>
        <RegisterWithEmailPassword />
        <Text>- OR -</Text>
        <LoginWithGoogle />
        <Flex gap={"0.1rem"} fontSize={"0.8rem"} fontWeight={"semibold"} pt={'1.5rem'}>
          <Text opacity={0.5}>Already Have an Accounct ?</Text>
          <Link to={"/login"}>
            <Text as={"u"}>Login Now!</Text>
          </Link>
        </Flex>
      </Flex>
    </Flex>
  )
}
