// 공공의 미술관 서비스 워커: 안드로이드 공유 목록에서 사진을 받아 '그림 올리기'로 넘겨 주는 일만 한다.
// (다른 요청은 건드리지 않는다 → 사이트를 고쳐 올리면 바로 새 버전이 보인다)
const SHARE_CACHE='kg-share';
self.addEventListener('install',()=>self.skipWaiting());
self.addEventListener('activate',e=>e.waitUntil(self.clients.claim()));
self.addEventListener('fetch',e=>{
  const url=new URL(e.request.url);
  if(e.request.method!=='POST'||url.pathname!=='/gallery/share-target')return;
  e.respondWith((async()=>{
    try{
      const form=await e.request.formData(),files=form.getAll('photos').filter(f=>f&&f.size);
      const cache=await caches.open(SHARE_CACHE);
      for(const k of await cache.keys())await cache.delete(k);
      let i=0;for(const f of files)await cache.put(`/gallery/__share/${i++}`,new Response(f,{headers:{'Content-Type':f.type||'image/jpeg','X-Name':encodeURIComponent(f.name||`photo-${i}.jpg`)}}));
    }catch(err){console.warn(err);}
    return Response.redirect('/gallery/?share=1',303);
  })());
});
