const { DynamoDBClient } = require("@aws-sdk/client-dynamodb");
const { PutCommand, DynamoDBDocumentClient } = require("@aws-sdk/lib-dynamodb");
const client = new DynamoDBClient({});
const docClient = DynamoDBDocumentClient.from(client);
const { v4: uuidv4 } = require("uuid");

exports.handler = async function (event) {
	try {
		console.log("Incoming request", JSON.stringify(event));
		const customerData = JSON.parse(event.body);
		const input = {
			TableName: process.env.CUSTOMERS_TABLE_NAME,
			Item: {
				id: uuidv4(),
				lastName: customerData.lastName,
				firstName: customerData.firstName,
				email: customerData.email,
			},
			ReturnValues: "NONE",
		};
		const command = new PutCommand(input);
		await docClient.send(command);

		return {
			statusCode: "200",
			body: "Entry Added",
		};
	} catch (e) {
		console.log(e);
	}
};
