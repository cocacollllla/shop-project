import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router';
import { useDispatch } from 'react-redux';
import { BOARDLIST } from '../../data/Data';
import SubListMenu from '../../components/SubListMenu';
import { noticeDelete } from '../../store/board-actions';
import { SubWrap, SubBox } from '../../components/Style';
import { dbService } from '../../myFirebase';
import styled from 'styled-components';

const NoticeView = () => {
  const [products, setProducts] = useState([]);
  const location = useLocation();
  const navigate = useNavigate();
  const params = useParams();
  const dispatch = useDispatch();
  let currentMenu = location.pathname.split('/')[1];

  const idid = parseInt(params.id);

  useEffect(() => {
    dbService.collection('board').where('id', '==', idid).get().then((querySnapshot) => {
      const Product = querySnapshot.docs.map(doc => ({ docId:doc.id, ...doc.data()}));
      setProducts(Product[0]);
    });
      
  }, [idid]);


  const handleClickNoticeDelete = (id, docId) => {
    const ok = window.confirm('해당 게시물을 삭제하시겠습니까?');
    if(ok) {
      dispatch(noticeDelete(id, docId));
      navigate(`/notice`);
    }
  }


  return (
    <SubWrap>
      <SubListMenu list={BOARDLIST} currentMenu={currentMenu} />
      <SubBox>
        <BtnWrap>
          <div onClick={() => navigate(`/notice/write`)}>글쓰기</div>
          <div onClick={() => navigate(`/notice/update/${idid}`)}>수정</div>
          <div onClick={() => handleClickNoticeDelete(products.id, products.docId)}>삭제</div>
        </BtnWrap>
        
        <ContentsWrap>
          <Subject>{products.title}<span>{products.date}</span></Subject>
          <Contents>{products.contents}</Contents>
          {products.attatchmentUrl && 
            <ContentImg><img src={products.attatchmentUrl} alt="" /></ContentImg>
          }
          <ToListBtn><span onClick={() => navigate(`/notice`)}>목록</span></ToListBtn>
        </ContentsWrap>
        
      </SubBox>
    </SubWrap>
  )
}

export default NoticeView;


const BtnWrap = styled.div`
  display: flex;
  justify-content: flex-end;

  div {
    margin-left: 5px;
    padding: 10px 10px;
    border: 1px solid #ddd;
    border-radius: 5px;
    cursor: pointer;
  }
`;

const ContentsWrap = styled.div`
  margin-top: 1rem;
  border-top: 2px solid #333;
  border-bottom: 1px solid #333;

`;

const ContentImg = styled.div`
  text-align: center;
  
  img {
    max-width: 90%;
  }

`;

const Subject = styled.div`
  padding: 15px 10px;
  border-bottom: 1px solid #333;
  font-size: 1.3rem;
  font-weight: 500;

  span {
    float: right;
    font-size: 1rem;
    font-weight: normal;
  }
`;

const Contents = styled.div`
  padding: 25px 10px;
`;

const ToListBtn = styled.div`
  display: flex;
  justify-content: center;
  padding: 15px 10px;
  
  span {
    cursor: pointer;
  }
`;