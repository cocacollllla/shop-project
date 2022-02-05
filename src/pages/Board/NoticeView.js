import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { BOARDLIST } from '../../data/Data';
import SubListMenu from '../../components/SubListMenu';
import { noticeDelete } from '../../store/board-actions';
import media from '../../styles/media';
import styled from 'styled-components';
import { dbService } from '../../myFirebase';

const NoticeView = () => {
  const [products, setProducts] = useState([]);
  const location = useLocation();
  const navigate = useNavigate();
  const params = useParams();
  const dispatch = useDispatch();
  let currentMenu = location.pathname.split('/')[1];

  const idid = parseInt(params.id);

  const getFilterIdItem = async () => {
    const getProduct = await dbService.collection('board').where('id', '==', idid).get();
      const Product = getProduct.docs.map(doc => ({ docId:doc.id, ...doc.data()}));
      setProducts(Product[0]);
  };

  useEffect(() => {
    getFilterIdItem();
  }, []);

  const handleClickNoticeDelete = (id, docId) => {
    const ok = window.confirm('해당 게시물을 삭제하시겠습니까?');
    if(ok) {
      dispatch(noticeDelete(id, docId));
      navigate(`/notice`);
    }
  }


console.log(params);

  return (
    <NoticeWrap>
      <SubListMenu list={BOARDLIST} currentMenu={currentMenu} />
      <NoticeContentWrap>
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
        
      </NoticeContentWrap>
    </NoticeWrap>
  )
}

export default NoticeView;


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