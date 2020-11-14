import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Styled from "./IssueCard.style";
import Store from "@stores/index";
import A from "@atoms/index";
import calculateTime from "@utils/calculateTime";

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

  const queryDispatch = Store.useQueryDispatch();

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

  const issueState = Store.useIssueState();

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
    <Styled.IssueCard>
      <Styled.Checkbox>
        <A.Checkbox checked={isChecked} onClick={handleCheckbox} />
      </Styled.Checkbox>
      <Styled.IssueIcon>
        <A.Icon
          name={"alert"}
          color={issue.status === "open" ? "green" : "red"}
        />
      </Styled.IssueIcon>
      <Styled.Important>
        <Styled.TextWithLabel>
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
        </Styled.TextWithLabel>
        <A.Text fontSize={"0.75rem"}>
          #{issue.id} opened {calculateTime(issue.createdAt)} by{" "}
          {issue.user.nickname}
        </A.Text>
      </Styled.Important>
      <Styled.Trivial>
        <Styled.Assignee onMouseLeave={mouseOffImage}>
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
                      2.5 +
                      (assigneesLength - 1 - idx) * (imageHover ? 1.65 : 1)
                    }rem`}
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
        </Styled.Assignee>
        <Styled.Comment>
          <A.Text fontSize={"1rem"}>
            {commentsLength === 0 ? (
              ""
            ) : (
              <>
                <A.Icon name={"message"} color={"black"} /> {commentsLength}
              </>
            )}
          </A.Text>
        </Styled.Comment>
      </Styled.Trivial>
    </Styled.IssueCard>
  );
};

export default IssueCard;
