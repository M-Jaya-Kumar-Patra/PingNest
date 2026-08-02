import React from "react";

import { colors } from "./emailStyles.js";

const EmailFooter = ({ websiteUrl, supportEmail }) =>
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
              borderTop: `1px solid ${colors.border}`,
              color: colors.footer,
              fontSize: "12px",
              lineHeight: "20px",
              padding: "24px 32px 32px",
            },
          },
          React.Children.toArray([
            React.createElement(
              "p",
              {
                key: "website",
                style: {
                  margin: "0 0 8px",
                },
              },
              [
                "Website: ",
                React.createElement(
                  "a",
                  {
                    key: "link",
                    href: websiteUrl,
                    style: {
                      color: colors.orange,
                      textDecoration: "none",
                    },
                  },
                  websiteUrl,
                ),
              ],
            ),
            supportEmail &&
              React.createElement(
                "p",
                {
                  key: "support",
                  style: {
                    margin: "0 0 8px",
                  },
                },
                [
                  "Support: ",
                  React.createElement(
                    "a",
                    {
                      key: "mail",
                      href: `mailto:${supportEmail}`,
                      style: {
                        color: colors.orange,
                        textDecoration: "none",
                      },
                    },
                    supportEmail,
                  ),
                ],
              ),
            React.createElement(
              "p",
              {
                key: "copyright",
                style: {
                  margin: "0",
                },
              },
              `Copyright ${new Date().getFullYear()} PingNest. All rights reserved.`,
            ),
          ]),
        ),
      ),
    ),
  );

export default EmailFooter;
