import express from "express";
import { checkAuth } from "../middlewares/checkAuth.js";

const router = express.Router();

router.get("/", checkAuth, (req, res) => {
  console.log(req.user);
  return res.json("its private route");
});
export default router;
