# PDPlatformEngineerProject
A simple nodejs project explaining the use of AWS lambda, sns, api gateway and codebuild.

The project demonstrates the ability to  
     - subscribe to a SNS topic via API Gateway
     - unsubscribe from a SNS topic via API Gateway
     - publish to the SNS topic via schedule

There are 2 ways to deploy this

1) Using serverless framework
2) Using cloud formation
3) Using codebuild for continous integration


*1- Deployment guide for serverless framework*

serverless framework uses serverless.yaml file for deployment. 

npm install -g serverless
serverless deploy

*2- Deployment guide using cloudformation *

sam-template will be used to package and deploy the code into an s3 bucket.

1) Create a bucket to hold your code
aws s3 mb s3://bucket-name 
2) Use sam cli to package the code
sam package --template-file sam-template --output-template-file serverless-output.yaml --s3-bucket s3-bucket-name
3) The above command will generate a cloud formation template which you can use to create the stack


*3- Codebuild for continous integration *
Create a new build project in aws code build. Use this github repository as the source. 
buildspec.yml has the instructions to deploy the stack


Codebuild role json policy:

{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Sid": "VisualEditor0",
            "Effect": "Allow",
            "Action": [
                "iam:*",
                "s3:*",
                "apigateway:*",
                "lambda:*",
                "codedeploy:*",
                "cloudformation:*",
                "logs:*",
                "events:*"
            ],
            "Resource": "*"
        }
    ]
}

Please note this policy is not suited for production environment.