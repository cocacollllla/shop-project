import React, {useState, useEffect} from 'react';
import { useParams, useNavigate } from 'react-router';
import media from '../styles/media';
import FormLayout from './FormLayout';
import { authService } from '../myFirebase';
import styled from 'styled-components';

const Signup = () => {
  const params = useParams();
  const navigate = useNavigate();

  const goToSign = () => {
    let sign = '';
    if(params.sign === 'signup') {
      sign = 'signin';
      navigate(`/${sign}`);
    } else {
      sign = 'signup';
      navigate(`/${sign}`)
    }
  }

  return (
    <SignupWrap>
      <SignTitle>{params.sign === 'signup' ? "회원가입" : "로그인"}</SignTitle>
      {params.sign === 'signup' ? 
      <FormLayout type="signup" title="회원가입" inputData={SIGNUP_DATA} sign={params.sign}></FormLayout> : 
      <FormLayout type="signin" title="로그인" inputData={SIGNIN_DATA} sign={params.sign}></FormLayout>}
      <GoToSignBtn onClick={goToSign}>{params.sign === 'signup' ? "로그인" : "회원가입"}</GoToSignBtn>
    </SignupWrap>
  )
}

export default Signup;

const SIGNUP_DATA = [
  {
    type: "text",
    name: "name",
    text: "이름",
  },
  {
    type: "text",
    name: "email",
    text: "이메일",
  },
  {
    type: "password",
    name: "password",
    text: "비밀번호",
  },
];

const SIGNIN_DATA = [
  {
    type: "text",
    name: "email",
    text: "이메일",
  },
  {
    type: "password",
    name: "password",
    text: "비밀번호",
  },
];

const SignupWrap = styled.div`
  max-width: ${(props) => props.theme.pcWidth};
  margin: 10rem auto 5rem auto;
  ${media.mobile} {
    margin: 5rem auto 5rem auto;
  }
  padding: 3rem 1rem;
`;

const SignTitle = styled.div`
  text-align: center;
  margin-bottom: 2rem;
  font-size: 1.3rem;
  font-weight: 500;
`;

const GoToSignBtn = styled.div`
  max-width: 400px;
  height: 50px;
  margin: 0 auto;
  border-radius: 5px;
  border: 1px solid ${(props) => props.theme.mainColor};
  color: ${(props) => props.theme.mainColor};
  font-size: 1rem;
  font-weight: 500;
  text-align: center;
  line-height: 47px;
  cursor: pointer;
`;
