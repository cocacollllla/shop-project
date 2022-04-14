import React, {useState, useEffect} from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import { dbService } from '../../myFirebase';
import { priceCommas, MYPAGE } from '../../data/Data';
import { VscChevronRight } from "react-icons/vsc";
import SubListMenu from '../../components/SubListMenu';
import { SubWrap, SubBox } from '../../components/Style';
import styled from 'styled-components';

const OrderList = () => {
  const [orderList, setOrderList] = useState([]);
  const user = useSelector(state => state.users);
  const location = useLocation();
  const navigate = useNavigate();

  let currentMenu = location.pathname.split('/').reverse()[0];

  useEffect(() => {
    const getItem = dbService.collection('order').where('uid', "==", user.uid).onSnapshot((querySnapshot) => {
      const order = querySnapshot.docs.map(doc => ({ docID:doc.id, ...doc.data()}));
      setOrderList(order);
    });
    return () => {
      getItem();
    }
  }, [user.uid]);



  return (
    <SubWrap>
      <SubListMenu mypageList={MYPAGE} currentMenu={currentMenu} />
      <SubBox>
        {orderList.length > 0 ? 
        orderList.map(list => (
          <ListBox key={list.docID} onClick={() => {navigate(`/mypage/order/${list.docID}`)}}>
            <OrderDate><div>{list.orderDate}</div></OrderDate>
            <OrderProd>
              <OrderProdImage><img src={list.products[0].image} alt="상품이미지" /></OrderProdImage>
              <OrderProdInfo>
                <div>{list.products[0].title} {list.products.length > 1 && `외 ${list.products.length - 1} 건`  }</div>
                <div>주문금액 <span>{priceCommas(list.orderInfo.result)} 원</span></div>
              </OrderProdInfo>
              <VscChevronRight className="moreIcon" />
            </OrderProd>

          </ListBox>
        ))
      : <NoData>주문내역이 없습니다.</NoData>}
        
      </SubBox>
    </SubWrap>
  )
}

export default OrderList;

const NoData = styled.div`
  text-align: center;
  margin-top: 5rem;
`;

const ListBox = styled.div`
  border: 1px solid #ddd;
  border-radius: 5px;
  margin-bottom: 1rem;
  cursor: pointer;
`;

const OrderDate = styled.div`
  border-bottom: 1px solid #ddd;
  padding: 1rem;
`;

const OrderProd = styled.div`
  display: flex;
  align-items: center;
  padding: 1rem;

  .moreIcon {
    margin-left: auto;
    font-size: 1.5rem;
  }
`;

const OrderProdImage = styled.div`
  width: 90px;

  img {
    width: 100%;
    object-fit: cover;
  }
`;

const OrderProdInfo = styled.div`
  margin-left: 20px;

  div {
    line-height: 30px;

    span {
      font-weight: 500;
    }
  }
`;


