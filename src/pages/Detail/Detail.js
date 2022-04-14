import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { dbService } from '../../myFirebase';
import { priceCommas, MAINPRODUCTS } from '../../data/Data';
import DetailCount from './DetailCount';
import SubListMenu from '../../components/SubListMenu';
import media from '../../styles/media';
import styled from 'styled-components';
import { productsActions } from '../../store/products-slice';
import ProductComments from './ProductComments';

const Detail = () => {
  const [currentId, setCurrentId] = useState(1);
  const [prod, setProd] = useState(null);
  const params = useParams();
  const dispatch = useDispatch();
  const products = useSelector(state => state.products);
  const user = useSelector(state => state.users);

  let currentMenu = params.menu;
  const productId = params.id;

  useEffect(() => {
    const getProduct = dbService.collection('products').doc(productId).onSnapshot((doc) => {
      dispatch(productsActions.replaceData({docID:doc.id, ...doc.data()}));
      setProd({docID:doc.id, ...doc.data()});
    });
    return () => {
      getProduct();
    }
  }, [productId, dispatch]);

  const clickHandler = (id) => {
    setCurrentId(id);
  }


  const tabTitle = ['상품정보', '상품후기'];
  const tabContents = {
    1: <div className="contentsBox">{products !== null && products.contents}</div>,
    2: <ProductComments user={user} productId={productId} />
  }; 


  return (
    <div>
      <DetailWrap>
        <SubListMenu list={MAINPRODUCTS} currentMenu={currentMenu} />
        {products !== null && 
          <DetailBox>
      
            <DetailInfo>
              <ProductImage>
                <img src={products.attatchmentUrl} alt="" />
              </ProductImage>
              <ProductInfo>
                <ProductTitle>{products.title}</ProductTitle>
                {products.price > 0 && <ProductPrice>{priceCommas(products.price)} 원</ProductPrice>}
                {prod !== null && <DetailCount user={user} products={prod} />}
              </ProductInfo>
            </DetailInfo>

            <DetailContents>
              <TabMenuTitle>
                {tabTitle.map((el, idx) => (
                  <li key={idx} onClick={() => clickHandler(idx + 1)} className={currentId === idx + 1 ? 'onTabMenu' : ''}>{el}</li>
                ))}
              </TabMenuTitle>
              <TabMenuContents>{tabContents[currentId]}</TabMenuContents>
            </DetailContents>

          </DetailBox>
        }
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
`;

const DetailInfo = styled.div`
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

const DetailContents = styled.div`
  margin-top: 3rem;
`;

const TabMenuTitle = styled.ul`
  display: flex;
  justify-content: flex-start;

  .onTabMenu {
    background-color: #fff;
    border-bottom: 1px solid transparent;
    margin-bottom: -1px;
    color: ${(props) => props.theme.mainColor};
    font-weight: 500;
  }

  li {
    width: 200px;
    ${media.tablet} {
      width: 50%;
    }
    padding: 1.3rem 0;
    border-top: 1px solid #ddd;
    border-right: 1px solid #ddd;
    text-align: center;
    cursor: pointer;

    &:first-child {
      border-left: 1px solid #ddd;
    }

  }
`;

const TabMenuContents = styled.div`
  border-top: 1px solid #ddd;
  padding-top: 3rem;

  .contentsBox {
    text-align: center;
    line-height: 30px;
    white-space: pre-wrap;
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