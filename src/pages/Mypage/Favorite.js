import React, {useState, useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import { dbService } from '../../myFirebase';
import { priceCommas, MYPAGE } from '../../data/Data';
import SubListMenu from '../../components/SubListMenu';
import { SubWrap, SubBox } from '../../components/Style';
import { favoriteFalse } from '../../store/products-actions';
import styled from 'styled-components';

const Favorite = () => {
  const [favProducts, setFacProducts] = useState([]);
  const user = useSelector(state => state.users);
  const cartProducts = useSelector(state => state.cart);
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  let currentMenu = location.pathname.split('/').reverse()[0];

  useEffect(() => {
    const getItem = dbService.collection('products').where('favorite', "array-contains", user.uid).onSnapshot((querySnapshot) => {
      const cartProducts = querySnapshot.docs.map(doc => ({ docID:doc.id, ...doc.data()}));
      setFacProducts(cartProducts);
    });
    return () => {
      getItem();
    }
  }, [user.uid]);


  const handleClickFavorite = (product) => {
    let fav = product.favorite;
    dispatch(favoriteFalse(product.docID, user.uid, fav));
  }

  const handleClickCart = (product) => {

    const data = {uid: user.uid, id: product.id, image:product.attatchmentUrl, title: product.title, price: product.price, quantity: 1, totalPrice: product.price};
    const cartItem = cartProducts.find(el => el.id === data.id);

    if(cartItem !== undefined) { 
      alert('장바구니에 존재하는 상품입니다.');
    } else {
      dbService.collection('cart').add(data);
      alert('선택한 상품을 장바구니에 담았습니다.')
    }
    
  }

  return (
    <SubWrap>
      <SubListMenu mypageList={MYPAGE} currentMenu={currentMenu} />
      <SubBox>
        {favProducts.length > 0 ? 
          favProducts.map(product => (
            <FavoriteList key={product.id}>
              <ProductImage onClick={() => {navigate(`/${product.option}/detail/${product.docID}`)}}><img src={product.attatchmentUrl} alt="상품이미지" /></ProductImage>
              <ProductTitle>
                <div>{product.title}</div>
                <span>{priceCommas(product.price)} 원</span>
              </ProductTitle>
              <ProductBtn>
                <div onClick={() => handleClickCart(product)} className="cart">장바구니</div>
                <div onClick={() => handleClickFavorite(product)} className="delete">삭제</div>
              </ProductBtn>
            </FavoriteList>
          ))
          :
          <NoData>찜한 상품이 없습니다.</NoData>
        }
        
      </SubBox>
    </SubWrap>
  )
}

export default Favorite;

const FavoriteList = styled.div`
  display: flex;
  justify-content: flex-start;
  margin-bottom: 1rem;
`;

const ProductImage = styled.div`
  min-width: 70px;
  height: 70px;
  overflow: hidden;
  position: relative;
  cursor: pointer;

  img {
    position: absolute;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const ProductTitle = styled.div`
  margin-left: 1rem;
  display: flex;
  flex-direction: column;
  justify-content: center;

  div {
    margin: 0 0 10px 0;
  }

  span {
    font-weight: 500;
  }
`;

const ProductBtn = styled.div`
  margin-left: auto;
  display: flex;
  flex-direction: column;
  justify-content: space-around;

  div {
    width: 75px;
    height: 30px;
    border: 1px solid #ddd;
    border-radius: 5px;
    font-size: 0.9rem;
    text-align: center;
    line-height: 30px;
    cursor: pointer;
  }

  .cart {
    border: 1px solid ${(props) => props.theme.mainColor};
  }
`;

const NoData = styled.div`
  text-align: center;
  margin-top: 5rem;
`;

