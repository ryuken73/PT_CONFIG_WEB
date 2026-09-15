# touch_config

터치스크린 PT용 **에셋 등록·관리 Config UI** (React / CRA).  
백엔드 API·정적 서빙은 `touch_config_server`가 담당한다.

- React 18, Redux Toolkit, MUI, styled-components
- Create React App (`react-scripts` 5)
- **빌드 기준 Node:** `16.13.1`

서버 문서: `touch_config_server/README.md`

---

## 빠른 시작 (개발)

```bash
nvm use 16.13.1
yarn install
yarn start
# → http://localhost:3000
```

개발 시 API는 `src/config/constants.js`의 `SERVER_URL` (`http://localhost`)을 사용한다.  
`touch_config_server`를 같은 PC에서 띄워 둔다.

| 스크립트 | 용도 |
|----------|------|
| `yarn start` | 개발 서버 |
| `yarn run build` | 운영 정적 빌드 → `build/` |
| `yarn test` | CRA 테스트 |

---

## 운영 배포

운영 터치 서버에서 Config UI는 **`touch_config_server`의 `/config` 정적 마운트**로 제공된다.  
빌드 결과물을 **`D:\touch_config\docs\`** 에 두면 된다.

| 항목 | 값 |
|------|-----|
| Node | `16.13.1` (`nvm use 16.13.1`) |
| 빌드 | `yarn run build` |
| 출력 | `./build/` (`index.html`, `static/`, …) |
| 배포 위치 | **`D:\touch_config\docs\`** |
| 접속 | 서버 `/config` (예: `https://<터치서버>/config`) |

```bash
cd touch_config
nvm use 16.13.1
yarn run build
# → ./build/
```

배포:

1. `build/` **내용**을 운영 서버 `D:\touch_config\docs\` 아래로 복사 (디렉터리 내용 교체)
2. UI만 변경한 경우 서버 exe 재기동은 불필요
3. API(`touch_config_server`) 변경이 있으면 서버 exe 교체 후 재기동 — 서버 README의 「운영 서버 배포」 참고

운영 빌드(`NODE_ENV=production`)의 API 주소는 `src/config/constants.js`의 `prd` 값이다.

| 상수 | prod 기본값 |
|------|-------------|
| `SERVER_URL` | `http://10.10.104.246` |
| `TOUCH_WEB_SERVER_URL` | `http://10.10.104.246` |

---

## 주요 기능

- 에셋 등록/수정: URL(`web`) 또는 이미지·영상 업로드 (`PUT /attach`)
- 카테고리(type), 즐겨찾기, PT 활성 메뉴(`assetsActive`)
- scroll-video / 8뉴스 예고 등 옵션
- **AWS 3D 방송 구성 JSON** (선택): 등록 시 첨부 → `srcRemote`에 `configFile` 쿼리 추가

AWS 3D 연동 상세는 서버 repo:

- `docs/aws3d-json-integration-plan.md`
- `docs/aws3d-config-origin.md`

---

## 디렉터리 맵 (요약)

| 경로 | 역할 |
|------|------|
| `src/Components/Dialog/AddDialog.jsx` | 에셋 등록/수정 다이얼로그 |
| `src/Components/Dialog/Aws3dConfigField.jsx` | AWS 3D JSON 첨부 UI |
| `src/Components/Pages/MainTab/` | 에셋 목록 |
| `src/lib/axiosRequest.js` | API 클라이언트 |
| `src/lib/aws3dPresentationConfig.js` | 구성 JSON 클라이언트 검증 |
| `src/lib/aws3dUrl.js` | `configFile` URL 결합 |
| `src/config/constants.js` | dev/prd 서버 URL |

---

## 관련 저장소

| repo | 역할 |
|------|------|
| `touch_config` (이 프로젝트) | Config UI |
| `touch_config_server` | API, `/media`, `/config`, `/aws3d-configs`, Socket.IO |
| Electron PT 앱 | `srcRemote`로 에셋 실행 (별도 repo) |
