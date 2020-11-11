import React, { useState, useEffect } from "react";
import styled from "styled-components";
import A from "./../atoms/index";

const StyledIssueData = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  box-sizing: border-box;
  border-top: 1px solid #000000;
  width: 100%;
`;

const StyledCheckbox = styled.div`
  display: flex;
  width: 3rem;
  height: 3.5rem;
  justify-content: right;
  align-items: center;
`;

const StyledIssueIcon = styled.div`
  display: flex;
  width: 3rem;
  height: 3.5rem;
  text-align: center;
  line-height: 3.5rem;
  font-size: 1.2rem;
`;

const StyledImportant = styled.div`
  display: flex;
  flex-direction: column;
  align-items: start;
  width: 100%;
`;

const StyledTrivial = styled.div`
  display: flex;
  width: 11rem;
`;

const StyledComment = styled.div`
  display: flex;
  width: 4.5rem;
  justify-content: center;
  align-items: center;
`;

const StyledAssignee = styled.div`
  position: relative;
  display: flex;
  width: 7rem;
  justify-content: center;
  align-items: center;
`;

const calculateTime = (timeString) => {
  const now = new Date();
  const timeObject = new Date(timeString);
  const timeDifference = (now - timeObject) / 1000;
  if (timeDifference < 60) {
    return `${timeDifference} seconds ago`;
  }
  if (timeDifference < 3600) {
    return `${Math.floor(timeDifference / 60)} minutes ago`;
  }
  if (timeDifference < 216000) {
    return `${Math.floor(timeDifference / 3600)} hours ago`;
  }
  const todayDate = now.getDate();
  const timeDate = timeObject.getDate();
  const dateDifference = todayDate - timeDate;
  if (timeDifference > 216000 && dateDifference === 1) {
    return "yesterday";
  }
  return `${Math.floor(timeDifference / 216000)} days ago`;
};

const IssueData = ({
  issue,
  selected,
  setSelected,
  totalSelected,
  setTotalSelected,
}) => {
  const [imageHover, setImageHover] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const commentsLength = issue.comments.length;
  const assigneesLength = issue.assignees.length;

  const mouseOnImage = () => {
    setImageHover(true);
  };

  const mouseOffImage = () => {
    setImageHover(false);
  };

  const handleCheckbox = () => {
    setIsChecked(!isChecked);
    if (selected.includes(issue.id)) {
      setSelected(selected.filter((el) => el !== issue.id));
    } else {
      setSelected([...selected, issue.id]);
    }
    selected.length === 0 ? setTotalSelected(false) : setTotalSelected(true);
  };

  useEffect(() => {
    if (totalSelected) {
      setIsChecked(true);
    }
    if (!totalSelected) {
      setIsChecked(false);
      setSelected([]);
    }
  }, [totalSelected]);

  if (isChecked) {
    if (!selected.includes(issue.id)) {
      setSelected([...selected, issue.id]);
    }
  }

  return (
    <StyledIssueData>
      <StyledCheckbox>
        <A.Checkbox checked={isChecked} onClick={handleCheckbox} />
      </StyledCheckbox>
      <StyledIssueIcon>
        <A.Icon
          name={"alert"}
          color={issue.status === "open" ? "green" : "red"}
        />
      </StyledIssueIcon>
      <StyledImportant>
        <A.Text fontSize={"1.25rem"} fontWeight={"bold"}>
          {issue.title}
          {issue["label_has_issues"].map((el, idx) => {
            return (
              <A.Label
                key={idx}
                backgroundHexaColor={el.label.color}
                margin={"0rem 0rem 0rem 0.3rem"}
              >
                {el.label.title}
              </A.Label>
            );
          })}
        </A.Text>
        <A.Text fontSize={"0.75rem"}>
          #{issue.id} opened {calculateTime(issue.createdAt)} by{" "}
          {issue.user.nickname}
        </A.Text>
      </StyledImportant>
      <StyledTrivial>
        <StyledAssignee onMouseLeave={mouseOffImage}>
          <>
            {issue.assignees.map((el, idx) => {
              if (el.user.imageurl !== null)
                return (
                  <A.Image
                    key={`assignee-${el.id}`}
                    size={"1.5rem"}
                    imageUrl={el.user.imageurl}
                    position={"absolute"}
                    right={`${
                      6.2 +
                      assigneesLength +
                      (imageHover ? assigneesLength - idx - 1 : 0) -
                      0.7 * (idx + 1)
                    }rem`}
                    cursor={"pointer"}
                    onClick={() => {
                      alert(el.id);
                    }}
                    onMouseEnter={mouseOnImage}
                  />
                );
            })}
          </>
        </StyledAssignee>
        <StyledComment>
          <A.Text fontSize={"1rem"}>
            {commentsLength === 0 ? (
              ""
            ) : (
              <>
                <A.Icon name={"message"} color={"black"} /> {commentsLength}
              </>
            )}
          </A.Text>
        </StyledComment>
      </StyledTrivial>
    </StyledIssueData>
  );
};

export default IssueData;
