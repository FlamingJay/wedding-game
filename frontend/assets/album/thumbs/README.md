# 时光相册素材

请将相册照片放在当前目录：

```text
frontend/assets/album/
```

建议按展示顺序命名：

```text
01.jpg
02.jpg
03.jpg
04.jpg
```

推荐要求：

- 图片格式：`.jpg`、`.jpeg`、`.png` 或 `.webp`
- 建议统一为 `4:3` 或 `3:2` 比例
- 建议单张宽度不低于 `1200px`
- 文件名尽量只使用数字、英文和短横线
- 建议先放入 `6–12` 张，避免移动端首次加载过慢

照片放入后，还需要在 `frontend/game.js` 的 `GAME_CONFIG.albumPhotos` 中按顺序登记路径，例如：

```js
albumPhotos: [
  "./assets/album/01.jpg",
  "./assets/album/02.jpg",
  "./assets/album/03.jpg"
],
```
