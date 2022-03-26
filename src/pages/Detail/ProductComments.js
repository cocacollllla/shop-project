import React, {useState, useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Comment from './Comment';
import moment from 'moment';
import { dbService } from '../../myFirebase';
import styled from 'styled-components';

const ProductComments = ({user, productId}) => {
  const date = moment();

  const [comment, setComment] = useState([]);
  const [commentValue, setCommentValue] = useState('');

  useEffect(() => {
    dbService.collection('comment').where('products', "==", productId).onSnapshot((querySnapshot) => {
      const getComment = querySnapshot.docs.map(doc => ({ docId:doc.id, ...doc.data()}));
      setComment(getComment);
    });
  }, []);

  const handleChange = (e) => {
    setCommentValue(e.target.value);
  }

  const onSubmit = (e) => {
    e.preventDefault();

    if(user !== null) {
      const commentObj = {
        products: productId, 
        user_id: user.uid, 
        user_name: user.displayName,
        user_pic: user.photoURL, 
        contents: commentValue, 
        id:Date.now(), 
        date: date.format('YYYY-MM-DD')
      }
      try {
        dbService.collection("comment").add(commentObj);
      } catch(error) {
        console.log(error);
      } 
    } else {
      alert('로그인이 필요한 서비스 입니다.');
    }
    
  }





  return (
    <div>
      <CommentForm onSubmit={onSubmit}>
        <textarea name="contents" onChange={handleChange} disabled={user === null ? true : false} placeholder={user === null ? '로그인 하신 뒤 작성할 수 있습니다.' : ''}></textarea>
        <input type="submit" value="작성" />
      </CommentForm>

      {/* 댓글목록 */}
      <CommentListWrap>
        {comment.map(el => (
          <Comment key={el.id} comments={el} user={user} />
        ))}
      </CommentListWrap>

    </div>
    
  )
}

export default ProductComments;

const CommentForm = styled.form`
  width: 100%;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 8fr 1fr;
  grid-gap: 3rem 1rem;

  textarea {
    min-height: 50px;
    padding: 1rem;
    border-radius: 10px;
    border: 1px solid #ddd;
    font-size: 1rem;
  }

  input {
    border-radius: 10px;
    border: 0;
    font-size: 1rem;
    cursor: pointer;
  }
`;

const CommentListWrap = styled.div`

`;

