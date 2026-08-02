import React from "react";

import { colors } from "./emailStyles.js";

const PrimaryButton = ({ href, children }) =>
  React.createElement(
    "table",
    {
      cellPadding: "0",
      cellSpacing: "0",
      role: "presentation",
      style: {
        margin: "24px 0",
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
            bgcolor: colors.orange,
            style: {
              backgroundColor: colors.orange,
              borderRadius: "12px",
            },
          },
          React.createElement(
            "a",
            {
              href,
              style: {
                backgroundColor: colors.orange,
                border: `1px solid ${colors.orangeDark}`,
                borderRadius: "12px",
                color: colors.white,
                display: "inline-block",
                fontSize: "14px",
                fontWeight: "700",
                lineHeight: "18px",
                padding: "14px 22px",
                textDecoration: "none",
              },
            },
            children,
          ),
        ),
      ),
    ),
  );

export default PrimaryButton;
