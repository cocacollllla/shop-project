import React, {useState} from 'react';
import DaumPostcode from 'react-daum-postcode';
import styled from 'styled-components';

const Post = ({address, setAddress}) => {
  const [isOpenPost, setIsOpenPost] = useState(false);

  const onChange = (e) => {
    setAddress({
      ...address,
      addrDetail: e.target.value
    });
  }

  const onCompletePost = (data) => {

    setAddress({
      ...address,
      zip: data.zonecode,
      addr: data.address
    });
  };

  return (
    <>
      <AddressZip>
        <input type='text' defaultValue={address.zip} />
        <span onClick={() => setIsOpenPost(true)}>주소검색</span>
      </AddressZip>
      <Address>
        <div><input type='text' defaultValue={address.addr} readOnly /></div>
        <div><input type='text' onChange={onChange} defaultValue={address.addrDetail} /></div>
      </Address>

      {isOpenPost  ? (
        <DaumPostcode className="postcode" autoClose onComplete={onCompletePost } />
      ) : null}
    </>
  )
}

export default Post;


const AddressZip = styled.div`
  cursor: pointer;

  input {
    width: 70px !important;
    margin-right: 5px;
  }


  span {
    background-color: #eee;
    padding: 6px;
    vertical-align: middle;
    border-radius: 5px;
    font-size: 0.9rem;
    text-align: center;
  }
`;


const Address = styled.div`
  div {
    margin-top: 5px;
  }
`;

