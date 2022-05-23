import React from "react";
import styled from "styled-components";

import { ReactComponent as Logo } from "../assets/Frame.svg";
import { history } from "../redux/configureStore";

import logo from "../assets/main/logoS.png";

const isLogin = localStorage.getItem("isLogin");

const logout = () => {
  history.push("/");
  localStorage.removeItem("accessToken");
  localStorage.removeItem("memberId");
  localStorage.removeItem("nickname");
};

const Header = (props) => {
  return (
    <React.Fragment>
      <HeaderWrapper id="1">
        <HeaderContainer>
          <HeaderBox>
            <Logo
              onClick={() => {
                history.push("/main");
              }}
              style={{
                cursor: "pointer",
                width: "100px",
                height: "66.34px",
              }}
            />
            <div>
              <HeaderBtn>서비스 소개</HeaderBtn>
              <HeaderBtn
                onClick={() => {
                  history.push("/postList");
                }}
              >
                디어상담소
              </HeaderBtn>
              <HeaderBtn>마이페이지</HeaderBtn>
              {isLogin ? (
                <HeaderBtn onClick={logout}>로그아웃</HeaderBtn>
              ) : (
                <HeaderBtn onClick={history.push("/")}>로그인</HeaderBtn>
              )}
            </div>
          </HeaderBox>
        </HeaderContainer>
      </HeaderWrapper>
    </React.Fragment>
  );
};

export default Header;

const HeaderWrapper = styled.div`
  width: 100%;
  height: 120px;
  padding: 24px;
  box-sizing: border-box;
  background: rgba(196, 196, 196, 0);
  @media ${({ theme }) => theme.device.mobile} {
    display: none;
  }
`;

const HeaderContainer = styled.div`
  @media (max-width: 1920px) {
    padding: 0px 16px;
    box-sizing: border-box;
  }
`;

const HeaderBox = styled.div`
  width: 1032px;
  height: 100%;
  margin: auto;
  display: flex;
  justify-content: space-between;
`;

const HeaderBtn = styled.button`
  border: none;
  background-color: transparent;
  color: #61586a;
  cursor: pointer;
  line-height: 60px;
`;
