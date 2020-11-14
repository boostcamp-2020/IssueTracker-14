import React, { useCallback, useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import A from "@atoms/index";
import M from "@molecules/index";
import Store from "@stores/index";
import fetchData from "@utils/fetchData";
import Styled from "./EditMilestoneForm.style";

const EditMilestoneForm = ({ milestone }) => {
  const [title, setTitle] = useState(milestone.title);
  const [duedate, setDueDate] = useState(
    milestone.duedate !== null ? milestone.duedate.split("T")[0] : ""
  );
  const [description, setdescription] = useState(
    milestone.description !== null ? milestone.description : ""
  );

  const milestoneDispatch = Store.useMilestoneDispatch();
  const history = useHistory();

  useEffect(async () => {
    await milestoneDispatch({
      type: "SET_INITIAL_EDITMILESTON",
      data: {
        title,
        duedate,
        description,
      },
    });
  }, []);

  const onChange = useCallback((e) => {
    const { name, value } = e.target;
    milestoneDispatch({
      type: "ON_CHANGE_INPUTS_EDIT",
      name,
      value,
    });
    switch (name) {
      case "title":
        setTitle(e.target.value);
        break;
      case "description":
        setdescription(e.target.value);
        break;
      case "duedate":
        setDueDate(e.target.value);
        break;
    }
  }, []);

  const onClickEditMilestone = useCallback(async () => {
    try {
      await milestoneDispatch({
        type: "EDIT_MILESTONE",
        data: milestone.id,
      });
      await fetchData("milestone", milestoneDispatch);
      history.push("/milestones");
    } catch (error) {
      console.log(error);
    }
  }, []);

  const onClickClosedMilestone = useCallback(async () => {
    await milestoneDispatch({ type: "CLOSED_MILESTONE", data: milestone.id });
    history.push("/milestones");
  });

  const onClickCancel = useCallback(async () => {
    history.goBack();
  });

  return (
    <Styled.EditMilestoneForm>
      <M.FormDiv
        label={"title"}
        for={"title"}
        type={"text"}
        name={"title"}
        id={"title"}
        padding={"1rem"}
        width={"30%"}
        placeholder={"title"}
        onChange={onChange}
        value={title}
        rounded
      />
      <M.FormDiv
        label={"Due date"}
        for={"duedate"}
        type={"date"}
        name={"duedate"}
        id={"duedate"}
        padding={"1rem"}
        width={"30%"}
        onChange={onChange}
        value={duedate}
        rounded
      />
      <Styled.Description>
        <A.Text fontWeight={"bold"} hover={false}>
          Description
        </A.Text>
        <M.FormTextArea
          label={"Description"}
          rows={"20"}
          width={"100%"}
          placeholder={"Leave a description"}
          value={description}
          name={"description"}
          onChange={onChange}
          height={"100%"}
        />
      </Styled.Description>
      <A.Line color={"grey"} />
      <Styled.FormFooter>
        <M.ButtonDiv
          onClick={onClickCancel}
          buttonColor={"lightGrey"}
          width={"5rem"}
          height={"2rem"}
          textColor={"black"}
          fontSize={"small"}
          hover={false}
          border={true}
          margin={"10px 5px"}
        >
          Cancel
        </M.ButtonDiv>
        <M.ButtonDiv
          onClick={onClickClosedMilestone}
          buttonColor={"lightGrey"}
          width={"8rem"}
          height={"2rem"}
          textColor={"black"}
          fontSize={"small"}
          hover={false}
          border={true}
          margin={"10px 5px"}
        >
          Close Milestone
        </M.ButtonDiv>
        <M.ButtonDiv
          onClick={onClickEditMilestone}
          buttonColor={"green"}
          width={"8rem"}
          height={"2rem"}
          textColor={"white"}
          fontSize={"small"}
          hover={false}
          border={true}
          margin={"10px 0"}
        >
          Save Milestone
        </M.ButtonDiv>
      </Styled.FormFooter>
    </Styled.EditMilestoneForm>
  );
};

export default EditMilestoneForm;
