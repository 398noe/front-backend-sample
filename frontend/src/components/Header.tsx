import { Box, Button, Flex, Stack, Text, useColorMode, useColorModeValue } from "@chakra-ui/react";
import { MoonIcon, SunIcon } from "@chakra-ui/icons";
import { MdLogin, MdLogout } from "react-icons/md";
import { BsPlusSquare } from "react-icons/bs";
import { userStatusState } from "../atom/userData";
import { useRecoilState } from "recoil";
import { UserStatus } from "../types";

export const Header = () => {
    const { colorMode, toggleColorMode } = useColorMode();
    const [userStatus, setUserStatus] = useRecoilState<UserStatus>(userStatusState);

    const StatusButton = () => {
        /**
         * ログイン中ならログアウトを表示
         */
        if(userStatus.isLogin) {
            return (
                <MdLogout />
            )
        } else {
            // ログアウト中なら
            if(userStatus.isRegister) {
                return (
                    <MdLogin />
                );
            } else {
                return (
                    <BsPlusSquare />
                )
            }
        }
    }

    const handleStatus = () => {
        /**
         * ログイン中ならログアウトする
         */
        if(userStatus.isLogin) {
            setUserStatus({isLogin: false, isRegister: false});
        } else {
            if(userStatus.isRegister) {
                setUserStatus({...userStatus, isRegister: false});
            } else {
                setUserStatus({...userStatus, isRegister: true})
            }
        }
    }
    return (
        <Box pos={"fixed"} zIndex={100} w={"full"} bg={useColorModeValue("white", "gray.900")}>
            <Flex
                h={16}
                px={4}
                alignItems={"center"}
                justifyContent={"space-between"}
                borderBottom={1}
                borderStyle={"solid"}
                borderColor={useColorModeValue("gray.200", "gray.800")}
            >
                <Box px={2}>
                    <Button as="a" href="/" variant="ghost"><Text fontSize={24} fontWeight={700}>Sample</Text></Button>
                </Box>
                <Flex alignItems={'center'}>
                    <Stack direction={'row'} spacing={2}>
                    
                    <Button variant="ghost" onClick={handleStatus}><StatusButton /></Button>
                    
                        <Button onClick={toggleColorMode} variant="ghost">
                            {colorMode === "light" ? <MoonIcon /> : <SunIcon />}
                        </Button>
                    </Stack>
                </Flex>
            </Flex>
        </Box>
    );
}

export default Header;