import { Box, Flex } from '@chakra-ui/react';
import React from 'react';
import { useRecoilValue } from 'recoil';
import './App.css';
import { userStatusState } from './atom/userData';
import Header from './components/Header';
import Login from './components/Login';
import Register from './components/Register';
import UserCard from './components/UserCard';
import { UserStatus } from './types';

const App: React.FC = () => {
    const userStatus = useRecoilValue<UserStatus>(userStatusState);

    const View = () => {
        /**
         * ログイン中ならカードを表示
         */
        if(userStatus.isLogin) {
            return (
                <UserCard />
            )
        } else {
            if(userStatus.isRegister) {
                return (
                    <Register />
                );
            } else {
                return (
                    <Login />
                )
            }
        }
    }

    return (
        <Box className="App">
            <Header />
            <Flex minH={"100vh"} direction={"column"} justify={"center"}>
                <View />
            </Flex>
        </Box>
    );
}

export default App;
