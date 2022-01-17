import React from 'react';
import { useNavigate } from 'react-router-dom';
import { priceCommas } from '../../data/Data';
import media from '../../styles/media';
import styled from 'styled-components';

const SubListItems = ({posts, currentMenu}) => {
  const navigate = useNavigate();

  return (
    <SubList>
      {posts && posts.map(product => (
        <Items key={product.id} onClick={() => navigate(`/${currentMenu}/detail/${product.id}`)}>
          <ItemImage><img src={product.attatchmentUrl} alt="" /></ItemImage>
          <ItemTitle>{product.title}</ItemTitle>
          <ItemPrice>{priceCommas(product.price)} 원</ItemPrice>
        </Items>
      ))}
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