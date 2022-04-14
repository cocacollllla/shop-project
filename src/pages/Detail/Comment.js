import React, {useState} from 'react';
import styled from 'styled-components';
import { dbService } from '../../myFirebase';

const Comment = ({comments, user, isActive, changeActiveTab}) => {
  const [isModify, setIsModify] = useState(false);
  const [modifyText, setModifyText] = useState('');

  const modifyTextChange = (e) => {
    setModifyText(e.target.value);
  }

  const modifyDone = async () => {
    await dbService.collection('comment').doc(comments.docId).update({
      contents: modifyText
    });
    setIsModify(!isModify);
  }

  const commentDelete = async () => {
    const ok = window.confirm('선택한 상품후기를 삭제하시겠습니까?');
    if(ok) {
      await dbService.collection('comment').doc(comments.docId).delete();
    }
    
  }

  const profileImage = () => {
    if(comments.user_pic !== null) {
      return <img src={comments.user_pic} alt="프로필이미지" />
    } else {
      return <img src='/assets/default_profile.png' alt="프로필이미지" />
    }
  }
  

  return (
    <CommentList  onClick={changeActiveTab} isActive={isActive}>
      <CommentUserInfo>
        {profileImage()}
        <span>{comments.user_name}</span>
        {user !== null &&
          user.uid === comments.user_id && 
            <CommentBtn>
              <div onClick={() => setIsModify(!isModify)}>수정</div>
              <div onClick={commentDelete}>삭제</div>
            </CommentBtn>
        }
        
      </CommentUserInfo>
      <CommentContents>
        {isModify ? 
          <>
            <textarea defaultValue={comments.contents} onChange={modifyTextChange}></textarea>
            <div onClick={modifyDone}>완료</div>
          </> : comments.contents}
      </CommentContents>
    </CommentList>
  )
}

export default Comment;

const CommentList = styled.div`
  border: 1px solid #ddd;
  border-radius: 10px;
  margin: 1rem 0;
  padding: 1rem;
  max-height: ${props => (props.isActive ? '100%' : '114px')};
  overflow: hidden;
  position: relative;
  cursor: pointer;

  &:after {
    content:'';
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    height: 25px;
    background: linear-gradient(transparent, white 80%);
  }

`;

const CommentUserInfo = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin-bottom: .5rem;

  img {
    width: 40px;
    border-radius: 50%;
    border: 1px solid #ddd;
    margin-right: 1rem;
  }

`;

const CommentBtn = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin-left: auto;

  div {
    margin-left: 10px;
  }
`;

const CommentContents = styled.div`
  white-space: pre-line;
  line-height: 1.7rem;

  textarea {
    width: 100%;
    padding: 1rem;
    border: 1px solid #ddd;
    border-radius: 10px;
    font-size: 1rem;
  }

  div {
    float: right;
  }
`;