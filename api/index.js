import express from "express";
import postRoters from "./routes/posts.js";
import authRoters from "./routes/auth.js";
import userRoters from "./routes/users.js";
import cors from "cors";
import cookieParser from "cookie-parser";

import multer from "multer";

const app = express();

app.use(
  cors({
    origin: "http://8.130.74.254",
    credentials: true, // 允许发送凭证信息
    optionsSuccessStatus: 200,
  })
);
app.use(express.json());
app.use(cookieParser());

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "../client/public/upload");
  },
  filename: function (req, file, cb) {
    console.log(file.originalname);
    cb(null, Date.now() + file.originalname);
  },
});

const upload = multer({ storage: storage });
app.post("/api/upload", upload.single("file"), function (req, res) {
  const file = req.file;
  res.status(200).json(file.filename);
});

app.use((req, res, next) => {
  console.log(`Request Method: ${req.method}, Request URL: ${req.url}`);
  next();
});
app.use("/api/auth", authRoters);
app.use("/api/users", userRoters);
app.use("/api/posts", postRoters);

app.listen(8800, () => {
  console.log("连接成功！");
});
