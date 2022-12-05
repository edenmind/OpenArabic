#!/bin/bash
# validate, lint and produce helm chart

set -e -o pipefail -u

# Define the destination directory and source directory
DESTINATION="./dist"
SOURCE="./"

# Lint the Helm chart
echo "Linting Helm chart in $SOURCE ..."
if ! helm lint $SOURCE --strict; then
    echo "Linting failed!"
    exit 1
fi

echo "Helm chart linted successfully!"

# Package the Helm chart
echo "Packaging Helm chart into $DESTINATION..."
if ! helm package $SOURCE --destination $DESTINATION; then
    echo "Packaging failed!"
    exit 1
fi

echo "Helm chart packaged successfully!"
