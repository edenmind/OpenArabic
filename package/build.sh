#!/bin/bash
# validate, lint and produce helm chart

set -e -o pipefail -u

# Define the destination directory and source directory
DESTINATION_DIRECTORY="./dist"
SOURCE_DIRECTORY="./"

# Lint the Helm chart
echo "Linting Helm chart in $SOURCE_DIRECTORY ..."
if ! helm lint $SOURCE_DIRECTORY --strict; then
    echo "Linting failed!"
    exit 1
fi

echo "Helm chart linted successfully!"

# Package the Helm chart
echo "Packaging Helm chart into $DESTINATION_DIRECTORY..."
if ! helm package $SOURCE_DIRECTORY --destination $DESTINATION_DIRECTORY; then
    echo "Packaging failed!"
    exit 1
fi

echo "Helm chart packaged successfully!"
