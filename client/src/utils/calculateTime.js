const calculateTime = (timeString) => {
  const MINUTE = 60;
  const HOUR = MINUTE * 60;
  const DAY = HOUR * 24;

  const now = new Date();
  const timeObject = new Date(timeString);
  const timeDifference = (now - timeObject) / 1000;
  if (timeDifference < MINUTE) {
    return `${timeDifference} seconds ago`;
  }
  if (timeDifference < HOUR) {
    return `${Math.floor(timeDifference / MINUTE)} minutes ago`;
  }
  if (timeDifference < DAY) {
    return `${Math.floor(timeDifference / HOUR)} hours ago`;
  }
  const todayDate = now.getDate();
  const timeDate = timeObject.getDate();
  const dateDifference = todayDate - timeDate;
  if (timeDifference > DAY && dateDifference === 1) {
    return "yesterday";
  }
  return `${Math.floor(dateDifference)} days ago`;
};

export default calculateTime;
