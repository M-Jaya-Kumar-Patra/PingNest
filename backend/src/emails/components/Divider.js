import React from "react";

import { colors } from "./emailStyles.js";

const Divider = () =>
  React.createElement("div", {
    style: {
      borderTop: `1px solid ${colors.border}`,
      fontSize: "1px",
      lineHeight: "1px",
      margin: "24px 0",
    },
  });

export default Divider;
