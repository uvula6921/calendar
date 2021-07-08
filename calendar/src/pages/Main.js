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
