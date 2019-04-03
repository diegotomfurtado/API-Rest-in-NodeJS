node {
    env.NODEJS_HOME = "${tool 'NodeJS'}"
    env.PATH="${env.NODEJS_HOME}/bin:${env.PATH}"
    sh 'npm --version'

    sh 'node -v'
   sh 'npm prune'
   sh 'npm install'
   sh 'npm test'
}