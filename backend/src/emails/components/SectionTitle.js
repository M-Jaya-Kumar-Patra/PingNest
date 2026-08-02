import React from "react";

import { colors } from "./emailStyles.js";

const SectionTitle = ({ children }) =>
  React.createElement(
    "h2",
    {
      style: {
        color: colors.white,
        fontSize: "18px",
        fontWeight: "700",
        lineHeight: "26px",
        margin: "0 0 12px",
      },
    },
    children,
  );

export default SectionTitle;
