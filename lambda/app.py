import json


def lambda_handler(event, context):
    resp = {"msg": "Hello from lambda"}

    return {"statusCode": 200, "headers": {}, "body": json.dumps(resp)}
