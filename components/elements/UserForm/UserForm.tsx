/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable @typescript-eslint/no-use-before-define */
// libarary
import { yupResolver } from "@hookform/resolvers/yup";
import bind from "classnames/bind";
import { memo } from "react";
import { Button, Card, Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import * as yup from "yup";

// types
import { RoutePath, User, UserFormProps } from "src/types";

// api

// styles
import i18next from "i18next";
import styles from "./UserForm.module.scss";

const cx = bind.bind(styles);
const schema = yup.object({
  username: yup.string().required(() => i18next.t("This field is requirte")),
  email: yup.string().required(() => i18next.t("This field is requirte")),
  password: yup.string().required(() => i18next.t("This field is requirte")),
});

const UserForm = memo(
  ({
    formTitle,
    defaultValues,
    submitButtonLabel,
    submittingButtonLabel,
    isSubmitting,
    onSubmit,
  }: UserFormProps) => {
    const { t } = useTranslation();
    const {
      register,
      handleSubmit,
      formState: { errors },
    } = useForm<User>({
      resolver: yupResolver(schema),
      defaultValues,
    });

    return (
      <div className={cx("user-form")}>
        <Card>
          <Card.Header className={cx("login-form__header")}>
            <h1>{t(`${formTitle}`)}</h1>
          </Card.Header>
          <Card.Body className={cx("login-form__body")}>
            <Form onSubmit={handleSubmit(onSubmit)}>
              <Form.Group
                className="mb-3"
                controlId="productForm.ControlInput1"
              >
                <Form.Label>{t("user_name")}</Form.Label>
                <Form.Control type="text" {...register("username")} />
                <p className="mt-1 text-danger">{errors.username?.message}</p>
              </Form.Group>
              <Form.Group
                className="mb-3"
                controlId="productForm.ControlInput1"
              >
                <Form.Label>{t("Email")}</Form.Label>
                <Form.Control type="text" {...register("email")} />
                <p className="mt-1 text-danger">{errors.email?.message}</p>
              </Form.Group>
              <Form.Group
                className="mb-3"
                controlId="productForm.ControlInput1"
              >
                <Form.Label>{t("password")}</Form.Label>
                <Form.Control type="text" {...register("password")} />
              </Form.Group>
              <div className={cx("user-form__button")}>
                {isSubmitting ? (
                  <Button
                    variant="warning"
                    type="submit"
                    disabled
                    className={cx("form-button", "save")}
                  >
                    {submittingButtonLabel}
                  </Button>
                ) : (
                  <Button
                    variant="warning"
                    type="submit"
                    className={cx("form-button", "save")}
                  >
                    {submitButtonLabel}
                  </Button>
                )}

                <Link to={RoutePath.UserList}>
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

export default UserForm;
