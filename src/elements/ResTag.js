import React from "react";
import { ReactComponent as Sympathy } from "../assets/tag/Primary.svg";
import { ReactComponent as Solver } from "../assets/tag/Property 1=Primary.svg";
import { ReactComponent as Enjoy } from "../assets/tag/Property 1=Primary (1).svg";
import { ReactComponent as Fact } from "../assets/tag/Property 1=Primary (2).svg";
import { ReactComponent as Sensitivity } from "../assets/tag/Property 1=Primary (3).svg";
import { ReactComponent as Sympathy1 } from "../assets/tag/Sub.svg";
import { ReactComponent as Solver1 } from "../assets/tag/Property 1=Sub.svg";
import { ReactComponent as Enjoy1 } from "../assets/tag/Property 1=Sub (1).svg";
import { ReactComponent as Fact1 } from "../assets/tag/Property 1=Sub (2).svg";
import { ReactComponent as Sensitivity1 } from "../assets/tag/Property 1=Sub (3).svg";

const ResTagPrimary = (props) => {
  console.log(props);
  return (
    <React.Fragment>
      {props?.resTag1 === "공감을 잘해줬어요" ? <Sympathy /> : null}

      {props?.resTag1 === "명쾌한 해결책을 알려줘요" ? <Solver /> : null}

      {props?.resTag1 === "대화가 즐거웠어요" ? <Enjoy /> : null}

      {props?.resTag1 === "시원하게 팩트폭격을 해줘요" ? <Fact /> : null}

      {props?.resTag1 === "감수성이 풍부했어요" ? <Sensitivity /> : null}

      {props?.resTag2 === "공감을 잘해줘요" ? <Sympathy1 /> : null}

      {props?.resTag2 === "명쾌한 해결사!" ? <Solver1 /> : null}

      {props?.resTag2 === "대화가 즐거워요" ? <Enjoy1 /> : null}

      {props?.resTag2 === "아얏! 팩트폭격기!" ? <Fact1 /> : null}

      {props?.resTag2 === "감수성이 풍부해요" ? <Sensitivity1 /> : null}
    </React.Fragment>
  );
};

export default ResTagPrimary;
