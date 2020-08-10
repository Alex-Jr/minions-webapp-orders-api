import * as uuid from "uuid";
import AWS from "aws-sdk";

const dynamoDb = new AWS.DynamoDB.DocumentClient();

export const main = async (event, context, callback) => {
  const params = {
    TableName: process.env.tableName,
    Item: {
      orderId: uuid.v1(),
      userId: event.requestContext.identity.cognitoIdentityId,
      orderedAt: Date.now(),
      products: event.body.products,
      totalPrice: event.body.totalPrice,
    },
  };
  const headers = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Credentials": true,
  };

  await dynamoDb
    .put(params)
    .promise()
    .then(() => {
      const response = {
        statusCode: 200,
        header: headers,
        body: { orderId: params.Item.orderId },
      };
      callback(null, response);
      return;
    })
    .catch((err) => {
      const response = {
        statusCode: 500,
        header: headers,
        body: {err: err.message }
      };
      callback(null, response);
      return;
    });
};
