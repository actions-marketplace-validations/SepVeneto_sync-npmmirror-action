[![build-test](https://github.com/SepVeneto/sync-npmmirror-action/actions/workflows/test.yml/badge.svg?branch=main)](https://github.com/SepVeneto/sync-npmmirror-action/actions/workflows/test.yml)

# sync-npmmirror-action

主要用于部署后自动触发npmmirror的同步操作

## 使用
```yaml
uses: sepveneto/sync-npmmirror-action
with:
  # name: '@sepveneto/sync-npmmirror-action'
  name: 'foo'
```
对于`monorepo`支持添加多个包名
```yaml
uses: sepveneto/sync-npmmirror-action
with:
  name: |
    foo
    @sepveneto/sync-npmmirror-action
```
>如果不填写`name`，会自动读取根目录下`package.json`，将其中的`name`作为参数

## 开发

> First, you'll need to have a reasonably modern version of `node` handy. This won't work with versions older than 9, for instance.

Install the dependencies  
```bash
$ npm install
```

Build the typescript and package it for distribution
```bash
$ npm run build && npm run package
```

## 发布

Actions are run from GitHub repos so we will checkin the packed dist folder. 

Then run [ncc](https://github.com/zeit/ncc) and push the results:
```bash
$ npm run package
$ git add dist
$ git commit -a -m "prod dependencies"
$ git push origin releases/v1
```

Note: We recommend using the `--license` option for ncc, which will create a license file for all of the production node modules used in your project.

Your action is now published! :rocket: 

See the [versioning documentation](https://github.com/actions/toolkit/blob/master/docs/action-versioning.md)

## Usage:

After testing you can [create a v1 tag](https://github.com/actions/toolkit/blob/master/docs/action-versioning.md) to reference the stable and latest V1 action
