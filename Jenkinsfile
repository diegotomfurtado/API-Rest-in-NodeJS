node {

    stage('Setup - Install dependencies'){

      deleteDir()
      git url: 'https://github.com/diegotomfurtado/API-Rest-in-NodeJS'
      sh "git clean -f && git reset --hard origin/master"

      env.NODEJS_HOME = "${tool 'NodeJS'}"
      env.PATH="${env.NODEJS_HOME}/bin:${env.PATH}"
      
      sh 'git log'
      sh 'npm install'

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