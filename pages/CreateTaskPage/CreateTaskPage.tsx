/* eslint-disable consistent-return */
// libarary
import { useMutation, useQuery } from "@tanstack/react-query";
import _ from "lodash";
import { memo, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";

// types
import { ITaskFormData, User } from "src/types";

// elements
import TaskForm from "src/components/elements/TaskForm/TaskForm";

// api
import { addtask, getAssignee } from "src/api/serviceApi";

// consts
import { DEFAULT_TASK_FORM_DATA } from "src/consts";
import {
  SUBMITTING_BUTTON_LABEL,
  SUBMIT_BUTTON_LABEL,
  TASK_FORM_TITLE,
} from "./consts";

const CreateTaskPage = memo(() => {
  const { t } = useTranslation();
  const { data: assigneeResponse } = useQuery({
    queryKey: ["assignetask"],
    queryFn: () => getAssignee(),
  });

  const assigneOptions = useMemo(() => {
    if (_.isNil(assigneeResponse)) {
      return [];
    }

    return assigneeResponse.data.map((assignee: User) => ({
      label: assignee.username,
      value: assignee.id,
    }));
  }, [assigneeResponse]);

  const createTaskMutation = useMutation({
    mutationFn: (body: ITaskFormData) => {
      return addtask(body);
    },
    onError: () => {
      toast.error(t("add_error"), {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
    },
    onSuccess: () => {
      toast.success(t("add_success"), {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
    },
  });

  const onSubmit = (data: ITaskFormData) => {
    createTaskMutation.mutate(data);
  };

  return (
    <TaskForm
      formTitle={TASK_FORM_TITLE}
      assigneOptions={assigneOptions}
      defaultValues={DEFAULT_TASK_FORM_DATA}
      submitButtonLabel={SUBMIT_BUTTON_LABEL}
      submittingButtonLabel={SUBMITTING_BUTTON_LABEL}
      isSubmitting={createTaskMutation.isLoading}
      onSubmit={onSubmit}
    />
  );
});

export default CreateTaskPage;
