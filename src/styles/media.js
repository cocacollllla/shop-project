const mediaQuery = (maxWidth) => `
  @media (max-width: ${maxWidth}px)
`;


const devices = {
  pc: mediaQuery(1200),
  tablet: mediaQuery(960), // 768
  mobile: mediaQuery(640), // 500
};

export default devices;