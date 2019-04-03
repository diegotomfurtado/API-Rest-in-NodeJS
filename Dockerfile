FROM jenkins/jenkins:latest

USER root
RUN apt-get update \
      && apt-get install -y sudo \
      && rm -rf /var/lib/apt/lists/* \
      && apt-get install -y node.js \
      && apt-get update
RUN echo "jenkins ALL=NOPASSWD: ALL" >> /etc/sudoers

USER jenkins