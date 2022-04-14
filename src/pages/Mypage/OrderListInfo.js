import React, {useState, useEffect} from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { dbService } from '../../myFirebase';
import { priceCommas, MYPAGE } from '../../data/Data';
import { SubWrap, SubBox } from '../../components/Style';
import SubListMenu from '../../components/SubListMenu';
import ProductList from '../../components/ProductList';
import styled from 'styled-components';

const OrderListInfo = () => {
  const [orderList, setOrderList] = useState([]);
  const location = useLocation();
  const params = useParams();

  let currentMenu = location.pathname.split('/').reverse()[1];

  useEffect(() => {

    const getItem = dbService.collection('order').doc(params.id).onSnapshot((doc) => {
      setOrderList({docID:doc.id, ...doc.data()});
    });
    return () => {
      getItem();
    }
  }, [params.id]);



  return (
    <SubWrap>
      <SubListMenu mypageList={MYPAGE} currentMenu={currentMenu} />
      <SubBox>
        <OrderInfo>
          <OrderInfoTitle>주문상품</OrderInfoTitle>
          <OrderInfoBox>
            {orderList.products && orderList.products.map(list => (
              <ProductList key={list.docID} list={list} />
            ))}
          </OrderInfoBox>
        </OrderInfo>

      {orderList.orderInfo &&
      <>
        <OrderInfo>
          <OrderInfoTitle>결제정보</OrderInfoTitle>
          <OrderInfoBox>
            <ul>
              {INFOLIST.map((el, idx) => (
                <li key={idx}><div>{el[0]}</div><div>{priceCommas(orderList.orderInfo[el[1]])} 원</div></li>
              ))}
            </ul>
          </OrderInfoBox>
        </OrderInfo>

        <OrderInfo>
          <OrderInfoTitle>주문정보</OrderInfoTitle>
          <OrderInfoBox>
            <ul>
              <li><div>주문자명</div><div>{orderList.userInfo.userName}</div></li>
              <li><div>배송지</div><div>{orderList.userInfo.userAddress}</div></li>
              <li><div>결제일시</div><div>{orderList.orderDate}</div></li>
            </ul>
          </OrderInfoBox>
        </OrderInfo>
      </>
      }

        
        
        
      </SubBox>
    </SubWrap>
  )
}

export default OrderListInfo;

const INFOLIST = [
  ['상품금액', 'result'],
  ['배송비', 'delivery'],
  ['적립금사용', 'savedMoney'],
  ['결제금액', 'pay']
]


const OrderInfo = styled.div`
  margin-bottom: 3rem;

`;

const OrderInfoTitle = styled.div`
  padding: 1rem;
  border-bottom: 1px solid #999;
  font-size: 1.3rem;
  font-weight: 500;
`;

const OrderInfoBox = styled.div`
  padding: 1rem;

  li {
    display: flex;
    padding-top: 1rem;

    div:first-child {
      min-width: 120px;
    }
  }

`;






