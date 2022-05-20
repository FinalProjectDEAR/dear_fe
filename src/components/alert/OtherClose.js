import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { history } from "../../redux/configureStore";

import { actionCreators } from "../../redux/modules/user";

import styled from "styled-components";
import { Text, TextB, Button } from "../../elements";

import ResReview from "../../pages/ResReview";
import ReqReview from "../../pages/ReqReview";

function OtherClose(props) {
  const { informClose, leaveSession } = props;
  const [Review, setReview] = React.useState(false);
  const [view, setView] = React.useState(true);

  const role = useSelector((state) => state.chat.roomAuthInfo.role);
  console.log("종료시 역할", role);
  const chatInfo = useSelector((state) => state.chat.chatInfo);

  return (
    <React.Fragment>
      {view ? (
        <CloseContainer>
          <LineBox>
            <TextB subTitle> 상대방이 상담을 종료하였습니다.</TextB>
          </LineBox>
          <BottomBox>
            <Button
              primaryDefault
              size="narrow"
              margin="0px 8px"
              _onClick={() => {
                setView(false);
                setReview(true);
                leaveSession();
              }}
            >
              <Text margin="0px" color="#fff" body4 cursor="pointer">
                확인
              </Text>
            </Button>
          </BottomBox>
        </CloseContainer>
      ) : null}

      {Review && role === "request" ? (
        <ReqReview
          resNickname={chatInfo.resNickname}
          informClose={informClose}
        />
      ) : null}
      {Review && role === "response" ? (
        <ResReview
          reqNickname={chatInfo.reqNickname}
          informClose={informClose}
        />
      ) : null}
    </React.Fragment>
  );
}

export default OtherClose;

const CloseContainer = styled.div`
  width: 400px;
  height: 200px;
  padding: 35px 0px;
  box-sizing: border-box;
  background: #ffffff;
  border-radius: 20px;
`;

const LineBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const BottomBox = styled.div`
  height: 36px;
  margin: 15px auto;
  padding: 0px 50px;
  display: flex;
  justify-content: center;
  align-items: center;
`;