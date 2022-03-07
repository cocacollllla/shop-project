function range(size, start) {
  return [...Array(size).keys()].map(key => (key / 2 + start) + 0.5); 
}

export const ringSize = range(51, 4.5);

export const PRODUCTOPTION = [
  {id: 0, class:"option", option: "종류", content: ["necklace", "bracelet", "earring", "ring"]},
  {id: 1, class:"title", option: "상품명"},
  // {id: 2, class:"color", option: "색상", content: ["골드", "화이트골드", "로즈골드"], require: true},
  // {id: 4, class:"size", option: "호수", content: ringSize, require: false},
  {id: 2, class:"price", option: "가격", content: 0},
  {id: 3, class:"contents", option: "내용", content: 0},
  {id: 4, class:"image", option: "이미지", content: 0},
];

export const FAQCATEGORY = ['상품', '배송/포장', '주문/결제', '취소/교환/환불'];


export const MAINIMG = [
  {image: '/assets/main-slide01.jpg'},
  {image: '/assets/main-slide02.jpg'},
  {image: '/assets/main-slide03.jpg'}
];

export const priceCommas = (price) => {
  return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export const MAINPRODUCTS = ['all', 'necklace', 'bracelet', 'earring', 'ring'];
export const BOARDLIST = ['notice', 'faq'];

export const SIGN = [
  {
    sign: 'signin',
    title: '로그인'
  },
  {
    sign: 'signup',
    title: '회원가입'
  }
];





