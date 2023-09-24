import * as cdk from "aws-cdk-lib";
import * as lambda from "aws-cdk-lib/aws-lambda";
import * as dynamodb from "aws-cdk-lib/aws-dynamodb";
import { Construct } from "constructs";
import { DynamoEventSource } from "aws-cdk-lib/aws-lambda-event-sources";

interface sendEmailProps extends cdk.StackProps {
	customerTable: dynamodb.Table;
}
export class SendEmail extends Construct {
	public readonly handler: lambda.Function;
	constructor(scope: Construct, id: string, props: sendEmailProps) {
		super(scope, id);

		this.handler = new lambda.Function(this, "sendEmailHelper", {
			runtime: lambda.Runtime.NODEJS_18_X,
			handler: "index.handler",
			code: lambda.Code.fromAsset("lambda/sendEmail"),
		});

		this.handler.addEventSource(
			new DynamoEventSource(props.customerTable, {
				startingPosition: lambda.StartingPosition.LATEST,
			})
		);
	}
}
