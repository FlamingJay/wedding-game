# Wedding Game API

独立于前端游戏的 Node.js API 服务，负责保存祝福文字和手写签名文件。

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
- `GET /api/blessings/:id/signature.png`：读取单条手写签名 PNG 文件。

当前版本使用 `backend/data/blessings.json` 保存文字和元数据，使用 `backend/data/signatures/<id>.png` 保存手写签名文件。JSON 中不会保存 Base64 图片数据。

可通过环境变量修改签名文件目录：

```bash
SIGNATURE_DIR=./data/signatures npm start
```

生产环境建议将元数据替换为数据库、将签名文件替换为对象存储，并增加鉴权、限流和内容审核。
