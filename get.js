import AWS from "aws-sdk";

const dynamoDb = new AWS.DynamoDB.DocumentClient();

export const main = async (event, context, callback) => {
  const params = {
    TableName: process.env.tableName,
    Key: {
      orderId: event.pathParameters.id,
    },
  };
  const headers = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Credentials": true,
  };

  await dynamoDb
    .get(params)
    .promise()
    .then((data) => {
      const response = {
        statusCode: 200,
        header: headers,
        body: data,
      };
      callback(null, response);
      return;
    })
    .catch((err) => {
      const response = {
        statusCode: 500,
        header: headers,
        body: { err: err.message },
      };
      callback(null, response);
      return;
    });
};
