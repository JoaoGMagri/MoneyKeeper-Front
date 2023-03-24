import React from 'react';
import { BrowserRouter as Router, Routes, Route, } from 'react-router-dom';
import styled from 'styled-components';

import Login from './pages/Login';
import Home from './pages/Home';

function App() {
  return (
    <Container>
      <Router>
        <Routes>
          <Route path="/" element={<Login/>}/>
          <Route path="/home" element={<Home/>}/>
        </Routes>
      </Router>
      
    </Container>
  );
}

export default App;

const Container = styled.div`
    

`