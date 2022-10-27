# OpenArabic

A free and open-source Arabic language learning platform with focus on classic Islamic texts. Check out [The Road Ahead](https://github.com/orgs/edenmind/projects/4) project to see what is planned for the future, ʾIn shāʾ Allāh.

## Status

[![analyze-with-codeql](https://github.com/edenmind/OpenArabic/actions/workflows/analyze-with-codeql.yml/badge.svg)](https://github.com/edenmind/OpenArabic/actions/workflows/analyze-with-codeql.yml)

[![test-and-lint](https://github.com/edenmind/OpenArabic/actions/workflows/test-and-lint.yml/badge.svg)](https://github.com/edenmind/OpenArabic/actions/workflows/test-and-lint.yml)

[![build-push-and-deploy-containers](https://github.com/edenmind/OpenArabic/actions/workflows/build-push-and-deploy-containers.yml/badge.svg)](https://github.com/edenmind/OpenArabic/actions/workflows/build-push-and-deploy-containers.yml)

[![build-and-publish-to-expo](https://github.com/edenmind/OpenArabic/actions/workflows/build-and-publish-to-expo.yml/badge.svg)](https://github.com/edenmind/OpenArabic/actions/workflows/build-and-publish-to-expo.yml)

## Start Developing

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

OpenArabic is built using some great open source technologies such as:

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

## Help Wanted

If you have skills in any of these technologies and has an interest in helping taking OpenArabic further, then please join as a contributor.

## Support

If you need any help, then please drop an email to salam@edenmind.com or contact @YunusAndreasson on Twitter.
