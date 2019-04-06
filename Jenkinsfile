def status = 'ready'
def userdir = '/home/diego'

node {

    stage('Setup - Install dependencies') {

      env.NODEJS_HOME = "${tool 'NodeJS'}"
      env.PATH="${env.NODEJS_HOME}/bin:${env.PATH}"
    
      echo '######## (DooD) STARTING ########'
      
      sh 'sudo docker ps'

      sh 'sudo apt-get install curl'
      sh 'sudo apt update'
      sh 'curl -sL https://deb.nodesource.com/setup_10.x | sudo -E bash -'
      sh 'sudo apt-get install -y nodejs'
      sh 'npm install -D jest jest-junit'
    
      try { 

        sh "sudo chown -R jenkins: ${WORKSPACE}"
        deleteDir()       
        checkout scm
        sh "sudo printenv > result"
      
      } catch (e) {
          status = 'failed'
          echo 'Could not into the VM.'
          throw e
        }
      finally {  
      
        if (status=='ready'){ 
          
          sh 'echo "Finally something is working..."  >> result'
          stash includes: '**/result', name: 'res'
        }
        else{
          
          sh 'echo "Build failed.. Try again." >> result'
          archiveArtifacts artifacts: '**/result', fingerprint: true
        }
      }  
      echo '######## (DooD) FINISHED ########'
    }

    stage('Testing'){

      parallel FrontendTests: { 
                  echo 'Testing Frontend..'

                  withEnv(["JEST_JUNIT_OUTPUT=./jest-test-results.xml"]) {
                    sh 'npm test -- --ci --testResultsProcessor="jest-junit"'
                  }
                  junit 'jest-test-results.xml'
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