## Chat Desktop App
마음 연구소 기업 과제로 진행한 데스크탑 채팅 애플리케이션입니다. 
- [x]  회원가입
- [x]  로그인
- [x]  유저 목록
- [x]  1: 1 채팅
- [x]  그룹채팅
## 목차
- [구현 내용](#1)
- [기술 스택](#2)
- [실행 방법](#3)

## 구현 내용  <a id="1"></a>

### 전체 구조
- 파이어 베이스와 애플리케이션이 강하게 결합되지 않도록 하는데 집중해서 구현했습니다.
- Repository 패턴을 사용하여 외부 데이터에 접근하는 로직을 추상화하여 데이터 접근 로직과 비즈니스 로직을 분리 했습니다.
- Context API를 이용해 외부 데이터와 관련된 로직을 수행하는 커스텀 훅을 생성하여 모든 컴포넌트에서 각 로직이 재사용 될 수 있도록 구현했습니다.


### 로그인, 회원가입 
### 1:1, 1:n 채팅

## 기술 스택 <a id="2"></a>

<img src="https://img.shields.io/badge/nextjs-000000?style=for-the-badge&logo=next.js&logoColor=white">  
<img src="https://img.shields.io/badge/electron-47848F?style=for-the-badge&logo=electron&logoColor=white"> 
<img src="https://img.shields.io/badge/typescript-3178C6?style=for-the-badge&logo=typescript&logoColor=black"> 
<img src="https://img.shields.io/badge/emotion-EF2D5E?style=for-the-badge&logo=emotion&logoColor=white"> 
<img src="https://img.shields.io/badge/RxJS-B7178C?style=for-the-badge&logo=ReactiveX&logoColor=white"> 
<img src="https://img.shields.io/badge/Ant Design-0170FE?style=for-the-badge&logo=Ant Design&logoColor=white"> 
<img src="https://img.shields.io/badge/Jest-C21325?style=for-the-badge&logo=Jest&logoColor=white"> 
<img src="https://img.shields.io/badge/Testing Library-E33332?style=for-the-badge&logo=Testing Library&logoColor=white"> 
<img src="https://img.shields.io/badge/firebase-FFCA28?style=for-the-badge&logo=firebase&logoColor=white">

## 실행방법 <a id="3"></a>
1. 프로젝트를 클론합니다.
```
git clone https://github.com/hyejineee/maumlab-assignment.git
```
2. 클론한 프로젝트 내부로 이동합니다. 
```
cd maumlab-assignment
```
3. 의존 패키지를 설치합니다. 
```
yarn
```
4. 파이어 베이스 사용을 위해 renderer 폴더 하위에 .env 파일을 추가합니다. .env 파일의 내용은 다음과 같습니다.
```
# firebase 
NEXT_PUBLIC_ENV_FIREBASE_APP_KEY=
NEXT_PUBLIC_ENV_FIREBASE_AUTH_DOMAIN=
NEXT_PUBLIC_ENV_FIREBASE_PROJECT_ID=
NEXT_PUBLIC_ENV_FIREBASE_STORAGE_BUCKET=
NEXT_PUBLIC_ENV_FIREBASE_MESSAGING_SENDER_ID=
NEXT_PUBLIC_ENV_FIREBASE_APP_ID=
```
5. 다음 명령어를 사용하여 서버를 실행합니다.
```
yarn dev 
```