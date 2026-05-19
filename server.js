const http=require('http'),fs=require('fs'),path=require('path');
const srv=http.createServer((q,r)=>{
  let f=q.url==='/'?'index.html':decodeURIComponent(q.url);
  let p=path.join(process.cwd(),f);
  let t={'html':'text/html','css':'text/css','js':'text/javascript','mp4':'video/mp4','png':'image/png','jpg':'image/jpeg','jpeg':'image/jpeg','gif':'image/gif','svg':'image/svg+xml'};
  let e=path.extname(p).slice(1);
  fs.readFile(p,(err,d)=>{
    if(err){r.writeHead(404);r.end('Not found');return;}
    r.writeHead(200,{'Content-Type':t[e]||'application/octet-stream','Cache-Control':'no-cache, no-store, must-revalidate'});
    r.end(d);
  });
});
srv.listen(8080,()=>console.log('http://localhost:8080'));
