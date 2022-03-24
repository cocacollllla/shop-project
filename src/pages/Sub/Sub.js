import React, { useState, useEffect } from 'react';
import { useLocation, useParams } from 'react-router';
import { dbService } from '../../myFirebase';
import { MAINPRODUCTS } from '../../data/Data';
import SubListItems from './SubListItems';
import SubListMenu from '../../components/SubListMenu';
import media from '../../styles/media';
import styled from 'styled-components';

const Sub = () => {
  const [products, setProducts] = useState([]);
  const location = useLocation();
  const params = useParams();

  const currentMenu = params.option;

  const getItems = async () => {
    if(currentMenu === 'all') {
       dbService.collection('products').onSnapshot(snapshot => {
        const getAllItems = snapshot.docs.map(doc => ({ id:doc.id, ...doc.data()}));
        setProducts(getAllItems);
      });
    } else {
      const getOptionItems = await dbService.collection('products').where('option', '==', currentMenu).get();
      const optionItems = getOptionItems.docs.map((doc) => doc.data());
      setProducts(optionItems);
    }
  }
  
  useEffect(() => {
    getItems();
    return() => {

    }
  }, [location]);

  return (
    <SubListWrap>
      <SubListMenu list={MAINPRODUCTS} currentMenu={currentMenu} />
      <SubProducts>
        <SubListItems  posts={products} currentMenu={currentMenu} />
      </SubProducts>
    </SubListWrap>
  )
}



export default Sub;

const SubListWrap = styled.div`
  max-width: ${(props) => props.theme.pcWidth};
  margin: 10rem auto 5rem auto;
  ${media.mobile} {
    margin: 5rem auto 5rem auto;
  }
  padding: 3rem 1rem;
  display: flex;
  justify-content: space-between;
  ${media.tablet} {
    display: block;
  }
`;

const SubProducts = styled.div`
  width: 100%;
  ${media.tablet} {
    margin-top: 3rem;
  }
`;
