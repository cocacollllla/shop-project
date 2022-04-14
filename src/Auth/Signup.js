import React, {useState} from 'react';
import { useParams, useNavigate } from 'react-router';
import media from '../styles/media';
import FormLayout from './FormLayout';
import styled from 'styled-components';

const Signup = () => {
  const [signInfo, setSignInfo] = useState({
    name: '',
    email: '',
    password: '',
  });
  const params = useParams();
  const navigate = useNavigate();

  const goToSign = () => {
    let sign = '';
    if(params.sign === 'signup') {
      sign = 'signin';
      navigate(`/sign/${sign}`);
    } else {
      sign = 'signup';
      navigate(`/sign/${sign}`)
    }
  }

  const handleClickAccount = (account) => {
    setSignInfo({
      ...signInfo,
      email: account.email,
      password: account.password,
    }) 
  }

  return (
    <SignupWrap>
      <SignTitle>{params.sign === 'signup' ? "회원가입" : "로그인"}</SignTitle>
      {params.sign === 'signup' ? 
      <FormLayout type="signup" title="회원가입" inputData={SIGNUP_DATA} sign={params.sign} signInfo={signInfo} setSignInfo={setSignInfo}></FormLayout> : 
      <FormLayout type="signin" title="로그인" inputData={SIGNIN_DATA} sign={params.sign} signInfo={signInfo} setSignInfo={setSignInfo}></FormLayout>}
      <GoToSignBtn onClick={goToSign}>{params.sign === 'signup' ? "로그인" : "회원가입"}</GoToSignBtn>
      {params.sign === 'signin'&& 
        <TestAccount>
          <div>테스트 계정</div>
          <ul>
            {ACCOUNT.map((account, idx) => (
              <li key={idx} onClick={() => handleClickAccount(account)}>{account.cate}</li>
            ))}
          </ul>
        </TestAccount>
      }
      
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

const ACCOUNT = [
  {
    cate: '계정 1',
    email: '01.test.shop@gmail.com',
    password: '123456789'
  },
  {
    cate: '계정 2',
    email: '02.test.shop@gmail.com',
    password: '123456789'
  },
  {
    cate: '계정 3',
    email: '03.test.shop@gmail.com',
    password: '123456789'
  }
]

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

const TestAccount = styled.div`
  max-width: 200px;
  padding: 1rem;
  margin: 20px auto;
  border: 1px solid #ddd;
  border-radius: 5px;
  
  div {
    padding-bottom: 1rem;
    text-align: center;
    border-bottom: 1px solid #ddd;
  }
  ul {
    display: flex;
    justify-content: space-between;
    padding-top: 1rem;
    cursor: pointer;
  }
`;



