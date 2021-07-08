import React from "react";
import { Grid, Button, Text, Input } from "../components/Styles";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { actionCreators as calendarActions } from "../redux/modules/calendar";
import { dateCheck } from "../shared/reg_test";

const Write = (props) => {
  const dispatch = useDispatch();
  const [contents, setContents] = React.useState();
  const [date, setDate] = React.useState();
  const submit = (date, contents) => {
    if (!date || !contents) {
      window.alert("입력값을 모두 채워주세요.");
      return;
    } else if (!dateCheck(date)) {
      window.alert("날짜 형식이 올바르지 않습니다.");
      return;
    } else if (date && contents) {
      dispatch(calendarActions.addTodoFB(date, contents));
    }
  };

  return (
    <Grid
      width="40vw"
      height="80vh"
      bg="#fff"
      margin="auto"
      flex_direction="column"
      justify_contents="space-around"
    >
      <Grid justify_contents="center" height="auto" flex_direction="column">
        <Text type="label" margin="0 20px 0 0" font_size="1.5em">
          스케쥴 내용
        </Text>
        <Input
          type="text"
          onChange={(e) => {
            setContents(e.target.value);
          }}
        />
      </Grid>

      <Grid justify_contents="center" height="auto" flex_direction="column">
        <Text type="label" margin="0 20px 0 0" font_size="1em">
          스케쥴 일시 ("YYYY-MM-DD hh:mm" 형식)
        </Text>
        <Input
          type="text"
          onChange={(e) => {
            setDate(e.target.value);
          }}
        />
      </Grid>

      <Button
        onClick={() => {
          submit(date, contents);
        }}
      >
        등록하기
      </Button>
    </Grid>
  );
};

export default Write;
