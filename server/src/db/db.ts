import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { region, endpoint, accessKeyId, secretAccessKey } from "../config";

const dynamoDBClient = new DynamoDBClient({
  region,
  endpoint,
  credentials: {
    accessKeyId,
    secretAccessKey,
  },
});

export default dynamoDBClient;
