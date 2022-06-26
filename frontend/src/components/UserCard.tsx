import { Avatar, Image, Text, Box, Button, Center, Flex, FormControl, FormLabel, Input, useColorModeValue, Heading, Stack, InputGroup, InputRightAddon, NumberDecrementStepper, NumberIncrementStepper, NumberInput, NumberInputField, NumberInputStepper } from "@chakra-ui/react";
import React, { useState } from "react";

import { useForm } from "react-hook-form";

import { UserData } from "../types";

import userBG from "../images/userBackground.jpg";

const UserCard: React.FC = () => {
    const [editing, setEditing] = useState(false);

    const [userData, setUserData] = useState<UserData>({
        name: "ユーザ名",
        age: 21,
        email: "info@example.com"
    });

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm({
        defaultValues: {
            name: "",
            age: "",
            email: ""
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

    const saveEditing = () => {
        /**
         * 編集中ならDBに保存
         */
        if (editing) {
            console.log("Save to DB");

        }
        // 保存状態を反転
        setEditing(!editing);
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
                            'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&ixid=eyJhcHBfaWQiOjE3Nzg0fQ'
                        }
                        css={{
                            border: '2px solid white',
                        }}
                    />
                </Flex>
                <Box p={6}>
                    {editing ? (
                        <Stack spacing={4} align={'center'} mb={5}>
                            <Input variant="flushed" type={"text"} placeholder="ユーザ名"
                                {...register("name", { required: true, maxLength: 20 })}
                                defaultValue={userData.name}
                                value={userData.name}
                                onChange={handleName}
                            />
                            <InputGroup>
                                <NumberInput
                                    variant={"flushed"}
                                    {...register("age", { required: true })}
                                    step={1} min={0} max={100}
                                    defaultValue={userData.age}
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
                                defaultValue={userData.email}
                                value={userData.email}
                                onChange={handleEmail}
                            />
                        </Stack>
                    ) : (
                        <Stack spacing={4} align={'center'} mb={5}>
                            <Heading fontSize={'2xl'} fontWeight={700} fontFamily={'body'}>
                                {userData.name}
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
                        onClick={saveEditing}
                    >
                        {editing ? "保存する" : "編集する"}
                    </Button>
                </Box>
            </Box>
        </Center>
    );
}

export default UserCard;