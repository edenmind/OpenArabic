#!/bin/bash

echo "Change version and versionCode in app.json"

echo "Prepare new version in App Store Connect and Google Play Console"

read -p "Press Y to continue" -n 1 -r

eas build --platform all

eas submit --platform all --latest
