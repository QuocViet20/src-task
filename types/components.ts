import { ReactNode } from "react";
import { RouteProps } from "react-router-dom";
import { ITaskFormData, IUserEdit, IUserFormData, Option } from "./data";

export interface PageLayoutProps {
  children?: ReactNode;
}

export interface LoginPageLayoutProps {
  headerElement: ReactNode;
  bodyElement: ReactNode;
}

export interface StateListProps {
  keyPrefix: string;
  data: Option[];
  value: string;
}

export interface TaskFormProps {
  formTitle: string;
  assigneOptions: Option[];
  defaultValues: ITaskFormData;
  submitButtonLabel: string;
  submittingButtonLabel: string;
  isSubmitting: boolean;
  onSubmit: (data: ITaskFormData) => void;
}
export interface UserFormProps {
  formTitle: string;
  defaultValues: IUserEdit;
  submitButtonLabel: string;
  submittingButtonLabel: string;
  isSubmitting: boolean;
  onSubmit: (data: IUserFormData) => void;
}

export interface PanigationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (newPage: number) => void;
}
export type PublicRouteProps = RouteProps;
