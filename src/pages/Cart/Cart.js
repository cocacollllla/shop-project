import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import media from '../../styles/media';
import LeftContents from './LeftContents';
import RightContents from './RightContents';
import styled from 'styled-components';

const Cart = () => {
  const dispatch = useDispatch();
  const item = useSelector(state => state.cart);

  const doneList = item.filter(list => list.isChecked === true);

  const result = doneList.reduce((acc, current) => acc + current.totalPrice, 0);

  console.log('dd');

  return (
    <DetailWrap>
      {item.length === 0 ?
      <NoData>장바구니에 상품이 없습니다.</NoData> :
      <>
        <LeftContents doneList={doneList} item={item} />
        <RightContents doneList={doneList} result={result} />
      </>
      }
    </DetailWrap>
  )
}

export default Cart;

const DetailWrap = styled.div`
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



const NoData = styled.div`
  width: 100%;
  text-align: center;
`;