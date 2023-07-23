#!/bin//bash

docker run -e AWS_ACCESS_KEY_ID=$AWS_ACCESS_KEY_ID \
    -e AWS_SECRET_ACCESS_KEY=$AWS_SECRET_ACCESS_KEY -e ENV=development \
    -p 9000:8080 bg-remover:test
