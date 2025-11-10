* signed into the AWS console home
* downloaded the AWS CLI for windows
* Configure a user under the AWS IAM utility
	* cli-user
* run aws configure to log in with cli-user ![[Pasted image 20251006165525.png]]
* confirm cli is logged in correctly![[Pasted image 20251006165604.png]]
* log into AWS ECR through CLI![[Pasted image 20251006165649.png]]
```
aws ecr get-login-password --region  us-east-2 | docker login --username AWS --password-stdin 578469733813.dkr.ecr.us-east-2.amazonaws.com 
```
* tag docker image for ECR push 
	* docker tag 035594edbf7d 578469733813.dkr.ecr.us-east-2.amazonaws.com/personal-site-client:latest![[Pasted image 20251006165805.png]]
* push to AWS ECR 
	* docker push 578469733813.dkr.ecr.us-east-2.amazonaws.com/personal-site-client:latest
* 