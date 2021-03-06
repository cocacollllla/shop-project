import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Main from './pages/Main/Main';
import Sub from './pages/Sub/Sub';
import Detail from './pages/Detail/Detail';
import Cart from './pages/Cart/Cart';
import Upload from './pages/Upload/Upload';
import Notice from './pages/Board/Notice';
import NoticeView from './pages/Board/NoticeView';
import NoticeUpload from './pages/Board/NoticeUpload';
import FaqUpload from './pages/Board/FaqUpload';
import Faq from './pages/Board/Faq';
import Header from './components/Header';
import Footer from './components/Footer';
import styled from 'styled-components';
import Signup from './Auth/Signup';
import EditProfile from './pages/Mypage/EditProfile';
import Order from './pages/Cart/Order';
import Favorite from './pages/Mypage/Favorite';
import OrderList from './pages/Mypage/OrderList';
import OrderListInfo from './pages/Mypage/OrderListInfo';

const Routing = ({ isLoggedIn }) => {

  return (
    <Router>
      <Container>
        <Header isLoggedIn={isLoggedIn} />
        <MainContent>
          <Routes>
            <Route path={"/"} element={<Main />} />
            {!isLoggedIn ? <Route path={"/sign/:sign"} element={<Signup />} />
             : <Route path={"/sign/:sign"} element={<Navigate to="/" />} />
            }
            <Route path={"/mypage/account"} element={<EditProfile />} />
            <Route path={"/mypage/favorite"} element={<Favorite />} />
            <Route path={"/mypage/order"} element={<OrderList />} />
            <Route path={"/mypage/order/:id"} element={<OrderListInfo />} />
            <Route path={"/:menu/detail/:id"} element={<Detail />} />
            <Route path={"/cart"} element={<Cart />} />
            <Route path={"/order"} element={<Order />} />
            <Route path={"/:option"} element={<Sub />} />
            <Route path={"/upload"} element={<Upload />} />
            <Route path={"/notice/:state"} element={<NoticeUpload />} />
            <Route path={"/notice/:state/:id"} element={<NoticeUpload />} />
            <Route path={"/notice/view/:id"} element={<NoticeView />} />
            <Route path={"/notice"} element={<Notice />} />
            <Route path={"/faq/:state"} element={<FaqUpload />} />
            <Route path={"/faq/:state/:id"} element={<FaqUpload />} />
            <Route path={"/faq"} element={<Faq />} />
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
