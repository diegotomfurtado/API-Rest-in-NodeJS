node {

    stage('Setup - Install dependencies'){

      checkout scm
      sh 'cat README.md' 

      env.NODEJS_HOME = "${tool 'NodeJS'}"
      env.PATH="${env.NODEJS_HOME}/bin:${env.PATH}"
      
      sh 'git log'
      sh 'npm install'
      sh 'npm install -D jest jest-junit'

    }

    stage ('tests') {
      withEnv(["JEST_JUNIT_OUTPUT=./jest-test-results.xml"]) {
        sh 'npm jest --ci --reporters=default --reporters=jest-junit'
      }
      junit 'jest-test-results.xml'
    }

    stage('Testing'){

      parallel FrontendTests: { 
                  echo 'Testing Frontend..' 
                  sh 'npm test'
                },
               BackendTests: { 
                  echo 'Testing Backend..' 
                }

    }

    stage('Deploy') {

      echo "Nothing to say"
      if (currentBuild.result == null || currentBuild.result == 'SUCCESS') {
            sh 'make publish'
        }
    }
}