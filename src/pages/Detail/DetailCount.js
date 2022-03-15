import React, {useState, useEffect} from 'react';
import { priceCommas } from '../../data/Data';
import { dbService } from '../../myFirebase';
import { AiOutlineMinusCircle, AiOutlinePlusCircle } from "react-icons/ai";
import media from '../../styles/media';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import firebase from "firebase/compat/app";

const DetailCount = ({products}) => {
  const [count, setCount] = useState(1);
  const [cartProducts, setCartProducts] = useState([]);
  const [userBox, setUserBox] = useState([]);
  const loginUser = useSelector(state => state.users[0]);

  // const handleClickCart = () => {

  //   const data = {id: products.id, image:products.attatchmentUrl, title: products.title, price: products.price, quantity: count, totalPrice: totalPrice};
  //   // const cartItem = cartProducts.find(el => el.id === data.id);

  //   // if(cartItem !== undefined) { 
  //   //   alert('장바구니에 존재하는 상품입니다.');
  //   // } else {
  //     if(cartProducts !== undefined) {
  //       dbService.collection('users').doc(cartProducts.id).update({
  //         cart: firebase.firestore.FieldValue.arrayUnion(data)
  //       });
  //     }
  //     alert('선택한 상품을 장바구니에 담았습니다.')
  //   // }
  // }

  const handleClickCart = () => {

    const data = {uid: loginUser.uid, id: products.id, image:products.attatchmentUrl, title: products.title, price: products.price, quantity: count, totalPrice: totalPrice};
    const cartItem = cartProducts.find(el => el.id === data.id);

    if(cartItem !== undefined) { 
      alert('장바구니에 존재하는 상품입니다.');
    } else {
      dbService.collection('test_cart').add(data);
      alert('선택한 상품을 장바구니에 담았습니다.')
    }
  }

  useEffect(() => {
    if(loginUser !== undefined) {
      // const getItem = dbService.collection('test_cart').onSnapshot(snapshot => {
      //   const cartItemList = snapshot.docs.map(doc => ({ id:doc.id, ...doc.data()}));
      //   setCartProducts(cartItemList);
      // });
      const getItem = dbService.collection('test_cart').where('uid', "==", loginUser.uid).onSnapshot((querySnapshot) => {
        const cartItemList = querySnapshot.docs.map(doc => ({ id:doc.id, ...doc.data()}));
        setCartProducts(cartItemList);
      });
      return() => {
        getItem();
      }
    }
    
  }, []);


  const totalPrice = products.price * count;

  
  return (
    <>
      <div>
        <QuantityWrap>
          <QuantityTitle>수량</QuantityTitle>
          <Quantity>
            <button onClick={() => {count > 1 && setCount(count - 1)}}><AiOutlineMinusCircle /></button>
            <span>{count}</span>
            <button onClick={() => {setCount(count + 1)}}><AiOutlinePlusCircle /></button>
          </Quantity>
        </QuantityWrap>
      </div>

      <ButtonWrap>
        {totalPrice > 0 && 
          <ProductTotal>
            <ProductTotalTitle>상품금액합계</ProductTotalTitle>
            <ProductTotalPrice>{priceCommas(totalPrice)} 원</ProductTotalPrice>
          </ProductTotal>
        } 
        <CartBtn onClick={handleClickCart}>장바구니 넣기</CartBtn>
      </ButtonWrap>
    </>
  )
}

export default DetailCount;


const QuantityWrap = styled.div`
  padding: 1rem 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const QuantityTitle = styled.div`
  font-size: 1.1rem;
  ${media.mobile} {
    font-size: 1rem;
  }
`;

const Quantity = styled.div`
  button {
    border: none;
    background: transparent;
    padding: 1rem;
    font-size: 1.2rem;
    cursor: pointer;
  }

  span {
    font-weight: 500;
    vertical-align: text-top;
  }
`;



const ButtonWrap = styled.div`
  width: 100%;
  position: absolute;
  ${media.mobile} {
    position: static;
  }
  bottom: 0;
`;

const ProductTotal = styled.div`
  display: flex;
  justify-content: space-between;
  padding-bottom: 2rem;
  align-items: center;
`;

const ProductTotalTitle = styled.div`
  font-size: 1.1rem;
  ${media.mobile} {
    font-size: 1rem;
  }
`;

const ProductTotalPrice = styled.div`
  font-size: 1.5rem;
  font-weight: 500;
  ${media.mobile} {
    font-size: 1.2rem;
  }
`;

const CartBtn = styled.div`
  padding: 1.2rem;
  background-color: ${(props) => props.theme.mainColor};
  border-radius: 10px;
  color: ${(props) => props.theme.white};
  text-align: center;
  font-size: 1.2rem;
  font-weight: 500;
  cursor: pointer;
  ${media.mobile} {
    font-size: 1.1rem;
  }
`;