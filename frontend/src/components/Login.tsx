import { Box, FormControl, FormLabel, Input, Stack, Button, useColorModeValue, Alert, AlertIcon, AlertTitle, Center, Heading } from '@chakra-ui/react';
import React, { useState } from 'react';
import { useRecoilState } from 'recoil';
import axios from 'axios';
import aspida from "@aspida/axios";
import api from "../api/$api";
import { userDataState, userStatusState } from '../atom/userData';
import { useForm } from 'react-hook-form';


const Login: React.FC = () => {
    const [id, setId] = useState<string>("");
    const [userData, setUserData] = useRecoilState(userDataState);
    const [userStatus, setUserStatus] = useRecoilState(userStatusState);
    const [isError, setIsError] = useState<boolean>(false);
    const handleId = (event: React.ChangeEvent<HTMLInputElement>) => {
        setId(event.target.value);
    }
    // aspida
    const client = api(aspida(axios, { baseURL: "http://localhost:8000/api" }));
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm({
        defaultValues: {
            id: userData.id,
        }
    });
    const getUserData = async () => {
        // idからデータを取得
        console.log(id);
        try {
            const res = await client.user.get({ query: { id } });
            // エラー状態を解除
            setIsError(false);
            // UserDataにデータを渡す
            setUserData(res.body.data);
            setUserStatus({...userStatus, isLogin: true})
        } catch (error) {
            setIsError(true);
        }
    }
    return (
        <Center py={6}>
            <Box
                maxW={"270px"}
                w={"270px"}
                overflow={"hidden"}
                rounded={'lg'}
                bg={useColorModeValue('white', 'gray.700')}
                boxShadow={'lg'}
                p={8}>
                <Stack spacing={4}>
                    <Heading fontSize={'2xl'} textAlign={'center'}>
                        ログイン
                    </Heading>
                    {
                        isError ? (
                            <Alert status='error' maxW={"270px"}>
                                <AlertIcon />
                                <AlertTitle>IDが正しくありません</AlertTitle>
                            </Alert>
                        ) : (<></>)
                    }
                    <Input isRequired={true} variant="flushed" placeholder="ID"
                        {...register("id", { required: true })}
                        value={id}
                        onChange={handleId}
                    />
                    <Stack spacing={4}>
                        <Button
                            bg={'blue.400'}
                            color={'white'}
                            _hover={{
                                bg: 'blue.500',
                            }}
                            onClick={handleSubmit((data) => {
                                getUserData();
                            })}
                        >
                            ログイン
                        </Button>
                    </Stack>
                </Stack>
            </Box>
        </Center>
    );
}

export default Login;