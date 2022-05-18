import React from "react";
import styled from "styled-components";

import { Text, TextB, Button } from "../../elements";
import { history } from "../../redux/configureStore";

function NoMatch() {
  return (
    <React.Fragment>
      <CloseContainer>
        <LineBox>
          <TextB subTitle>현재 매칭 가능한 친구를 찾을 수 없어요.</TextB>
        </LineBox>
        <BottomBox>
          <Button
            primaryDefault
            size="regular"
            _onClick={() => {
              history.push("/main");
            }}
          >
            <Text body4 color="#fff" cursor="pointer">
              홈으로 돌아가기
            </Text>
          </Button>
        </BottomBox>
      </CloseContainer>
    </React.Fragment>
  );
}

export default NoMatch;

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