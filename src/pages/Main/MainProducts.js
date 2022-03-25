import React from 'react';
import { useNavigate } from 'react-router-dom';
import { priceCommas } from '../../data/Data';
import media from '../../styles/media';
import styled from 'styled-components';

const MainProducts = ( {products, option  }) => {
  const navigate = useNavigate();

  let productsArr = products;

  if(option === 'all' || option === '') {
    products.length >= 8 ? productsArr = products.slice(0, 8) : productsArr = products;
  } else {
    let filterPrpducts = products.filter(el => el.option === option);
    productsArr = filterPrpducts.length >= 8 ? filterPrpducts.slice(0, 8) : filterPrpducts;
  }

  return (
    <>
      {productsArr.map(product => (
        <MainItem key={product.id} onClick={() => navigate(`/${option}/detail/${product.docId}`)}>
          <MainImage>
            <img src={product.attatchmentUrl} alt="" />
          </MainImage>
          <MainItemText>
            <MainItemTitle>{product.title}</MainItemTitle>
            <MainItemPrice>{priceCommas(product.price)} 원</MainItemPrice>
          </MainItemText>
        </MainItem>
      )) }
    </>
  )
}

export default MainProducts;


const MainItem = styled.div`
  cursor: pointer;
`;

const MainImage = styled.div`
  position: relative;
  overflow: hidden;

  &:after {
    content:"";
    display: block;
    padding: 0 0 100%;
  }
  
  img {
    position: absolute;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const MainItemText = styled.div`
  text-align: center;
`;

const MainItemTitle = styled.div`
  margin: 1rem 0;
  font-weight: 500;
  ${media.mobile} {
    font-size: .8rem;
  }
`;

const MainItemPrice = styled.div`
  font-weight: 600;
  ${media.mobile} {
    font-size: .8rem;
  }
`;