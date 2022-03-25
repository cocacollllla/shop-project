import React, {useState, useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import { dbService } from '../../myFirebase';

const ProductComments = ({user, productId}) => {
  const date = moment();
  const [comment, setComment] = useState([]);
  const [commentValue, setCommentValue] = useState({
    products: '',
    userID: '',
    userPIC: '',
    contents: '',
    id: 0,
    date: ''
  });

  useEffect(() => {
    dbService.collection('comment').where('products', "==", productId).onSnapshot((querySnapshot) => {
      const getComment = querySnapshot.docs.map(doc => ({ docId:doc.id, ...doc.data()}));
      setComment(getComment);
    });
  }, []);

  const handleChange = (e) => {
    const { value, name } = e.target;
    
    setCommentValue({
      ...commentValue,
      [name]: value,
    });
  }

  const onSubmit = (e) => {
    e.preventDefault();
    
    const commentObj = {
      products: productId, 
        userID: user.uid, 
        userPIC: user.photoURL, 
        contents: commentValue.contents, 
        id:Date.now(), 
        date: date.format('YYYY-MM-DD')
    }
    try {
      dbService.collection("comment").add(commentObj);
    } catch(error) {
      console.log(error);
    } 
  }

  return (
    <div>
      <form onSubmit={onSubmit}>
        <textarea name="contents" onChange={handleChange} disabled={user === null ? true : false} placeholder={user === null ? '로그인 하신 뒤 작성할 수 있습니다.' : ''}></textarea>
        <input type="submit" value="올리기" />
      </form>

      {/* 댓글목록 */}
      <div>
        {comment.map(el => (
          <div key={el.id}>{el.contents}</div>
        ))}
      </div>

    </div>
    
  )
}

export default ProductComments;