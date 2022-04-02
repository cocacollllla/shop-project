import React from 'react';
import { useSelector } from 'react-redux';
import media from '../../styles/media';
import styled from 'styled-components';

const Order = () => {

  const item = useSelector(state => state.cart);
  const user = useSelector(state => state.users);

  const doneList = item.filter(list => list.isChecked === true);



  return (
    <OrderWrap>
      <OrderLeftContents>
        <OrderBox>
          <OrderTitle>주문상품</OrderTitle>
          <OrderProducts>
            {doneList.map(el => (
              <OrderProductList>
                <ProductImage><img src={el.image} alt="제품이미지" /></ProductImage><ProductTitle>{el.title}</ProductTitle><div>수량 {el.quantity} 개</div><ProductPrice>{el.totalPrice} 원</ProductPrice>
              </OrderProductList>
            ))}
          </OrderProducts>
        </OrderBox>
        <OrderBox>
          <OrderTitle>주문자 정보</OrderTitle>
          <Orderer>
            <div><span>이름</span> {user.displayName}</div>
            <div><span>이메일</span> {user.email}</div>
          </Orderer>
        </OrderBox>
        <OrderBox>
          <OrderTitle>배송지 정보</OrderTitle>
          <div>주소주소</div>
        </OrderBox>
      </OrderLeftContents>

      <OrderRightContents>

      </OrderRightContents>
    </OrderWrap>
  )
}

export default Order;

const OrderWrap = styled.div`
  max-width: ${(props) => props.theme.pcWidth};
  margin: 10rem auto 5rem auto;
  padding: 3rem 1rem;
  display: flex;
  justify-content: space-between;
  ${media.mobile} {
    display: block;
    margin: 5rem auto 0 auto;
    padding: 3rem 1rem 0 1rem;
  }
  
`;

const OrderLeftContents = styled.div`
  width: 100%;
`;

const OrderRightContents = styled.div`
  min-width: 240px;
  margin-left: 2rem;
  margin-top: 50px;

  ${media.mobile} {
    display: block;
    margin: 1rem 0 0 0;
    padding-bottom: 65px;
  }
`;



const OrderBox = styled.div`
  margin-bottom: 2rem;
`;

const OrderProducts = styled.div`
  padding: 1rem;
`;

const OrderProductList = styled.div`
  display: grid;
  grid-template-columns: 60px 2fr 1fr 1fr;
  align-items: center;
  margin-bottom: 10px;
  text-align: right;
`;

const ProductImage = styled.div`
  img {
    width: 100%;
  }
`;

const ProductTitle = styled.div`
  margin-left: 20px;
  text-align: left;
`;


const ProductPrice = styled.div`
  font-weight: 500;
`;

const Orderer = styled.div`
  padding: 1rem;

  div {
    padding: 1rem 0 0 0;
    
    span {
      display: inline-block;
      width: 80px;
    }
  }
`;

const OrderAddress = styled.div`

`;

const OrderTitle = styled.div`
  padding: 1rem;
  border-bottom: 1px solid #999;
  font-size: 1.3rem;
  font-weight: 500;
`;


