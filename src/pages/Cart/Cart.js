import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { priceCommas} from '../../data/Data';
import { AiOutlineMinusCircle, AiOutlinePlusCircle, AiOutlineCheckCircle, AiFillCheckCircle, AiOutlineCheck } from "react-icons/ai";
import { MdClose } from "react-icons/md";
import { getCartData, cartQuantityPlus, cartQuantityMinus, cartDelete } from '../../store/cart-actions';
import media from '../../styles/media';
import styled from 'styled-components';
import { dbService } from '../../myFirebase';
import { cartActions } from '../../store/cart-slice';

const Cart = () => {
  const dispatch = useDispatch();
  const item = useSelector(state => state.cart);
  const user = useSelector(state => state.users);
  const [checkItems, setCheckItems] = useState(item);

  console.log(checkItems);
  console.log(item);

// useEffect(() => {
//   dispatch(getCartData(user.uid));
//   return () => {

//   }
// }, [dispatch]);




const addClickHandler = (docID, id, quantity, price) => {
  dispatch(cartQuantityPlus(docID, id, quantity, price));
}

const minusClickHandler = (docID, id, quantity, price) => {
  if(quantity > 1) {
    dispatch(cartQuantityMinus(docID, id, quantity, price))
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

const doneList = item.filter(list => list.isChecked === true);

const result = doneList.reduce((acc, current) => acc + current.totalPrice, 0);

const handleAllCheck = (checked) => {
  console.log(checked);
  dispatch(cartActions.allCheck(checked));
};

const handleSingleCheck = (id) => {
  dispatch(cartActions.singleCheck(id));
};

console.log(doneList);

  return (

    <DetailWrap>
      {item.length === 0 ?
      <NoData>장바구니에 상품이 없습니다.</NoData> :
      <>
        <LeftContents>
          <CheckAll>
            <label htmlFor="checkAll">
              <CheckIcon>{doneList.length === item.length ? <AiFillCheckCircle /> : <AiOutlineCheckCircle className="offCheck" />}</CheckIcon>
              <input
                id="checkAll"
                type="checkbox"
                name="checkAll"
                onChange={e => handleAllCheck(e.target.checked)}
                checked={doneList.length === item.length}
              />
              <span className="checkAll">전체선택</span>
            </label>
          </CheckAll>

          {item && item.map((itm, idx) => (
            <ItemWrap key={idx}>

              <label htmlFor={itm.docID} className="checkbox">
                <CheckIcon>{itm.isChecked ? <AiFillCheckCircle /> : <AiOutlineCheckCircle className="offCheck" />}</CheckIcon>
                <input
                  id={itm.docID}
                  type="checkbox"
                  onChange={e => handleSingleCheck(itm.id)}
                  defaultChecked={itm.isChecked}
                />
              </label>
            
              <TitleQuantity>
                <ImgTitle>
                  <Itemimg><img src={itm.image} alt="제품이미지" /></Itemimg>
                  <CartTitle>{itm.title}</CartTitle>
                </ImgTitle>
                <QuantityBox>
                  <CartQuantityBtn>
                    <div onClick={() => minusClickHandler(itm.docID, itm.id, itm.quantity, itm.price)}><AiOutlineMinusCircle /></div>
                    <span>{itm.quantity}</span>
                    <div onClick={() => addClickHandler(itm.docID, itm.id, itm.quantity, itm.price)}><AiOutlinePlusCircle /></div>
                  </CartQuantityBtn>
                  <CartPrice>{priceCommas(itm.totalPrice+'')} 원</CartPrice>
                </QuantityBox>
                <CloseBtn onClick={() => removeClickHandler(itm.docID, itm.id)}><MdClose /></CloseBtn>
              </TitleQuantity>       
              
            </ItemWrap>
          ))}

        </LeftContents>
        
        <RightContents>
          <PriceBox>
            <p><AiOutlineCheck className="icon" /><span>{doneList.length} 개 상품을 선택하셨습니다.</span></p>
            <ul>
              <li><span>상품금액</span><span>{priceCommas(result)} 원</span></li>
              <li><span>배송비</span><span>{result === 0 || result >= 100000 ? 0 : priceCommas(5000)} 원</span></li>
            </ul>
            <div>
              <span>결제예정금액</span><span>{priceCommas(result)} 원</span>
            </div>
          </PriceBox>
          <BuyBtn>주문하기</BuyBtn>
        </RightContents>
      </>
      }
    </DetailWrap>

  )
}

export default Cart;

const DetailWrap = styled.div`
  max-width: ${(props) => props.theme.pcWidth};
  margin: 10rem auto 5rem auto;
  display: flex;
  justify-content: space-between;
  ${media.mobile} {
    display: block;
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

const LeftContents = styled.div`
  width: 100%;
`;

const RightContents = styled.div`
  min-width: 260px;
  margin-left: 2rem;
  margin-top: 50px;

  ${media.mobile} {
    display: block;
    margin: 1rem 0 5rem 0;
  }
`;

const PriceBox = styled.div`
  padding: 0 1rem;
  border: 1px solid #ddd;
  border-radius: 5px;

  p {
    margin-top: 1.5rem;

    .icon {
      margin-right: 10px;
    }

    span {
      font-size: .9rem;
      vertical-align: top;
    }
  }

  ul {
    margin: 1rem 0 1.5rem 0;

    li {
      padding-top: 1rem;
      display: flex;
      justify-content: space-between;

      span:last-child {
        font-weight: 500;
      }
    }
  }

  div {
    display: flex;
    justify-content: space-between;
    padding: 1rem 0;

    span:last-child {
      font-weight: 500;
    }

    &:last-child {
      padding: 1.5rem 0;
      border-top: 1px solid #ddd;
    }
  }
`;

const BuyBtn = styled.div`
  margin-top: 10px;
  padding: 1rem;
  background-color: ${(props) => props.theme.mainColor};
  color: white;
  border-radius: 5px;
  font-weight: 500;
  text-align: center;
  font-size: 1rem;
  cursor: pointer;
`;

const ItemWrap = styled.div`
  width: 100%;
  padding: 1rem;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  border-bottom: 1px solid #e3e3e3;
  text-align: center;

  ${media.tablet} {
    padding: 1rem 0;
  }

  &:nth-of-type(2) {
    border-top: 1px solid #e3e3e3
  }

`;


const TitleQuantity = styled.div`
  width: 100%;
  margin-left: 20px;
  display: grid;
  grid-template-columns: 3fr 2fr 20px ;

  ${media.tablet} {
      display: block;
      position: relative;
      padding-bottom: 0;
      margin-left: 15px;
    }

  button {
    border: none;
    background: transparent;
    font-size: 1rem;
    cursor: pointer;
  }
`;

const Itemimg = styled.div`
  width: 70px;
  height: 70px;
  position: relative;
  overflow: hidden;

  img {
    position: absolute;
    width: 100%;
    height: 100%;
    object-fit: cover;
    left: 0;
  }
`;

const ImgTitle = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;

const QuantityBox = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr ;
  align-items: center;
  ${media.tablet} {
    padding-top: .7rem;
  }
`;




const CartTitle = styled.div`
  text-align: left;
  margin-left: 20px;
`;

const CartPrice = styled.div`
  font-weight: 500;
  ${media.tablet} {
    text-align: right;
  }
`;


const CartQuantityBtn = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  div {
    font-size: 1.2rem;
    margin-top: 4px;
    cursor: pointer;
  }
  span {
    font-weight: 500;
    padding: 0 .7rem;
  }
  
`;

const CheckAll = styled.div`
  padding: 1rem;
  ${media.tablet} {
    padding: 1rem 0;
  }

  .checkAll {
    vertical-align: text-top;
    margin-left: 5px;
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
  ${media.tablet} {
    position: absolute;
    top: 0;
    right: 0;
  }
  svg {
    ${media.tablet} {
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