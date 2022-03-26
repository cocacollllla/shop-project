import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLinkClickHandler, useParams } from 'react-router-dom';
import { dbService } from '../../myFirebase';
import { priceCommas, MAINPRODUCTS } from '../../data/Data';
import DetailCount from './DetailCount';
import SubListMenu from '../../components/SubListMenu';
import media from '../../styles/media';
import styled from 'styled-components';
import { productsActions } from '../../store/products-slice';
import ProductComments from './ProductComments';

const Detail = () => {
  const [currentID, setCurrentId] = useState(2);
  const params = useParams();
  const dispatch = useDispatch();
  const products = useSelector(state => state.products);
  const user = useSelector(state => state.users);

  let currentMenu = params.menu;
  const productId = params.id;


  // const getFilterIdItems = async () => {
  //   const getProduct = await dbService.collection('products').where('id', '==', productId).get();
  //     const Product = getProduct.docs.map(doc => ({ docID:doc.id, ...doc.data()}));
  //     // setProducts(Product[0]);
  //     dispatch(productsActions.replaceData(Product));
  // };

  useEffect(() => {
    dbService.collection('products').doc(productId).get().then((doc) => {
      if (doc.exists) {
        dispatch(productsActions.replaceData(doc.data()));
      }
      
    });
  }, []);

  const clickHandler = (id) => {
    setCurrentId(id);
  }

  console.log(products);

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
                <DetailCount user={user} />
              </ProductInfo>
            </DetailInfo>

            <DetailContents>
              <TabMenuTitle>
                {tabTitle.map((el, idx) => (
                  <li key={idx} onClick={() => clickHandler(idx + 1)}>{el}</li>
                ))}
              </TabMenuTitle>
              <TabMenuContents>{tabContents[currentID]}</TabMenuContents>
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
 
`;

const TabMenuTitle = styled.ul`
  display: flex;
  justify-content: flex-start;

  li {
    padding: 2rem 4rem;
  }
`;

const TabMenuContents = styled.div`
  .contentsBox {
    text-align: center;
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