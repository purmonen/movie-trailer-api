rm ./lambdaFunc.zip

zip -r ./lambdaFunc.zip ./dist/* node_modules ./.env

aws s3 cp ./lambdaFunc.zip s3://viaplay-trailers

aws lambda update-function-code --function-name viaplay-trailers --s3-bucket viaplay-trailers --s3-key lambdaFunc.zip --region eu-north-1

