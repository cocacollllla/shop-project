import React, {useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {MAINPRODUCTS} from '../../data/Data';
import Carousel from './Carousel';
import MainProducts from './MainProducts';
import { getData } from '../../store/cart-actions';
import media from '../../styles/media';
import styled from 'styled-components';

const Main = () => {
  const [option, setOption] = useState('all');

  const item = useSelector(state => state.cart);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getData());
  }, [dispatch]);


  const clickTabChange = (op) => {
    setOption(op);
  }


  return (
    <>
      <Carousel />
      <ProductTabWrap>
        <ProductTab>
          <ul>
            {MAINPRODUCTS.map((optionName, idx) => (
              <li key={idx} 
              className={option === optionName ? 'isOptionOn' : null} 
              onClick={() => clickTabChange(optionName)}>
                {optionName.toUpperCase()}
              </li>
            ))}
          </ul>
        </ProductTab>
        <ProductBox>
          <ProductList>
            <MainProducts products={item} option={option} />
          </ProductList>
          <MoreBtn onClick={() => navigate(`/${option}`)}>more</MoreBtn>
        </ProductBox>
      </ProductTabWrap>
    </>
  );
};

export default Main;




const ProductTabWrap = styled.div`
  max-width: ${(props) => props.theme.pcWidth};
  ${media.pc} {
    width: 100%;
  }
  margin: 0 auto;
`;

const ProductTab = styled.div`
  width: 580px;
  ${media.mobile} {
    width: 100%;
    padding: 0 2rem;
  }
  margin: 0 auto;
  margin-top: 5rem;

  ul {
    width: 100%;
    display: flex;
    justify-content: space-between;

    li {
      position: relative;
      cursor: pointer;
      ${media.mobile} {
        font-size: .8rem;
      }
      
      &:after {
        content: '';
        display: block;
        position: absolute;
        top: 1.5rem;
        left: 50%;
        right: 50%;
        height: 1px;
        background-color: ${(props) => props.theme.fontColor};
        transition: all .2s
      }

      &.isOptionOn:after {
        left: 0;
        right: 0;
      }
    }
  }
`;

const ProductBox = styled.div`
  padding: 4rem 2rem;
  overflow: auto;
  ${media.tablet} {
    padding: 3rem 1rem;
  }
`;

const ProductList = styled.div`
  display:grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 3rem 2rem;
  ${media.pc} {
    grid-gap: 2rem 1rem;
  }
  ${media.mobile} {
    grid-template-columns: repeat(2, 1fr);
    grid-gap: 3rem 1rem;
  }
`;

const MoreBtn = styled.button`
  display: block;
  margin: 4rem auto;
  padding: .7rem 2rem;
  border: none;
  border-radius: 10px;
  background-color: ${(props) => props.theme.mainColor};
  color: ${(props) => props.theme.white};
  font-size: 1.2rem;
  font-weight: 500;
  cursor: pointer;
`;





