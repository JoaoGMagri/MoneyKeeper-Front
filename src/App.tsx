import React from 'react';
import { BrowserRouter as Router, Routes, Route, } from 'react-router-dom';
import styled from 'styled-components';

import SingIn from './pages/SignIn';

function App() {
  return (
    <Container>
      <Router>
        <Routes>
          <Route path="/" element={<SingIn/>}/>
        </Routes>
      </Router>
      
    </Container>
  );
}

export default App;

const Container = styled.div`
    

`