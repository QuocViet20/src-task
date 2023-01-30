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
import { DEFAULT_TASK_FORM_DATA } from "src/consts";

// types
import { ITaskFormData, Task, User } from "src/types";

// api
import { getAssignee, getTask, updateTask } from "src/api/serviceApi";

// elements
import TaskForm from "src/components/elements/TaskForm/TaskForm";

// consts
import {
  SUBMITTING_BUTTON_LABEL,
  SUBMIT_BUTTON_LABEL,
  TASK_FORM_TITLE,
} from "./consts";

// styles

const EditTaskPage = memo(() => {
  const { t } = useTranslation();
  const { taskId } = useParams();

  const {
    data: taskResponse,
    isLoading: isTaskLoading,
    isError: isTaskError,
  } = useQuery({
    queryKey: ["task", taskId],
    queryFn: () => getTask(taskId as string),
    enabled: !_.isNil(taskId),
  });

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
  const defaultValues = useMemo(() => {
    if (_.isNil(taskResponse)) {
      return DEFAULT_TASK_FORM_DATA;
    }

    const { title, assignee, endTime, startTime, status, progress } =
      taskResponse.data;
    return {
      title,
      assignee,
      endTime,
      startTime,
      status,
      progress,
    };
  }, [taskResponse]);

  const editTaskMutation = useMutation({
    mutationFn: (body: ITaskFormData) => {
      return updateTask(taskId as string, body as unknown as Task);
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

  const onSubmit = (data: any) => {
    editTaskMutation.mutate(data);
  };

  if (isTaskError) return <h1>{t("cannot_load_data")}</h1>;
  if (isTaskLoading)
    return (
      <div className="loading">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </div>
    );

  return (
    <TaskForm
      formTitle={TASK_FORM_TITLE}
      assigneOptions={assigneOptions}
      defaultValues={defaultValues}
      submitButtonLabel={SUBMIT_BUTTON_LABEL}
      submittingButtonLabel={SUBMITTING_BUTTON_LABEL}
      isSubmitting={editTaskMutation.isLoading}
      onSubmit={onSubmit}
    />
  );
});

export default EditTaskPage;
