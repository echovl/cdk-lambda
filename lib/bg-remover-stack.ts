import * as cdk from "aws-cdk-lib"
import { Construct } from "constructs"
import * as lambda from "aws-cdk-lib/aws-lambda"
import * as ecr from "aws-cdk-lib/aws-ecr"
import * as apigateway from "aws-cdk-lib/aws-apigateway"

export class BgRemoverStack extends cdk.Stack {
    constructor(scope: Construct, id: string, props?: cdk.StackProps) {
        super(scope, id, props)

        const bgRemoverRepo = ecr.Repository.fromRepositoryName(
            this,
            "BgRemoverRepository",
            "bg-remover"
        )

        const bgRemoverLambda = new lambda.DockerImageFunction(
            this,
            "BgRemoverHandler",
            {
                functionName: "BgRemover",
                code: lambda.DockerImageCode.fromEcr(bgRemoverRepo),
                timeout: cdk.Duration.minutes(10),
            }
        )

        new lambda.CfnPermission(this, "ApiGatewayPermission", {
            functionName: bgRemoverLambda.functionArn,
            action: "lambda:InvokeFunction",
            principal: "apigateway.amazonaws.com",
        })

        const api = new apigateway.RestApi(this, "API", {
            restApiName: "BgRemover",
            description: "Background remover API",
        })

        const lambdaIntegration = new apigateway.LambdaIntegration(
            bgRemoverLambda
        )

        api.root.addMethod("POST", lambdaIntegration)
    }
}
