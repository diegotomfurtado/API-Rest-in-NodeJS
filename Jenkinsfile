def status = 'ready'

node {

    stage('Setup - Install dependencies'){

      checkout scm 

      env.NODEJS_HOME = "${tool 'NodeJS'}"
      env.PATH="${env.NODEJS_HOME}/bin:${env.PATH}"

      echo 'SUDO NPM INSTALL (START)'

        sh 'sudo npm install'
      
      echo 'SUDO NPM INSTALL (END)'


      echo 'SUDO DOCKER PS (START)'
      sh 'sudo docker ps'
      echo 'SUDO DOCKER PS (END)'
    }


    stage('Building') {    
      echo 'Trying to do something..'
    
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