import * as cdk from "aws-cdk-lib";
import { LambdaIntegration, RestApi } from "aws-cdk-lib/aws-apigateway";
import { Code, Function, Runtime } from "aws-cdk-lib/aws-lambda";
import { Construct } from "constructs";

export class LatestLambdalithStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const apiNestHandlerFunction = new Function(this, "ApiNestHandler", {
      code: Code.fromAsset("dist"), // 👈 This is crucial
      runtime: Runtime.NODEJS_18_X,
      handler: "main.handler",
      environment: {}, // 👈 You might need env variables
    });

    const api = new RestApi(this, "Api", {
      deploy: true,
      defaultMethodOptions: {
        apiKeyRequired: true,
      },
    });

    api.root.addProxy({
      defaultIntegration: new LambdaIntegration(apiNestHandlerFunction, {
        proxy: true,
      }),
    });

    const apiKey = api.addApiKey("ApiKey"); // 👈 to ease your testing

    const usagePlan = api.addUsagePlan("UsagePlan", {
      name: "UsagePlan",
      apiStages: [
        {
          api,
          stage: api.deploymentStage,
        },
      ],
    });

    usagePlan.addApiKey(apiKey);
  }
}
