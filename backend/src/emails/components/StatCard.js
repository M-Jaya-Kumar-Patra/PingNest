import React from "react";

import { colors } from "./emailStyles.js";

const StatCard = ({ label, value }) =>
  React.createElement(
    "td",
    {
      width: "50%",
      valign: "top",
      style: {
        padding: "6px",
      },
    },
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
          borderRadius: "12px",
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
                padding: "16px",
              },
            },
            [
              React.createElement(
                "p",
                {
                  key: "label",
                  style: {
                    color: colors.muted,
                    fontSize: "12px",
                    lineHeight: "18px",
                    margin: "0 0 6px",
                  },
                },
                label,
              ),
              React.createElement(
                "p",
                {
                  key: "value",
                  style: {
                    color: colors.white,
                    fontSize: "22px",
                    fontWeight: "700",
                    lineHeight: "28px",
                    margin: "0",
                  },
                },
                value,
              ),
            ],
          ),
        ),
      ),
    ),
  );

export default StatCard;
