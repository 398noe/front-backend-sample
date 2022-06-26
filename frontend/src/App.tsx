import { Box } from '@chakra-ui/react';
import React from 'react';
import './App.css';
import Login from './components/Login';
import Register from './components/Register';
import UserCard from './components/UserCard';

const App: React.FC = () => {
    return (
        <Box className="App">
            <Login />
            <Register />
            <UserCard />
        </Box>
    );
}

export default App;
