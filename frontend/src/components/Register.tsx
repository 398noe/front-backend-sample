import { Box, Input, Stack, Button, useColorModeValue, Alert, AlertIcon, AlertTitle, InputGroup, InputRightAddon, NumberInput, NumberInputField, Heading, Center } from '@chakra-ui/react';
import React, { useState } from 'react';
import { useRecoilState } from 'recoil';
import axios from 'axios';
import aspida from "@aspida/axios";
import api from "../api/$api";
import { userDataState } from '../atom/userData';
import { useForm } from 'react-hook-form';


const Login: React.FC = () => {
    const [id, setId] = useState<string>("");
    const [userData, setUserData] = useRecoilState(userDataState);
    const [isError, setIsError] = useState<boolean>(false);

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm({
        defaultValues: {
            name: userData.name,
            age: userData.age,
            email: userData.email
        }
    });

    const handleName = (event: React.ChangeEvent<HTMLInputElement>) => {
        setUserData({ ...userData, name: event.target.value });
    }

    const handleAge = (value: any) => {
        setUserData({ ...userData, age: value });
    }

    const handleEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
        setUserData({ ...userData, email: event.target.value });
    }
    // aspida
    const client = api(aspida(axios, { baseURL: "http://localhost:8000/api" }));

    const addUserData = async () => {
        try {
            // データ登録
            const res = await client.user.new.post({
                body: {
                    name: userData.name,
                    age: userData.age,
                    email: userData.email
                }
            });
            // エラー状態を解除
            setIsError(false);
            // UserDataにデータを渡す
            setUserData(res.body.data);
            console.log(res.body.data);
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
                        新規登録
                    </Heading>
                    {
                        (errors.name) && (
                            <Alert status='error' maxW={"270px"}>
                                <AlertIcon />
                                <AlertTitle>ユーザ名は20文字以下で入力してください</AlertTitle>
                            </Alert>
                        )
                    }
                    {
                        (errors.age) && (
                            <Alert status='error' maxW={"270px"}>
                                <AlertIcon />
                                <AlertTitle>年齢を入力してください</AlertTitle>
                            </Alert>
                        )
                    }
                    {
                        (errors.email) && (
                            <Alert status='error' maxW={"270px"}>
                                <AlertIcon />
                                <AlertTitle>メールアドレスを入力してください</AlertTitle>
                            </Alert>
                        )
                    }
                    <Stack spacing={4} align={'center'} mb={5}>
                        <Input isRequired={true} variant="flushed" placeholder="ユーザ名"
                            {...register("name", { required: true, maxLength: 20 })}
                            value={userData.name}
                            onChange={handleName}
                        />
                        <InputGroup>
                            <NumberInput
                                isRequired
                                variant={"flushed"}
                                {...register("age", { required: true })}
                                step={1} min={0} max={100}
                                value={userData.age}
                                onChange={handleAge}
                            >
                                <NumberInputField
                                />
                            </NumberInput>
                            <InputRightAddon children="歳" />
                        </InputGroup>
                        <Input isRequired variant="flushed" type={"email"} placeholder="メールアドレス"
                            {...register("email", { required: true, maxLength: 50 })}
                            value={userData.email}
                            onChange={handleEmail}
                        />
                    </Stack>
                    <Stack spacing={4}>
                        <Button
                            bg={'green.400'}
                            color={'white'}
                            _hover={{
                                bg: 'green.500',
                            }}
                            onClick={handleSubmit((data) => {
                                addUserData();
                            })}>
                            新規登録
                        </Button>
                    </Stack>
                </Stack>
            </Box>
        </Center>

    );
}

export default Login;