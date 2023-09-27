
set -e

npm run build

cd dist


git push -f git@github.com:<uporovaleksei>/<swc>.git master:gh-pages

cd -