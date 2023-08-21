import * as cdk from "aws-cdk-lib";
import * as lambda from "aws-cdk-lib/aws-lambda";
import * as dynamodb from "aws-cdk-lib/aws-dynamodb";
import { Construct } from "constructs";

export class AddCustomer extends Construct {
	public readonly handler: lambda.Function;
	constructor(scope: Construct, id: string, props?: cdk.StackProps) {
		super(scope, id);

		const customerTable = new dynamodb.Table(this, "customers", {
			partitionKey: { name: "id", type: dynamodb.AttributeType.STRING },
		});
		this.handler = new lambda.Function(this, "addCustomerHandler", {
			runtime: lambda.Runtime.NODEJS_18_X,
			handler: "index.handler",
			code: lambda.Code.fromAsset("lambda/addCustomer"),
			environment: {
				CUSTOMERS_TABLE_NAME: customerTable.tableName,
			},
		});
		customerTable.grantReadWriteData(this.handler);
	}
}
