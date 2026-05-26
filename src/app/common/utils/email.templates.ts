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

type ForgotPasswordTemplateProps = {
  username: string;

  resetUrl: string;
};

export const forgotPasswordTemplate = ({
  username,
  resetUrl,
}: ForgotPasswordTemplateProps): string => {
  return `
    <!DOCTYPE html>
    <html>

      <head>
        <meta charset="UTF-8" />

        <title>
          Reset Your Password
        </title>
      </head>

      <body
        style="
          margin: 0;
          padding: 0;
          background-color: #f4f4f4;
          font-family: Arial, sans-serif;
        "
      >

        <div
          style="
            max-width: 600px;
            margin: 40px auto;
            background: #ffffff;
            padding: 40px;
            border-radius: 10px;
          "
        >

          <h1
            style="
              color: #111827;
              margin-bottom: 20px;
            "
          >
            Reset Your Password
          </h1>

          <p
            style="
              color: #4b5563;
              font-size: 16px;
              line-height: 1.6;
            "
          >
            Hi ${username},
          </p>

          <p
            style="
              color: #4b5563;
              font-size: 16px;
              line-height: 1.6;
            "
          >
            We received a request to reset your
            password. Click the button below
            to create a new password.
          </p>

          <div
            style="
              margin: 30px 0;
            "
          >

            <a
              href="${resetUrl}"

              style="
                background-color: #111827;
                color: #ffffff;
                text-decoration: none;
                padding: 14px 24px;
                border-radius: 6px;
                display: inline-block;
                font-size: 16px;
                font-weight: bold;
              "
            >
              Reset Password
            </a>

          </div>

          <p
            style="
              color: #6b7280;
              font-size: 14px;
              line-height: 1.6;
            "
          >
            This link will expire in
            10 minutes.
          </p>

          <p
            style="
              color: #6b7280;
              font-size: 14px;
              line-height: 1.6;
            "
          >
            If you did not request a password
            reset, you can safely ignore this
            email.
          </p>

          <hr
            style="
              margin: 30px 0;
              border: none;
              border-top: 1px solid #e5e7eb;
            "
          />

          <p
            style="
              color: #9ca3af;
              font-size: 12px;
              text-align: center;
            "
          >
            This is an automated message.
            Please do not reply.
          </p>

        </div>

      </body>

    </html>
  `;
};
