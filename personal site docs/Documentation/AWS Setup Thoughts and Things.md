


So, first of all, i just want to start by saying the the process of getting a container hosted on AWS has predictably been a nightmare. I could have guessed it would suck based on my experience with code commit alone, but the knowledge gap is insane here. both in the AWS UX pattern and generally the understanding of what it takes to host a site on some sort of cloud storage. It brings to mind the realization that my experience is nil with cloud computing since in previous professional development I have only been exposed to self hosted deployments.  even then, i didn't set that up and i only ever had to remote into the server to check logs etc. the configuration of the windows server itself and especially the network configuration that made our site, api, and db available on the production network are black magic to me so far.  


with that out of the way, i have tried to follow a tutorial for hosting an angular site in a docker container with AWS ECR/ECS/ECS ( i seriously had no idea this was going to be like 6 aws services to make this happen). however, i at the end of the tutorial i was left with an unreachable site and the understanding that i knew jack shit. So, I stopped the process/cluster or whatever that was running from my created task (im not 100% sure how this worked. but it seemed like the task spun up a server instance that hosted my selected docker image) so i dont get charged and i intend to start from scratch. I intend to take an in depth look at the amazon services that seem needed and gain a simple understanding of their function and use before diving headfirst into deploying. additionally, any networking and cloud computing information i need to learn first will be explored.


## [Elastic Container Service (ECS)](https://docs.aws.amazon.com/AmazonECS/latest/developerguide/Welcome.html)
ECS is a container orchestration platform which basically just means it is a suite of tools for running and controlling containerized applications. it can handle scaling. so, there is more than one instance of a container running to handle expanding traffic. you can roll out updated versions of applications on a per container basis. it can inject env variables/secrets into containers for secure operation. these types of things seem like only scratching the surface. the container orchestration system i have heard the name of most frequently is **Kubernetes**.

There are three layers which make up ECS
- Capacity - The infrastructure where your containers run
- Controller - Deploy and manage your applications that run on the containers
- Provisioning - The tools that you can use to interface with the scheduler to deploy and manage your applications and containers

![[Pasted image 20251017134228.png]]

At the insistence of the AWS documentation, i have set up an admin user for the aws web console. this way, im not using the root user for everything. I also still have the cli-user for interacting with the provisioning layer through the CLI.

the AWS docs strongly suggest that you launch containers in a VPC.




## [Amazon Virtual Private Cloud (VPC)](https://docs.aws.amazon.com/vpc/latest/userguide/what-is-amazon-vpc.html)
a virtual network environment that closely mirrors a traditional network you might see in a data center. 

The AWS docs outline several key features of VPS that i think should be repeated here as they are truly fundamental concepts both to this service and networking, in general. 
- **Subnets**
	- A subnet is a range of IP Addresses on a network. 
		- subnets are used to deploy AWS resources
		- a subnet must reside in a single availability zone
			- an availability zone is a datacenter/cluster of datacenters which form an isolated failure domain inside of an AWS region. 
				- region us-east-2 may have several availability zones. such as, us-east-2a, us-east-2b, us-east-2c
- **IP Addressing**
	- Assign IP addresses (both ipv4 and ipv6) to VPCs and subnets. this includes public addresses.
- **Routing**
	- Use route tables to determine where network traffic from your subnet or gateway is directed
- **Gateways and endpoints**
	- A gateway connects your VPC to another network. For example, use an internet gateway to connect your VPC to the internet. Use a VPC endpoint to connect to AWS services privately, without the use of an internet gateway or NAT device.
- **Peering connections**
	- Use a VPC peering connection to route traffic between the resources in two VPCs
- **Traffic Mirroring**
	- Copy network  traffic from network interfaces and send it to security and monitoring appliances for deep packet inspection
- **Transit Gateways**
	- Use a transit gateway, which acts as a central hub, to route traffic between your VPCs, VPN connections, and AWS Direct Connect connections.
- **VPC Flow Logs**
	- A flow log captures information about the IP traffic going to and from network interfaces in your VPC    
- **VPN Connections**
	- Connect your VPC to your on-promises networks using AWS VPN

### [Security Groups](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/ec2-security-groups.html)
security groups are a key feature of VPC. They act as a firewall for associated container instances, controlling both inbound and outbound traffic at the container instance level. when launching a container instance, you can choose one or more security groups to associate with it. if one isn't chosen, there is a default security group that will be used instead.

#### [Security group rules for a Web Server](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/security-group-rules-reference.html#sg-rules-web-server)
**THEORY**: I think I will create a web server security group and apply it to any client app which needs to be accessible on the open internet 

| Protocol type | Protocol number | Port        | Source IP | Notes                                             |
| ------------- | --------------- | ----------- | --------- | ------------------------------------------------- |
| TCP           | 6               | 80 (HTTP)   | 0.0.0.0/0 | Allows inbound HTTP access from any IPv4 address  |
| TCP           | 6               | 443 (HTTPS) | 0.0.0.0/0 | Allows inbound HTTPS access from any IPv4 address |
| TCP           | 6               | 80 (HTTP)   | ::/0      | Allows inbound HTTP access from any IPv6 address  |
| TCP           | 6               | 443 (HTTPS) | ::/0      | Allows inbound HTTPS access from any IPv6 address |

[Security group rules for different use cases](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/security-group-rules-reference.html#sg-rules-web-server)
## [Elastic Container Registry](https://docs.aws.amazon.com/AmazonECR/latest/userguide/what-is-ecr.html)
a service that lets you store/manage/share container images for use with other services etc. with that, it seems like the big cell for ECR is the the security/auth/auditing elements that wrap the simple container repo aspect. 