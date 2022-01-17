import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Main from './pages/Main/Main';
import Sub from './pages/Sub/Sub';
import Detail from './pages/Detail/Detail';
import Cart from './pages/Cart/Cart';
import Upload from './pages/Upload/Upload';
import Header from './components/Header';
import Footer from './components/Footer';
import styled from 'styled-components';

const Routing = () => {
  return (
    <Router>
      <Container>
        <Header />
        <MainContent>
          <Routes>
            <Route path={"/"} element={<Main />} />
            <Route path={"/:menu/detail/:id"} element={<Detail />} />
            <Route path={"/cart"} element={<Cart />} />
            <Route path={"/:option"} element={<Sub />} />
            <Route path={"/upload"} element={<Upload />} />
          </Routes>
        </MainContent>
        <Footer />
      </Container>
    </Router>
  );
};
export default Routing;

const Container = styled.div`
  display: flex;
  min-height: 100vh;
  flex-direction: column;
`;

const MainContent = styled.div`
  flex: 1;
`;
