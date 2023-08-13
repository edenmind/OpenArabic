#!/bin/bash

echo "Change version and versionCode in app.json"
## check version in package.json and change the version in app.json using a script

echo "Prepare new version in App Store Connect and Google Play Console"

read -p "Press Y to continue" -n 1 -r

eas build --platform all

eas submit --platform all --latest
