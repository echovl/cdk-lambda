import json
import os

import torch


def is_production() -> bool:
    env = os.getenv("ENV")
    return env != None and env == "production"


def lambda_handler(event, context):
    resp = {"msg": "Hello from lambda2"}

    print(os.getenv("ENV"))

    rand = torch.rand(5, 3)

    print(rand)

    return {"statusCode": 200, "headers": {}, "body": json.dumps(resp)}
