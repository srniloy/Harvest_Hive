'use client'
import React from 'react'
import data from '../../../public/Data'
import { ChakraProvider, theme } from '@chakra-ui/react'
import AppMap from '@components/AppMap'
const DbActions = () => {
    const action = async () => {

        console.log(data.traderSearch)
        for (let i = 0; i < 5; i++) {


            const postData = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userData),
            };


            const res = await fetch(
                '/api/auth/signup',
                postData
            )
        }
    }
    return (
        <div style={{ height: '100vh', width: '100%', backgroundColor: '#fff' }}>
            <ChakraProvider theme={theme}>
                <AppMap />
            </ChakraProvider>
        </div>
    )
}

export default DbActions