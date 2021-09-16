import express from "express";
const router = express.Router();

import {  signin, signup,  } from "../controllers/user.js";

router.post("/signin", signin);
router.post("/signup", signup);
// router.post("/resetpassword", resetPassword);
// router.post("/updateprofile",updateProfile);
// router.post("/deleteUser", deleteUser);

export default router;