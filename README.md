# OpenArabic

[![dependency-review](https://github.com/edenmind/OpenArabic/actions/workflows/dependency-review.yml/badge.svg)](https://github.com/edenmind/OpenArabic/actions/workflows/dependency-review.yml) [![analyze-with-codeql](https://github.com/edenmind/OpenArabic/actions/workflows/analyze-with-codeql.yml/badge.svg)](https://github.com/edenmind/OpenArabic/actions/workflows/analyze-with-codeql.yml) [![test-and-lint](https://github.com/edenmind/OpenArabic/actions/workflows/test-and-lint.yml/badge.svg)](https://github.com/edenmind/OpenArabic/actions/workflows/test-and-lint.yml) [![build-push-and-deploy-containers](https://github.com/edenmind/OpenArabic/actions/workflows/build-push-and-deploy-containers.yml/badge.svg)](https://github.com/edenmind/OpenArabic/actions/workflows/build-push-and-deploy-containers.yml) [![build-and-publish-to-expo](https://github.com/edenmind/OpenArabic/actions/workflows/build-and-publish-to-expo.yml/badge.svg)](https://github.com/edenmind/OpenArabic/actions/workflows/build-and-publish-to-expo.yml)

![opeanarabic](https://pbs.twimg.com/profile_banners/1327982041099595776/1626038054/1500x500)

OpenArabic is a free and open-source Arabic language learning platform with a focus on classic Islamic texts. The target audience is primarily non-native speakers of Arabic who are interested in learning the language for the purpose of reading the Qur'an and other Islamic texts. The platform is currently in beta and is being developed by volunteers from all over the world. The project is open to contributions from anyone who is interested in helping to make the platform better.

## Theological Foundation

OpenArabic is based upon the Qurʼān, the Prophetic Sunnah and the first generations of Muslims understanding with texts from Islamic Scholars such as: al-Hasan al-Basri, Imām Abū Ḥanīfa, Imām Mālik bin Anas, Imām al-Shāfiʿī, Imām Aḥmad ibn Ḥanbal, Ibn Rājab al-Hanbali, Ibn Taymiyyah, Ibn Qayyim al-Jawziyya, Shams ad-Dīn adh-Dhahabī, Imām Nawawī, Ibn Kathīr, Ibn Ḥajar al-ʿAsqalānī and al-Fuḍayl ibn ʻIyāḍ.

## Roadmap

Check out [The Road Ahead](https://github.com/orgs/edenmind/projects/4) project to see what is planned for the future, ʾIn shāʾ Allāh. If you have any suggestions, please open an issue. If you would like to contribute, please see the [Contributing](#contributing) section below.

## Start Developing

OpenArabic is a community-driven project, and we welcome contributions from anyone. To learn about how to contribute to OpenArabic, see our [contributing documentation](https://raw.githubusercontent.com/edenmind/OpenArabic/main/docs/CONTRIBUTING.md) and [code of conduct](https://raw.githubusercontent.com/edenmind/OpenArabic/main/docs/CODE_OF_CONDUCT.md). If you have any questions, please open an issue.

Begin with cloning the repository:

```bash
gh repo clone edenmind/OpenArabic
```

In the root of the repository, the `start-dev-environment.sh` shell script is used to set up the development environment:

```bash
./start-dev-environment.sh -m # start a mongodb container
./start-dev-environment.sh -i # seed mongo with initial data
./start-dev-environment.sh -a # start the fastify api container
./start-dev-environment.sh -s # start the service serving static content
./start-dev-environment.sh -w # start the web interface
./start-dev-environment.sh -e # start the expo react native app
```

The web interface should now be accessible from <http://localhost:3040> and the api from <http://localhost:3030>.

You can also start the development environment with `docker-compose`:

```bash
docker-compose --env-file ./docker-compose-default.env up
```

## Branching Model

We use the GitHub Flow branching model. The `main` branch is the default branch and is protected. All changes are made in feature branches, which are then merged into the `main` branch through the passing of a pull request. The `main` branch is deployed to production using progressive delivery techniques and GitOps principles. For more information, see [GitHub Flow](https://docs.github.com/en/get-started/quickstart/github-flow).

## Versioning

We use [CalVer](https://calver.org/) for versioning. CalVer is a versioning convention based on the project's release calendar, instead of arbitrary numbers. The calendar is based on the Islamic calendar, and the version number is the year and month of the release. For example, the version number for the release in the month of Ramadan in the year 1444 AH would be `1444.09`.

## Technologies

The OpenArabic Platform is built using some great open-source technologies such as:

- Terraform  
- MongoDB
- Flux2 with Flagger
- Kubernetes
- Istio with Envoy
- Grafana
- Loki
- Prometheus
- Fastify
- ReactJS
- React Native

## Recommended Books

- Software Engineering at Google: Lessons Learned from Programming Over Time
- Clean Code: A Handbook of Agile Software Craftsmanship
- The Pragmatic Programmer: Your Journey To Mastery

## Contributing

If you have skills in any of these technologies and an interest in helping take the OpenArabic Platform further, then please join as a [contributor](https://raw.githubusercontent.com/edenmind/OpenArabic/main/docs/CONTRIBUTING.md). We are always looking for new contributors to help us build this platform. If you have any questions, please open an issue.

## Social Media

- [Instagram](https://www.instagram.com/openarabic.io/)
- [Facebook](https://www.facebook.com/openarabic.io)
- [Twitter](https://twitter.com/openarabicio)

## Support

If you need any help, then please drop an email to salam@edenmind.com or contact [@YunusAndreasson](https://twitter.com/YunusAndreasson) on Twitter.
