import * as uuid from "uuid";
import AWS from "aws-sdk";

const dynamoDb = new AWS.DynamoDB.DocumentClient();

export const main = async (event, context, callback) => {
  const params = {
    TableName: process.env.tableName,
    Item: {
      orderId: uuid.v1(),
      userId: event.body.userId,
      orderedAt: Date.now(),
      products: event.body.products,
      totalPrice: event.body.totalPrice,
      address: event.body.address
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
        headers: headers,
        body: JSON.stringify({ orderId: params.Item.orderId }),
      };
      callback(null, response);
      return;
    })
    .catch((err) => {
      const response = {
        statusCode: 500,
        headers: headers,
        body: JSON.stringify({err: err.message })
      };
      callback(null, response);
      return;
    });
};
