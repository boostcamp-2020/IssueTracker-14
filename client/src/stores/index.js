import {
  AssigneeProvider,
  useAssigneeState,
  useAssigneeDispatch,
} from "./assignee";
import { IssueProvider, useIssueState, useIssueDispatch } from "./issue";
import { LabelProvider, useLabelState, useLabelDispatch } from "./label";
import {
  MilestoneProvider,
  useMilestoneState,
  useMilestoneDispatch,
} from "./milestone";
import { QueryProvider, useQueryState, useQueryDispatch } from "./query";
import { UserProvider, useUserState, useUserDispatch } from "./user";

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
};
