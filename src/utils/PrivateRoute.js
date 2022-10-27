import { useToast } from '@chakra-ui/react'
import React, { useEffect } from 'react'
import { Outlet, Navigate } from 'react-router-dom'
import { auth } from '../firebase/config'

export const PrivateRoute = () => {
    const toast = useToast()

    useEffect(() => {
        if (auth.currentUser === null) {
            toast({
                title: "401 Unauthorized",
                status: "warning",
                description: "login to use this app",
                isClosable: true
            })
        }
    }, [toast])

  return (
    auth.currentUser === null ? <Navigate to={'/login'} /> : <Outlet />
  )
}
