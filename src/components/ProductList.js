import React from 'react';
import { useNavigate } from 'react-router-dom';
import { priceCommas } from '../../src/data/Data';
import media from '../../src/styles/media';
import styled from 'styled-components';

const ProductList = ({list}) => {
  const navigate = useNavigate();

  return (
    <OrderInfoList>
      <OrderImage onClick={() => {navigate(`/${list.option}/detail/${list.productID}`)}}><img src={list.image} alt="상품이미지" /></OrderImage>
      <OrderTitle>
        <div>{list.title}</div>
        <div className="quantityPrice">
          <div>{list.quantity} 개</div>
          <div>{priceCommas(list.price)} 원</div>
        </div>
      </OrderTitle>
    </OrderInfoList>
  )
}

export default ProductList;


const OrderInfoList = styled.div`
  margin-bottom: 1rem;
  display: flex;
  align-items: center;

`;

const OrderImage = styled.div`
  width: 70px;
  cursor: pointer;

  img {
    width: 100%;
    object-fit: cover;
  }

`;

const OrderTitle = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin-left: 20px;
  line-height: 30px;
    
  ${media.tablet} {
    display: block;
  }

  .quantityPrice {
    display: flex;
    justify-content: space-between;

    div:last-child {
      width: 100px;
      text-align: right;
      font-weight: 500;
    }
  }

`;