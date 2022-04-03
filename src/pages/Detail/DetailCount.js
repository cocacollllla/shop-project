import React, {useState, useEffect} from 'react';
import { priceCommas } from '../../data/Data';
import { useParams } from 'react-router-dom';
import { dbService } from '../../myFirebase';
import { AiOutlineMinusCircle, AiOutlinePlusCircle } from "react-icons/ai";
import { IoIosHeartEmpty, IoIosHeart } from "react-icons/io";
import media from '../../styles/media';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import firebase from "firebase/compat/app";
import { productsActions } from '../../store/products-slice';
import { favoriteFalse, favoriteTrue } from '../../store/products-actions';
import { Navigate } from 'react-router-dom';

const DetailCount = ({user,  products}) => {
  const [count, setCount] = useState(1);
  const [cartProducts, setCartProducts] = useState([]);
  // const userInfo = [...user];
  // const useuse = userInfo.filter((el => el.id === products.id));
  const [heart, setHeart] = useState(false);
  const dispatch = useDispatch();

  const params = useParams();

  const productId = params.id;

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

    if(user === null) {
      alert('로그인이 필요한 서비스 입니다.')
    } else {

    
    const data = {uid: user.uid, id: products.id, image:products.attatchmentUrl, title: products.title, price: products.price, quantity: count, totalPrice: totalPrice};
    const cartItem = cartProducts.find(el => el.id === data.id);

    if(cartItem !== undefined) { 
      alert('장바구니에 존재하는 상품입니다.');
      console.log(cartItem);
    } else {
      dbService.collection('test_cart').add(data);
      alert('선택한 상품을 장바구니에 담았습니다.')
    }
  }
    
  }

  useEffect(() => {
    if(user !== null) { 
      if(!products.favorite.includes(user.uid)) {
        setHeart(false)
      } else {
        setHeart(true)
      }
    // } else if(userInfo[0] === undefined) {
    } else {
      setHeart(false);
    }
    if(user !== null) {

      const getItem = dbService.collection('test_cart').where('uid', "==", user.uid).onSnapshot((querySnapshot) => {
        const cartItemList = querySnapshot.docs.map(doc => ({ id:doc.id, ...doc.data()}));
        setCartProducts(cartItemList);
      });
      return() => {
        getItem();
      }
    }
    
  }, []);

  const handleClickFavorite = () => {
    // dbService.collection('users').doc(loginUser.docID).update({
    //   favorite: 
    // });
    // dispatch(plusFav(loginUser.docID, products.id));

    if(user !== null) {
      if(!products.favorite.includes(user.uid)) {
        console.log('없으니까 넣을게');
        let fav = products.favorite;
        dispatch(favoriteTrue(products.docID, user.uid, fav));
        setHeart(true);
      } else {

        console.log('삭제할게');
        let fav = products.favorite;
        dispatch(favoriteFalse(products.docID, user.uid, fav));
        setHeart(false);

      }
    } else {
      alert('로그인이 필요한 서비스 입니다.');
    }
  }




  const totalPrice = products.price * count;

// console.log(user);
console.log(products.id);
console.log(cartProducts);
// console.log(heart);
// console.log(productId);
  
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
        <BtnBox>
          <FavoriteBtn onClick={handleClickFavorite}>{heart ? <IoIosHeart className="favoriteOnIcon" /> : <IoIosHeartEmpty className="favoriteIcon" />}</FavoriteBtn>
          <CartBtn onClick={handleClickCart}>장바구니 넣기</CartBtn>
        </BtnBox>
        
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

const BtnBox = styled.div`
  display: grid;
  grid-template-columns: 1fr 6fr;
  grid-column-gap: 10px;
`;

const FavoriteBtn = styled.div`
  padding: .7rem;
  border: 1px solid #ddd;
  border-radius: 10px;
  text-align: center;
  cursor: pointer;

  .favoriteIcon {
    font-size: 2rem;
  }

  .favoriteOnIcon {
    font-size: 2rem;
    fill: #ba1500;
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