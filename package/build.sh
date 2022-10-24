#!/bin/bash
# validate, lint and produce helm chart

set -e -o pipefail -u

DESTINATION="./dist"
SOURCE="./"

echo "Linting Helm chart in $SOURCE ..."
if ! helm lint $SOURCE --strict; then
    echo "Linting failed!"
    exit 1
fi

echo "Packaging Helm chart into $DESTINATION..."
if ! helm package $SOURCE --destination $DESTINATION; then
    echo "Packaging failed!"
    exit 1
fi

echo "Helm chart packaged successfully!"
