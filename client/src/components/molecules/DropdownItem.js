import React, { useState } from "react";
import A from "../atoms/index";

const DropdownItem = ({ data, width, height, dispatchData, selected }) => {
  const setData = (data) => {
    dispatchData(data);
    setIsSelected(!isSelected);
  };

  const [isSelected, setIsSelected] = useState(selected.includes(data.id));

  return (
    <A.Button
      key={data.id}
      width={width}
      height={height}
      border={true}
      textAlign={"left"}
      display={"flex"}
      alignItems={"center"}
      rounded={false}
      border={false}
      borderBottom={"1px solid #959da5"}
      onClick={() => setData(data)}
    >
      {isSelected ? <A.Icon name="check" /> : null}
      {data.imageurl !== undefined ? (
        <A.Image size={"15px"} imageUrl={data.imageurl} />
      ) : null}
      <span>{data.title === undefined ? data.nickname : data.title}</span>
    </A.Button>
  );
};

DropdownItem.defaultProps = {
  dispatchData: () => {},
};

export default DropdownItem;
