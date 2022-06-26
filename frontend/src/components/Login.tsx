import { Flex, Box, FormControl, FormLabel, Input, Stack, Button, useColorModeValue, Alert, AlertIcon, AlertTitle } from '@chakra-ui/react';
import React, { useState } from 'react';
import { useRecoilState } from 'recoil';
import axios from 'axios';
import aspida from "@aspida/axios";
import api from "../api/$api";
import { userDataState } from '../atom/userData';


const Login: React.FC = () => {
    const [id, setId] = useState<string>("");
    const [userData, setUserData] = useRecoilState(userDataState);
    const [isError, setIsError] = useState<boolean>(false);
    const handleId = (event: React.ChangeEvent<HTMLInputElement>) => {
        setId(event.target.value);
    }
    // aspida
    const client = api(aspida(axios, { baseURL: "http://localhost:8000/api" }));

    const getUserData = async () => {
        // idからデータを取得
        console.log(id);
        try {
            const res = await client.user.get({ query: { id } });
            // エラー状態を解除
            setIsError(false);
            // UserDataにデータを渡す
            setUserData(res.body.data)
        } catch (error) {
            setIsError(true);
        }
    }
    return (
        <Flex
            align={'center'}
            justify={'center'}
            bg={useColorModeValue('gray.50', 'gray.800')}>
            <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
                <Box
                    rounded={'lg'}
                    bg={useColorModeValue('white', 'gray.700')}
                    boxShadow={'lg'}
                    p={8}>
                    <Stack spacing={4}>
                        {
                            isError ? (
                                <Alert status='error' maxW={"270px"}>
                                    <AlertIcon />
                                    <AlertTitle>IDが正しくありません</AlertTitle>
                                </Alert>
                            ) : (<></>)
                        }
                        <FormControl id="email">
                            <FormLabel>IDを入力</FormLabel>
                            <Input type="text" onChange={handleId} placeholder={"ID"} defaultValue={id} />
                        </FormControl>
                        <Stack spacing={4}>
                            <Button
                                bg={'blue.400'}
                                color={'white'}
                                _hover={{
                                    bg: 'blue.500',
                                }}
                                onClick={getUserData}
                            >
                                データを取得
                            </Button>
                        </Stack>
                    </Stack>
                </Box>
            </Stack>
        </Flex>
    );
}

export default Login;