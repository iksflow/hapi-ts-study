# Hapi.js with Typescript

## 1. hapi 추가

```sh
yarn add @hapi/hapi
```

## 2. Typescript 및 관련 의존성 설치

yarn add 명령어에 -D 옵션을 주어 devDependencies에 추가한다. tsc --init 으로 Typescript 환경설정 파일을 추가한다.

```sh
$ yarn add -D typescript @types/hapi @types/node
$ yarn add -D nodemon npm-run-all
$ npx tsc --init
```

## 3. Test 라이브러리 설치

```sh
$ yarn add -D chai mocha @types/chai @types/mocha
$ yarn add -D ts-node
```

추가로 tsconfig.json 에서 test 파일 경로는 컴파일 대상에서 제외하도록 설정.

```json
{
  "compilerOptions": {
    ...
    "exclude": ["test"]
  }
}

```

## 4. Hapi Vision 설치

```sh
$ yarn add @hapi/vision ejs
$ yarn add -D @types/hapi__vision @types/ejs
```

테스트 도구

```sh
$ yarn add -D node-html-parser
```

## 5. Joi 설치

```sh
$ yarn add joi
```
