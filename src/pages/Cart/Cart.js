import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { priceCommas} from '../../data/Data';
import { AiOutlineMinusCircle, AiOutlinePlusCircle, AiOutlineCheckCircle, AiFillCheckCircle } from "react-icons/ai";
import { MdClose } from "react-icons/md";
import { getCartData, cartQuantityPlus, cartQuantityMinus, cartDelete } from '../../store/cart-actions';
import media from '../../styles/media';
import styled from 'styled-components';
import { dbService } from '../../myFirebase';

const Cart = () => {
  const dispatch = useDispatch();
  const item = useSelector(state => state.cart);
  const user = useSelector(state => state.users);
  const [checkItems, setCheckItems] = useState(item);

  console.log(checkItems);

// useEffect(() => {
//   dispatch(getCartData(user.uid));
//   return () => {

//   }
// }, [dispatch]);




const addClickHandler = (itm) => {
  dispatch(cartQuantityPlus(itm.docID, itm.id, itm.quantity, itm.price));
}

const minusClickHandler = (itm) => {
  if(itm.quantity > 1) {
    dispatch(cartQuantityMinus(itm.docID, itm.id, itm.quantity, itm.price))
  } else {
    alert('최소수량 입니다.')
  }
  
}

const removeClickHandler = (docID, id) => {
  const ok = window.confirm('해당상품을 장바구니에서 삭제하시겠습니까?');
  if(ok) {
    dispatch(cartDelete(docID, id))
  }
}


const result = checkItems.reduce((acc, current) => acc + current.totalPrice, 0);

const handleAllCheck = checked => {
  if (checked) {
    const idArray = [];
    item.forEach(el => idArray.push(el));
    setCheckItems(idArray);
  } else {
    setCheckItems([]);
  }
};

const handleSingleCheck = (checked, itm) => {
  if (checked) {
    setCheckItems([...checkItems, itm]);
  } else {
    setCheckItems(checkItems.filter(el => el.docID !== itm.docID));
  }
};



  return (

      <DetailWrap>
        {item.length === 0 ?
        <NoData>장바구니에 상품이 없습니다.</NoData> :
        <>
          <div className="tos_chx_all">
            <label htmlFor="checkAll">
              <CheckIcon>{checkItems.length === item.length ? <AiFillCheckCircle /> : <AiOutlineCheckCircle className="offCheck" />}</CheckIcon>
              <input
                id="checkAll"
                type="checkbox"
                name="checkAll"
                onChange={e => handleAllCheck(e.target.checked)}
                checked={checkItems.length === item.length}
              />
              <span>전체선택</span>
            </label>
          </div>

          {item && item.map((itm, idx) => (
            <ItemWrap key={idx}>

              <label htmlFor={itm.docID}>
                <CheckIcon>{checkItems.find(el => el.docID === itm.docID) !== undefined ? <AiFillCheckCircle /> : <AiOutlineCheckCircle className="offCheck" />}</CheckIcon>
                <input
                  id={itm.docID}
                  type="checkbox"
                  onChange={e => handleSingleCheck(e.target.checked, itm)}
                  checked={checkItems.find(el => el.docID === itm.docID) !== undefined}
                />
              </label>
            

              <ImgTitle>
                <Itemimg><img src={itm.image} alt="d" /></Itemimg>
                <CartTitle>{itm.title}</CartTitle>
              </ImgTitle>
              <QuantityBox>
                <CartQuantityBtn>
                  <div onClick={() => minusClickHandler(itm)}><AiOutlineMinusCircle /></div>
                  <span>{itm.quantity}</span>
                  <div onClick={() => addClickHandler(itm)}><AiOutlinePlusCircle /></div>
                </CartQuantityBtn>
                <CartPrice>{priceCommas(itm.totalPrice+'')} 원</CartPrice>
              </QuantityBox>
                  
              <CloseBtn onClick={() => removeClickHandler(itm.docID, itm.id)}><MdClose /></CloseBtn>
            </ItemWrap>
          ))}
        
          <CartTotalPriceWrap>
            <CartTotalTitle>총합계금액</CartTotalTitle>
            <CartTotalPrice>{priceCommas(result)} 원</CartTotalPrice>
          </CartTotalPriceWrap>
        </>
      }

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

  input[type='checkbox'] {
    position: absolute;
    width: 1px;
    height: 1px;
    margin: -1px;
    padding: 0;
    border: 0;
    overflow: hidden;
    clip: rect(0 0 0 0);
  }
`;

const ItemWrap = styled.div`
  width: 100%;
  padding: 1rem;
  display: grid;
  grid-template-columns: 60px 3fr 2fr 60px ;
  ${media.tablet} {
    padding: 1rem 0;
     grid-template-columns: 60px 2fr 2fr 60px ;
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


const CheckIcon = styled.span`
  svg {
    font-size: 1.2rem;
  }
    
  .offCheck {
    fill: #ddd;
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

const NoData = styled.div`
  text-align: center;
`;