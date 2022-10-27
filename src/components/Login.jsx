import { Flex } from '@chakra-ui/react'
import React from 'react'
import { auth } from '../firebase/config'
import { LoginWithGoogle } from './LoginWithGoogle'

export const Login = () => {
  return (
    <Flex height={'100vh'} alignItems={'center'} justifyContent={'center'}>
        <Flex borderRadius={'0.5rem'} boxShadow={'dark-lg'} p={'2rem'}>
            <LoginWithGoogle />
        </Flex>
    </Flex>
  )
}
