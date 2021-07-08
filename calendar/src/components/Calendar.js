import React from "react";
import { Grid, Button, Text } from "./Styles";
import Detail from "./Detail";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";

/**
 * 달력 만들기 순서
 *  - 이번달이 몇 주가 필요한 지 "주"수 구하기
 *  - 주수만큼 map 돌리기
 *  - map 돌리면서 안에 날짜 넣어주기!
 *  - +) 일정도 같이 넣어주면 good!
 */
const Calendar = (props) => {
  const { today, todo_list, _changeMonth, schedule_toggle } = props;
  const [open, setOpen] = React.useState(false);
  const [modal_list, setModalList] = React.useState();

  const handleOpen = (date, id) => {
    setOpen(true);
    const _modal_list = todo_list[date].filter((l) => {
      return l.id === id;
    });
    setModalList(_modal_list);
  };

  const handleClose = () => {
    setOpen(false);
  };

  // 넘어온 데이터를 확인하자!
  // console.log(todo_list);

  // 이번달의 시작 주, 끝 주를 구합니다.
  const start_week = moment(today).startOf("month").week();
  const end_week = moment(today).endOf("month").week();

  // 달력에 넣을 주수 배열 길이를 구합니다.
  // 마지막 주가 다음 해 1주일 수 있어요. (시작 주보다 끝 주가 숫자가 작을 수 있다!)
  const week_num =
    (start_week > end_week ? 53 - start_week : end_week - start_week) + 1;

  // 주수 길이의 배열을 만들고,
  const _week_arr = Array.from({ length: week_num }, (v, i) => start_week + i);

  // 주마다 7개씩 날짜를 넣어주면 끝!
  const week_arr = _week_arr.map((week_index) => {
    return (
      <Grid
        key={`${moment(today).format("MM")}_week_${week_index}`}
        margin="4px auto"
        flex_direction="row"
      >
        {/*한 주는 7일이니, 주에 7개씩 날짜 칸을 넣어줍니다. */}
        {Array.from({ length: 7 }, (v, i) => i).map((day_index) => {
          let _day = today
            .clone()
            .startOf("year")
            .week(week_index)
            .startOf("week")
            .add(day_index, "day");

          const is_today =
            moment().format("YYYY-MM-DD") === _day.format("YYYY-MM-DD");

          // todo_list(Main.js에서 props로 건네줬어요!)에 해당 일자 일정이 들어가 있나 보고, 추가해줍시다.
          const list_index = Object.keys(todo_list).indexOf(
            _day.format("YYYY-MM-DD")
          );

          // 주석풀고 데이터 확인해보기! :)!
          // console.log(list_index);
          // console.log(todo_list[_day.format("YYYY-MM-DD")]);
          // todo_list에 해당 일 일정이 있으면 일정을 list에 넣어주자! (없으면 null이나 빈배열로! 일단 빈배열로 해봅시다! :))
          const _list =
            list_index !== -1 ? todo_list[_day.format("YYYY-MM-DD")] : [];

          let sorted_list = _list.slice(0, _list.length);
          // 시간순 오름차순 정렬하기.
          sorted_list.sort(function (a, b) {
            return (
              moment(a["datetime"], "YYYY-MM-DD HH:mm") -
              moment(b["datetime"], "YYYY-MM-DD HH:mm")
            );
          });

          // 완료된 일정 필터링 하기.
          if (schedule_toggle) {
            sorted_list = sorted_list.filter((l, idx) => {
              return l.completed === true;
            });
          }

          const list = sorted_list.map((_l, idx) => {
            // 데이터 확인하기!
            // console.log(_l);
            // 일정을 뿌려줘요!

            return (
              <Grid
                bg={_l.completed ? "#48cae4;" : "#f2aa4c;"}
                height="auto"
                margin="1px 0px"
                key={`${_l.datetime}_${_l.id}`}
                onClick={() => handleOpen(_day.format("YYYY-MM-DD"), _l.id)}
              >
                <Text type="label">{_l.contents}</Text>
              </Grid>
            );
          });

          return (
            <Grid
              margin="0px 2px"
              key={`${moment(today).format(
                "MM"
              )}_week_${week_index}_day_${day_index}`}
              flex_direction="column"
              bg={is_today ? "#ffcece" : "#ffffff"}
            >
              {_day.format("MM") === moment(today).format("MM") && (
                <Text type="label">{_day.format("DD")}일</Text>
              )}

              {_list && list}
            </Grid>
          );
        })}
      </Grid>
    );
  });

  const dow = ["일", "월", "화", "수", "목", "금", "토"].map((_d) => {
    return (
      <Grid
        margin="4px 2px"
        width="100%"
        flex_direction="column"
        bg={"#ffffff"}
        height="auto"
        key={`${moment(today).format("MM")}_week_${_d}`}
      >
        <Text bold type="label">
          {_d}
        </Text>
      </Grid>
    );
  });

  return (
    <>
      <Grid flex_direction="column" width="80vw" height="80vh" margin="auto">
        <Grid justify_contents="space-between">
          <Button
            onClick={() => {
              _changeMonth(-1);
            }}
          >
            이전
          </Button>
          <Text type="title">{moment(today).format("MM")}월</Text>
          <Button
            onClick={() => {
              _changeMonth(1);
            }}
          >
            이후
          </Button>
        </Grid>
        <Grid height="auto" font_size="4">
          {dow}
        </Grid>
        {week_arr}
      </Grid>
      {modal_list && (
        <Detail
          handleClose={handleClose}
          open={open}
          modal_list={modal_list[0]}
        ></Detail>
      )}
    </>
  );
};

// 기본적으로 꼭 필요한 props를 미리 정해줍시다!
Calendar.defaultProps = {
  today: moment(),
  _changeMonth: () => {},
  todo_list: {},
};

export default Calendar;
