import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { v4 as uuid } from "uuid";
import { PutCommand } from "@aws-sdk/lib-dynamodb";

import dotenv from "dotenv";

import dynamoDBClient from "../db/db";

import { User } from "../models/userModel";

import AuthError from "../errors/authError";

import { QueryCommand } from "@aws-sdk/client-dynamodb";

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET || "";

//Register user using username, email and password.
export const registerUser = async (
  username: string,
  email: string,
  password: string
) => {
  const userId = uuid();
  const hashedPassword = await bcrypt.hash(password, 10);
  const user: User = { userId, username, email, password: hashedPassword };

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
    new QueryCommand({
      TableName: "Users",
      IndexName: "EmailIndex",
      KeyConditionExpression: "email = :email",
      ExpressionAttributeValues: {
        ":email": { S: email },
      },
      Limit: 1,
    })
  );

  const items = data.Items;

  if (!items || items.length === 0) {
    throw new AuthError("Invalid email or password", 401);
  }

  const user = items[0];

  const passwordMatch = await bcrypt.compare(password, user?.password.S ?? "");

  if (!user || !passwordMatch) {
    throw new AuthError("Invalid email or password", 401);
  }

  const token = jwt.sign(
    { userId: user.userId.S, email: user.email.S, username: user.username.S },
    JWT_SECRET,
    {
      expiresIn: "1h",
    }
  );

  return { token };
};
