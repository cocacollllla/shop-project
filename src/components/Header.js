import React, {useState, useEffect} from 'react';
import { useNavigate, useLocation } from 'react-router';
import { useSelector } from 'react-redux';
import { BsCart4 } from "react-icons/bs";
import media from '../styles/media';
import styled from 'styled-components';

const Header = ({isLoggedIn}) => {
  const [scrollPosition, setScrollPosition] = useState(0);
  const cart = useSelector(state => state.cart);
  const user = useSelector(state => state.users);
  const navigate = useNavigate();
  const location = useLocation();
  const path = location.pathname;
  

  const updateScroll = () => {
    setScrollPosition(window.scrollY || document.documentElement.scrollTop);
  }

  useEffect(()=>{
    window.addEventListener('scroll', updateScroll);
  });

  const goToCart = () => {
    let sign = 'signin';
    if(!isLoggedIn) {
      alert('로그인시 이용할 수 있습니다.');
      navigate(`/sign/${sign}`);
    } else {
      navigate(`/cart`);
    }
  }
  

  const profileImage = () => {
    
      if(user.photoURL !== null) {
        return <img src={user.photoURL} alt="프로필이미지" />
      } else {
        return <img src='/assets/default_profile.png' alt="프로필이미지" />
      }
    
  }

 
  let mypage = 'account';
  let sign = 'signin';

  

  return (
    <HeaderWrap path={path === '/'} headerScroll={scrollPosition}>
      <HeaderBox>
        <Logo onClick={() => {navigate(`/`);}}>Acc</Logo>
        <HeaderButton>
          <CreateButton onClick={() => {navigate(`/upload`);}}>상품등록</CreateButton>
          <CreateButton onClick={() => {navigate(`/notice`);}}>고객센터</CreateButton>
          <CartWrap  onClick={goToCart}>
            <BsCart4 className="cartIcon" />
            {cart.length !== 0 && <div>{cart.length}</div>}
          </CartWrap>
          {user !== null ? <ProfileImage onClick={() => {navigate(`/mypage/${mypage}`);}}>{profileImage()}</ProfileImage> : <CreateButton onClick={() => {navigate(`/sign/${sign}`);}}>로그인</CreateButton>}
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
  height: 80px;
  ${media.mobile} {
    height: 70px;
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
  height: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0 auto;
  padding: 0 1rem;
  
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

  div {
    ${media.mobile} {
      font-size: 0.9rem;
    }
  }
  
`;

const CreateButton = styled.div`
  margin-right: 20px;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;

  &:last-child {
    margin-right: 0
  }
`;

const ProfileImage = styled.div`
  width: 25px;
  cursor: pointer;

  img {
    width: 100%;
    border-radius: 50%;
    border: 1px solid #ddd;
  }
`;


const CartWrap = styled.div`
  display: flex;
  justify-content: flex-start;
  cursor: pointer;
  position: relative;
  margin-right: 20px;

  div {
    width: 15px;
    height: 15px;
    position: absolute;
    top: -3px;
    right: 0;
    background-color: ${(props) => props.theme.mainColor};
    color: ${(props) => props.theme.white};
    text-align: center;
    line-height: 15px;
    border-radius: 50%;
    font-weight: 500;
    font-size: .7rem;
  }

  .cartIcon {
    font-size: 1.1rem;
    margin-right: .5rem;
  }
`;
