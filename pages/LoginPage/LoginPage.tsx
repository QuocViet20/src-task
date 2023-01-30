/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable @typescript-eslint/no-use-before-define */

// libarary
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation } from "@tanstack/react-query";
import bind from "classnames/bind";
import { memo } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import i18n from "src/i18n";
import * as yup from "yup";

// src
import { DEFAULT_USER_FORM_DATA } from "src/consts";

// types
import { RoutePath, UserLogin } from "src/types";

// hooks
import useAuth from "src/hooks/useAuth";

// api
import { userLogin } from "src/api/serviceApi";

// styles
import styles from "./LoginPage.module.scss";

const cx = bind.bind(styles);

const schema = yup.object({
  email: yup.string().required(i18n.t("validation.required") as string),
  password: yup.string().required(i18n.t("validation.required") as string),
});

const LoginPage = memo(() => {
  const { t } = useTranslation();
  const { setAuth } = useAuth();

  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm({
    defaultValues: DEFAULT_USER_FORM_DATA,
    resolver: yupResolver(schema),
  });
  const navigate = useNavigate();

  const handleLoginUser = (data: any) => {
    loginMuatation.mutate(data, {
      onSuccess: (loginResponse) => {
        setAuth({
          accessToken: loginResponse.data.accessToken,
          username: loginResponse.data.user.username,
          email: loginResponse.data.user.email,
          role: loginResponse.data.user.role,
        });
      },
    });
    reset(data);
  };

  const loginMuatation = useMutation({
    mutationFn: (body: UserLogin) => {
      return userLogin(body);
    },
    onError: (data: any) => {
      toast.error(t(`${data.response.data}`), {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
    },
    onSuccess: () => {
      navigate(RoutePath.Home);
      toast.success(t("login_success"), {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
    },
  });

  return (
    <div className={cx("login-page")}>
      <Card className={cx("login-form")}>
        <Card.Header className={cx("login-form__header")}>
          {t("login")}
        </Card.Header>
        <Card.Body className={cx("login-form__body")}>
          <Form onSubmit={handleSubmit(handleLoginUser)}>
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

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>{t("pasword")}</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                {...register("password")}
              />
              <p className="mt-1 text-danger">{errors.password?.message}</p>
            </Form.Group>
            <Form.Label>{t("allready_have_an_account")}</Form.Label>
            <Link
              to={RoutePath.Register}
              className={cx("login-form__body-create")}
            >
              {t("create_account")}
            </Link>
            <div className={cx("login-form__footer")}>
              {loginMuatation.isLoading ? (
                <Button
                  disabled
                  variant="primary"
                  type="submit"
                  className={cx("button", "submit")}
                >
                  {t("logging")}
                </Button>
              ) : (
                <Button
                  variant="primary"
                  type="submit"
                  className={cx("button", "submit")}
                >
                  {t("login")}
                </Button>
              )}

              <Link to={RoutePath.Home}>
                <Button
                  variant="outline-secondary"
                  className={cx("button", "back")}
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
});

export default LoginPage;
