/* eslint-disable @typescript-eslint/no-use-before-define */
/* eslint-disable react/jsx-props-no-spreading */

// libarary
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation } from "@tanstack/react-query";
import bind from "classnames/bind";
import { memo } from "react";
import { Button, Card, Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import * as yup from "yup";

// types
import { RoutePath, UserCreateAccount } from "src/types";

// serviceApi
import { createUser } from "src/api/serviceApi";

// styles
import i18next from "i18next";
import { useTranslation } from "react-i18next";
import styles from "./RegisterPage.module.scss";

const cx = bind.bind(styles);
const schema = yup.object({
  username: yup.string().required(() => i18next.t("This field is requirte")),
  email: yup.string().required(() => i18next.t("This field is requirte")),
  password: yup.string().required(() => i18next.t("This field is requirte")),
});

const RegisterPage = memo(() => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    watch,
    getValues,
    formState: { errors },
  } = useForm<UserCreateAccount>({
    resolver: yupResolver(schema),
  });
  const handelSave = (data: any) => {
    mutate(data, {
      onSuccess: () => {},
      onError: () => {},
    });
  };

  const { mutate } = useMutation({
    mutationFn: (body: UserCreateAccount) => {
      return createUser(body);
    },
    onError: () => {
      toast.error(t("register_error"), {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
    },
    onSuccess: () => {
      navigate(RoutePath.Login);
      toast.success(t("register_success"), {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
    },
  });

  return (
    <div className={cx("register-page")}>
      <Card className={cx("register-form")}>
        <Card.Header className={cx("register-form__header")}>
          {i18next.t("register")}
        </Card.Header>
        <Card.Body className={cx("register-form__body")}>
          <Form onSubmit={handleSubmit(handelSave)}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>{t("Email")}</Form.Label>
              <Form.Control
                type="email"
                pattern=".+@gmail\.com"
                placeholder="Enter email"
                {...register("email")}
              />
              <p className="mt-1 text-danger">{errors.email?.message}</p>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>{t("user_name")}</Form.Label>
              <Form.Control
                type="text"
                placeholder="Name"
                {...register("username")}
              />
              <p className="mt-1 text-danger">{errors.username?.message}</p>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>{t("pasword")}</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                {...register("password")}
              />
              <p className="mt-1 text-danger">{errors.password?.message}</p>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>{t("confirm_pasword")}</Form.Label>
              <Form.Control
                type="password"
                placeholder="Confirm password"
                {...register("passwordrepeat")}
              />
              {watch("passwordrepeat") !== watch("password") &&
              getValues("passwordrepeat") ? (
                <p className="mt-1 text-danger">{t("password_not_match")}</p>
              ) : null}
            </Form.Group>
            <Form.Label>{t("allready_have_an_account")}</Form.Label>
            <Link
              to={RoutePath.Login}
              className={cx("register-form__body--create")}
            >
              {t("sign_in")}
            </Link>
            <div className={cx("register-form__footer")}>
              <Button variant="primary" type="submit" className={cx("button")}>
                {t("register")}
              </Button>
            </div>
          </Form>
        </Card.Body>
      </Card>
    </div>
  );
});

export default RegisterPage;
