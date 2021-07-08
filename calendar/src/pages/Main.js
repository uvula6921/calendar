import React, { useState } from "react";
import moment from "moment";
import Calendar from "../components/Calendar";
import { actionCreators as calendarActions } from "../redux/modules/calendar";
import { useDispatch, useSelector } from "react-redux";
import { Grid, Button, Text } from "../components/Styles";
import { history } from "../redux/configureStore";

const Main = (props) => {
  const dispatch = useDispatch();
  const todo_list = useSelector((state) => state.calendar.list);
  const today = useSelector((state) => state.calendar.today);
  const [schedule_toggle, setScheduleToggle] = useState(false);
  const setMonth = (value) => {
    dispatch(calendarActions.setMonth(value));
  };

  const scheduleToggle = () => {
    setScheduleToggle(!schedule_toggle);
  };

  React.useEffect(() => {
    dispatch(calendarActions.getTodoFB());
  }, []);

  // const todo_list = {
  //   "2021-07-21": [
  //     {
  //       todo_id: 11,
  //       datetime: "2021-07-21 10:20:00",
  //       contents: "산책가기1",
  //       completed: false,
  //     },
  //     {
  //       todo_id: 155555,
  //       datetime: "2021-07-21 10:15:00",
  //       contents: "산책가기2",
  //       completed: false,
  //     },
  //   ],
  //   "2021-07-16": [
  //     {
  //       todo_id: 8,
  //       datetime: "2021-07-16 10:00:00",
  //       contents: "산책가기3",
  //       completed: false,
  //     },
  //     {
  //       todo_id: 4,
  //       datetime: "2021-07-16 10:10:00",
  //       contents: "산책가기4",
  //       completed: false,
  //     },
  //   ],
  // };
  return (
    <React.Fragment>
      <Calendar
        todo_list={todo_list}
        today={today}
        _changeMonth={setMonth}
        schedule_toggle={schedule_toggle}
      />
      {schedule_toggle ? (
        <Button
          is_float
          bottom="100px"
          right="20px"
          onClick={() => {
            scheduleToggle();
          }}
        >
          모든 일정 보기
        </Button>
      ) : (
        <Button
          is_float
          bottom="100px"
          right="20px"
          onClick={() => {
            scheduleToggle();
          }}
        >
          완료된 일정 보기
        </Button>
      )}
      <Button
        is_float
        onClick={() => {
          history.push("/write");
        }}
      >
        +
      </Button>
    </React.Fragment>
  );
};

export default Main;
