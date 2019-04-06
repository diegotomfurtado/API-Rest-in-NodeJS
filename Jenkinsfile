def status = 'SUCCESS'

node {

    stage('Setup - Install dependencies') {

      env.NODEJS_HOME = "${tool 'NodeJS'}"
      env.PATH="${env.NODEJS_HOME}/bin:${env.PATH}"
    
      echo '######## (DooD) STARTING ########'

      sh 'npm i -D jest@23.6.0 -E'
    
      try { 

        sh "sudo chown -R jenkins: ${WORKSPACE}"
        deleteDir()       
        checkout scm
        sh "sudo printenv > result"
      
      } catch (e) {
          status = 'FAILED'
          echo 'Could not into the VM.'
          throw e
        }
      finally {  
      
        if (status=='SUCCESS'){ 
          
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

                  sh 'npm test'
                },
               BackendTests: { 
                  echo 'Testing Backend..' 
                }

    }

    stage('Deploy') {

      if (currentBuild.result == null || currentBuild.result == 'SUCCESS') {
            archiveArtifacts artifacts: '**/target/nodeJsDevOps_SUCESS.jar', fingerprint: true
      }
      else {
            archiveArtifacts artifacts: '**/target/nodeJsDevOps_FAILED.jar', fingerprint: true
      }
    }
}