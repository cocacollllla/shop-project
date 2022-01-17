import React from 'react';
import Slider from "react-slick";
import {MAINIMG} from '../../data/Data';
import media from '../../styles/media';
import styled, { keyframes } from 'styled-components';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Carousel = () => {
  const settings = {
    dots: true,
    autoplay: true,
    infinite: true,
    speed: 1000,
    autoplaySpeed: 4000,
    slidesToShow: 1,
    slidesToScroll: 1,
    pauseOnFocus: false,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          dots: false
        }
      },
      {
        breakpoint: 415,
        settings: {
          dots: false
        }
      }
    ],
    customPaging: i => (
      <div className="customDots">
        <div className="dots" />
      </div>
    )
  };

  return (
    <MainImgWrap>
      <Slider {...settings}>
        {MAINIMG.map((img, idx) => (
          <SliderList key={idx}>
            <div style={{ backgroundImage: `url(` + img.image + `)` }}></div>
          </SliderList>
        ))}    
      </Slider>
    </MainImgWrap>
  )
}

export default Carousel;

const pulse = keyframes`
  from {
    width: 0;
  }
  to {
    width: 100%;
  }
`;

const MainImgWrap = styled.div`
  
  .slick-prev {
    left: 0;
    opacity: 0;
  }
  .slick-next {
    right: 0;
    opacity: 0;
  }

  .slick-dots {
    bottom: 30px;
    
    li {
      width: 80px;
      height: 3px;
      

      .customDots {
        height: 100%;
      }
    
      .dots {
        height: 100%;
        border-radius: 5px;
        background-color: ${(props) => props.theme.white};
      }
      
    }

    .slick-active {
      .dots {
        background-color: ${(props) => props.theme.white};

        &:before {
          content:"";
          display: block;
          // animation: pulse 4s linear;
          animation: ${pulse} 4s linear;
          height: 100%;
          background-color: #333;
        }
      }
    }

  }
`;


const SliderList = styled.div`
  height: 40rem;
  ${media.pc} {
    height: 30rem;
  }
  ${media.tablet} {
    height: 30rem;
  }
  div {
    width: 100%;
    height: 100%;
    background-size: cover;
    background-position: center;
  }
`;