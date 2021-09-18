# OpenArabic

[OpenArabic.io](https://openarabic.io) is a platform for learning classical arabic (*al-Fuṣḥā*). The main goal is to aid in the process of starting to read and understand classical Islamic texts using a process based on the [spaced repetition](https://en.wikipedia.org/wiki/Spaced_repetition) algorithm.

## To start developing OpenArabic.io

Begin with cloning the the repository. The web frontend is a standard Angular project that can be found in /web. The backend API is a standard .NET 5 project that can be found in /api.

A Docker-compose file is provided in the root of the repository that will build the Dockerfile for thw web frontend, the backend api and start an MS SQL database.

## Technologies

OpenArabic.io is built using some of the latest languages and technologies such as Python, .NET 5, Angular, Swift, Kotlin, Terraform, Kubernetes and Docker.

## Help wanted

If you have skills in any of these technologies and has an interest in helping taking OpenArabic.io further, then please join as a contributor.

## Infrastructure

The heart of the infrastructure is the microservice mesh providing language services (tashkeel, text-to-speech, lemmaization) to the backend API serving the front end clients.

## CI/CD Status

![Build, Push and Deploy](https://github.com/edenmind/OpenArabic/workflows/Build,%20Push%20and%20Deploy/badge.svg)
![Container Security Scan](https://github.com/edenmind/OpenArabic/workflows/Scan%20Repository%20with%20Snyke/badge.svg)
![Statics Code Analyze](https://github.com/edenmind/OpenArabic/actions/workflows/sq.yml/badge.svg)

## Support

If you need any help, then please drop and email to salam@edenmind.com
