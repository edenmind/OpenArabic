# OpenArabic

A free and open-source Arabic language learning platform with focus on classic Islamic text. Check out [The Road Ahead](https://github.com/orgs/edenmind/projects/4) project to see what is planned for the future, ʾIn shāʾ Allāh.

## Status

[![Code QL](https://github.com/edenmind/OpenArabic/actions/workflows/code-ql.yml/badge.svg)](https://github.com/edenmind/OpenArabic/actions/workflows/code-ql.yml)

[![Build and Test](https://github.com/edenmind/OpenArabic/actions/workflows/test.yml/badge.svg)](https://github.com/edenmind/OpenArabic/actions/workflows/test.yml)

[![Deploy to Test Environment](https://github.com/edenmind/OpenArabic/actions/workflows/build-push-deploy.yml/badge.svg)](https://github.com/edenmind/OpenArabic/actions/workflows/build-push-deploy.yml)

[![Publish to Expo](https://github.com/edenmind/OpenArabic/actions/workflows/build-publish.yml/badge.svg)](https://github.com/edenmind/OpenArabic/actions/workflows/build-publish.yml)

## Start developing

OpenArabic is a community-driven project, and we welcome contributions from anyone.

Begin with cloning the repository:

```bash
gh repo clone edenmind/OpenArabic
```

In the root of the repository, the `start-dev-environment.sh` is used to start the development environment:

```bash
./start-dev-environment.sh -m #start a mongodb container
./start-dev-environment.sh -i #seed mongo with initial data
./start-dev-environment.sh -a #start the fastify api container
./start-dev-environment.sh -s #start the service serving static content
./start-dev-environment.sh -w #start the web interface
./start-dev-environment.sh -e #start the expo react native app
```

The web interface should now be accessible from <http://localhost:3040>

## Technologies

OpenArabic.io is built using some great open source technologies such as:

- Terraform  
- MongoDB
- Flux
- Flagger
- Kubernetes
- Grafana
- Prometheus
- Fastify
- ReactJS
- React Native  

## Help wanted

If you have skills in any of these technologies and has an interest in helping taking OpenArabic.io further, then please join as a contributor.

## Support

If you need any help, then please drop an email to salam@edenmind.com
