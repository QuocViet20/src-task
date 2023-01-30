/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-use-before-define */
/* eslint-disable radix */
// libarary
import { useMutation, useQuery } from "@tanstack/react-query";
import bind from "classnames/bind";
import _ from "lodash";
import { memo, useMemo, useState } from "react";
import {
  Button,
  Form,
  InputGroup,
  Modal,
  Spinner,
  Table,
} from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";
// src
import { STATUS_DATA } from "src/consts";

// types
import { RoutePath, Task } from "src/types";

// hooks
import useDebounce from "src/hooks/useSearch";

// component

// api
import { deleteTask, getTasks } from "src/api/serviceApi";

// hooks
import useAuth from "src/hooks/useAuth";

// consts
import TablePanigation from "src/components/elements/TablePanigation/TablePanigation";
import { RECORDS_PER_PAGE } from "./consts";

// styles
import styles from "./TaskListPage.module.scss";

const cx = bind.bind(styles);

const TaskListPage = memo(() => {
  const [show, setShow] = useState(false);

  const { t } = useTranslation();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const { authData } = useAuth();
  const userName = authData.username;

  const [selectedStatus, setSelectedStatus] = useState(STATUS_DATA[0].value);
  const [editingSearchValue, setEditingSearchValue] = useState("");

  const debounceSearch = _.debounce((newSearchValue: string) => {
    setSearchValue(newSearchValue);
  }, 2000);

  const [searchValue, setSearchValue] = useState("");
  const debouncedSearchHook = useDebounce(searchValue, 1000);

  const currentPage = Number(searchParams.get("page")) || 1;

  const queryParams = selectedStatus
    ? {
        currentPage,
        limit: RECORDS_PER_PAGE,
        debouncedSearchHook,
        selectedStatus,
      }
    : { currentPage, limit: RECORDS_PER_PAGE, debouncedSearchHook };

  const { data, isLoading, refetch }: any = useQuery({
    queryKey: [
      "tasks",
      queryParams.currentPage,
      queryParams.debouncedSearchHook,
      queryParams.selectedStatus,
    ],
    queryFn: () => getTasks(queryParams),
  });

  const totalPages = useMemo(() => {
    if (_.isNil(data) || _.isNil(data?.headers["x-total-count"])) {
      return 0;
    }

    return Math.ceil(
      parseInt(data.headers["x-total-count"]) / RECORDS_PER_PAGE,
    );
  }, [data]);

  const onPageChange = (newPage: number) => {
    navigate(`/tasks?page=${newPage}`);
  };

  const deleteMutation = useMutation({
    mutationFn: (id: number) => deleteTask(id),
    onSuccess: () => {
      toast.success(t("delete success"), {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
      refetch();
    },
  });

  const handleDelete = (id: number) => {
    deleteMutation.mutate(id);
  };

  if (isLoading) {
    return (
      <div className="loading">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </div>
    );
  }

  return (
    <div className={cx("task-page")}>
      <div className={cx("task-page__header")}>
        <div className={cx("search-box")}>
          <InputGroup>
            <Form.Control
              value={searchValue}
              placeholder={`${t("search")}`}
              onChange={(e) => {
                setSearchValue(e.target.value);
              }}
            />
            <Button variant="danger" onClick={() => setSearchValue("")}>
              {t("cancel")}
            </Button>
          </InputGroup>
        </div>
        <div>
          <Form.Select
            className={cx("status-select")}
            value={selectedStatus}
            onChange={(event) => setSelectedStatus(event.target.value)}
          >
            {STATUS_DATA.map((option) => (
              <option key={option.value} value={option.value}>
                {t(`${option.text}`)}
              </option>
            ))}
          </Form.Select>
        </div>
      </div>
      <Table className={cx("task-table")} striped bordered hover>
        <thead className="thead-dark">
          <tr>
            <th className={cx("table-head")}>{t("STT")}</th>
            <th className={cx("table-head")}>{t("Name")}</th>
            <th className={cx("table-head")}>{t("Time start")}</th>
            <th className={cx("table-head")}>{t("Time End")}</th>
            <th className={cx("table-head")}>{t("Assignee")}</th>
            <th className={cx("table-head")}>{t("Progress")}</th>
            <th className={cx("table-head")}>{t("Status")}</th>
            <th className={cx("table-head")}>
              {t("Action")}
              <Link to={RoutePath.CreateTask}>
                <Button variant="primary" className={cx("add-button")}>
                  {t("add")}
                </Button>
              </Link>
            </th>
          </tr>
        </thead>
        <tbody>
          {data?.data.map((task: Task, index: number) => {
            return (
              <>
                <tr>
                  <td key={task.id}>{index + 1}</td>
                  <td>{task.title}</td>
                  <td>{task.startTime}</td>
                  <td>{task.endTime}</td>
                  <td>{task.assignee}</td>
                  <td>{task.progress}</td>
                  <td>{t(`${task.status}`)}</td>
                  <td>
                    <Link to={`/tasks/${task.id}/edit`}>
                      <Button className={cx("edit-button")} variant="warning">
                        {t("Edit")}
                      </Button>
                    </Link>
                    <Button variant="danger" onClick={() => setShow(true)}>
                      {t("Delete")}
                    </Button>
                  </td>
                </tr>
                <Modal show={show} onHide={() => setShow(false)}>
                  <Modal.Header closeButton>
                    <Modal.Title>{t("delete_task")}</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>{t("are_you_sure_want_to_delte")}</Modal.Body>
                  <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShow(false)}>
                      {t("close")}
                    </Button>
                    <Button
                      variant="primary"
                      onClick={() => {
                        handleDelete(task.id as number);
                        setShow(false);
                      }}
                    >
                      {t("Delete")}
                    </Button>
                  </Modal.Footer>
                </Modal>
              </>
            );
          })}
        </tbody>
      </Table>
      <div className={cx("task-page__footer")}>
        <TablePanigation
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={onPageChange}
        />
      </div>
    </div>
  );
});

export default TaskListPage;
