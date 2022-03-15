import React, {useState} from 'react';
import { useDispatch } from 'react-redux';
import { authService, dbService } from '../myFirebase';
import { v4 as uuidv4 } from 'uuid';
import { useNavigate } from 'react-router-dom';
import { usersActions } from '../store/users-slice';
import styled from 'styled-components';

const FormLayout = ({sign, title, inputData}) => {
  const [signInfo, setSignInfo] = useState({
    name: '',
    email: '',
    password: '',
  });
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onChange = (e) => {
    const { value, name } = e.target;
    setSignInfo({
      ...signInfo,
      [name]: value,
    }) 
  }

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      if(sign === 'signup') {
        await authService.createUserWithEmailAndPassword(signInfo.email, signInfo.password).then(result => {
          result.user.updateProfile({
            displayName: signInfo.name
          })
        });
        await dbService.collection("users").add({displayName: signInfo.name, email: signInfo.email});
        // dispatch(usersActions.replaceData({displayName: signInfo.name, email: signInfo.email}));
        // await authService.signOut();
      } else {
        await authService.signInWithEmailAndPassword(signInfo.email, signInfo.password);
        
      }
    } catch(error) {
      if(error.code === 'auth/email-already-in-use') {
        alert('이미 가입되어있는 이메일 입니다.')
      } else if(error.code === 'auth/weak-password') {
        alert('비밀번호는 6자리 이상이어야 합니다.')
      } else if(error.code === 'auth/user-not-found' || 'auth/wrong-password') {
        alert('이메일 또는 비밀번호가 일치하지 않습니다.')
      } else {
        console.log(error);
      }
    }
  }



  return (
    <SignForm onSubmit={onSubmit}>
      {inputData.map((input, idx) => (
        <SignFormInput key={idx} type={input.type} name={input.name} placeholder={input.name} onChange={onChange} required />
      ))}
      <SubmitBtn type="submit" value={title} />
    </SignForm>
  )
}

export default FormLayout;


const SignForm = styled.form`
  max-width: 400px;
  margin: 0 auto;
`;

const SignFormInput = styled.input`
  width: 100%;
  padding: 1rem;
  margin-bottom: .5rem;
  border-radius: 5px;
  border: 1px solid ${(props) => props.theme.borderColor};
`;

const SubmitBtn = styled.input`
  width: 100%;
  height: 50px;
  margin: 1rem 0 .5rem 0;
  border: 0;
  border-radius: 5px;
  background-color: ${(props) => props.theme.mainColor};
  color: ${(props) => props.theme.white};
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
`;