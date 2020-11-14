import {
  AssigneeProvider,
  useAssigneeState,
  useAssigneeDispatch,
} from "./assignee/assignee";
import { IssueProvider, useIssueState, useIssueDispatch } from "./issue/issue";
import { LabelProvider, useLabelState, useLabelDispatch } from "./label/label";
import {
  MilestoneProvider,
  useMilestoneState,
  useMilestoneDispatch,
} from "./milestone/milestone";
import { QueryProvider, useQueryState, useQueryDispatch } from "./query/query";
import { UserProvider, useUserState, useUserDispatch } from "./user/user";
import {
  CommentProvider,
  useCommentState,
  useCommentDispatch,
} from "./comment/comment";

export default {
  AssigneeProvider,
  useAssigneeState,
  useAssigneeDispatch,
  IssueProvider,
  useIssueState,
  useIssueDispatch,
  LabelProvider,
  useLabelState,
  useLabelDispatch,
  MilestoneProvider,
  useMilestoneState,
  useMilestoneDispatch,
  QueryProvider,
  useQueryState,
  useQueryDispatch,
  UserProvider,
  useUserState,
  useUserDispatch,
  CommentProvider,
  useCommentState,
  useCommentDispatch,
};
