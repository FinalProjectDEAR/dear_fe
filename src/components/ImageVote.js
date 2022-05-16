import React from "react";
import { div, Input, Text, Button } from "../elements";
import { useSelector, useDispatch } from "react-redux";

import { history } from "../redux/configureStore";

import { actionCreators as voteActions } from "../redux/modules/vote";
import { useParams } from "react-router-dom";

// import assets
import uploadImg from "../assets/upload.png";
import styled from "styled-components";
import VoteResult from "./VoteResult";

function ImageVote() {
  const dispatch = useDispatch();

  const params = useParams();
  const postId = params.postId;
  console.log(postId);

  React.useEffect(() => {
    dispatch(voteActions.detailVoteDB(postId));
    showSelection();
  }, []);

  const [vote, setVote] = React.useState("");
  const [leftSelected, setLeftSelected] = React.useState(false);
  const [rightSelected, setRightSelected] = React.useState(false);
  const [showResult, setShowResult] = React.useState(false);

  const voteInfo = useSelector((state) => state.vote.voteInfo);
  console.log(voteInfo.vote[0].selected);

  const showSelection = () => {
    if (voteInfo.vote[0].selected === true) {
      setLeftSelected(true);
    } else {
      setRightSelected(true);
    }
  };

  const selectLeft = () => {
    setVote(1);
    setLeftSelected(true);
    setRightSelected(false);
  };

  const selectRight = () => {
    setVote(2);
    setLeftSelected(false);
    setRightSelected(true);
  };

  const submitVote = () => {
    dispatch(voteActions.putVoteDB(postId, vote));
    setShowResult(true);
  };

  const delVote = () => {
    dispatch(voteActions.delVoteDB(postId));
  };

  return (
    <React.Fragment>
      {!showResult ? (
        <VoteWrapper>
          <CheckBox>
            <Button
              bg={leftSelected ? "#EEE7F5" : "transparent"}
              border={leftSelected ? "1px solid #7A37BE" : "1px solid #61586A;"}
              padding="30px"
              margin="10px 0px"
              cursor="pointer"
              shadow="0px 0px 20px rgba(172, 151, 197, 0.25)"
              _onClick={selectLeft}
            >
              <Text
                color={leftSelected ? "#7A37BE" : "#61586A"}
                margin="0px"
                weight="500"
                size="16px"
                cursor="pointer"
              >
                {voteInfo.vote[0].imageTitle}
              </Text>
              <img
                style={{ width: "300px", height: "300px", marginTop: "15px" }}
                src={voteInfo.vote[0].imageUrl}
                alt="선택지 1"
              />
            </Button>
            <Text weight="500" size="18px" margin="17px 24px">
              VS
            </Text>
            <Button
              bg={rightSelected ? "#EEE7F5" : "transparent"}
              border={
                rightSelected ? "1px solid #7A37BE" : "1px solid #61586A;"
              }
              padding="30px"
              margin="10px 0px"
              cursor="pointer"
              shadow="0px 0px 20px rgba(172, 151, 197, 0.25)"
              _onClick={selectRight}
            >
              <Text
                color={rightSelected ? "#7A37BE" : "#61586A"}
                margin="0px"
                weight="500"
                size="16px"
                cursor="pointer"
              >
                {voteInfo.vote[1].imageTitle}
              </Text>
              <img
                style={{ width: "300px", height: "300px", marginTop: "15px" }}
                src={voteInfo.vote[1].imageUrl}
                alt="선택지 2"
              />
            </Button>
          </CheckBox>
          <BottomBox>
            <Button
              width="160px"
              bg="#7A37BE"
              cursor="pointer"
              _onClick={submitVote}
            >
              <Text margin="0px" weight="500" size="16px" color="#fff">
                투표하기
              </Text>
            </Button>
          </BottomBox>
        </VoteWrapper>
      ) : (
        <VoteResult voteInfo={voteInfo} />
      )}
    </React.Fragment>
  );
}

//   {/* <div>
//   <img shape="rectangle" src={voteInfo.vote[0].imageUrl} alt="선택지 1" />
//   <Text margin="20px 0px">{voteInfo.vote[0].imageTitle}</Text>
//   <Text margin="20px 0px">
//     {voteInfo.vote[0].selectionList.length}명 선택!
//   </Text>
//   <div items="center" margin="auto">
//     <Text bold size="30px">
//       VS
//     </Text>
//   </div>
//   <div
//     id="select2"
//     cursor="pointer"
//     _onClick={selectRight}
//     borderLine={rightSelected ? "3px solid pink" : ""}
//   >
//     <img
//       shape="rectangle"
//       src={voteInfo.vote[1].imageUrl}
//       alt="선택지2"
//     />
//     <Text margin="20px 0px">{voteInfo.vote[1].imageTitle}</Text>
//     <Text margin="20px 0px">
//       {voteInfo.vote[1].selectionList.length}명 선택!
//     </Text>
//   </div>
//   <div margin="auto" width="10%">
//     <Button _onClick={submitVote}>투표완료</Button>
//     <Button _onClick={delVote}>투표삭제</Button>
//   </div>
// </div> */}

export default ImageVote;

const VoteWrapper = styled.div`
  width: 952px;
  height: 586px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: #ffffff;
  box-shadow: 0px 0px 20px rgba(172, 151, 197, 0.25);
  border-radius: 10px;
`;

const CheckBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 30px;
  width: 792px;
  height: 400px;
`;

const BottomBox = styled.div`
  width: 792px;
  height: 66px;
`;
