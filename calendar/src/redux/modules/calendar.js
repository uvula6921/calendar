import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import { firestore } from "../../shared/firebase";
import "moment";
import moment from "moment";

// initial state
const initialList = {
  id: 0,
  datetime: moment().format("YYYY-MM-DD HH:mm:ss"),
  contents: "",
  completed: false,
};

const initialState = {
  list: {},
  shownMonth: moment().month(),
};

// actions
const GET_TODO = "GET_TODO";

// action creators
const getTodo = createAction(GET_TODO, (todo_list) => ({
  todo_list,
}));

// middleware actions
const getTodoFB = () => {
  return function (dispatch, getState, { history }) {
    const postDB = firestore.collection("todo_list");
    postDB.get().then((docs) => {
      let todo_list = {};

      docs.forEach((doc) => {
        let _todo = doc.data();
        let list_key = _todo.datetime.slice(0, 10);
        console.log(list_key === "2021-07-16");

        if (!(list_key in todo_list)) {
          todo_list[list_key] = [];
        }
        todo_list[list_key].push(_todo);
      });

      dispatch(getTodo(todo_list));
      // let post = Object.keys(_todo).reduce(
      //     // reduce 쓰는법 참고!!!
      //     (acc, cur) => {
      //       if (cur.datatime.indexOf(list_key) !== -1) {
      //         return {
      //           ...acc,
      //           list_key: { ...acc.user_info, [cur]: _post[cur] },
      //           // [cur] 이렇게 써야 cur의 변수 값이 들어가짐. 그냥 cur 쓰면 문자열이 들어감...?!
      //           // value 가져올때도 _post.cur라고 쓰면 안되고 _post[cur] 라고 써야함
      //           // reduce만의 특징인듯?
      //         };
      //       }
      //       return { ...acc, [cur]: _post[cur] };
      //     }
      //   );
    });
  };
};

// reducer using handle actions, immer
export default handleActions(
  {
    [GET_TODO]: (state, action) =>
      produce(state, (draft) => {
        draft.list = action.payload.todo_list;
        console.log(draft.list);
      }),
  },
  initialState
);

const actionCreators = {
  getTodoFB,
};
export { actionCreators };
