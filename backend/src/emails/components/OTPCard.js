import React from "react";

import { colors } from "./emailStyles.js";

const OTPCard = ({ otp }) =>
  React.createElement(
    "table",
    {
      width: "100%",
      cellPadding: "0",
      cellSpacing: "0",
      role: "presentation",
      style: {
        backgroundColor: colors.panel,
        border: `1px solid ${colors.border}`,
        borderRadius: "14px",
        margin: "22px 0",
      },
    },
    React.createElement(
      "tbody",
      null,
      React.createElement(
        "tr",
        null,
        React.createElement(
          "td",
          {
            align: "center",
            style: {
              padding: "26px 18px",
            },
          },
          React.createElement(
            "div",
            {
              style: {
                color: colors.white,
                fontSize: "36px",
                fontWeight: "700",
                letterSpacing: "8px",
                lineHeight: "44px",
              },
            },
            otp,
          ),
        ),
      ),
    ),
  );

export default OTPCard;
