import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { cartActions } from '../../store/cart-slice';
import { priceCommas} from '../../data/Data';
import { AiOutlineMinusCircle, AiOutlinePlusCircle, AiOutlineCheckCircle, AiFillCheckCircle } from "react-icons/ai";
import { MdClose } from "react-icons/md";
import { cartQuantityPlus, cartQuantityMinus, cartDelete } from '../../store/cart-actions';
import media from '../../styles/media';
import styled from 'styled-components';

const LeftContents = ({doneList, item}) => {
  const dispatch = useDispatch();

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

  const handleAllCheck = (checked) => {
    console.log(checked);
    dispatch(cartActions.allCheck(checked));
  };
  
  const handleSingleCheck = (id) => {
    dispatch(cartActions.singleCheck(id));
  };

  return (
    <LeftContentsWrap>
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
    </LeftContentsWrap>
  )
}

export default LeftContents;

const LeftContentsWrap = styled.div`
  width: 100%;
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
  min-width: 70px;
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
  background-color: white;
  border-bottom: 1px solid #ddd;
  ${media.tablet} {
    padding: 1rem 0;
  }
  ${media.mobile} {
    position: sticky;
    top: 95px;
    z-index: 9;
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