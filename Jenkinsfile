def status = 'ready'

node {

    stage('Setup - Install dependencies'){

      checkout scm 

      env.NODEJS_HOME = "${tool 'NodeJS'}"
      env.PATH="${env.NODEJS_HOME}/bin:${env.PATH}"

      sh 'sudo docker run npm install'
      sh 'sudo docker run npm install -D jest jest-junit'
    
      echo '######## (DooD) STARTING ########'
      
      sh 'sudo docker ps'
    
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
                  sh "sudo docker run -v ${userdir}/devops/exercicio3/srv/jenkins/workspace/${env.JOB_NAME}:/workspace -w /workspace maven:latest mvn clean install" 
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