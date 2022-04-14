import React, {useEffect, useState} from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { BOARDLIST } from '../../data/Data';
import { dbService, storageService } from '../../myFirebase';
import moment from 'moment';
import { v4 as uuidv4 } from 'uuid';
import SubListMenu from '../../components/SubListMenu';
import { Button, SubWrap, SubBox } from '../../components/Style';
import media from '../../styles/media';
import styled from 'styled-components';

const NoticeUpload = () => {
  const date = moment();
  const [updateData, setUpdateData] = useState([]);
  const [attatchment,  setAttatchment] = useState('');
  const [optionValue, setOptionValue] = useState({
    category: 'notice',
    isNotice: false,
    title: '',
    contents: '',
    id: Date.now(),
    date: date.format('YYYY-MM-DD')
  });

  const location = useLocation();
  const params = useParams();
  const navigate = useNavigate();
  let currentMenu = location.pathname.split('/')[1];

  const idid = parseInt(params.id);

  useEffect(() => {
    if(params.state === 'update'){
      dbService.collection('board').where('id', '==', idid).get().then((querySnapshot) => {
        const Product = querySnapshot.docs.map(doc => ({ docId:doc.id, ...doc.data()}));
        setUpdateData(Product[0]);
      });
    }
  }, [idid, params.state]);



  const handleChange = (e) => {
    const { value, name } = e.target;
    
    if(params.state === 'update'){
      setUpdateData({
        ...updateData,
        [name]: value,
      });
    } else {
      setOptionValue({
        ...optionValue,
        [name]: value,
      });
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

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      let attatchmentUrl = '';
      if(attatchment !== ''){
        const attatchmentRef = storageService.ref().child(`board/${uuidv4()}`);
        const response = await attatchmentRef.putString(attatchment, 'data_url');
        attatchmentUrl = await response.ref.getDownloadURL();
      }
      if(params.state === 'update'){
        await dbService.collection('board').doc(updateData.docId).update({
          isNotice: updateData.isNotice,
          title: updateData.title,
          contents: updateData.contents,
          attatchmentUrl: updateData.attatchmentUrl
        });
      } else {
        await dbService.collection("board").add({...optionValue, attatchmentUrl});
      }
      navigate(`/notice/view/${updateData.id ? updateData.id : optionValue.id}`);

    } catch(error) {
      console.log(error);
    } 
  }

  const clickCheckNotice = () => {
    if(params.state === 'update'){
      setUpdateData({
        ...updateData,
        isNotice: !updateData.isNotice
      })
    } else {
      setOptionValue({
        ...optionValue,
        isNotice: !optionValue.isNotice,
      }) 
    }
    
  }

  const handleClickClearImage = () => {
    if(updateData.attatchmentUrl) {
      setUpdateData({...updateData, attatchmentUrl: ''})
    } else {
      setAttatchment('');
    }
  }


  return (
    <SubWrap>
      <SubListMenu list={BOARDLIST} currentMenu={currentMenu} />
      <SubBox>
        <WriteBtn onClick={() => navigate(`/notice`)}><span>목록</span></WriteBtn>
        <FormBox onSubmit={onSubmit}>
          <WriteBox>
            <WriteName>공지</WriteName>
            <WriteContent><input type="checkbox" onChange={clickCheckNotice} checked={(updateData.isNotice ? updateData.isNotice : optionValue.isNotice) || ''} /></WriteContent></WriteBox>
          <WriteBox>
            <WriteName>제목</WriteName>
            <WriteContent><input type="text" name="title" onChange={handleChange} value={(updateData.title ? updateData.title : optionValue.title) || ''} /></WriteContent></WriteBox>
          <WriteBox>
            <WriteName>내용</WriteName>
            <WriteContent><textarea name="contents" onChange={handleChange} value={(updateData.contents ? updateData.contents : optionValue.contents) || ''}></textarea></WriteContent></WriteBox>
          <WriteBox>
            <WriteName>파일</WriteName>
            <WriteContent><input type="file" accept="image/*" onChange={onFileChange} /></WriteContent></WriteBox>
          {(attatchment || updateData.attatchmentUrl) && 
          <WriteBox>
            <WriteName></WriteName>
            <WriteContent>
              <img src={attatchment ? attatchment : updateData.attatchmentUrl} alt="" width="50px" height="50px" />
              <div onClick={handleClickClearImage}>Clear Image</div>
            </WriteContent>
          </WriteBox>
          }
          <Button><input type="submit" value="올리기" /></Button>
        </FormBox>
        
      </SubBox>
    </SubWrap>
  )
}

export default NoticeUpload;

const WriteBtn = styled.div`
  display: flex;
  justify-content: flex-end;

  span {
    padding: 10px 10px;
    border: 1px solid #ddd;
    border-radius: 5px;
    cursor: pointer;
  }
`;


const FormBox = styled.form`
  margin-top: 1rem;
`;


const WriteBox = styled.div`
  border-top: 1px solid ${(props) => props.theme.borderColor};
  padding: 1rem 0;
  display: flex;
  justify-content: flex-start;
  align-items: center;

  &:nth-last-child(2) {
    border-bottom: 1px solid ${(props) => props.theme.borderColor};
  }

  &:first-of-type {
    input { width: auto; }
  }
`;

const WriteName = styled.div`
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

const WriteContent = styled.div`
  width: 600px;

  input {
    width: 100%;
    padding: .5rem;
    border-radius: 5px;
    border: 1px solid ${(props) => props.theme.borderColor};
  }

  textarea {
    width: 100%;
    height: 200px;
    padding: .5rem;
    border-radius: 5px;
    border: 1px solid ${(props) => props.theme.borderColor};
  }
`;
