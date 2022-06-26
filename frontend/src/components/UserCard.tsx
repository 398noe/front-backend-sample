import { Avatar, Image, Box, Button, Center, Flex, Input, useColorModeValue, Heading, Stack, InputGroup, InputRightAddon, NumberInput, NumberInputField } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { UserData } from "../types";
import userBG from "../images/userBackground.jpg";
import { calcMD5 } from "../util/calcMD5";
import { useRecoilState } from "recoil";
import { userDataState } from "../atom/userData";
import axios from "axios";
import aspida from "@aspida/axios";
import api from "../api/$api";

const UserCard: React.FC = () => {
    const [editing, setEditing] = useState(false);
    const [userData, setUserData] = useRecoilState(userDataState);
    const [gravatarEmail, setGravatarEmail] = useState(userData.email);
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

    const changeUserData = async () => {
        try {
            // データ登録
            const res = await client.user.post({
                body: {
                    id: userData.id,
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

    useEffect(() => {
        setGravatarEmail(userData.email)
    }, [userData.email]);

    const saveEditing = () => {
        /**
         * 編集中ならDBに保存
         */
        if (editing) {
            console.log("Save to DB");
            try {
                changeUserData();
                setGravatarEmail(userData.email);
                setEditing(false);                   
            } catch (error) {
                // エラーが発生した場合編集画面から遷移させない
            }
        } else {
            setEditing(true);
        }
    }

    return (
        <Center py={6}>
            <Box
                maxW={"270px"}
                w={"full"}
                bg={useColorModeValue("white", "gray.800")}
                boxShadow={"2xl"}
                rounded={"md"}
                overflow={"hidden"}
            >
                <Image
                    h={'120px'}
                    w={'full'}
                    src={userBG}
                    objectFit={'cover'}
                />
                <Flex justify={'center'} mt={-12}>
                    <Avatar
                        size={'xl'}
                        src={
                            'https://www.gravatar.com/avatar/' + calcMD5(gravatarEmail)
                        }
                        css={{
                            border: '2px solid white',
                        }}
                    />
                </Flex>
                <Box p={6}>
                    {editing ? (
                        <Stack spacing={4} align={'center'} mb={5}>
                            <Input variant="flushed" placeholder="ユーザ名"
                                {...register("name", { required: true, maxLength: 20 })}
                                value={userData.name}
                                onChange={handleName}
                            />
                            <InputGroup>
                                <NumberInput
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
                            <Input variant="flushed" type={"email"} placeholder="メールアドレス"
                                {...register("email", { required: true, maxLength: 50 })}
                                value={userData.email}
                                onChange={handleEmail}
                            />
                        </Stack>
                    ) : (
                        <Stack spacing={4} align={'center'} mb={5}>
                            <Heading fontSize={'2xl'} fontWeight={700} fontFamily={'body'}>
                                {userData.name}
                            </Heading>
                            <Heading fontSize={"xs"} color={"gray.500"} fontWeight={300} fontFamily={'body'}>
                                {userData.id}
                            </Heading>
                            <Heading fontSize={"lg"} fontWeight={300} fontFamily={"body"}>
                                {userData.age}歳
                            </Heading>
                            <Heading fontSize={"lg"} fontWeight={300} fontFamily={'body'}>
                                {userData.email}
                            </Heading>
                        </Stack>
                    )}
                    <Button
                        w={'full'}
                        mt={4}
                        bg={useColorModeValue('#151f21', 'gray.900')}
                        color={'white'}
                        rounded={'md'}
                        _hover={{
                            transform: 'translateY(-2px)',
                            boxShadow: 'lg',
                        }}
                        onClick={handleSubmit((data) => {
                            saveEditing();
                        })}
                    >
                        {editing ? "保存する" : "編集する"}
                    </Button>
                </Box>
            </Box>
        </Center>
    );
}

export default UserCard;
