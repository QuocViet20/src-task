/* eslint-disable @typescript-eslint/no-use-before-define */
/* eslint-disable no-prototype-builtins */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable react/button-has-type */
/* eslint-disable no-empty-pattern */

// libarary
import bind from "classnames/bind";
import { memo } from "react";
import { Button, Dropdown } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { useTranslation } from "react-i18next";
import { AiOutlineHome } from "react-icons/ai";
import { ImEarth } from "react-icons/im";
import { NavLink, useNavigate } from "react-router-dom";

// types
import { PageLayoutProps, RoutePath } from "src/types";

// component

// styles
import i18next from "i18next";
import "react-toastify/dist/ReactToastify.css";
import useAuth from "src/hooks/useAuth";
import styles from "./PageLayout.module.scss";

const cx = bind.bind(styles);

const PageLayout = memo(({ children }: PageLayoutProps) => {
  const { t } = useTranslation();
  const handleClick = (lang: string) => {
    i18next.changeLanguage(lang);
  };
  const navigate = useNavigate();
  const { authData, isLoggedIn, clearAuth } = useAuth();

  const logout = () => {
    clearAuth();
    navigate(RoutePath.Home);
  };

  return (
    <div className={cx("page-layout")}>
      <div className={cx("page-layout__header")}>
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
          <Container>
            <Navbar.Brand>
              <NavLink to={RoutePath.Home}>
                <AiOutlineHome className={cx("home-icon")} />
              </NavLink>
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
              <Nav className="me-auto">
                <Nav.Link as={NavLink} to={RoutePath.TaskList}>
                  {t("task_list")}
                </Nav.Link>
                {authData.role === "admin" ? (
                  <Nav.Link as={NavLink} to={RoutePath.UserList}>
                    {t("user_list")}
                  </Nav.Link>
                ) : (
                  ""
                )}
              </Nav>
              <Nav>
                {isLoggedIn ? (
                  <>
                    <div className={cx("username")}>{authData.username}</div>
                    <Button variant="danger" onClick={logout}>
                      {t("logout")}
                    </Button>
                  </>
                ) : (
                  <Nav.Link as={NavLink} to={RoutePath.Login}>
                    {t("log_in")}
                  </Nav.Link>
                )}
              </Nav>
              <Dropdown className={cx("change-language")}>
                <Dropdown.Toggle variant="light">
                  <ImEarth />
                </Dropdown.Toggle>

                <Dropdown.Menu>
                  <Dropdown.Item onClick={() => handleClick("en")}>
                    English
                  </Dropdown.Item>
                  <Dropdown.Item onClick={() => handleClick("vi")}>
                    Việt Nam
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </div>
      <div className={cx("page-layout__body")}>{children}</div>
    </div>
  );
});

export default PageLayout;
