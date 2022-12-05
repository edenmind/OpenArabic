# Infrastructure

This graph indicates the technology stack used to build the OpenArabic.

The backend API written in NodeJS is connected to the microservices written in Python. The frontend API, mobile app, and admin interface are all written in ReactJS and ReactNative, respectively, and are connected to the backend API. The static service, which is used for storing audio and images, is connected to the frontend API, mobile app, and admin interface.

```mermaid
graph TD
API[Backend API, NodeJS]
PYTH[Micro Services, Python] --> API
API --> React[Frontend API, ReactJS]
API --> App[Mobile App, ReactNative]
API --> Admin[Admin Interface, ReactJS]
React & App & Admin --> Static[Static Service, Audio and Images]
```
