node {

    stage('Setup'){

      env.NODEJS_HOME = "${tool 'NodeJS'}"
      env.PATH="${env.NODEJS_HOME}/bin:${env.PATH}"
      sh 'npm prune'
      sh 'npm install'
    }

    stage('Test'){

      sh 'npm test'
    }
}