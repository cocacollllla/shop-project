import React, {useState, useEffect} from 'react';
import { useNavigate, useLocation } from 'react-router';
import { useSelector } from 'react-redux';
import { dbService } from '../myFirebase';
import { BsCart4 } from "react-icons/bs";
import media from '../styles/media';
import styled from 'styled-components';


const Header = () => {
  const [scrollPosition, setScrollPosition] = useState(0);
  const [products, setProducts] = useState([]);
  const cart = useSelector(state => state.cart);
  const navigate = useNavigate();
  const location = useLocation();
  const path = location.pathname;

  const updateScroll = () => {
    setScrollPosition(window.scrollY || document.documentElement.scrollTop);
  }

  useEffect(()=>{
    window.addEventListener('scroll', updateScroll);
  });

  useEffect(() => {
    getCart();
  }, [cart]);



  const getCart = () => {
    dbService.collection('cart').onSnapshot(snapshot => {
      const cartProducts = snapshot.docs.map(doc => ({ id:doc.id, ...doc.data()}));
      setProducts(cartProducts);
    });
  };


  return (
    <HeaderWrap path={path === '/'} headerScroll={scrollPosition}>
      <HeaderBox>
        <Logo onClick={() => {navigate(`/`);}}>Acc</Logo>
        <HeaderButton>
          <CreateButton onClick={() => {navigate(`/upload`);}}>상품등록</CreateButton>
          <CreateButton onClick={() => {navigate(`/notice`);}}>고객센터</CreateButton>
          <CartWrap  onClick={() => {navigate(`/cart`);}}>
            <BsCart4 className="cartIcon" />
            <div>{products.length}</div>
          </CartWrap>
        </HeaderButton>
      </HeaderBox>
    </HeaderWrap>
  );
};

export default Header;



const HeaderWrap = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  z-index: 9;
  width: 100%;
  padding: 2rem 0;
  ${media.mobile} {
    padding: 1rem 0;
  }
  transition: all 0.3s;
  background: ${props => props.headerScroll > 550 || !props.path ? "white" : "rgba(255, 255, 255, 0.4)"};
  border-bottom: ${props => props.headerScroll > 550 || !props.path ? "1px solid #ddd" : "none"};
  
`;

const HeaderBox = styled.div`
  width: ${(props) => props.theme.pcWidth};
  ${media.pc} {
    width: 100%;
  }
  margin: 0 auto;
  padding: 0 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Logo = styled.div`
  font-size: 1.1rem;
  font-weight: bold;
  cursor: pointer;
`;

const HeaderButton = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const CreateButton = styled.div`
  margin-right: 30px;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
`;

const CartWrap = styled.div`
  display: flex;
  justify-content: flex-start;
  cursor: pointer;
  position: relative;

  div {
    width: 20px;
    height: 20px;
    position: absolute;
    top: -8px;
    right: -8px;
    background-color: ${(props) => props.theme.mainColor};
    color: ${(props) => props.theme.white};
    text-align: center;
    line-height: 20px;
    border-radius: 50%;
    font-weight: 500;
    font-size: .9rem;
  }

  .cartIcon {
    font-size: 1.1rem;
    margin-right: .5rem;
  }
`;
