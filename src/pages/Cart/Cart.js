import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { priceCommas} from '../../data/Data';
import { AiOutlineMinusCircle, AiOutlinePlusCircle } from "react-icons/ai";
import { MdClose } from "react-icons/md";
import { getCartData, cartQuantityPlus, cartQuantityMinus, cartDelete } from '../../store/cart-actions';
import media from '../../styles/media';
import styled from 'styled-components';

const Cart = () => {
  const dispatch = useDispatch();
  const item = useSelector(state => state.cart);


useEffect(() => {
  dispatch(getCartData());
  return () => {

  }
}, [dispatch]);


const addClickHandler = (id, title, quantity, price) => {
  dispatch(cartQuantityPlus(id, title, quantity, price));
}

const minusClickHandler = (id, title, quantity, price) => {
  if(quantity > 1) {
    dispatch(cartQuantityMinus(id, title, quantity, price))
  } else {
    alert('최소수량 입니다.')
  }
  
}

const removeClickHandler = (id, title) => {
  const ok = window.confirm('해당상품을 장바구니에서 삭제하시겠습니까?');
  if(ok) {
    dispatch(cartDelete(id, title))
  }
}


const result = item.reduce((acc, current) => acc + current.totalPrice, 0);


  return (

      <DetailWrap>
        {item && item.map((itm, idx) => (
          <ItemWrap key={idx}>
            <ImgTitle>
              <Itemimg><img src={itm.image} alt="d" /></Itemimg>
              <CartTitle>{itm.title}</CartTitle>
            </ImgTitle>
            <QuantityBox>
              <CartQuantityBtn>
                <div onClick={() => minusClickHandler(itm.id, itm.title, itm.quantity, itm.price)}><AiOutlineMinusCircle /></div>
                <span>{itm.quantity}</span>
                <div onClick={() => addClickHandler(itm.id, itm.title, itm.quantity, itm.price)}><AiOutlinePlusCircle /></div>
              </CartQuantityBtn>
              <CartPrice>{priceCommas(itm.totalPrice+'')} 원</CartPrice>
            </QuantityBox>
                
            <CloseBtn onClick={() => removeClickHandler(itm.id, itm.title)}><MdClose /></CloseBtn>
            
          </ItemWrap>
        ))}
       

        <CartTotalPriceWrap>
          <CartTotalTitle>총합계금액</CartTotalTitle>
          <CartTotalPrice>{priceCommas(result)} 원</CartTotalPrice>
        </CartTotalPriceWrap>

      </DetailWrap>

  )
}

export default Cart;

const DetailWrap = styled.div`
  max-width: ${(props) => props.theme.pcWidth};
  margin: 10rem auto 5rem auto;
  ${media.mobile} {
    margin: 5rem auto 5rem auto;
  }
  padding: 3rem 1rem;
`;

const ItemWrap = styled.div`
  width: 100%;
  padding: 1rem;
  display: grid;
  grid-template-columns: 3fr 2fr 60px ;
  ${media.tablet} {
    padding: 1rem 0;
     grid-template-columns: 2fr 2fr 60px ;
  }
  ${media.mobile} {
    display: block;
    position: relative;
    padding-bottom: 0;
  }
  align-items: center;
  border-bottom: 1px solid #e3e3e3;
  text-align: center;

  &:first-of-type {
    border-top: 1px solid #e3e3e3
  }

  button {
    border: none;
    background: transparent;
    font-size: 1rem;
    cursor: pointer;
  }
`;

const Itemimg = styled.div`
  position: relative;
  overflow: hidden;

  &:after {
    content:"";
    display: block;
    padding: 0 0 60%;
  }

  img {
    position: absolute;
    width: 60%;
    height: 100%;
    margin-left: .7rem;
    object-fit: cover;
    left: 0;
  }
`;

const ImgTitle = styled.div`
  display: grid;
  grid-template-columns: 100px 1fr ;
  align-items: center;
`;

const QuantityBox = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr ;
  align-items: center;
`;




const CartTitle = styled.div`
  text-align: left;
`;

const CartPrice = styled.div`
  font-weight: 500;
  ${media.mobile} {
    text-align: right;
    padding-right: 1rem;
  }
`;


const CartQuantityBtn = styled.div`

  display: flex;
  justify-content: flex-start;
  align-items: center;

  div {
    padding: 1rem .7rem;
    font-size: 1.2rem;
    margin-top: 4px;
    cursor: pointer;
  }



  span {
    font-weight: 500;
  }

  
`;


const CloseBtn = styled.button`
  ${media.mobile} {
    position: absolute;
    top: 1rem;
    right: 1rem;
  }

  svg {
    ${media.mobile} {
    font-size: 1.2rem;
    font-weight: 500;
  }
}
`;


const CartTotalPriceWrap = styled.div`
  padding: 2rem 1rem;
  display: flex;
  justify-content: flex-end;
  align-items: center;
`;

const CartTotalTitle = styled.div`
  font-size: 1.3rem;
  margin-right: 2rem;
`;

const CartTotalPrice = styled.div`
  font-size: 1.5rem;
  font-weight: 500;
`;