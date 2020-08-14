import * as uuid from "uuid";
import AWS from "aws-sdk";

const dynamoDb = new AWS.DynamoDB.DocumentClient();

export const main = async (event, context, callback) => {
  const data = JSON.parse(event.body);
  const params = {
    TableName: process.env.tableName,
    Item: {
      orderId: uuid.v1(),
      userId: data.userId,
      orderedAt: Date.now(),
      userId: data.userId,
      email: data.email,
      products: data.products,
      totalPrice: data.totalPrice,
      address: data.address
    },
  };
  const headers = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Credentials": true
  };
  await dynamoDb
    .put(params)
    .promise()
    .then(() => {
      const response = {
        statusCode: 200,
        headers: headers,
        body: JSON.stringify({
          orderId: params.Item.orderId
        }),
      };
      console.log(`New Order: ${params.Item.orderId}`);
      callback(null, response);
      return;
    })
    .catch((err) => {
      const response = {
        statusCode: 500,
        headers: headers,
        body: JSON.stringify({
          err: err.message
        }),
      };
      console.error(err.message);
      callback(null, response);
      return;
    });
};
