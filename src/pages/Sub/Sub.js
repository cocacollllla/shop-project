import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import { dbService } from '../../myFirebase';
import { MAINPRODUCTS } from '../../data/Data';
import { SubWrap, SubBox } from '../../components/Style';
import SubListItems from './SubListItems';
import SubListMenu from '../../components/SubListMenu';

const Sub = () => {
  const [products, setProducts] = useState([]);
  const params = useParams();
  const currentMenu = params.option;
  
  useEffect(() => {

    const getSubItems = dbService.collection('products').onSnapshot((querySnapshot) => {
      const Products = querySnapshot.docs.map(doc => ({ docID:doc.id, ...doc.data()}));
      if(currentMenu === 'all') {
        setProducts(Products);
      } else {
        const menu = Products.filter(el => el.option === currentMenu);
        setProducts(menu);
      }
    });

    return () => {
      getSubItems();
    }
 
  }, [currentMenu]);
  

  return (
    <SubWrap>
      <SubListMenu list={MAINPRODUCTS} currentMenu={currentMenu} />
      <SubBox>
        <SubListItems posts={products} currentMenu={currentMenu} />
      </SubBox>
    </SubWrap>
  )
}

export default Sub;
