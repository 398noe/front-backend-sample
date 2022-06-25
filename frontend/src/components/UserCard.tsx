import { Avatar, Image, Text, Box, Button, Center, Flex, FormControl, FormLabel, Input, useColorModeValue, Heading, Stack } from "@chakra-ui/react";
import userBG from "../images/userBackground.jpg";
import React from "react";

const UserCard: React.FC = () => {
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
                    <Stack spacing={0} align={'center'} mb={5}>
                        <Heading fontSize={'2xl'} fontWeight={500} fontFamily={'body'}>
                            ユーザ名
                        </Heading>
                    </Stack>

                    <Stack align={"center"} mb={5}>
                        <Heading fontSize={"lg"} fontWeight={500} fontFamily={"monospace"}>
                            21歳
                        </Heading>
                        <Heading fontSize={"lg"} fontWeight={500} fontFamily={'body'}>
                            info@example.com
                        </Heading>

                    </Stack>
                    <Button
                        w={'full'}
                        mt={4}
                        bg={useColorModeValue('#151f21', 'gray.900')}
                        color={'white'}
                        rounded={'md'}
                        _hover={{
                            transform: 'translateY(-2px)',
                            boxShadow: 'lg',
                        }}>
                        編集する
                    </Button>
                </Box>
            </Box>
        </Center>
    );
}

export default UserCard;