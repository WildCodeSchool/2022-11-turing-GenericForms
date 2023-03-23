# Dockerfile
FROM node:latest

RUN mkdir /app

WORKDIR /app

COPY package*.json ./
COPY tsconfig.json ./

RUN npm i
ARG SCRIPT

ENV SCRIPT=${SCRIPT}

COPY src src

CMD npm start

# CMD if ["${SCRIPT}" = "startWithTest"]; then npm run startWithTest; else npm start; fi

####
# Alternative syntax for the above conditional CMD statement:
# CMD if ["${SCRIPT}" = "startWithTest"] ; \
#     then npm run startWithTest ; \
#     else npm start ; \
#     fi
####