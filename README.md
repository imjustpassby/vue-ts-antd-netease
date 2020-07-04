# vue-ts-antd-netease

## description

> 线上预览 [ipassby](https://ipassby.cloud)

> 该项目是使用 typescript 对[imjustpassby/netease-music-spa](https://github.com/imjustpassby/netease-music-spa)的重构，后端 api[Binaryify/NeteaseCloudMusicApi](https://github.com/Binaryify/NeteaseCloudMusicApi)，ts-axios 文档[ts-axios-new](https://docs.ipassby.cloud)

> [一个 quick start ts-vue-antd 模板](https://github.com/imjustpassby/vue-ts-antd-quick-template)

## 如何部署上线

### 修改后端 app.js

```
// npm i compression
...

const compression = require('compression')
const https = require('https')
const caConf = {
  // your key and pem location
  key: fs.readFileSync('./xxx.key'),
  cert: fs.readFileSync('./xxx.pem')
}

...

// 注释这行
// app.use(cache('2 minutes', ((req, res) => res.statusCode === 200)))

...

// 用https开启服务，端口号3001
// api同时运行在3000（http）,3001（https）,到时nginx接口转发到3001
const server = https.createServer(caConf, app);
server.listen(3001, () => {
        console.log("server starting on port : " + 3001)
});
```

### nginx 部署（https）

```
gzip  on;

gzip_types text/plain application/x-javascript application/javascript text/css application/xml text/javascript application/x-httpd-php;

server {
        listen 80;
        server_name your_server_name;
        rewrite ^(.*) https://$server_name$1 permanent;
}

server{
    listen 443 ssl http2;
    server_name your_server_name;
    access_log /var/log/nginx/access.log;
    error_log /var/log/nginx/error.log;
    ssl on;
    ssl_certificate your_pem_location;
    ssl_certificate_key your_key_location;
    ssl_protocols TLSv1 TLSv1.1 TLSv1.2;
    ssl_ciphers ECDHE-RSA-AES256-SHA384:AES256-SHA256:RC4:HIGH:!MD5:!aNULL:!eNULL:!NULL:!DH:!EDH:!AESGCM;
    ssl_prefer_server_ciphers on;
    ssl_session_cache shared:SSL:10m;
    ssl_session_timeout 10m;
    location / {
        root your_frontend_project_location;
    }

    location ~ /api/{
        rewrite ^/api/(.*)$ /$1 break;
        # https server address and port
        proxy_pass your_backend_address(https://127.0.0.1:3001);
        proxy_set_header Host               $host;
        proxy_set_header X-Real-IP          $remote_addr;
        proxy_set_header X-Forwarded-For    $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto  $scheme;
    }
}
```
