import React from "react";

import { colors } from "./emailStyles.js";

const EmailHeader = ({ title, preview }) =>
  React.createElement(
    "table",
    {
      width: "100%",
      cellPadding: "0",
      cellSpacing: "0",
      role: "presentation",
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
              padding: "32px 32px 24px",
            },
          },
          [
            React.createElement(
              "table",
              {
                key: "brand",
                cellPadding: "0",
                cellSpacing: "0",
                role: "presentation",
                style: {
                  marginBottom: "26px",
                },
              },
              React.createElement(
                "tbody",
                null,
                React.createElement(
                  "tr",
                  null,
                  [
                    React.createElement(
                      "td",
                      {
                        key: "mark",
                        align: "center",
                        valign: "middle",
                        width: "44",
                        height: "44",
                        style: {
                          backgroundColor: "rgba(249, 115, 22, 0.14)",
                          border: "1px solid rgba(249, 115, 22, 0.36)",
                          borderRadius: "12px",
                          color: colors.orange,
                          fontSize: "22px",
                          fontWeight: "700",
                          lineHeight: "44px",
                        },
                      },
                      "P",
                    ),
                    React.createElement(
                      "td",
                      {
                        key: "copy",
                        style: {
                          paddingLeft: "12px",
                        },
                      },
                      [
                        React.createElement(
                          "p",
                          {
                            key: "name",
                            style: {
                              color: colors.white,
                              fontSize: "18px",
                              fontWeight: "700",
                              lineHeight: "22px",
                              margin: "0",
                            },
                          },
                          "PingNest",
                        ),
                        React.createElement(
                          "p",
                          {
                            key: "tagline",
                            style: {
                              color: colors.muted,
                              fontSize: "12px",
                              lineHeight: "18px",
                              margin: "2px 0 0",
                            },
                          },
                          "Developer Observability",
                        ),
                      ],
                    ),
                  ],
                ),
              ),
            ),
            React.createElement(
              "h1",
              {
                key: "title",
                style: {
                  color: colors.white,
                  fontSize: "28px",
                  fontWeight: "700",
                  lineHeight: "36px",
                  margin: "0",
                },
              },
              title,
            ),
            preview &&
              React.createElement(
                "p",
                {
                  key: "preview",
                  style: {
                    color: colors.body,
                    fontSize: "15px",
                    lineHeight: "24px",
                    margin: "10px 0 0",
                  },
                },
                preview,
              ),
          ],
        ),
      ),
    ),
  );

export default EmailHeader;
