# PDPlatformEngineerProject
A simple nodejs project explaining the use of AWS lambda, sns, api gateway and codebuild.

After codebuild deploys the cloudformation stack. You will have 3 lambda functions and 2 API methods.

curl -X POST \
  https://<ServiceEndpoint>/api/unsubscribe \
  -H 'content-type: application/x-www-form-urlencoded' \
  -d email=<email>
  
  curl -X POST \
  https:<ServiceEndpoint>/api/subscribe \
  -H 'content-type: application/x-www-form-urlencoded' \
  -d email=<email>

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