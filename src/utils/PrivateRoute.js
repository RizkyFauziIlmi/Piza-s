import { useToast } from '@chakra-ui/react'
import React, { useEffect } from 'react'
import { Outlet, Navigate } from 'react-router-dom'
import { auth } from '../firebase/config'
import { useAuthState } from 'react-firebase-hooks/auth'

export const PrivateRoute = () => {
    const toast = useToast()
    const [user] = useAuthState(auth)

    useEffect(() => {
        if (!user) {
            toast({
                title: "401 Unauthorized",
                status: "warning",
                description: "login to use this app",
                isClosable: true
            })
        }
    }, [toast, user])

  return (
    !user ? <Navigate to={'/login'} /> : <Outlet />
  )
}
