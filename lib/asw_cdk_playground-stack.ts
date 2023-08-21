import * as cdk from "aws-cdk-lib";
import { Construct } from "constructs";
import * as apigw from "aws-cdk-lib/aws-apigateway";
import { AddCustomer } from "./addCustomer";

export class AswCdkPlaygroundStack extends cdk.Stack {
	constructor(scope: Construct, id: string, props?: cdk.StackProps) {
		super(scope, id, props);

		const addCustomerHelper = new AddCustomer(this, "addCustomerHelper");

		const api = new apigw.LambdaRestApi(this, "customersEndpoint", {
			handler: addCustomerHelper.handler,
			proxy: false,
			restApiName: "customers",
		});
		api.root.addMethod("POST");
	}
}
