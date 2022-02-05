import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router';
import { BOARDLIST } from '../../data/Data';
import SubListMenu from '../../components/SubListMenu';
import media from '../../styles/media';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { getNoticeData } from '../../store/board-actions';

const Notice = () => {
  const noticeList = useSelector(state => state.board);
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  let currentMenu = location.pathname.split('/')[1];

  useEffect(() => {
    dispatch(getNoticeData());
  }, [dispatch]);

  return (
    <NoticeWrap>
      <SubListMenu list={BOARDLIST} currentMenu={currentMenu} />
      <NoticeContentWrap>
        <WriteBtn onClick={() => navigate(`/notice/write`)}><span>글쓰기</span></WriteBtn>
        <NoticeTitleList>
          <div>No</div><div>제목</div><div>날짜</div>
        </NoticeTitleList>
        <NoticeList>
          <ul>
            {noticeList.map((el, idx) => (
              <li key={el.id}><div>{el.isNotice ? '공지' : idx}</div><NoticeSubject onClick={() => navigate(`/notice/view/${el.id}`)}>{el.title}</NoticeSubject><div>{el.date}</div></li>
            ))}
          </ul>
        </NoticeList>
      </NoticeContentWrap>
    </NoticeWrap>
  )
}

export default Notice;


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
  border-bottom: 1px solid #333;
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

const NoticeTitleList = styled.div`
  display: grid;
  grid-template-columns: 50px 10fr 100px;
  margin-top: 1rem;
  padding: 15px 0;
  border-top: 2px solid #333;
  border-bottom: 1px solid #333;
  text-align: center;

`;

const NoticeList = styled.ul`
  padding: 10px 0;

  li {
    display: grid;
    grid-template-columns: 50px 10fr 100px;
    padding: 15px 0;
    text-align: center;
  }
`;

const NoticeSubject = styled.div`
  padding-left: 30px;
  cursor: pointer;
  text-align: left;
`;