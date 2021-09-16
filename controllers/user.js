import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import User from "../models/user.js";

export const signin = async (req, res) => {
  const { email, password } = req.body;
  console.log(`${email} ${password} is logging in`);
  try {
    const result = await User.findOne({ email });
    console.log(result);
    console.log({ message: "login sucessful." });
    if (!result) {
      return res.send({ message: "User does not exist." });
    }

    const isPasswordCorrect = await bcrypt.compare(password, result.password);

    if (!isPasswordCorrect) {
      return res.send({ message: "invalid credentials" });
    }

    const token = jwt.sign({ email: result.email, id: result._id }, "gain", {
      expiresIn: "1h",
    });
    return res.send({ result, token });
  } catch (error) {
    res.send({ message: "Something went wrong " + error });
  }
};

export const signup = async (req, res) => {
  const {
    firstName,
    lastName,
    telegramusername,
    email,
    password,
    confirmPassword,
  } = req.body;
  console.log(req.body);
  try {
    if (email !== null) {
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.send({ message: "User already exist." });
      }

      if (password !== confirmPassword) {
        return res.send({ message: "passwords dont match" });
      }
      const hashedPassword = await bcrypt.hash(password, 12);

      const result = await User.create({
        email,
        telegramusername,
        password: hashedPassword,
        name: `${firstName} ${lastName}`,
      });

      // const tgNames = await Usernames.create({
      //   telegramusername,
      // });

      const token = jwt.sign({ email: result.email, id: result._id }, "gain", {
        expiresIn: "1h",
      });
      console.log({ result, token });
      return res.send({ result, token });
    }
  } catch (error) {
    return res.send({ message: "Something went wrong " + error });
  }
};

// export const resetPassword = async (req, res) => {
//   const { email, password, newpassword, newconfirmpassword } = req.body;
//   console.log(`${email} ${password} is logging in`);
//   try {
//     const result = await User.findOne({ email });
//     console.log(result);
//     if (!result) {
//       res.status(404).json({ message: "User does not exist." });
//     }
//     const isPasswordCorrect = await bcrypt.compare(password, result.password);
//     if (!isPasswordCorrect) {
//       res.status(404).json({ message: "invalid credentials" });
//     }

//     if (newpassword !== newconfirmpassword) {
//       res.status(404).json({ message: "passwords dont match" });
//     }
//     const hashedPassword = await bcrypt.hash(newpassword, 12);

//     await User.updateOne({ email }, { password: hashedPassword });
//     res.status(200).json({ result });
//   } catch (error) {
//     res.status(404).json({ message: "Something went wrong " + error });
//   }
// };

// export const updateProfile = async (req, res) => {
//   const { name, email, telegramusername } = req.body;
//   try {
//     const result = await user.findOne({ email });
//     console.log(result);
//     if (!result) {
//       res.status(404).json({ message: "User Does Not Exist" });
//     }

//     await User.updateOne(
//       { email },
//       { name: name, telegramusername: telegramusername }
//     );

//     res.status(200).json({ result });
//   } catch (error) {
//     res.status(404).json({ message: "Something went wrong " + error });
//   }
// };

// export const deleteUser = async (req, res) => {
//   const { email } = req.body;
//   console.log(req.boy);
//   try {
//     const userdelete = await User.findOne({ email });
//     console.log(userdelete);
//     console.log({ message: "user found." });
//     if (!userdelete) {
//       return res.send({ message: "User does not exist." });
//     }
//     await User.deleteOne({ email });
//     res.status(200).json(userdelete);
//   } catch (error) {
//     res.send({ message: "Something went wrong " + error });
//   }
// };
