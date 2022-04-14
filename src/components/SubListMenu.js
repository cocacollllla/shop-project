import React from 'react';
import media from '../styles/media';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';


const SubListMenu = ({currentMenu, list, mypageList}) => {

  const navigate = useNavigate();
  
  let mpList = null;
  if(mypageList) {
    mpList = Object.entries(mypageList);
  }

 
  return (
    <SubListMenuWrap>
      <ul>
        {mypageList ? 
          mpList.map((el, idx) => (
            <li key={idx} onClick={() => navigate(`/mypage/${el[0]}`)} className={currentMenu === el[0] ? 'isOnMenu' : null} >
              <span>{el[1]}</span>
            </li>
          ))
        : 
          list.map((optionName, idx) => (
            <li key={idx} onClick={() => navigate(`/${optionName}`)} className={currentMenu === optionName ? 'isOnMenu' : null} >
              <span>{optionName.toUpperCase()}</span>
            </li>
          ))
        }
        
      </ul>
    </SubListMenuWrap>
  )
}

export default SubListMenu;

const SubListMenuWrap = styled.div`
  min-width: 180px;
  
  ${media.tablet} {
    width: 580px;
    margin: 0 auto;
  }
  
  ${media.mobile} {
    width: 100%;
    padding: 0 1rem;
  }

  ul {
    ${media.tablet} {
      display: flex;
      justify-content: space-between;
      padding-right: 0;
    }
  }

  li {
    padding: 1.5rem 1rem;
    cursor: pointer;

    ${media.tablet} {
      padding: 0;
    }
    
    ${media.mobile} {
      font-size: .8rem;
    }

    &.isOnMenu span {
      position: relative;

      &:after {
        content:'';
        display: block;
        position: absolute;
        top: 1.8rem;
        width: 100%;
        height: 1px;
        background-color: #333;
      }
    }
  }
`;