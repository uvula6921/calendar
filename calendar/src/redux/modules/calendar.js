import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import { firestore } from "../../shared/firebase";
import "moment";
import moment from "moment";
import { setCookie, getCookie } from "../../shared/Cookie";

// initial state
const initialList = {
  id: 0,
  datetime: moment().format("YYYY-MM-DD HH:mm"),
  contents: "",
  completed: false,
};

const initialState = {
  list: {},
  today: moment(),
};

const todoDB = firestore.collection("todo_list");

// actions
const GET_TODO = "calendar/GET_TODO";
const SET_MONTH = "calendar/SET_MONTH";
const ADD_TODO = "calendar/ADD_TODO";
const DELETE_TODO = "calendar/DELETE_TODO";
const COMPLETE_TODO = "calendar/COMPLETE";

// action creators
const getTodo = createAction(GET_TODO, (todo_list) => ({
  todo_list,
}));
const setMonth = createAction(SET_MONTH, (value) => ({
  value,
}));
const addTodo = createAction(ADD_TODO, (todo) => ({
  todo,
}));
const deleteTodo = createAction(DELETE_TODO, (todo) => ({
  todo,
}));
const completeTodo = createAction(COMPLETE_TODO, (todo) => ({
  todo,
}));

// middleware actions
const completeTodoFB = (modal_list) => {
  return function (dispatch, getState, { history }) {
    if (!modal_list) {
      return;
    }
    todoDB
      .doc(modal_list.id)
      .update({ completed: !modal_list.completed })
      .then((res) => {
        dispatch(
          completeTodo({ ...modal_list, completed: !modal_list.completed })
        );
      })
      .catch((error) => {
        console.log(error);
      });
  };
};

const deleteTodoFB = (modal_list) => {
  return function (dispatch, getState, { history }) {
    const deleting_todo = getState().calendar.list[
      moment(modal_list.datetime).format("YYYY-MM-DD")
    ].filter((l, idx) => {
      return l.id === modal_list.id;
    });
    if (!deleting_todo) {
      return;
    }
    todoDB
      .doc(deleting_todo[0].id)
      .delete()
      .then((res) => {
        dispatch(deleteTodo(deleting_todo[0]));
      })
      .catch((error) => {
        console.log(error);
      });
  };
};

const addTodoFB = (date, contents) => {
  return function (dispatch, getState, { history }) {
    const todo = {
      datetime: date,
      contents: contents,
      completed: false,
    };
    todoDB
      .add({ ...todo })
      .then((doc) => {
        let todo_list = { ...todo, id: doc.id };
        history.replace("/");

        dispatch(addTodo(todo_list));
      })
      .catch((err) => {
        console.log("스케쥴 추가에 실패했습니다", err);
      });
  };
};

const getTodoFB = () => {
  return function (dispatch, getState, { history }) {
    const todoDB = firestore.collection("todo_list");
    todoDB.get().then((docs) => {
      let todo_list = {};

      docs.forEach((doc) => {
        let _todo = { id: doc.id, ...doc.data() };
        let list_key = _todo.datetime.slice(0, 10);

        if (!(list_key in todo_list)) {
          todo_list[list_key] = [];
        }
        todo_list[list_key].push(_todo);
      });

      dispatch(getTodo(todo_list));
    });
  };
};

// reducer using handle actions, immer
export default handleActions(
  {
    [GET_TODO]: (state, action) =>
      produce(state, (draft) => {
        draft.list = action.payload.todo_list;
      }),
    [SET_MONTH]: (state, action) =>
      produce(state, (draft) => {
        draft.today = moment(draft.today)
          .clone()
          .add(action.payload.value, "month");
        // 시간 남으면 cookie 이용해서 새로고침 해도 기존에 보던 월이 수정안되게 해보자
      }),
    [ADD_TODO]: (state, action) =>
      produce(state, (draft) => {
        draft.list[action.payload.todo.datetime].push(action.payload.todo);
      }),
    [DELETE_TODO]: (state, action) =>
      produce(state, (draft) => {
        const _todo_list = draft.list[
          moment(action.payload.todo.datetime).format("YYYY-MM-DD")
        ].filter((l, idx) => {
          return l.id !== action.payload.todo.id;
        });
        draft.list[moment(action.payload.todo.datetime).format("YYYY-MM-DD")] =
          _todo_list;
      }),
    [COMPLETE_TODO]: (state, action) =>
      produce(state, (draft) => {
        const new_todo = action.payload.todo;
        draft.list[moment(new_todo.datetime).format("YYYY-MM-DD")] = draft.list[
          moment(new_todo.datetime).format("YYYY-MM-DD")
        ].map((l, idx) => {
          if (l.id === new_todo.id) {
            return new_todo;
          } else {
            return l;
          }
        });
      }),
  },
  initialState
);

const actionCreators = {
  getTodoFB,
  setMonth,
  addTodoFB,
  deleteTodoFB,
  completeTodoFB,
};
export { actionCreators };
