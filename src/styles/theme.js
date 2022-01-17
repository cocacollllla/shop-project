const theme = {
  background: '#D5ECF3',
  mainColor: '#30475E',
  subColor: '#7E8A97',
  brownColor: '#CBAF87',
  beigeColor: '#E7DEC8',
  boxColor: '#F0F5F7',
  borderColor: '#d3d3d3',
  fontColor: '#333',
  placeholderColor: '#c2c2c2',
  white: '#fff',
  flexMixin: (direction = 'row', justify = 'center', align = 'center') => `
  display:flex;
  flex-direction:${direction};
  align-items:${align};
  justify-content:${justify};
  `,
  fontTitle: "'Alata', sans-serif;",
  fontContent: "'Noto Sans KR', sans-serif;",
  pcWidth: '1200px',
  tabletWidth: '768px'
};

//  #b6aa81, #475277, #0043e7 : #c8a615

export default theme;
