/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable @typescript-eslint/no-use-before-define */
// libarary
import { yupResolver } from "@hookform/resolvers/yup";
import bind from "classnames/bind";
import { memo, useState } from "react";
import { Button, Card, Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import * as yup from "yup";

// types
import { TASK_STATE_DATA } from "src/consts";
import { ITaskFormData, RoutePath, TaskFormProps } from "src/types";

// api

// styles
import i18next from "i18next";
import styles from "./TaskForm.module.scss";

const cx = bind.bind(styles);
const schema = yup.object({
  title: yup.string().required(() => i18next.t("This field is requirte")),
  assignee: yup.string().required(() => i18next.t("This field is requirte")),
  startTime: yup.string().required(() => i18next.t("This field is requirte")),
  endTime: yup.string().required(() => i18next.t("This field is requirte")),
});

const TaskForm = memo(
  ({
    formTitle,
    assigneOptions,
    defaultValues,
    submitButtonLabel,
    submittingButtonLabel,
    isSubmitting,
    onSubmit,
  }: TaskFormProps) => {
    const { t } = useTranslation();
    const [valueRange, setValueRange] = useState<string>("");
    const {
      register,
      handleSubmit,
      formState: { errors },
    } = useForm<ITaskFormData>({
      resolver: yupResolver(schema),
      defaultValues,
    });

    return (
      <div className={cx("task-form")}>
        <Card>
          <Card.Header className={cx("login-form__header")}>
            <h1>{i18next.t(`${formTitle}`)}</h1>
          </Card.Header>
          <Card.Body className={cx("login-form__body")}>
            <Form onSubmit={handleSubmit(onSubmit)}>
              <Form.Group
                className="mb-3"
                controlId="productForm.ControlInput1"
              >
                <Form.Label>{t("title")}</Form.Label>
                <Form.Control type="text" {...register("title")} />
                <p className="mt-1 text-danger">{errors.title?.message}</p>
              </Form.Group>
              <Form.Label>{t("assignee")}</Form.Label>
              <Form.Select
                aria-label="Assignee"
                {...register("assignee")}
                className="mb-3"
              >
                <option>{t("assignee")}</option>
                {assigneOptions.map((assigneOption) => (
                  <option value={assigneOption.label} key={assigneOption.value}>
                    {t(`${assigneOption.label}`)}
                  </option>
                ))}
              </Form.Select>
              <Form.Group
                className="mb-3"
                controlId="productForm.ControlInput1"
              >
                <Form.Label>{t("Time start")}</Form.Label>
                <Form.Control
                  type="datetime-local"
                  {...register("startTime")}
                />
                <p className="mt-1 text-danger">{errors.startTime?.message}</p>
              </Form.Group>
              <Form.Group
                className="mb-3"
                controlId="productForm.ControlInput1"
              >
                <Form.Label>{t("Time End")}</Form.Label>
                <Form.Control type="datetime-local" {...register("endTime")} />
                <p className="mt-1 text-danger">{errors.endTime?.message}</p>
              </Form.Group>
              <Form.Group
                className="mb-3"
                controlId="productForm.ControlInput1"
              >
                <Form.Label>
                  {t("Progress")}
                  <span> {valueRange}</span>
                </Form.Label>
                <Form.Range
                  min="0"
                  max="100"
                  step="5"
                  value={valueRange}
                  {...register("progress")}
                  onChange={(e) => setValueRange(e.target.value)}
                />
                {/* <Form.Control type="text" {...register("progress")} /> */}
              </Form.Group>
              <Form.Label>{t("Status")}</Form.Label>
              <Form.Select
                aria-label="Status"
                {...register("status")}
                className="mb-3"
                placeholder={`${t("Status")}`}
              >
                {TASK_STATE_DATA.map((status) => (
                  <option value={status.value} key={status.value}>
                    {t(`${status.label}`)}
                  </option>
                ))}
              </Form.Select>
              <div className={cx("task-form__button")}>
                {isSubmitting ? (
                  <Button
                    variant="primary"
                    type="submit"
                    disabled
                    className={cx("form-button", "save")}
                  >
                    {submittingButtonLabel}
                  </Button>
                ) : (
                  <Button
                    variant="primary"
                    type="submit"
                    className={cx("form-button", "save")}
                  >
                    {submitButtonLabel}
                  </Button>
                )}

                <Link to={RoutePath.TaskList}>
                  <Button
                    variant="light"
                    className={cx("form-button", "close")}
                  >
                    {t("back")}
                  </Button>
                </Link>
              </div>
            </Form>
          </Card.Body>
        </Card>
      </div>
    );
  },
);

export default TaskForm;
