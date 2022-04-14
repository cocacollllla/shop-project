import React from "react";
import media from '../../styles/media';
import styled from "styled-components";

const Options = ({ option, handleChange, onFileChange }) => {


  const menuList = () => {
    if(option.option === '종류') {
      return (
        <select name={option.class} onChange={handleChange}>
          <option hidden>선택해주세요.</option>
          {option.content.map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>
      )
    } else if(option.option === '이미지') {
      return <input type="file" accept="image/*" onChange={onFileChange} />
    } else if(option.option === '내용') {
      return <textarea name="contents" onChange={handleChange}></textarea>
    } else {
      return <input type={option.option === '가격' ? "number" :"text"} name={option.class} onChange={handleChange} />
    }
  }

  

  return (
   
      <OptionWrap>
        <OptionName>{option.option}</OptionName>
        <OptionContent>
          {menuList()}
        </OptionContent>
    
      </OptionWrap>
   
    

  );
};

export default Options;


const OptionWrap = styled.div`
  border-top: 1px solid ${(props) => props.theme.borderColor};
  padding: 1rem 0;
  display: flex;
  justify-content: flex-start;
  align-items: center;

  &:last-of-type {
    border-bottom: 1px solid ${(props) => props.theme.borderColor};
  }
`;

const OptionName = styled.div`
  width: 150px;
  ${media.tablet} {
    width: 100px;
  }
  text-align: center;
  font-weight: 500;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const OptionContent = styled.div`
  width: 500px;
  ${media.mobile} {
    display: block;
  }
  display: flex;
  justify-content: flex-start;
  align-items: center;

  input {
    width: 100%;
    padding: .5rem;
    border-radius: 5px;
    border: 1px solid ${(props) => props.theme.borderColor};
  }

  input[type="number"]::-webkit-outer-spin-button,
  input[type="number"]::-webkit-inner-spin-button {
      -webkit-appearance: none;
      margin: 0;
  }

  textarea {
    width: 100%;
    height: 200px;
    padding: .5rem;
    border-radius: 5px;
    border: 1px solid ${(props) => props.theme.borderColor};
  }

  select {
    width: 100%;
    padding: .5rem;
    border-radius: 5px;
    border: 1px solid ${(props) => props.theme.borderColor};
    background: transparent;
  }
`;




