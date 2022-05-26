import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import axios from "axios";

import { apis } from "../../shared/apis";

import image01 from "../../assets/image01.png";
import image02 from "../../assets/image02.png";

// actions
const SET_VOTE = "GET_VOTE";
const SET_RANKING = "SET_RANKING";
const ADD_VOTE = "ADD_VOTE";
const DETAIL_VOTE = "DETAIL_VOTE";
const GET_RESULT = "GET_RESULT";
const DEL_VOTE = "DELETE_VOTE";
const PUT_VOTE = "PUT_VOTE";
const DEL_DATA = "DEL_DATA";

// action creators
const setVote = createAction(SET_VOTE, (voteList) => voteList);
const setRanking = createAction(SET_RANKING, (RankingList) => RankingList);
const detailVote = createAction(DETAIL_VOTE, (voteInfo) => voteInfo);
const getResult = createAction(GET_RESULT, (voteInfo) => voteInfo);
const delVote = createAction(DEL_VOTE, (postId) => postId);
const putVote = createAction(PUT_VOTE, (postId) => postId);
const delData = createAction(DEL_DATA);

// initialState
const initialState = {
  voteList: [
    {
      memberId: "luckyseven",
      vote: [
        {
          imageUrl: false,
          imageTitle: "신발",
          selectionList: ["스파르타", "항해99"],
          selected: true,
        },
        {
          imageUrl: false,
          imageTitle: "가방",
          selectionList: ["스파르타", "항해99", "럭키세븐호"],
          selected: false,
        },
      ],
      createdAt: "22-05-01 10:00:00",
      title: "남자친구 생일선물 골라주세요!",
      contents: "생일선물 뭐고를지 모르겠어요 투표 부탁드려요!",
    },
    {
      memberId: "luckyseven",
      vote: [
        {
          imageUrl: image01,
          imageTitle: "신발",
          selectionList: ["스파르타", "항해99", "럭키세븐호"],
          selected: false,
        },
        {
          imageUrl: image02,
          imageTitle: "가방",
          selectionList: ["스파르타"],
          selected: false,
        },
      ],
      createdAt: "22-05-01 10:00:00",
      title: "남자친구 생일선물 골라주세요!",
      contents: "생일선물 뭐고를지 모르겠어요 투표 부탁드려요!",
    },
  ],
  voteInfo: {
    memberId: "럭키세븐호02",
    createdAt: "22-05-01 10:00:00",
    title: "남자친구 생일선물 골라주세요!",
    contents: "생일선물 뭐고를지 모르겠어요 투표 부탁드려요!",
    vote: [
      {
        imageUrl: image01,
        imageTitle: "신발",
        selectionList: ["스파르타", "항해99", "럭키세븐호"],
        selected: false,
      },
      {
        imageUrl: image02,
        imageTitle: "가방",
        selectionList: ["스파르타", "항해99"],
        selected: false,
      },
    ],
  },
  voteResult: {
    memberId: "럭키세븐호02",
    createdAt: "22-05-01 10:00:00",
    title: "남자친구 생일선물 골라주세요!",
    contents: "생일선물 뭐고를지 모르겠어요 투표 부탁드려요!",
    vote: [
      {
        imageUrl: image01,
        imageTitle: "신발",
        selectionList: ["스파르타", "항해99", "럭키세븐호"],
        selected: false,
      },
      {
        imageUrl: image02,
        imageTitle: "가방",
        selectionList: ["스파르타", "항해99"],
        selected: false,
      },
    ],
  },
};

//middlewares
const getVoteDB = (type) => {
  return async function (dispatch, getState) {
    try {
      const { data } = await apis.getVote(type);
      const voteList = data.data;
      dispatch(setVote(voteList));
    } catch {
      alert("투표리스트를 불러오지 못했습니다.");
    }
  };
};

const detailVoteDB = (postId) => {
  console.log("상세정보DB 통신 진입");
  return async function (dispatch, getState, { history }) {
    try {
      const { data } = await apis.detailVote(postId);
      console.log(data);
      dispatch(detailVote(data.data));
    } catch (err) {
      window.alert("상세정보 불러오기 실패");
      console.log(err);
    }
  };
};

const getResultDB = (postId) => {
  console.log("투표결과 DB 통신 진입");
  return async function (dispatch, getState, { history }) {
    try {
      const { data } = await apis.detailVote(postId);
      console.log(data);
      dispatch(getResult(data.data));
    } catch (err) {
      window.alert("상세정보 불러오기 실패");
      console.log(err);
    }
  };
};

const addVoteDB = (
  imgVote,
  title,
  contents,
  vote1,
  vote2,
  imageLeft,
  imageRight
) => {
  return async function (dispatch, getState, { history }) {
    console.log("투표작성 통신시작");
    try {
      console.log(title, contents, vote1, vote2, imageLeft, imageRight);
      const formData = new FormData();
      if (imgVote === true) {
        formData.append("imgLeftFile", imageLeft);
        formData.append("imgRightFile", imageRight);
        formData.append("imgLeftTitle", vote1);
        formData.append("imgRightTitle", vote2);
        formData.append("title", title);
        formData.append("contents", contents);
      } else {
        formData.append("imgLeftTitle", vote1);
        formData.append("imgRightTitle", vote2);
        formData.append("title", title);
        formData.append("contents", contents);
      }

      const { data } = await apis.addVote(formData);
      console.log(data);
      //   dispatch(getVoteDB());
      history.replace("/postList/전체");
    } catch (err) {
      console.log(err, "업로드에 실패하였습니다.");
      window.alert("업로드에 실패하였습니다.");
    }
  };
};

const putVoteDB = (postId, leftSelected) => {
  return async function (dispatch, getState, { history }) {
    console.log(postId, leftSelected);
    try {
      const { data } = await apis.putVote(postId, leftSelected);
      console.log(data);
    } catch (err) {
      console.log(err);
      window.alert("투표실패! 다시 시도해주세요.");
    }
  };
};

const delVoteDB = (postId) => {
  return async function (dispatch, getState, { history }) {
    console.log("투표삭제 DB통신");
    try {
      const { data } = await apis.delVote(postId);
      console.log(data);
      const voteList = getState().vote.voteList;
      console.log(voteList);

      dispatch(delVote(postId));
      history.push("/postList/전체");
    } catch (err) {
      console.log(err);
      window.alert("삭제실패! 다시 시도해주세요.");
    }
  };
};

// reducer
export default handleActions(
  {
    [SET_VOTE]: (state, action) =>
      produce(state, (draft) => {
        draft.list = action.payload.voteList;
      }),
    [DETAIL_VOTE]: (state, action) =>
      produce(state, (draft) => {
        console.log(action.payload);
        draft.voteInfo = action.payload;
      }),
    [GET_RESULT]: (state, action) =>
      produce(state, (draft) => {
        console.log(action.payload);
        draft.voteResult = action.payload;
      }),
    [DEL_VOTE]: (state, action) =>
      produce(state, (draft) => {
        draft.voteList = state.voteList.filter(
          (v) => v.postId !== action.payload
        );
      }),
    [DEL_DATA]: (state, action) =>
      produce(state, (draft) => {
        draft.voteList = [];
        draft.voteInfo = [];
      }),
  },
  initialState
);

const actionCreators = {
  getVoteDB,
  addVoteDB,
  detailVoteDB,
  delVoteDB,
  putVoteDB,
  getResultDB,
  delData,
};

export { actionCreators };
