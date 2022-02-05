import React from 'react';
import media from '../styles/media';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';


const SubListMenu = ({currentMenu, list}) => {

  const navigate = useNavigate();

  return (
    <SubListMenuWrap>
      <ul>
        {list.map((optionName, idx) => (
          <li key={idx} onClick={() => navigate(`/${optionName}`)} className={currentMenu === optionName ? 'isOnMenu' : null} >
            <span>{optionName.toUpperCase()}</span>
          </li>
        ))}
      </ul>
    </SubListMenuWrap>
  )
}

export default SubListMenu;

const SubListMenuWrap = styled.div`
  
  ${media.tablet} {
    width: 580px;
    margin: 0 auto;
  }
  
  ${media.mobile} {
    width: 100%;
    padding: 0 1rem;
  }

  ul {
    padding-right: 6rem;
    ${media.tablet} {
      display: flex;
      justify-content: space-between;
      padding-right: 0;
    }
  }

  li {
    // font-weight: 500;
    ${media.mobile} {
      font-size: .8rem;
    }
    
    
      padding: 1.5rem 1rem;
   
    ${media.tablet} {
      padding: 0;
    }
    cursor: pointer;
    

   

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