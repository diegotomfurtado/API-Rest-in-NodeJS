node {

    stage('Setup - Install dependencies'){

      
      checkout scm
      sh 'cat README.md' 

      env.NODEJS_HOME = "${tool 'NodeJS'}"
      env.PATH="${env.NODEJS_HOME}/bin:${env.PATH}"
      
      sh 'git log'
      sh 'npm install'

    }

    stage('Lint') {
     
        echo 'javascript Linter'
        sh 'npm run eslint'
     
    }
    stage('Migrate') {
     
        echo 'Knex migration'
        sh 'npm run knex migrate:rollback'
        sh 'npm run knex migrate:latest'
        sh 'npm run knex seed:run'
     
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