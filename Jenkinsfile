#!groovy

node() {

 stage('Git') {
    git 'https://github.com/diegotomfurtado/API-Rest-in-NodeJS/tree/DevOpsBranch'
  }
  stage('Build') {
    sh 'npm install'
  }
  stage('Test') {
    sh 'npm test'
  }

}