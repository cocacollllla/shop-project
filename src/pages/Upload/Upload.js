import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom';
import Options from './Options';
import {PRODUCTOPTION} from '../../data/Data';
import { dbService, storageService } from '../../myFirebase';
import { v4 as uuidv4 } from 'uuid';
import media from '../../styles/media';
import { Button } from '../../components/Style';
import styled from 'styled-components';


const Upload = () => {
  const [attatchment,  setAttatchment] = useState('');
  const [optionValue, setOptionValue] = useState({
    option: '',
    title: '',
    contents: '',
    price: 0,
    id: Date.now(),
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { value, name } = e.target;
    setOptionValue({
      ...optionValue,
      [name]: value,
    }) 
  }

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      let attatchmentUrl = '';
      if(attatchment !== ''){
        const attatchmentRef = storageService.ref().child(`${uuidv4()}`);
        const response = await attatchmentRef.putString(attatchment, 'data_url');
        attatchmentUrl = await response.ref.getDownloadURL();
      }
      await dbService.collection("products").add({...optionValue, attatchmentUrl, favorite: []});
      navigate('/');

    } catch(error) {
      console.log(error);
    } 
  }


  const onFileChange = (e) => {
    const files = e.target.files;
    const theFile = files[0];
    const reader = new FileReader(); 
    reader.onloadend = (finishedEvent) => {
      const result = finishedEvent.currentTarget.result;
      setAttatchment(result); 
    }
    reader.readAsDataURL(theFile); 
  }


  
  return (
    <UploadWrap>
      <form onSubmit={onSubmit}>
        {PRODUCTOPTION.map(option => (
          <Options key={option.id} option={option} handleChange={handleChange} onFileChange={onFileChange} optionValue={optionValue} />
        ))}
       
        <Button><input type="submit" value="올리기" /></Button>
      </form>
    </UploadWrap>
  );
}

export default Upload;


const UploadWrap = styled.div`
  width: ${(props) => props.theme.pcWidth};
  margin: 10rem auto 5rem auto;
  ${media.mobile} {
    margin: 5rem auto 5rem auto;
  }
  padding: 3rem 2rem;
  ${media.pc} {
    width: 100%
  }
  ${media.tablet} {
    padding: 0 1rem;
  }
`;




