import AWS from "aws-sdk";

const dynamoDb = new AWS.DynamoDB.DocumentClient();

export const main = async (event, context, callback) => {
  const data = JSON.parse(event.body.userId);
  const params = {
    TableName: process.env.tableName,
    IndexName: process.env.indexName,
    KeyConditionExpression: "userId = :userId",
    ExpressionAttributeValues: {
      ":userId": data.userId,
    },
  };
  const headers = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Credentials": true,
  };

  await dynamoDb
    .query(params)
    .promise()
    .then((data) => {
      const response = {
        statusCode: 200,
        headers: headers,
        body: JSON.stringify(data),
      };
      callback(null, response);
      return;
    })
    .catch((err) => {
      const response = {
        statusCode: 500,
        headers: headers,
        body: JSON.stringify({ err: err.message }),
      };
      callback(null, response);
      return;
    });
};
