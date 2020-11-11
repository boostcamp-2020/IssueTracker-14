const decideFontColorFromHexa = (hex) => {
    const hexaR = hex.slice(1, 3);
    const hexaG = hex.slice(3, 5);
    const hexaB = hex.slice(5, 7);
    const changeColor = (c) => {
      const first = c.slice(0, 1);
      const second = c.slice(1, 2);
      return parseInt(first, 16) * 16 + parseInt(second, 16);
    };
    const R = changeColor(hexaR);
    const G = changeColor(hexaG);
    const B = changeColor(hexaB);
    const luminance = (0.299 * R + 0.587 * G + 0.114 * B) / 255;
    return luminance > 0.5 ? "#000000" : "#ffffff";
};

export default decideFontColorFromHexa;