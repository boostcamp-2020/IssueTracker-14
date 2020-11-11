import React from "react";
import A from "../atoms/index";

const DropdownItem = ({ data, width, height, setVisible, dispatchData }) => {
  const setData = (data) => {
    dispatchData(data);
    setVisible("none");
  };

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
