import { db } from "../db.js";
import jwt from "jsonwebtoken";
export const getPosts = (req, res) => {
  const q = req.query.cat
    ? "SELECT * FROM posts WHERE cat=?"
    : "SELECT * FROM posts";
  db.query(q, [req.query.cat], (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json(data);
  });
};
export const getPost = (req, res) => {
  const q =
    "SELECT p.id, `username`, `title`, `desc`, p.img, u.img AS userImg , `cat`, `date` FROM users AS u JOIN posts AS p ON u.id = p.uid WHERE p.id = ?";
  db.query(q, [req.params.id], (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json(data[0]);
  });
};
export const addPost = (req, res) => {
  console.log(111);
  const token = req.cookies.access_token;
  if (!token) return res.status(401).json("Not authenticated!");

  jwt.verify(token, "jwtkey", (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid!");
    console.log(222);
    const q =
      "INSERT INTO posts(`title`, `desc`, `img`, `cat`, `date`,`uid`) VALUES (?)";
    console.log(req.body);
    const values = [
      req.body.title,
      req.body.desc,
      req.body.img,
      req.body.cat,
      req.body.date,
      userInfo.id,
    ];

    db.query(q, [values], (err, data) => {
      if (err) return res.status(500).json(err);
      return res.json("Post has been created.");
    });
  });
};
export const deletePost = (req, res) => {
  const token = req.cookies.access_token;
  if (!token) return res.status(401).json("没有令牌!");

  //验证令牌
  jwt.verify(token, "jwtkey", (err, userInfo) => {
    if (err) return res.status(403).json("令牌无效!");
    const postId = req.params.id;
    const q = "DELETE FROM posts WHERE `id` = ? AND `uid` = ?";
    db.query(q, [postId, userInfo.id], (err, data) => {
      if (err) return res.status(403).json("你只能删除自己的帖子!");

      return res.json("删除成功!");
    });
  });
};
export const updatePost = (req, res) => {
  const token = req.cookies.access_token;
  if (!token) return res.status(401).json("没有令牌!");

  //验证令牌
  jwt.verify(token, "jwtkey", (err, userInfo) => {
    if (err) return res.status(403).json("令牌无效!");

    const postId = req.params.id;

    const q =
      "UPDATE  posts SET `title`=?,`desc`=?,`img`=?,`cat`=?, WHERE `id` = ? AND `uid` = ?";

    const values = [
      req.body.title,
      req.body.desc,
      req.body.img,
      req.body.cat,
      postId,

      userInfo.id,
    ];
    db.query(q, values, (err, data) => {
      if (err) return res.status(500).json(err);
      return res.status(200).json("跟新成功！");
    });
  });
};
