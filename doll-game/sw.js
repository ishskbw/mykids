// 인형 숨바꼭질 서비스 워커: 홈 화면에 앱으로 설치되게 하는 역할만 한다.
// 요청은 건드리지 않는다 (사이트를 고쳐 올리면 바로 새 버전이 보이게).
self.addEventListener('install',()=>self.skipWaiting());
self.addEventListener('activate',e=>e.waitUntil(self.clients.claim()));
self.addEventListener('fetch',()=>{});
