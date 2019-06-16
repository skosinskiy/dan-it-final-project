# Final project at DAN-IT Education

[![Build Status](https://travis-ci.com/skosinskiy/dan-it-final-project.svg?branch=master)](https://travis-ci.org/skosinskiy/dan-it-final-project)
[![codecov](https://codecov.io/gh/skosinskiy/dan-it-final-project/branch/master/graph/badge.svg)](https://codecov.io/gh/skosinskiy/dan-it-final-project)
[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=skosinskiy_dan-it-final-project&metric=alert_status)](https://sonarcloud.io/dashboard?id=skosinskiy_dan-it-final-project)

## Description
Application combines relevant information about the place where a large number of people are concentrated, for example, business centers, shopping centers or residential complexes.
Project consists of 3 applications:
- Screen application which will be deployed on a touch screen monitor. On this screen, we can see current information about the current location.
- Mobile application with which users are able to “subscribe” to updates of a specific location via QR-code.
- Admin panel for adding content and application configuration

#### Actual version of master build is deployed on AWS:
https://ec2-3-14-226-139.us-east-2.compute.amazonaws.com:9000

#### Credentials:
Login: first.user@test.com

Password: admin

#### Technologies used in the development:
- Back-end: Spring(Boot, Data, Security), Hibernate, MySQL, Logback, Swagger
- Front-end: React, Redux, Material-UI
- Testing: JUnit, Mockito
- AWS: EC2, MySQL RDS, S3
- Build tools: Maven, Travis CI

#### Slack Bot
Project uses slack bot for deployment application on Amazon.
Source code of bot application: 

https://github.com/skosinskiy/rion-up-deployer

###### Development build is available on port 9001
https://ec2-3-14-226-139.us-east-2.compute.amazonaws.com:9001

#### Swagger Documentation:
https://ec2-3-14-226-139.us-east-2.compute.amazonaws.com:9000/swagger-ui.html