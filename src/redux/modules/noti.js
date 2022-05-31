import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import { api } from "../../shared/apis";
import Swal from "sweetalert2";
import "../../styles/libraryStyle/style.css";

//액션
const GET_NOTI = "GET_NOTI ";
const GET_NOTI_CNT = "GET_NOTI_CNT";

//초기값
const initialState = {
  noti: [],
  notiCnt: [],
};

//액션 생성 함수
const getNoti = createAction(GET_NOTI, (alarm) => alarm);
const getNotiCnt = createAction(GET_NOTI_CNT, (alarm) => ({ alarm }));

//알람버튼 눌렀을 때 겟
const getNotiDB = () => {
  return function (dispatch, getState, { history }) {
    try {
      api.get("/alarm/all", {}).then((res) => {
        dispatch(getNoti(res.data.data));
      });
    } catch (err) {
      console.log(err);
      Swal.fire("알림정보를 가져올 수 없습니다.");
    }
  };
};
//로그인 시 모든 페이지에서 겟
const getNotiCntDB = () => {
  return function (dispatch, getState, { history }) {
    try {
      api.get("/alarm", {}).then((res) => {
        dispatch(getNotiCnt(res.data.data.unReadAlarmNum));
      });
    } catch (err) {
      console.log(err);
      Swal.fire("알림정보를 가져올 수 없습니다.");
    }
  };
};

export default handleActions(
  {
    [GET_NOTI]: (state, action) =>
      produce(state, (draft) => {
        draft.noti = action.payload;
      }),
    [GET_NOTI_CNT]: (state, action) =>
      produce(state, (draft) => {
        draft.notiCnt = action.payload.alarm;
      }),
  },
  initialState
);

const actionCreators = {
  getNotiDB,
  getNoti,
  getNotiCntDB,
  getNotiCnt,
};

export { actionCreators };
