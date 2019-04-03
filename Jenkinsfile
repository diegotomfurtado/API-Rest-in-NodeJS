node(){

  stage('Checkout'){
     checkout scm
  }

 stage('Test'){

   env.NODE_ENV = "test"

   print "Environment will be : ${env.NODE_ENV}"

   node -v
   npm prune
   npm install
   npm test

 }

}