type VerificationTemplateProps = {
  username: string;
  verificationUrl: string;
};

export const verificationTemplate = ({
  username,
  verificationUrl,
}: VerificationTemplateProps) => {
  return `
    <!DOCTYPE html>
    <html>

      <head>
        <meta charset="UTF-8" />

        <title>
          Verify Your Email
        </title>
      </head>

      <body
        style="
          font-family: Arial;
          background: #f4f4f4;
          padding: 40px;
        "
      >

        <div
          style="
            max-width: 600px;
            margin: auto;
            background: white;
            padding: 30px;
            border-radius: 10px;
          "
        >

          <h1>
            Welcome, ${username}
          </h1>

          <p>
            Please verify your email
            address by clicking the
            button below.
          </p>

          <a
            href="${verificationUrl}"

            style="
              display: inline-block;
              padding: 12px 20px;
              background: black;
              color: white;
              text-decoration: none;
              border-radius: 5px;
              margin-top: 20px;
            "
          >
            Verify Email
          </a>

          <p
            style="
              margin-top: 30px;
              color: gray;
              font-size: 14px;
            "
          >
            This link expires in
            10 minutes.
          </p>

        </div>

      </body>

    </html>
  `;
};
