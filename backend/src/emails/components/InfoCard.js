import React from "react";

import { colors } from "./emailStyles.js";

const InfoCard = ({ title, children }) =>
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
        margin: "20px 0",
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
            style: {
              padding: "18px",
            },
          },
          React.Children.toArray([
            title &&
              React.createElement(
                "p",
                {
                  key: "title",
                  style: {
                    color: colors.orange,
                    fontSize: "12px",
                    fontWeight: "700",
                    letterSpacing: "1px",
                    lineHeight: "18px",
                    margin: "0 0 10px",
                    textTransform: "uppercase",
                  },
                },
                title,
              ),
            React.createElement(
              "div",
              {
                key: "content",
                style: {
                  color: colors.body,
                  fontSize: "15px",
                  lineHeight: "24px",
                },
              },
              children,
            ),
          ]),
        ),
      ),
    ),
  );

export default InfoCard;
