import { Request, Response } from "express";
import { registerUser, loginUser } from "../services/authService";

//Register Controller
export const register = async (req: Request, res: Response) => {
  try {
    const { username, email, password } = req.body;
    const result = await registerUser(username, email, password);

    res.status(201).json(result);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

//Login Controller
export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const result = await loginUser(email, password);

    res.cookie("token", result.token, {
      httpOnly: true,
      sameSite: "strict",
      secure: true,
      expires: new Date(Date.now() + 3600000),
    });

    res.json({ message: "User logged-in successfully" });
  } catch (error: any) {
    res.status(401).json({ error: error.message });
  }
};

//Logout Controller
export const logout = (req: Request, res: Response) => {
  res.clearCookie("token", {
    httpOnly: true,
    sameSite: "strict",
  });

  res.json({ message: "User logged-out successfully" });
};
