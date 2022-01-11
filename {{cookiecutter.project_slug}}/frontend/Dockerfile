FROM ubuntu:20.04

ARG DEBIAN_FRONTEND=noninteractive

RUN apt-get update && \
    apt-get install -yq curl && \
    curl -fsSL https://deb.nodesource.com/setup_14.x | bash - && \
    apt-get install -y nodejs

COPY ./frontend /home/app
WORKDIR /home/app
RUN ls
RUN npm install --global expo-cli
RUN npm install
CMD ["npm", "run", "web"]