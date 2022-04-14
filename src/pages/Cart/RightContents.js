import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import { priceCommas} from '../../data/Data';
import { AiOutlineCheck } from "react-icons/ai";
import { v4 as uuidv4 } from 'uuid';
import moment from 'moment';
import media from '../../styles/media';
import styled from 'styled-components';
import { dbService } from '../../myFirebase';

const RightContents = ({doneList, result, savedMoney, address, isDefaultArr}) => {
  const user = useSelector(state => state.users);
  const navigate = useNavigate();
  const location = useLocation();
  const date = moment();
  const currentMenu = location.pathname.split('/').reverse()[0];

  const orderList = [...doneList];

  const savedM = currentMenu !== 'order' || savedMoney === '' ? 0 : savedMoney; 
  const delivery = result === 0 || result >= 100000 ? 0 : 5000;
  const pay = parseInt(result) + parseInt(delivery) - parseInt(savedM);

  
  const orderClick = () => {
    if(currentMenu === 'order') {
      if(user.address.addr === '' && address.addr === '') {
        alert('배송지를 입력해주세요.');
      } else {

        try {
          const order = {
            uid: user.uid,
            products: orderList,
            orderID: `${uuidv4()}`,
            orderDate: date.format('YYYY-MM-DD'),
            orderInfo: {
              result,
              delivery,
              savedMoney: savedM,
              pay,
            },
            userInfo: {
              userName: user.displayName,
              userAddress: address.addr === '' ? `${user.address.addr} ${user.address.addrDetail}` : `${address.addr} ${address.addrDetail}`,
            }
          }
          dbService.collection('order').add(order);
          orderList.forEach(el => {
            dbService.collection('cart').doc(el.docID).delete()
          });
          dbService.collection('users').doc(user.uid).update({
            saved_money: (parseInt(user.saved_money) - parseInt(savedM)).toString()
          });
          if(isDefaultArr) {
            dbService.collection('users').doc(user.uid).update({
              address : {
                zip : address.zip,
                addr : address.addr,
                addrDetail : address.addrDetail
              }
            });
          }
          alert('주문이 완료되었습니다.');
          navigate('/');
    
        } catch(error) {
          console.log(error);
        } 
      }
    } else {
      result !== 0 && navigate('/order', { state: orderList })
    }
    
  }



  return (
    <RightContentsWrap>
      <ResultBox>
        <PriceBox>
          {currentMenu !== 'order' && 
            <p><AiOutlineCheck className="icon" /><span>{doneList.length} 개 상품을 선택하셨습니다.</span></p>
          }
          <ul>
            <li><span>상품금액</span><span>{priceCommas(result)} 원</span></li>
            <li><span>배송비</span><span>{priceCommas(delivery)} 원</span></li>
            {currentMenu === 'order' && 
            <li><span>적립금사용</span><span>{savedM !== 0 && '- '}{priceCommas(savedM)} 원</span></li>
            }
          </ul>
          
          <div>
            <span>결제예정금액</span><span>{priceCommas(pay)} 원</span>
          </div>
          
        </PriceBox>
        <BuyBtn>
          <div onClick={orderClick}>주문하기</div>
        </BuyBtn>
      </ResultBox>
    </RightContentsWrap>
  )
}

export default RightContents;

const RightContentsWrap = styled.div`
  min-width: 240px;
  margin-left: 2rem;
  margin-top: 50px;

  ${media.mobile} {
    display: block;
    margin: 1rem 0 0 0;
    padding-bottom: 65px;
  }
`;

const ResultBox = styled.div`
  position: sticky;
  top: 100px;

  ${media.mobile} {
    position: static;
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
  margin-top: 15px;
  padding-bottom: 10px;
  background-color: white;

  ${media.mobile} {
    position: fixed;
    bottom: 0;
    width: calc(100% - 2rem);
  }

  div {
    height: 45px;
    border-radius: 5px;
    font-weight: 500;
    text-align: center;
    font-size: 1rem;
    line-height: 45px;
    cursor: pointer;
    background-color: ${(props) => props.theme.mainColor};
    color: white;
  }

  
`;