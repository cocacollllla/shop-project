import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { priceCommas } from '../../data/Data';
import { BsCart4 } from "react-icons/bs";
import { IoIosHeartEmpty, IoIosHeart } from "react-icons/io";
import media from '../../styles/media';
import { favoriteFalse, favoriteTrue } from '../../store/products-actions';
import { dbService } from '../../myFirebase';
import styled from 'styled-components';

const SubListItems = ({posts, currentMenu}) => {
  const user = useSelector(state => state.users);
  const cartProducts = useSelector(state => state.cart);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleClickFavorite = (product) => {
    if(user !== null) {
      if(!product.favorite.includes(user.uid)) {
        let fav = product.favorite;
        dispatch(favoriteTrue(product.docID, user.uid, fav));
      } else {
        let fav = product.favorite;
        dispatch(favoriteFalse(product.docID, user.uid, fav));
      }
    } else {
      alert('로그인이 필요한 서비스 입니다.');
    }
  }

  const handleClickCart = (product) => {

    if(user === null) {
      alert('로그인이 필요한 서비스 입니다.')
    } else {

    
    const data = {uid: user.uid, id: product.id, image:product.attatchmentUrl, title: product.title, price: product.price, quantity: 1, totalPrice: product.price};
    const cartItem = cartProducts.find(el => el.id === data.id);

    if(cartItem !== undefined) { 
      alert('장바구니에 존재하는 상품입니다.');
      console.log(cartItem);
    } else {
      dbService.collection('cart').add(data);
      alert('선택한 상품을 장바구니에 담았습니다.')
    }
  }
    
  }



  return (
    <SubList>
      {posts && posts.map(product => (
          <div key={product.id}>
            <Items onClick={() => navigate(`/${currentMenu}/detail/${product.docID}`)}>
              <ItemImage><img src={product.attatchmentUrl} alt="" /></ItemImage>
              <ItemTitle>{product.title}</ItemTitle>
              <ItemPrice>{priceCommas(product.price)} 원</ItemPrice>
              
            </Items>
            <FavCartIcon>
              <div onClick={() => handleClickFavorite(product)}>
                {user !== null && product.favorite.includes(user.uid) ? 
                  <IoIosHeart className="favoriteOnIcon" /> : <IoIosHeartEmpty className="favoriteIcon" />}
              </div>
              <div onClick={() => handleClickCart(product)}><BsCart4 /></div>
            </FavCartIcon>
          </div>
        ))
      }
      
      
    </SubList>
  
  )
}

export default SubListItems;

const SubList = styled.div`
  display:grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 5rem 2rem;
  ${media.tablet} {
    grid-gap: 5rem 1rem;
  }
  ${media.mobile} {
    grid-template-columns: repeat(2, 1fr);
  }
`;

const Items = styled.div`
  text-align: center;
  font-weight: 500;
  cursor: pointer;
  ${media.mobile} {
    font-size: .8rem;
  }
`;

const ItemImage = styled.div`
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

const ItemTitle = styled.div`
  padding: 1rem 0;
`;

const ItemPrice = styled.div`
  font-weight: 600;
`;

const FavCartIcon = styled.div`
  width: 40px;
  margin: 0 auto;
  margin-top: 1rem;
  display: flex;
  justify-content: space-between;

  div {
    cursor: pointer;
  }

  .favoriteOnIcon {
    fill: #ba1500;
  }
`;