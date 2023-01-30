/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-shadow */
// libarary
import { useMutation, useQuery } from "@tanstack/react-query";
import _ from "lodash";
import { memo, useMemo } from "react";
import { Spinner } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";

// src

// types
import { IUserFormData, UserCreate } from "src/types";

// api
import { getUserId, updateUser } from "src/api/serviceApi";

// elements

// consts
import UserForm from "src/components/elements/UserForm/UserForm";
import { DEFAULT_USER_FORM_DATA } from "src/consts";
import {
  SUBMITTING_BUTTON_LABEL,
  SUBMIT_BUTTON_LABEL,
  TASK_FORM_TITLE,
} from "./consts";

// styles

const EditTaskPage = memo(() => {
  const { t } = useTranslation();
  const { userId } = useParams();

  const {
    data: userResponse,
    isLoading: isUserLoading,
    isError: isUserError,
  } = useQuery({
    queryKey: ["user", userId],
    queryFn: () => getUserId(userId as string),
    enabled: !_.isNil(userId),
  });
  const defaultValues = useMemo(() => {
    if (_.isNil(userResponse)) {
      return DEFAULT_USER_FORM_DATA;
    }
    const { username, email } = userResponse.data;
    return {
      username,
      email,
    };
  }, [userResponse]);

  const editUserMutation = useMutation({
    mutationFn: (body: IUserFormData) => {
      return updateUser(userId as string, body as unknown as IUserFormData);
    },
    onError: () => {
      toast.error(t("edit_failed"), {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
    },
    onSuccess: () => {
      toast.success(t("edit_successfully"), {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
    },
  });

  const onSubmit = (data: IUserFormData) => {
    editUserMutation.mutate(data);
  };

  if (isUserError) return <h1>{t("cannot_load_data")}</h1>;
  if (isUserLoading)
    return (
      <div className="loading">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </div>
    );

  return (
    <UserForm
      formTitle={TASK_FORM_TITLE}
      defaultValues={defaultValues}
      submitButtonLabel={SUBMIT_BUTTON_LABEL}
      submittingButtonLabel={SUBMITTING_BUTTON_LABEL}
      isSubmitting={editUserMutation.isLoading}
      onSubmit={onSubmit}
    />
  );
});

export default EditTaskPage;
