const makeRandomColor = () => {
    const string = '0123456789abcdef';
    const colorChars = ['#'];
    for (let i=0; i<6; i++) {
      colorChars.push(string[Math.floor(Math.random()*(string.length-1))]);
    }
    return colorChars.join('');
}

export default makeRandomColor;