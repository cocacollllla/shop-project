import React, {useEffect, useState} from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { authService, dbService, storageService } from '../../myFirebase';
import { v4 as uuidv4 } from 'uuid';
import media from '../../styles/media';
import SubListMenu from '../../components/SubListMenu';
import { Button, SubWrap, SubBox } from '../../components/Style';
import { MYPAGE } from '../../data/Data';
import Post from '../../components/Post';
import styled from 'styled-components';

const EditProfile = () => {
  const [attatchment,  setAttatchment] = useState(null);
  const [editName,  setEditName] = useState('');
  const [address, setAddress] = useState({
    zip: '',
    addr: '',
    addrDetail: ''
  }); 

  const user = useSelector(state => state.users);
  const navigate = useNavigate();
  const location = useLocation();

  let currentMenu = location.pathname.split('/').reverse()[0];

  useEffect(() => {
    setEditName(user.displayName);
    setAttatchment(user.photoURL);
    setAddress({
      zip: user.address.zip,
      addr: user.address.addr,
      addrDetail: user.address.addrDetail,
    })
  }, [user.displayName, user.photoURL, user.address.zip, user.address.addr, user.address.addrDetail]);
  
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
        const attatchmentRef = storageService.ref().child(`${uuidv4()}`);
        const response = await attatchmentRef.putString(attatchment, 'data_url');
        photoURL = await response.ref.getDownloadURL();
      } else if(attatchment !== null && attatchment.includes('https')) {
        photoURL = attatchment;
      };

        if(user.displayName !== editName || user.photoURL !== attatchment || user.address.addr !== address.addr || user.address.addrDetail !== address.addrDetail) {
          
            setAttatchment(photoURL);
            // dispatch(usersActions.replaceData({uid: user.uid, displayName: editName, email: user.email, photoURL: photoURL === '' ? null : photoURL}));
            dbService.collection('users').doc(user.uid).update({
              displayName: editName,
              photoURL,
              address : {
                zip : address.zip,
                addr : address.addr,
                addrDetail : address.addrDetail
              }
            });
          
        } else {
          navigate(-1)
        }
        alert('수정되었습니다.');
    } catch(error) {
      console.log(error);
    } 
  }

  const handleClickClearImage = () => {
    setAttatchment(null);
  }


  return (
    <SubWrap>
      <SubListMenu mypageList={MYPAGE} currentMenu={currentMenu} />
      <SubBox>
        <EditForm onSubmit={onSubmit}>
          <Name>
            <div>{user.displayName} 님</div>
            <div onClick={() => {authService.signOut(); navigate(`/`)}}>로그아웃</div>
          </Name>
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
                <img src={attatchment} alt="" width="30px" height="30px" />
              }
              {attatchment !== null && <span onClick={handleClickClearImage}>삭제</span>}
            </EditContent>
          </EditBox>
  
          <EditBox>
            <EditName>주소</EditName>
            <EditContent>
              <Post address={address} setAddress={setAddress} />
            </EditContent>
          </EditBox>
          
         
          <Button><input type="submit" value="수정하기" /></Button>
        </EditForm>
      </SubBox>
    </SubWrap>
  )
}

export default EditProfile;

const EditForm = styled.form`
  width: 100%;
`;


const EditBox = styled.div`
  border-top: 1px solid ${(props) => props.theme.borderColor};
  padding: 1rem 0;
  min-height: 70px;
  display: flex;
  justify-content: flex-start;
  align-items: center;

  &:nth-last-child(2) {
    border-bottom: 1px solid ${(props) => props.theme.borderColor};
  }
`;

const EditName = styled.div`
  width: 150px;
  ${media.tablet} {
    min-width: 100px;
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

  .postcode {
    display: block,
    position: relative,
    top: 0,
    width: 400px,
    height: 400px,
    padding: 7px,
  }

`;

const Name = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 0 1rem 2rem 1rem;

  div:first-child {
    font-size: 1.3rem;
    font-weight: 500;
  }

  div:last-child {
    cursor: pointer;
  }
`;