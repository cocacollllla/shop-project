import media from '../../src/styles/media';
import styled from 'styled-components';

export const Button = styled.div`
  display: block;
  margin: 4rem auto;
  width: 110px;
  height: 45px;
  border: none;
  border-radius: 10px;
  background-color: ${(props) => props.theme.mainColor};
  color: ${(props) => props.theme.white};
  font-size: 1rem;
  font-weight: 500;
  line-height: 45px;
  text-align: center;
  cursor: pointer;

  input {
    background-color: ${(props) => props.theme.mainColor};
    color: ${(props) => props.theme.white};
    border: 0;
    font-size: 1rem;
    font-weight: 500;
    cursor: pointer;
  }
`;


export const SubWrap = styled.div`
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

export const SubBox = styled.div`
  width: 100%;
  ${media.tablet} {
    margin-top: 3rem;
  }
`;