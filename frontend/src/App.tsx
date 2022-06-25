import { Box } from '@chakra-ui/react';
import React from 'react';
import './App.css';
import UserCard from './components/UserCard';

const App: React.FC = () => {
    return (
        <Box className="App">
            <UserCard />
        </Box>
    );
}

export default App;
