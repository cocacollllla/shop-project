
export const PRODUCTOPTION = [
  {id: 0, class:"option", option: "종류", content: ["necklace", "bracelet", "earring", "ring"]},
  {id: 1, class:"title", option: "상품명"},
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

export const MYPAGE = {'account' : '개인정보수정', 'order' : '주문내역', 'favorite' : '찜한 상품'};





