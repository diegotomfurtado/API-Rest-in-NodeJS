FROM node:alpine AS node

FROM jenkins/jenkins:latest

# Switch to root user
USER root

RUN apt-get update \
 && apt-get install -y sudo \
 && rm -rf /var/lib/apt/lists/*
RUN echo "jenkins ALL=NOPASSWD: ALL" >> /etc/sudoers

RUN apt-get update
RUN apt-get install -y sudo
RUN apt-get install -y node.js 

# Switch to jenkins user
USER jenkins