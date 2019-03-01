



# hbr-cognito-test

This is a template for hbr-cognito-test - serverless application. Below is a brief explanation of content:

```bash
.
├── README.MD                   <-- This instructions file
├── event.json                  <-- API Gateway Proxy Integration event payload
├── hello-world                 <-- Source code for a hellow world lambda function
├── create-user                 <-- Source code for a create user lambda function
├── list-users                  <-- Source code for a list users lambda function
└── template.yaml               <-- SAM template
```

## SAM Requirements

* AWS CLI already configured with Administrator permission
* [NodeJS 8.10+ installed](https://nodejs.org/en/download/)
* [Docker installed](https://www.docker.com/community-edition)


## Packaging and deployment

Package Lambda functions to S3
```powershell
sam package --output-template-file packaged.yaml --s3-bucket <<bucket for deploy>> 
```

Create a Cloudformation Stack and deploy SAM resources
```powershell
sam deploy --template-file .\packaged.yaml --stack-name hbr-cognito-test --capabilities CAPABILITY_IAM 
```


## Testing

Create 100 users in Cognito
```powershell
for($i=1; $i -le 100; $i++){Invoke-WebRequest -Uri https://<<api gateway path>>/Prod/create-user -Method POST -Body "{ ""username"":""test$i@test.com"", ""password"":""Test123?"", ""email"":
""test$i@test.com""}"}
```

Verify, that CognitoIdentityServiceProvider.listUsers from aws-sdk cognito api will return only 60 records (users) 
```powershell
Invoke-WebRequest -Uri https://<<api gateway path>>/Prod/list-users -Method GET
```



## Cleanup

In order to delete  Serverless Application you can use the following AWS CLI Command:

```bash
aws cloudformation delete-stack --stack-name hbr-cognito-test
```

