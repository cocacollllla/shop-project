import React from 'react';
import { useNavigate } from 'react-router-dom';
import { priceCommas} from '../../data/Data';
import { AiOutlineCheck } from "react-icons/ai";
import media from '../../styles/media';
import styled from 'styled-components';

const RightContents = ({doneList, result}) => {
  const navigate = useNavigate();

  const orderClick = () => {
    if(result !== 0) {
      navigate('/order');
    }
  }
  
  return (
    <RightContentsWrap>
      <ResultBox>
        <PriceBox>
          <p><AiOutlineCheck className="icon" /><span>{doneList.length} 개 상품을 선택하셨습니다.</span></p>
          <ul>
            <li><span>상품금액</span><span>{priceCommas(result)} 원</span></li>
            <li><span>배송비</span><span>{result === 0 || result >= 100000 ? 0 : priceCommas(5000)} 원</span></li>
          </ul>
          <div>
            <span>결제예정금액</span><span>{result === 0 || result >= 100000 ? priceCommas(result) : priceCommas(result + 5000)} 원</span>
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