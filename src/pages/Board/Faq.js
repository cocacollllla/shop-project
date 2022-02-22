import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router';
import { BOARDLIST, FAQCATEGORY } from '../../data/Data';
import SubListMenu from '../../components/SubListMenu';
import media from '../../styles/media';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { getFaqData, getFaqFilterData, faqDelete } from '../../store/board-actions';

const Faq = () => {
  const faqList = useSelector(state => state.board);
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  let currentMenu = location.pathname.split('/')[1];

  useEffect(() => {
    dispatch(getFaqData());
  }, [dispatch]);


  const handleChange = (e) => {
    const value = e.target.value;
    dispatch(getFaqFilterData(value));
  }

  const handleClickNoticeDelete = (id, docId) => {
    const ok = window.confirm('해당 게시물을 삭제하시겠습니까?');
    if(ok) {
      dispatch(faqDelete(id, docId));
      navigate(`/faq`);
    }
  }


  return (
    <NoticeWrap>
      <SubListMenu list={BOARDLIST} currentMenu={currentMenu} />
      <NoticeContentWrap>
        <SelectBtn>
          <select name='category' onChange={handleChange}>
            <option hidden>선택해주세요.</option>
            {FAQCATEGORY.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
          <WriteBtn onClick={() => navigate(`/faq/write`)}>글쓰기</WriteBtn>
        </SelectBtn>
        

        <NoticeList>
          {faqList.length > 0 ? (
            faqList.map((el, idx) => (
              <details key={el.id}>
                <summary><span>[{el.category}]</span>{el.title}</summary>
                <Contents>
                  <p>{el.contents}</p>
                  <Btn>
                    <div onClick={() => navigate(`/faq/update/${el.id}`)}>수정</div>
                    <div onClick={() => handleClickNoticeDelete(el.id, el.docId)}>삭제</div>
                  </Btn>
                </Contents>
              </details>
            )))
            :
            <NotFoundText>등록된 FAQ가 없습니다.</NotFoundText>
          }
        </NoticeList>
      </NoticeContentWrap>
    </NoticeWrap>
  )
}

export default Faq;


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

const NoticeContentWrap = styled.div`
  width: 100%;
  ${media.tablet} {
    margin-top: 3rem;
  }
`;

const SelectBtn = styled.div`
  display: flex;
  justify-content: flex-end;

  select {
    width: 200px;
    padding: 10px 0;
    margin-right: 1rem;
    border: 1px solid #ddd;
    border-radius: 5px;
    background: transparent;
    font-size: 1rem;
  }
`;


const WriteBtn = styled.div`
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
  cursor: pointer;

`;


const NoticeList = styled.div`
  margin-top: 1rem;
  border-bottom: 1px solid #333;
  
  details[open] summary {
    border-bottom: 1px solid #333;
  }

  summary {
    border-top: 1px solid #333;
    padding: 20px;
    list-style: none;
    cursor: pointer;
  }



  span {
    margin-right: 10px;
    font-weight: 500;
  }
`;


const Contents = styled.div`

  padding: 20px;
  background-color: #f4f4f4;

  p {
    line-height: 1.5rem;
    white-space: pre-wrap;
  }

`;


const Btn = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 1rem;

  div {
    padding: 10px;
    cursor: pointer;
  }

`;

const NotFoundText = styled.div`
  padding: 40px;
  text-align: center;

`;