import React, {useState} from 'react';
import { useSelector } from 'react-redux';
import {  useLocation } from 'react-router-dom';
import { priceCommas} from '../../data/Data';
import { AiOutlineCheckCircle, AiFillCheckCircle } from "react-icons/ai";
import media from '../../styles/media';
import styled from 'styled-components';
import RightContents from './RightContents';
import Post from '../../components/Post';
import ProductList from '../../components/ProductList';

const Order = () => {
  const [savedMoney, setSavedMoney] = useState('');
  const [isDefaultArr, setIsDefaultArr] = useState(false);
  const [address, setAddress] = useState({
    zip: '',
    addr: '',
    addrDetail: ''
  }); 
  const user = useSelector(state => state.users);
  const { state } = useLocation();

  const result = state.reduce((acc, current) => acc + parseInt(current.totalPrice), 0);

  const savedMoneyChange = (e) => {
    const value = e.target.value;
    if(parseInt(value) > parseInt(user.saved_money)) {
      alert(`사용가능금액은 ${user.saved_money} 원 입니다.`);
      setSavedMoney(user.saved_money)
    } else {
      setSavedMoney(value);
    }
  }



  return (
    <OrderWrap>
      <OrderLeftContents>
        <OrderBox>
          <OrderTitle>주문상품</OrderTitle>
          <OrderProducts>
            {state.map(el => (
              <ProductList key={el.docID} list={el} />
            ))}
          </OrderProducts>
        </OrderBox>
        <OrderBox>
          <OrderTitle>주문자 정보</OrderTitle>
          <OrderInfo>
            <Box><OrderName>이름</OrderName> <div>{user.displayName}</div></Box>
            <Box><OrderName>이메일</OrderName> <div>{user.email}</div></Box>
          </OrderInfo>
        </OrderBox>
        <OrderBox>
          <OrderTitle>배송지 정보</OrderTitle>
          <OrderInfo>
            <Box>
              <OrderName>배송지</OrderName>
              {user.address.addr !== '' ? 
                <div>
                  <p>{user.address.zip}</p>
                  <p>{user.address.addr}</p>
                  <p>{user.address.addrDetail}</p>
                </div>:
                <AddrForm>
                  <Post address={address} setAddress={setAddress} />
                  <AddrDefaultCheck>
                    <label htmlFor="defaultArr">
                      <CheckIcon>{isDefaultArr ? <AiFillCheckCircle /> : <AiOutlineCheckCircle className="offCheck" />}</CheckIcon>
                      <input
                        type="checkbox"
                        id="defaultArr"
                        onChange={e => setIsDefaultArr(!isDefaultArr)}
                        checked={isDefaultArr}
                      />
                      <span>기본배송지로 설정</span>
                    </label>
                  </AddrDefaultCheck>
                </AddrForm>
              }
            </Box>
            
          </OrderInfo>
        </OrderBox>
        <OrderBox>
          <OrderTitle>적립금</OrderTitle>
          <OrderInfo>
            <Box>
              <OrderName>적립금</OrderName>
              <SavedMoney>
                <input type='text' value={savedMoney} onChange={savedMoneyChange} />
                <SavedMoneyBtn onClick={() => setSavedMoney(user.saved_money)}>전액사용</SavedMoneyBtn>
                <div>(사용가능금액 : {priceCommas(parseInt(user.saved_money))})</div>
              </SavedMoney>
            </Box>
          </OrderInfo>
        </OrderBox>
      </OrderLeftContents>

      <RightContents doneList={state} result={result} savedMoney={savedMoney} address={address} isDefaultArr={isDefaultArr} />
    </OrderWrap>
  )
}

export default Order;

const OrderWrap = styled.div`
  max-width: ${(props) => props.theme.pcWidth};
  margin: 10rem auto 5rem auto;
  padding: 3rem 1rem;
  display: flex;
  justify-content: space-between;
  ${media.mobile} {
    display: block;
    margin: 5rem auto 0 auto;
    padding: 3rem 1rem 0 1rem;
  }
  
`;

const OrderLeftContents = styled.div`
  width: 100%;
`;

const OrderBox = styled.div`
  margin-bottom: 2rem;
`;

const OrderProducts = styled.div`
  padding: 1rem;
`;

const OrderInfo = styled.div`
  padding: 1rem;
`;


const OrderTitle = styled.div`
  padding: 1rem;
  border-bottom: 1px solid #999;
  font-size: 1.3rem;
  font-weight: 500;
`;

const SavedMoney = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-wrap: wrap;

  div {
    padding: 0
  }

  input {
    width: 120px;
    height: 30px;
    padding-left: 10px;
  }
`;

const SavedMoneyBtn = styled.div`
  height: 30px;
  margin: 0 10px;
  padding: 0 10px !important;
  border-radius: 5px;
  font-size: 0.9rem;
  line-height: 30px;
  background-color: #eee;
  cursor: pointer;
`;


const AddrDefaultCheck = styled.div`
  margin-top: 20px;
`;


const CheckIcon = styled.span`
  width: 30px !important;
  vertical-align: top;

  svg {
    font-size: 1.2rem;
  }
    
  .offCheck {
    fill: #ddd;
  }
  
`;


const Box = styled.div`
  display: flex;
  align-items: center;
  padding: 1rem 0 0 0;
  
  p {
    line-height: 30px;
  }
  
`;

const OrderName = styled.div`
  min-width: 80px;
  font-weight: 500;
  
`;

const AddrForm = styled.div`
  max-width: 300px;
  width: 100%;
  
  div {
    padding: 0;
  }

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




