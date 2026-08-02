import React from "react";

import EmailFooter from "../components/EmailFooter.js";
import EmailHeader from "../components/EmailHeader.js";
import { colors, fontFamily } from "../components/emailStyles.js";

const EmailLayout = ({
  title,
  preview,
  websiteUrl,
  supportEmail,
  children,
}) =>
  React.createElement(
    "html",
    null,
    React.createElement(
      "body",
      {
        style: {
          backgroundColor: colors.background,
          fontFamily,
          margin: "0",
          padding: "0",
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
            backgroundColor: colors.background,
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
                  padding: "32px 14px",
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
                    backgroundColor: colors.container,
                    border: `1px solid ${colors.border}`,
                    borderRadius: "20px",
                    maxWidth: "620px",
                    overflow: "hidden",
                  },
                },
                React.createElement(
                  "tbody",
                  null,
                  [
                    React.createElement(
                      "tr",
                      { key: "header" },
                      React.createElement(
                        "td",
                        null,
                        React.createElement(EmailHeader, {
                          title,
                          preview,
                        }),
                      ),
                    ),
                    React.createElement(
                      "tr",
                      { key: "divider" },
                      React.createElement("td", {
                        style: {
                          borderTop: `1px solid ${colors.border}`,
                          fontSize: "1px",
                          lineHeight: "1px",
                        },
                      }),
                    ),
                    React.createElement(
                      "tr",
                      { key: "content" },
                      React.createElement(
                        "td",
                        {
                          style: {
                            color: colors.body,
                            fontSize: "15px",
                            lineHeight: "24px",
                            padding: "30px 32px",
                          },
                        },
                        React.Children.toArray(children),
                      ),
                    ),
                    React.createElement(
                      "tr",
                      { key: "footer" },
                      React.createElement(
                        "td",
                        null,
                        React.createElement(EmailFooter, {
                          websiteUrl,
                          supportEmail,
                        }),
                      ),
                    ),
                  ],
                ),
              ),
            ),
          ),
        ),
      ),
    ),
  );

export default EmailLayout;
