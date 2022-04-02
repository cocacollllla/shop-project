import React, {useEffect, useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { authService, dbService, storageService } from '../myFirebase';
import { v4 as uuidv4 } from 'uuid';
import { useNavigate } from 'react-router-dom';
import { usersActions } from '../store/users-slice';
import media from '../styles/media';
import styled from 'styled-components';

const EditProfile = ({refreshUser}) => {
  const [attatchment,  setAttatchment] = useState(null);
  const [editName,  setEditName] = useState('');
  const user = useSelector(state => state.users);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    setEditName(user.displayName);
    setAttatchment(user.photoURL);
  }, []);
  
  const handleChange = (e) => {
    setEditName(e.target.value);
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

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      let photoURL = null;
      if(attatchment !== null && !attatchment.includes('https')){
        const attatchmentRef = storageService.ref().child(`board/${uuidv4()}`);
        const response = await attatchmentRef.putString(attatchment, 'data_url');
        photoURL = await response.ref.getDownloadURL();
      } else if(attatchment !== null && attatchment.includes('https')) {
        photoURL = attatchment;
      };

        if(user.displayName !== editName || user.photoURL !== attatchment) {
          await authService.currentUser.updateProfile({
            displayName: editName,
            photoURL
          }).then(() => {
            setAttatchment(photoURL);
            dispatch(usersActions.replaceData({uid: user.uid, displayName: editName, email: user.email, photoURL: photoURL === '' ? null : photoURL}));
          });
        } else {
          navigate(-1)
        }

    } catch(error) {
      console.log(error);
    } 
  }

  const handleClickClearImage = () => {
    setAttatchment(null);
  }

  return (
    <EditWrap>
      <form onSubmit={onSubmit}>
        <EditBox>
          <EditName>닉네임</EditName>
          <EditContent>
            <input type="text" value={editName} onChange={handleChange} required />
          </EditContent>
        </EditBox>
        <EditBox>
          <EditName>프로필사진</EditName>
          <EditContent>
            <input type="file" accept="image/*" onChange={onFileChange} />
            {(attatchment !== null) && 
              <img src={attatchment} alt="" width="50px" height="50px" />
            }
          <div onClick={handleClickClearImage}>Clear Image</div>
          </EditContent>
        </EditBox>
        
       
        <EditBtn type="submit" value="수정하기" />
      </form>
    </EditWrap>
  )
}

export default EditProfile;


const EditWrap = styled.div`
  max-width: ${(props) => props.theme.pcWidth};
  margin: 10rem auto 5rem auto;
  ${media.mobile} {
    margin: 5rem auto 5rem auto;
  }
  padding: 3rem 1rem;
`;

const EditBtn = styled.input`
  display: block;
  margin: 30px auto 0 auto;
  padding: .5rem 2rem;
  font-size: 1rem;
  font-weight: 500;
  background-color: ${(props) => props.theme.mainColor};
  color: ${(props) => props.theme.white};
  border-radius: 10px;
  cursor: pointer;
`;

const EditBox = styled.div`
  border-top: 1px solid ${(props) => props.theme.borderColor};
  padding: 1rem 0;
  display: flex;
  justify-content: flex-start;
  align-items: center;

  &:last-of-type {
    border-bottom: 1px solid ${(props) => props.theme.borderColor};
  }
`;

const EditName = styled.div`
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

const EditContent = styled.div`
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

`;
