import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { dbService } from '../../myFirebase';
import { priceCommas } from '../../data/Data';
import DetailCount from './DetailCount';
import SubListMenu from '../../components/SubListMenu';
import media from '../../styles/media';
import styled from 'styled-components';

const Detail = () => {
  const [products, setProducts] = useState([]);
  const location = useLocation();


  let currentMenu = location.pathname.split('/')[1];
  let currentId = parseInt(location.pathname.split('/')[3]);


  const getFilterIdItems = async () => {
    const getProduct = await dbService.collection('products').where('id', '==', currentId).get();
      const Product = getProduct.docs.map((doc) => doc.data());
      setProducts(Product[0]);
  };

  useEffect(() => {
    getFilterIdItems();
  }, []);

  return (
    <div>
    <DetailWrap>
      <SubListMenu currentMenu={currentMenu} />
      <DetailBox>
        <ProductImage>
          <img src={products.attatchmentUrl} alt="" />
        </ProductImage>
        <ProductInfo>
          <ProductTitle>{products.title}</ProductTitle>
          {products.price > 0 && <ProductPrice>{priceCommas(products.price)} 원</ProductPrice>}
          <DetailCount products={products} />
        </ProductInfo>
      </DetailBox>
    </DetailWrap>
    </div>
  )
}

export default Detail;

const DetailWrap = styled.div`
  max-width: ${(props) => props.theme.pcWidth};
  margin: 10rem auto 5rem auto;
  ${media.mobile} {
    margin: 5rem auto 5rem auto;
  }
  padding: 3rem 1rem;
  display: flex;
  justify-content: flex-start;
  ${media.tablet} {
    display: block;
  }
`;

const DetailBox = styled.div`
  width: 100%;
  display:grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 3rem 2rem;
  ${media.tablet} {
    margin-top: 3rem;
  }
  ${media.mobile} {
    display: block;
  }
`;

const ProductImage = styled.div`
  ${media.mobile} {
    width: 100%
  }
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
    left: 0;
  }
`;

const ProductInfo = styled.div`
  position: relative;
  ${media.mobile} {
    width: 100%;
  }
`;

const ProductTitle = styled.div`
  font-size: 1.7rem;
  font-weight: 500;
  ${media.mobile} {
    padding-top: 2rem;
    font-size: 1.1rem;
  }
`;

const ProductPrice = styled.div`
  padding: 2rem 0 1rem 0;
  font-size: 1.4rem;
  font-weight: 500;
  ${media.mobile} {
    font-size: 1rem;
  }
`;
