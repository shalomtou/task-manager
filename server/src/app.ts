import express, { Application, Request, Response, NextFunction } from "express";
import bodyParser from "body-parser";
import cors from "cors";
import taskRoutes from "./routes/taskRoutes";
import errorHandler from "./middleware/errorHandler";
import asciiArt from "./utils/asci-art";

const { PORT } = process.env;
const app: Application = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors());

app.use((req: Request, res: Response, next: NextFunction) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

app.use("/api", taskRoutes);

app.use(errorHandler);

app.listen(PORT, () => {
  asciiArt(`Server is running on http://localhost:${PORT}`);
});

export default app;
