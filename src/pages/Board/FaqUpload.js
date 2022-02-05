import React, {useEffect, useState} from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { BOARDLIST, FAQCATEGORY } from '../../data/Data';
import { dbService} from '../../myFirebase';
import SubListMenu from '../../components/SubListMenu';
import media from '../../styles/media';
import styled from 'styled-components';

const FaqUpload = () => {
  const [updateData, setUpdateData] = useState([]);
  const [optionValue, setOptionValue] = useState({
    category: '',
    title: '',
    contents: '',
    id: Date.now(),
  });

  const location = useLocation();
  const params = useParams();
  const navigate = useNavigate();
  let currentMenu = location.pathname.split('/')[1];

  const idid = parseInt(params.id);

  const getFilterIdItem = async () => {
    const getProduct = await dbService.collection('faq').where('id', '==', idid).get();
      const Product = getProduct.docs.map(doc => ({ docId:doc.id, ...doc.data()}));
      setUpdateData(Product[0]);
  };

  useEffect(() => {
    if(params.state === 'update'){
      getFilterIdItem();
    }
  }, []);



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


  const onSubmit = async (e) => {
    e.preventDefault();

    try {

      if(params.state === 'update'){
        await dbService.collection('faq').doc(updateData.docId).update({
          title: updateData.title,
          contents: updateData.contents,
        });
      } else {
        await dbService.collection("faq").add({...optionValue});
      }
      navigate(`/faq`);
    } catch(error) {
      console.log(error);
    } 
  }

  return (
    <NoticeWrap>
      <SubListMenu list={BOARDLIST} currentMenu={currentMenu} />
      <NoticeWriteWrap>
        <WriteBtn onClick={() => navigate(`/notice`)}><span>목록</span></WriteBtn>
        <FormBox onSubmit={onSubmit}>
          <WriteBox>
            <WriteName>분류</WriteName>
            <WriteContent>
              <select name='category' onChange={handleChange} value={updateData.category}>
                <option hidden>선택해주세요.</option>
                {FAQCATEGORY.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
            </WriteContent>
          </WriteBox>
          <WriteBox>
            <WriteName>제목</WriteName>
            <WriteContent><input type="text" name="title" onChange={handleChange} value={(updateData.title ? updateData.title : optionValue.title) || ''} /></WriteContent></WriteBox>
          <WriteBox>
            <WriteName>내용</WriteName>
            <WriteContent><textarea name="contents" onChange={handleChange} value={(updateData.contents ? updateData.contents : optionValue.contents) || ''}></textarea></WriteContent></WriteBox>

          <UploadBtn type="submit" value="올리기" />
        </FormBox>
        
      </NoticeWriteWrap>
    </NoticeWrap>
  )
}

export default FaqUpload;


const NoticeWrap = styled.div`
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

const NoticeWriteWrap = styled.div`
  width: 100%;
  ${media.tablet} {
    margin-top: 3rem;
  }
`;

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

const UploadBtn = styled.input`
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


const WriteBox = styled.div`
  border-top: 1px solid ${(props) => props.theme.borderColor};
  padding: 1rem 0;
  display: flex;
  justify-content: flex-start;
  align-items: center;

  &:last-of-type {
    border-bottom: 1px solid ${(props) => props.theme.borderColor};
  }

  select {
    width: 100%;
    padding: .5rem;
    border-radius: 5px;
    border: 1px solid ${(props) => props.theme.borderColor};
    background: transparent;
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
