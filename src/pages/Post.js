import React from "react";
import styled from "styled-components";
import { TextB, Text } from "../elements";
import { useHistory } from "react-router-dom";
//시간알려주는패키지
import TimeCounting from "time-counting";

function Post(props) {
  const postId = props.item.postId;
  const history = useHistory();
  //시간을 알아보자!
  const option = {
    lang: "ko",
    calculate: {
      justNow: 60,
    },
  };
  const createdAt = TimeCounting(props.item.created_at, option);

  return (
    <React.Fragment>
      <PostWrapper
        onClick={() => {
          history.push(`/PostDetail/${postId}`);
        }}
      >
        <Title>
          <TextB body weight="500">
            {props.item.title}
          </TextB>
        </Title>
        <Date>
          <Text sub7>{createdAt}</Text>
        </Date>
      </PostWrapper>
    </React.Fragment>
  );
}
const PostWrapper = styled.div`
  color: #333333;
  display: flex;
  width: 100%;
  height: 45px;
  display: flex;
  vertical-align: middle;
  justify-content: space-between;
  align-items: center;
  font-size: 12px;
  border-bottom: 1px solid #cccccc;
`;
const Title = styled.div`
  padding-left: 40px;
`;
const Date = styled.div`
  padding-right: 40px;
`;

export default Post;
