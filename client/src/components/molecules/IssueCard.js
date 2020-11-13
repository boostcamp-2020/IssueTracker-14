import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useIssueState } from "../../stores/issue";
import styled from "styled-components";
import A from "./../atoms/index";
import calculateTime from "../../utils/calculateTime";
import { useQueryDispatch } from "../../stores/query";

const StyledIssueCard = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  box-sizing: border-box;
  width: 100%;
  border-top: 1px solid #d1d5da;
  &:hover {
    background-color: #e3e3e4;
  }
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

const StyledTextWithLabel = styled.div`
  position: relative;
  display: flex;
  width: auto;
  justify-content: flex-start;
  align-items: center;
`;

const IssueCard = ({
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

  const queryDispatch = useQueryDispatch();

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
      return setTotalSelected(false);
    } else {
      setSelected([...selected, issue.id]);
      if (selected.length === issueState.issues.length) {
        return setTotalSelected(true);
      }
    }
  };

  const issueState = useIssueState();

  useEffect(() => {
    if (totalSelected === true) {
      handleCheckbox(true);
      setSelected(issueState.issues.map((el) => el.id));
    }
    if (
      totalSelected === false &&
      issueState.issues.length === selected.length
    ) {
      handleCheckbox(false);
      return setSelected([]);
    }
  }, [totalSelected]);

  return (
    <StyledIssueCard>
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
        <StyledTextWithLabel>
          <A.Text fontSize={"1.25rem"} fontWeight={"bold"}>
            <Link
              to={{ pathname: `issue/${issue.id}`, state: { issue } }}
              style={{ textDecoration: "none", color: "inherit" }}
            >
              {issue.title}
            </Link>
          </A.Text>
          {issue["label_has_issues"].map((el, idx) => {
            return (
              <A.Label
                key={idx}
                backgroundHexaColor={el.label?.color}
                margin={"0rem 0rem 0rem 0.3rem"}
              >
                {el.label?.title !== undefined ? (
                  el.label.title
                ) : (
                  <A.Text fontSize={"small"} color={"white"} hover={false}>
                    라벨 삭제됨.
                  </A.Text>
                )}
              </A.Label>
            );
          })}
        </StyledTextWithLabel>
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
                    right={`${2.5 +(assigneesLength - 1 - idx) * (imageHover ? 1.65 : 1)}rem`}
                    cursor={"pointer"}
                    onClick={() => {
                      queryDispatch({
                        type: "CHANGE_ASSIGNEE",
                        data: el.user.nickname,
                      });
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
    </StyledIssueCard>
  );
};

export default IssueCard;
