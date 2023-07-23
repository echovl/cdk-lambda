#!/bin/bash

AWS_REGION=us-east-1
AWS_ACCOUNT_ID=029047628564
REPOSITORY=bg-remover
IMAGE_NAME=bg-remover

aws ecr get-login-password --region $AWS_REGION \
    | docker login --username AWS \
    --password-stdin $AWS_ACCOUNT_ID.dkr.ecr.$AWS_REGION.amazonaws.com

docker build ./lambda -t $AWS_ACCOUNT_ID.dkr.ecr.$AWS_REGION.amazonaws.com/$REPOSITORY:latest
docker push $AWS_ACCOUNT_ID.dkr.ecr.$AWS_REGION.amazonaws.com/$REPOSITORY:latest
