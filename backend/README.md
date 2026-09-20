# Wedding Game API

独立于前端游戏的 Node.js API 服务，负责保存祝福文字、手写签名数据及其位置。

## 启动

```bash
npm start
```

开发模式：

```bash
npm run dev
```

默认监听 `http://127.0.0.1:8787`。运行前端时，可通过环境变量设置允许的前端来源：

```bash
FRONTEND_ORIGIN=http://127.0.0.1:4173 npm start
```

## 接口

- `GET /health`：健康检查。
- `POST /api/blessings`：创建祝福。
- `GET /api/blessings`：读取祝福列表（正式环境应增加管理鉴权）。
- `GET /api/blessings/:id`：读取单条祝福。

当前版本使用 `backend/data/blessings.json` 作为轻量开发存储。生产环境建议替换为数据库和对象存储，并增加鉴权、限流、内容审核及签名文件上传接口。
