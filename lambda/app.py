import json


def lambda_handler(event, context):
    print(event)

    resp = {"msg": "Hello from lambda2"}

    return {"statusCode": 200, "headers": {}, "body": json.dumps(resp)}
