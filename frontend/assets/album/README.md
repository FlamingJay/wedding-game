# 时光相册素材

相册采用原图和缩略图分离的结构：

```text
frontend/assets/album/full/    # 主画面使用的高清原图
frontend/assets/album/thumbs/  # 时间轴使用的小尺寸缩略图
```

原图和缩略图需要保持相同文件名，例如：

```text
full/3M9A9334.jpg
thumbs/3M9A9334.jpg
full/3M9A9339.jpg
thumbs/3M9A9339.jpg
```

代码会让主画面加载 `full/`，时间轴只加载 `thumbs/`，从而减少相册初始加载的数据量。

推荐要求：

- 图片格式：`.jpg`、`.jpeg`、`.png` 或 `.webp`
- 建议统一为 `4:3` 或 `3:2` 比例
- 原图建议单张宽度不低于 `1200px`
- 缩略图建议宽度约 `180–240px`
- 文件名尽量只使用数字、英文和短横线
- 建议先放入 `6–12` 张，避免移动端首次加载过慢

新增照片后，需要在 `frontend/game.js` 的 `GAME_CONFIG.albumPhotos` 中添加对应的 `full` 和 `thumb` 路径。
