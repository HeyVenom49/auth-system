import "dotenv/config";

import app from "./app.ts";

const port: string | undefined = process.env.PORT ?? "7000";

const startServer = async (): Promise<void> => {
  app.listen(port, (): void => {
    console.log(
      `Server is running on port ${port} in ${process.env.ENVIRONMENT} mode`,
    );
  });
};

startServer().catch((err) => {
  console.log(`Failed to start the server ${err}`);
  process.exit(1);
});
