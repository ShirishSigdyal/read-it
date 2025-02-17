import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { v4 as uuid } from "uuid";
import { PutCommand, GetCommand } from "@aws-sdk/lib-dynamodb";

import dynamoDBClient from "../db/db";

import { User } from "../models/userModel";

import AuthError from "../errors/authError";

import dotenv from "dotenv";

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET || "";

//Register user using username, email and password.
export const registerUser = async (
  username: string,
  email: string,
  password: string
) => {
  const hashedPassword = await bcrypt.hash(password, 10);
  const user: User = { username, email, password: hashedPassword };

  await dynamoDBClient.send(
    new PutCommand({
      TableName: "Users",
      Item: user,
    })
  );

  return { message: "User registered successfully!" };
};

//Login user using email and password
export const loginUser = async (email: string, password: string) => {
  const data = await dynamoDBClient.send(
    new GetCommand({
      TableName: "Users",
      Key: { email },
    })
  );

  const user = data.Item as User;
  const passwordMatch = await bcrypt.compare(password, user.password);
  if (!user || !passwordMatch) {
    throw new AuthError("Invalid email or password", 401);
  }

  const token = jwt.sign({ email: user.email }, JWT_SECRET, {
    expiresIn: "1h",
  });

  return { token };
};
