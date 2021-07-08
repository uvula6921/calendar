import React from "react";
import styled, { css } from "styled-components";

// 스타일을 이렇게 파일 하나에 몰아두면 편히 관리할 수 있어요! :)

// 겉 껍데기 담당
/**
 * props
 *  - flex_direction : string ㅣ row = 가로로 쌓기, column = 세로로 쌓기 (만약 값 없다면?->가로가 기본이 됩니다.)
 *  - border : string | border 속성 넣기(ex: 1px solid #dddddd)
 *  - bg: string | #aaaaaa = # + 헥사코드 (ex: #ffffff)
 *  - width: string | 1em, 1px, 1% 등 넓이 값 (기본 값: 100%;)
 *  - height: string | 1em, 1px, 1% 등 높이 값 (기본 값: 100%;)
 *  - is_root : boolean | true = 최상위 div, false = 최상위 아님
 *  - margin : (default = false) string | margin 값
 */
const Grid = styled.div`
  box-sizing: border-box;
  display: flex;
  flex-direction: ${(props) =>
    props.flex_direction === "column" ? "column" : "row"};
  ${(props) => (props.border ? `border: ${props.border};` : "")}
  ${(props) => (props.bg ? `background-color: ${props.bg};` : "")}
  width: ${(props) => (props.width ? props.width : "100%")};
  min-width: 50px;
  height: ${(props) => (props.height ? props.height : "100%")};
  align-items: center;
  justify-content: ${(props) =>
    props.justify_contents ? props.justify_contents : "flex-start"};
  ${(props) => (props.margin ? `margin: ${props.margin};` : "")}
  ${(props) => (props.is_root ? `width: 100vw; height: 100vh;` : "")}
  ${(props) => (props.font_size ? `font-size: ${props.font_size}em` : "")}
`;

// 버튼
/**
 * props
 *  - flex_direction : string ㅣ row = 가로로 쌓기, column = 세로로 쌓기 (만약 값 없다면?->가로가 기본이 됩니다.)
 *  - bg : boolean | true = 배경색 있는 버전, false = 배경색 없는 버전
 */
const Button = styled.button`
  padding: 8px 16px;
  border: none;
  ${(props) => props.bg && "background-color: #453214; color: #fff;"}
  ${(props) => props.is_float && "position: fixed;"}
  bottom: ${(props) => props.bottom || "50px"};
  right: ${(props) => props.right || "50px"};
  margin: ${(props) => props.margin || "0px"};
`;

// Input
/**
 * props
 *  - type : string | text
 */
const Input = styled.input`
  ${(props) => props.width && `width: ${props.width};`}
`;

// text 담당
/**
 * props
 *  - type : string | title = 제목글(큰 글씨 + 볼드), contents = 내용글(중간 글씨), label = 라벨(작은 글씨)
 *  - bold : boolean | true면 볼드 줌, false면 볼드 안줌
 */
const Text = (props) => {
  if (props.type === "title") {
    return <H1 {...props}>{props.children}</H1>;
  }

  if (props.type === "contents") {
    return <P {...props}>{props.children}</P>;
  }

  if (props.type === "label") {
    return <Span {...props}>{props.children}</Span>;
  }

  return <React.Fragment>{props.children}</React.Fragment>;
};

const H1 = styled.h1`
  margin: 0px;
  font-size: 1.5em;
  text-align: center;
  ${(props) =>
    props.bold
      ? css`
          font-weight: bold;
        `
      : ""}
`;

const P = styled.p`
  margin: 0px;
  font-size: 1em;
`;

const Span = styled.span`
  margin: ${(props) => props.margin || "0px"};
  // 이 표현이 아주 깔끔하고 좋은것 같다!
  font-size: ${(props) => props.font_size || "0.4em"};
  color: #101820;
`;

export { Grid, Button, Text, Input };
