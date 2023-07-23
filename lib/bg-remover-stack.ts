import * as cdk from "aws-cdk-lib"
import { Construct } from "constructs"
import * as lambda from "aws-cdk-lib/aws-lambda"
import * as ecr from "aws-cdk-lib/aws-ecr"
import * as s3 from "aws-cdk-lib/aws-s3"
import * as apigateway from "aws-cdk-lib/aws-apigateway"

export class BgRemoverStack extends cdk.Stack {
    constructor(scope: Construct, id: string, props?: cdk.StackProps) {
        super(scope, id, props)

        const bucket = new s3.Bucket(this, "BgRemoverBucket")

        const repository = ecr.Repository.fromRepositoryName(
            this,
            "BgRemoverRepository",
            "bg-remover"
        )

        const lambdaFn = new lambda.DockerImageFunction(
            this,
            "BgRemoverHandler",
            {
                functionName: "BgRemover",
                code: lambda.DockerImageCode.fromEcr(repository),
                memorySize: 500,
                timeout: cdk.Duration.minutes(10),
                environment: {
                    BUCKET: bucket.bucketName,
                    ENV: "production",
                },
            }
        )

        bucket.grantReadWrite(lambdaFn)

        new lambda.CfnPermission(this, "ApiGatewayPermission", {
            functionName: lambdaFn.functionArn,
            action: "lambda:InvokeFunction",
            principal: "apigateway.amazonaws.com",
        })

        const api = new apigateway.RestApi(this, "API", {
            restApiName: "Background Remover",
            description: "Background remover API",
        })

        const lambdaIntegration = new apigateway.LambdaIntegration(lambdaFn)

        api.root.addMethod("GET", lambdaIntegration, {
            requestParameters: { "method.request.path.url": true },
        })
    }
}
