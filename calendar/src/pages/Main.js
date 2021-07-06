import React from "react";
import moment from "moment";
import Calendar from "../components/Calendar";
import Popup from "../components/Popup";
import { actionCreators as calendarActions } from "../redux/modules/calendar";
import { useDispatch, useSelector } from "react-redux";

const Main = (props) => {
  const dispatch = useDispatch();
  const todo_list = useSelector((state) => state.calendar.list);

  React.useEffect(() => {
    dispatch(calendarActions.getTodoFB());
  }, []);

  const [today, setToday] = React.useState(moment());
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
      <Calendar todo_list={todo_list} today={today} _changeMonth={setToday} />
      <Popup />
    </React.Fragment>
  );
};

export default Main;
