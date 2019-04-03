node {

try {
    stage('Setup - Install dependencies'){

      env.NODEJS_HOME = "${tool 'NodeJS'}"
      env.PATH="${env.NODEJS_HOME}/bin:${env.PATH}"

      sh 'npm install'
      git log
    }

    
}