FROM node:alpine AS node

FROM jenkins/jenkins:latest

# Switch to root user
USER root

RUN apt-get update \
 && apt-get install -y sudo \
 && rm -rf /var/lib/apt/lists/*
RUN echo "jenkins ALL=NOPASSWD: ALL" >> /etc/sudoers

RUN npm install babel-core babel-jest babel-preset-env jest puppeteer
CMD ["npm", "test"]

COPY --from=node /usr/local/bin/node /usr/local/bin/
COPY --from=node /usr/local/include/node/ /usr/local/include/node/
COPY --from=node /usr/local/lib/node_modules/ /usr/local/lib/node_modules/
COPY --from=node /usr/local/share/doc/node/ /usr/local/share/doc/node/
COPY --from=node /usr/local/share/man/man1/node.1 /usr/local/share/man/man1/
COPY --from=node /usr/local/share/systemtap/tapset/node.stp /usr/local/share/systemtap/tapset/
COPY --from=node /opt/yarn-* /opt/yarn/

RUN set -ex \
    apk add --no-cache libstdc++ \
    && cd /usr/local/bin \
    && ln -s ../lib/node_modules/npm/bin/npm-cli.js npm \
    && ln -s ../lib/node_modules/npm/bin/npx-cli.js npx \
    && ln -s /opt/yarn/bin/yarn /usr/local/bin/yarn \
    && ln -s /opt/yarn/bin/yarnpkg /usr/local/bin/yarnpkg \
    && cd /

# Switch to jenkins user
USER jenkins