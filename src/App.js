import { ChakraProvider } from '@chakra-ui/react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Login } from './components/Login';
import { Main } from './components/Main';
import { Navbar } from './components/Navbar';
import { PrivateRoute } from './utils/PrivateRoute';

function App() {
  return (
    <ChakraProvider>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route element={<PrivateRoute />}>
            <Route path='/' element={<Main />} />
          </Route>
          <Route path='/login' element={<Login />} />
        </Routes>
      </BrowserRouter>
    </ChakraProvider>
  );
}

export default App;
