import {
  ScanCommand,
  PutItemCommand,
  UpdateItemCommand,
  DeleteItemCommand,
  ReturnValue,
} from "@aws-sdk/client-dynamodb";

import { v4 as uuid } from "uuid";

import dynamoDBClient from "../db/db";

import { UserData } from "../models/userModel";
import { Article } from "../models/articleModel";

const ARTICLES_TABLE = "Articles";

export const getArticlesFromDb = async () => {
  const params = { TableName: ARTICLES_TABLE };
  const command = new ScanCommand(params);
  try {
    const data = await dynamoDBClient.send(command);
    return data.Items?.map((data) => {
      return {
        id: data.articleId.S,
        title: data.title.S,
        content: data.content.S,
        authorId: data.userId.S,
        createdAt: data.createdAt.S,
        updatedAt: data.updatedAt.S,
      };
    });
  } catch (error) {
    throw error;
  }
};

export const createArticleInDb = async (
  articleData: Article,
  user: UserData
) => {
  const { title, content } = articleData;
  const articleId = uuid();
  const params = {
    TableName: ARTICLES_TABLE,
    Item: {
      articleId: { S: articleId },
      title: { S: title },
      content: { S: content },
      userId: { S: user.userId },
      createdAt: { S: new Date().toISOString() },
      updatedAt: { S: new Date().toISOString() },
    },
  };
  try {
    const command = new PutItemCommand(params);
    await dynamoDBClient.send(command);
    return {
      id: articleId,
      ...articleData,
      authorId: user.userId,
      createdAt: params.Item.createdAt.S,
      updatedAt: params.Item.updatedAt.S,
    };
  } catch (error) {
    throw error;
  }
};

export const updateArticleInDb = async (
  articleId: string,
  articleData: { title: string; content: string }
) => {
  const { title, content } = articleData;

  const params = {
    TableName: ARTICLES_TABLE,
    Key: { articleId: { S: articleId } },
    UpdateExpression:
      "SET title = :title, content = :content, updatedAt = :updatedAt",
    ExpressionAttributeValues: {
      ":title": { S: title },
      ":content": { S: content },
      ":updatedAt": { S: new Date().toISOString() },
    },
    ReturnValues: ReturnValue.ALL_NEW,
  };

  try {
    const command = new UpdateItemCommand(params);
    const data = await dynamoDBClient.send(command);

    return data.Attributes;
  } catch (error) {
    throw error;
  }
};

export const deleteArticleInDb = async (articleId: string) => {
  const params = {
    TableName: ARTICLES_TABLE,
    Key: { articleId: { S: articleId } },
  };

  try {
    const command = new DeleteItemCommand(params);
    await dynamoDBClient.send(command);
  } catch (error) {
    throw error;
  }
};
