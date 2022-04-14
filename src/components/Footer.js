import React from 'react';
import { useLocation } from 'react-router';
import media from '../styles/media';
import { FaTwitterSquare, FaFacebookSquare, FaInstagramSquare } from "react-icons/fa";
import styled from 'styled-components';

const Footer = () => {
  const location = useLocation();
  const path = location.pathname;

  return (
    <FooterWrap path={path === '/'}>
      <FooterBox>
        <FooterInfoWrap>
          <FooterInfo>
            <div>ABOUT</div>
            <ul>
              <li>Jewellery</li>
              <li>주소 : 서울특별시 서울구 서울동 00번길</li>
              <li>사업자등록번호 : 000-00-00000</li>
            </ul>
          </FooterInfo>

          <FooterInfo>
            <div>CATEGORIES</div>
            <ul>
              <li>NECKLACE</li>
              <li>BRACELET</li>
              <li>EARRING</li>
              <li>RING</li>
            </ul>
          </FooterInfo>

          <FooterInfo>
            <div>QUICK LINK</div>
            <ul>
              <li>ABOUT</li>
              <li>CONTACT</li>
            </ul>
          </FooterInfo>
        </FooterInfoWrap>

        <Copyright>
          <SocialIcon>
            <ul>
              <li><FaInstagramSquare /><span>인스타그램</span></li>
              <li><FaFacebookSquare /><span>페이스북</span></li>
              <li><FaTwitterSquare /><span>트위터</span></li>
            </ul>
          </SocialIcon>
          <div>&copy; Jewellery. All Rights Reserved.</div>
        </Copyright>
      </FooterBox>
    </FooterWrap>
  )
}

export default Footer;

const FooterWrap = styled.div`
  padding: 1rem;
  background-color: #f3f3f3;

  ${media.mobile} {
    display: ${props => props.path ? "block" : "none"};
  }
`;

const FooterBox = styled.div`
  max-width: ${(props) => props.theme.pcWidth};
  ${media.pc} {
    width: 100%;
  }
  margin: 0 auto;
`;

const FooterInfoWrap = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 1rem 0;
  border-bottom: 1px solid #333;
`;

const FooterInfo = styled.div`
  
  div {
    margin-bottom: .8rem;
    font-size: 1rem;
    font-weight: 500;

    ${media.mobile} {
      font-size: .8rem;
    }
  }

  li {
    font-size: .9rem;
    line-height: 1.4rem;
    ${media.mobile} {
      font-size: .8rem;
    }
  }

  &:not(:first-of-type) {
    ${media.mobile} {
      display: none
    }
  }
`;

const Copyright = styled.div`
  display: flex;
  flex-direction: row-reverse;
  justify-content: space-between;
  padding: 1rem 0;
  ${media.mobile} {
    display: block;
  }

  div {
    ${media.mobile} {
      font-size: .8rem;
    }
  }
`;

const SocialIcon = styled.div`

  ul {
    display: flex;
    justify-content: space-between;
    ${media.mobile} {
      justify-content: flex-start;
      margin-bottom: 1rem;
    }

    li {
      width: 1.7rem;
      height: 1.7rem;

      &:not(:first-of-type) {
        margin-left: .7rem;
      }

      svg {
        width: 100%;
        height: 100%;
      }

      span {
        position: absolute;
        width: 1px;
        height: 1px;
        margin: -1px;
        overflow: hidden;
        clip-path: polygon(0 0, 0 0, 0 0);
      }
    }
  }
`;

