import React from "react";
import styled from "styled-components";
import { Text, TextB } from "../elements";
//시간알려주는패키지
import TimeCounting from "time-counting";

import { history } from "../redux/configureStore";

const MessageList = (props) => {
  // console.log(props.item);
  const messageId = props?.item.messageId;
  const createdAt = props?.item.createdAt;
  const reqMemberNickname = props?.item.reqMemberNickname;
  const message = props?.item.message;
  //시간을 알아보자!
  const option = {
    lang: "ko",
    calculate: {
      justNow: 60,
    },
  };
  const createdTime = TimeCounting(createdAt, option);
  return (
    <MessageWrapper>
      <MessageContainer>
        <TextB sub color="#2E2A32" textAlign="left">
          {message}
        </TextB>
      </MessageContainer>
      <MessageBox>
        <Text sub4 color="#666">
          {reqMemberNickname} / {createdTime}
        </Text>
        <Btn
          onClick={() => {
            history.push(`/receivedMsg/${messageId}`);
          }}
        >
          쪽지보기
        </Btn>
      </MessageBox>
    </MessageWrapper>
  );
};

const MessageWrapper = styled.div`
  width: 328px;
  height: 324px;
  margin: auto;
  background-color: #fafafa;
  box-shadow: 0px 0px 20px rgba(172, 151, 197, 0.25);
`;
const MessageContainer = styled.div`
  height: 250px;
  box-sizing: border-box;
  padding: 20px 34px;
`;
const MessageBox = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 20px 34px;
`;
const Btn = styled.button`
  background-color: transparent;
  border: none;
  text-decoration: underline;
  color: #948a9e;
  cursor: pointer;
`;
export default MessageList;
