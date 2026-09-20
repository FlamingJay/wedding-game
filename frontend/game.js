"use strict";

const GAME_CONFIG = Object.freeze({
  title: "营救公主",
  groom: "新郎",
  bride: "新娘",
  date: "2026 年 X 月 X 日",
  venue: "XX 酒店",
  catName: "猫咪",
  welcomePhoto: "./assets/welcome-photo.png",
  signaturePhoto: "./assets/signature/signature-photo.jpg",
  apiBase: window.WEDDING_GAME_API || "http://wedding-game-production-9604.up.railway.app",
  albumPhotos: [
    { full: "./assets/album/full/3M9A9334.webp", thumb: "./assets/album/thumbs/3M9A9334.webp" },
    { full: "./assets/album/full/3M9A9339.webp", thumb: "./assets/album/thumbs/3M9A9339.webp" },
    { full: "./assets/album/full/3M9A9346.webp", thumb: "./assets/album/thumbs/3M9A9346.webp" },
    { full: "./assets/album/full/3M9A9388.webp", thumb: "./assets/album/thumbs/3M9A9388.webp" },
    { full: "./assets/album/full/3M9A9440.webp", thumb: "./assets/album/thumbs/3M9A9440.webp" },
    { full: "./assets/album/full/3M9A9451.webp", thumb: "./assets/album/thumbs/3M9A9451.webp" },
    { full: "./assets/album/full/3M9A9452.webp", thumb: "./assets/album/thumbs/3M9A9452.webp" },
    { full: "./assets/album/full/3M9A9499.webp", thumb: "./assets/album/thumbs/3M9A9499.webp" },
    { full: "./assets/album/full/3M9A9505.webp", thumb: "./assets/album/thumbs/3M9A9505.webp" },
    { full: "./assets/album/full/3M9A9521.webp", thumb: "./assets/album/thumbs/3M9A9521.webp" },
    { full: "./assets/album/full/3M9A9541.webp", thumb: "./assets/album/thumbs/3M9A9541.webp" },
    { full: "./assets/album/full/3M9A9551.webp", thumb: "./assets/album/thumbs/3M9A9551.webp" },
    { full: "./assets/album/full/3M9A9580.webp", thumb: "./assets/album/thumbs/3M9A9580.webp" },
    { full: "./assets/album/full/3M9A9584.webp", thumb: "./assets/album/thumbs/3M9A9584.webp" },
    { full: "./assets/album/full/3M9A9599.webp", thumb: "./assets/album/thumbs/3M9A9599.webp" },
    { full: "./assets/album/full/3M9A9601.webp", thumb: "./assets/album/thumbs/3M9A9601.webp" },
    { full: "./assets/album/full/3M9A9604.webp", thumb: "./assets/album/thumbs/3M9A9604.webp" },
    { full: "./assets/album/full/3M9A9609.webp", thumb: "./assets/album/thumbs/3M9A9609.webp" },
    { full: "./assets/album/full/3M9A9617.webp", thumb: "./assets/album/thumbs/3M9A9617.webp" },
    { full: "./assets/album/full/3M9A9697.webp", thumb: "./assets/album/thumbs/3M9A9697.webp" },
    { full: "./assets/album/full/3M9A9746.webp", thumb: "./assets/album/thumbs/3M9A9746.webp" },
    { full: "./assets/album/full/3M9A9752.webp", thumb: "./assets/album/thumbs/3M9A9752.webp" }
  ],
  shareText: "接受任务，穿过森林，揭开城堡怪物的秘密。",
});

const COLORS = Object.freeze({
  ink: "#08111f",
  night: "#0b1020",
  night2: "#151a31",
  sky: "#203552",
  sky2: "#315b6b",
  cream: "#fff1c7",
  paper: "#f4dca2",
  white: "#fff9e8",
  red: "#b7352f",
  redDark: "#71232d",
  gold: "#f2b84b",
  green: "#315b42",
  green2: "#47734d",
  green3: "#77a05b",
  blue: "#316a8c",
  blue2: "#5b92aa",
  brown: "#633d2d",
  brown2: "#94623d",
  stone: "#687185",
  stone2: "#9ba2af",
  black: "#03070d",
  pink: "#e77e7a",
  catBlue: "#7189a6",
  catBlueLight: "#a9bdd1",
  catBlueDark: "#3f536d",
  catEye: "#d8c46a",
  monster: "#51417f",
  monsterLight: "#a58ad7",
  monsterRim: "#e6d7ff",
});

const FOREST_STUMP = Object.freeze({
  xRatio: 0.58,
  halfWidth: 10,
  height: 16,
});

const FOREST_PARTY = Object.freeze({
  companionOffset: -18,
  halfWidth: 8,
});

const app = document.querySelector("#app");
const backgroundMusic = document.querySelector("#background-music");
const canvas = document.querySelector("#game-canvas");
const ctx = canvas.getContext("2d", { alpha: false });
const sceneUi = document.querySelector("#scene-ui");
const titleCard = document.querySelector("#title-card");
const dialog = document.querySelector("#dialog");
const warriorNameForm = document.querySelector("#warrior-name-form");
const warriorNameInput = document.querySelector("#warrior-name-input");
const speaker = document.querySelector("#speaker");
const dialogText = document.querySelector("#dialog-text");
const prompt = document.querySelector("#prompt");
const gameControls = document.querySelector("#game-controls");
const attackControl = document.querySelector('[data-control="attack"]');
const choices = document.querySelector("#choices");
const primaryAction = document.querySelector("#primary-action");
const primaryLabel = document.querySelector("#primary-label");
const skipAction = document.querySelector("#skip-action");
const flash = document.querySelector("#flash");
const poster = document.querySelector("#poster");
const posterPortrait = document.querySelector(".poster-portrait");
const posterCanvas = document.querySelector("#poster-canvas");
const signatureAction = document.querySelector("#signature-action");
const albumAction = document.querySelector("#album-action");
const shareTip = document.querySelector("#share-tip");
const albumScreen = document.querySelector("#album-screen");
const signatureScreen = document.querySelector("#signature-screen");
const albumImage = document.querySelector("#album-image");
const filmFrame = document.querySelector(".film-frame");
const albumCaption = document.querySelector("#album-caption");
const filmStrip = document.querySelector("#film-strip");
const albumCount = document.querySelector("#album-count");
const signaturePad = document.querySelector("#signature-pad");
const signaturePhoto = document.querySelector("#signature-photo");
const signaturePreview = document.querySelector("#signature-preview");
const imageLightbox = document.querySelector("#image-lightbox");
const lightboxImage = document.querySelector("#lightbox-image");
const closeLightbox = document.querySelector("#close-lightbox");
const blessingText = document.querySelector("#blessing-text");
const signatureStatus = document.querySelector("#signature-status");
const drawPanel = document.querySelector("#draw-panel");
const typePanel = document.querySelector("#type-panel");

const welcomePhoto = new Image();
const welcomePhotoUrl = `${GAME_CONFIG.welcomePhoto}?v=${Date.now()}`;
const signaturePhotoUrl = `${GAME_CONFIG.signaturePhoto}?v=${Date.now()}`;
welcomePhoto.onload = () => {
  if (state.scene === "poster") drawPosterPortrait();
};
welcomePhoto.src = welcomePhotoUrl;

let W = 216;
let H = 384;
let lastFrame = performance.now();
let paused = false;
let audioContext = null;
let timers = [];
let albumIndex = 0;
let albumLoadToken = 0;
let signatureDrawing = false;
let signatureHasInk = false;
let musicStarted = false;

const state = {
  scene: "title",
  phase: "idle",
  elapsed: 0,
  sceneElapsed: 0,
  guardHits: 0,
  attackConnected: false,
  attackStartedAt: 0,
  treasure: null,
  coupleStep: 0,
  jumpAmount: 0,
  jumpStartedAt: 0,
  screenShake: 0,
  particles: [],
  warriorName: "",
  playerX: 42,
  playerY: 0,
  playerVelocityY: 0,
  obstacleCleared: false,
  obstacleSide: "left",
  forestLights: [false, false, false],
  guardX: 0,
  guardDirection: -1,
  finisherStartedAt: 0,
  treasureX: 0,
  controls: { left: false, right: false },
};

function resizeCanvas() {
  const rect = app.getBoundingClientRect();
  W = 216;
  H = Math.max(384, Math.min(486, Math.round(W * (rect.height / rect.width))));
  canvas.width = W;
  canvas.height = H;
  ctx.imageSmoothingEnabled = false;
}

function clearTimers() {
  timers.forEach((id) => window.clearTimeout(id));
  timers = [];
}

function later(callback, delay) {
  const id = window.setTimeout(callback, delay);
  timers.push(id);
  return id;
}

function show(element, visible = true) {
  element.classList.toggle("hidden", !visible);
}

function resetUi() {
  sceneUi.classList.remove("briefing-layout");
  sceneUi.classList.remove("title-layout");
  sceneUi.classList.remove("gameplay-layout");
  sceneUi.classList.remove("castle-layout");
  show(titleCard, false);
  show(dialog, false);
  show(warriorNameForm, false);
  show(prompt, false);
  show(gameControls, false);
  show(choices, false);
  show(primaryAction, false);
  show(poster, false);
  show(shareTip, false);
  primaryAction.disabled = false;
  primaryAction.onclick = null;
  skipAction.classList.remove("hidden");
  state.controls.left = false;
  state.controls.right = false;
}

function setDialog(name, text) {
  speaker.textContent = name || "";
  dialogText.textContent = text;
  show(dialog, true);
}

function setPrompt(text) {
  prompt.textContent = text;
  show(prompt, Boolean(text));
}

function setAction(label, handler) {
  primaryLabel.textContent = label;
  primaryAction.onclick = handler;
  primaryAction.disabled = false;
  show(primaryAction, true);
}

function lockAction() {
  primaryAction.disabled = true;
  show(primaryAction, false);
}

function initAudio() {
  if (!audioContext) {
    const AudioCtor = window.AudioContext || window.webkitAudioContext;
    if (AudioCtor) audioContext = new AudioCtor();
  }
  if (audioContext?.state === "suspended") audioContext.resume();
}

function tone(frequency, duration = 0.07, wave = "square", gainValue = 0.025, delay = 0) {
  if (!audioContext) return;
  const start = audioContext.currentTime + delay;
  const oscillator = audioContext.createOscillator();
  const gain = audioContext.createGain();
  oscillator.type = wave;
  oscillator.frequency.setValueAtTime(frequency, start);
  gain.gain.setValueAtTime(gainValue, start);
  gain.gain.exponentialRampToValueAtTime(0.0001, start + duration);
  oscillator.connect(gain);
  gain.connect(audioContext.destination);
  oscillator.start(start);
  oscillator.stop(start + duration);
}

function sound(name) {
  initAudio();
  if (!audioContext) return;
  if (name === "start") {
    [262, 330, 392, 523].forEach((f, i) => tone(f, 0.11, "square", 0.026, i * 0.075));
  } else if (name === "jump") {
    tone(330, 0.08, "square", 0.03);
    tone(520, 0.12, "square", 0.025, 0.055);
  } else if (name === "hit") {
    tone(120, 0.08, "sawtooth", 0.035);
    tone(82, 0.12, "square", 0.025, 0.05);
  } else if (name === "open") {
    [392, 523, 659].forEach((f, i) => tone(f, 0.13, "square", 0.024, i * 0.09));
  } else if (name === "select") {
    tone(660, 0.08, "square", 0.024);
    tone(880, 0.1, "square", 0.02, 0.06);
  } else if (name === "magic") {
    [523, 659, 784, 1046].forEach((f, i) => tone(f, 0.16, "triangle", 0.018, i * 0.075));
  } else if (name === "meow") {
    tone(620, 0.13, "square", 0.02);
    tone(470, 0.22, "square", 0.018, 0.1);
  } else if (name === "shutter") {
    tone(95, 0.045, "square", 0.045);
    tone(1400, 0.055, "square", 0.018, 0.045);
  } else if (name === "confirm") {
    tone(440, 0.07, "square", 0.02);
    tone(660, 0.1, "square", 0.02, 0.055);
  }
}

function startBackgroundMusic() {
  if (musicStarted || !backgroundMusic) return;
  backgroundMusic.volume = 0.32;
  const playback = backgroundMusic.play();
  if (playback && typeof playback.catch === "function") {
    playback.then(() => {
      musicStarted = true;
    }).catch(() => {
      // Browsers may require a user gesture before allowing audio playback.
    });
  } else {
    musicStarted = true;
  }
}

startBackgroundMusic();
const unlockMusic = () => {
  startBackgroundMusic();
  if (musicStarted) {
    document.removeEventListener("pointerdown", unlockMusic);
    document.removeEventListener("keydown", unlockMusic);
    document.removeEventListener("touchstart", unlockMusic);
  }
};
document.addEventListener("pointerdown", unlockMusic, { passive: true });
document.addEventListener("keydown", unlockMusic, { passive: true });
document.addEventListener("touchstart", unlockMusic, { passive: true });

function setScene(scene) {
  clearTimers();
  resetUi();
  state.scene = scene;
  attackControl.classList.toggle("hidden", !["forest", "guard"].includes(scene));
  state.phase = "idle";
  state.sceneElapsed = 0;
  state.screenShake = 0;
  state.particles = [];

  if (scene === "title") {
    sceneUi.classList.add("title-layout");
    show(titleCard, true);
    skipAction.classList.add("hidden");
    setAction("开始", () => {
      sound("start");
      setScene("briefing");
    });
  }

  if (scene === "briefing") {
    sceneUi.classList.add("briefing-layout");
    setDialog("皇家信使", "据传，公主被城堡里的怪物带走了\n勇士！\n请协助王子穿过森林，救回公主！");
    setAction("接受任务", () => {
      sound("confirm");
      setScene("warrior-name");
    });
  }

  if (scene === "warrior-name") {
    sceneUi.classList.add("briefing-layout");
    skipAction.classList.add("hidden");
    show(warriorNameForm, true);
    warriorNameInput.focus();
  }

  if (scene === "forest") {
    sceneUi.classList.add("gameplay-layout");
    state.playerX = 42;
    state.playerY = 0;
    state.playerVelocityY = 0;
    state.obstacleCleared = false;
    state.obstacleSide = "left";
    state.forestLights = [false, false, false];
    show(gameControls, true);
    setPrompt(`${state.warriorName || "勇士"}，收集光点并跳过障碍 0/3`);
  }

  if (scene === "guard") {
    sceneUi.classList.add("gameplay-layout");
    state.guardHits = 0;
    state.playerX = 42;
    state.playerY = 0;
    state.playerVelocityY = 0;
    state.guardX = W * 0.74;
    state.guardDirection = -1;
    show(gameControls, true);
    setPrompt("靠近哨兵后，按“击”攻击");
  }

  if (scene === "treasure") {
    if (!state.treasureX) state.treasureX = W * 0.66;
    sound("open");
    setDialog("王子", "宝箱里没有宝剑，只有三件奇怪的东西。选一件带走吧。");
    show(choices, true);
    drawChoiceIcons();
  }

  if (scene === "castle") {
    sceneUi.classList.add("castle-layout");
    state.playerX = W / 2;
    state.playerY = 0;
    state.playerVelocityY = 0;
    show(gameControls, true);
    setDialog("旁白", "城堡大门缓缓打开。黑暗中，一双巨大的眼睛睁开了。");
    setAction("拔剑", () => {
      sound("hit");
      state.phase = "sword";
      setDialog("公主", "等一下，它没有伤害我，也不是真的想和你们打架。你们是不是带礼物来了，快打开看看！");
      setAction("拿出宝物", () => setScene("branch"));
    });
  }

  if (scene === "branch") {
    sound("select");
    state.phase = state.treasure || "egg";
    if (state.treasure === "can") {
      setDialog("公主", "吃完以后不许再捣乱。还有，婚礼当天的烟花由你负责。");
      later(() => createFireworks(), 450);
    } else if (state.treasure === "food") {
      setDialog("公主", "只要你乖乖回家，不再捣乱，这些猫粮就都是你的。");
    } else {
      setDialog("王子", "它已经完全忘记我们为什么来了……");
    }
    setAction("看看它是谁", () => setScene("reveal"));
  }

  if (scene === "reveal") {
    state.phase = "shrinking";
    setPrompt("怪物的影子正在变小……");
    later(() => {
      state.phase = "cat";
      sound("meow");
      setPrompt("");
      setDialog(GAME_CONFIG.catName, "喵。");
      setAction("原来是你", () => setScene("couple"));
    }, 1450);
  }

  if (scene === "couple") {
    state.coupleStep = 0;
    setDialog("王子", "看来，你并不需要我来救。");
    setAction("继续", advanceCoupleDialog);
  }

  if (scene === "photo") {
    setDialog("公主", "勇士，我们还需要你帮最后一个忙。请为我们拍下这张照片。");
    setAction("按下快门", takePhoto);
  }

  if (scene === "poster") {
    skipAction.classList.add("hidden");
    document.querySelector("#scene-ui").classList.add("hidden");
    show(albumScreen, false);
    show(signatureScreen, false);
    show(poster, true);
    fillPoster();
  } else {
    sceneUi.classList.remove("hidden");
  }
}

function attackGuard() {
  if (state.scene !== "guard" || state.phase === "attacking" || state.phase === "finisher") return;
  state.phase = "attacking";
  state.attackStartedAt = state.elapsed;
  state.attackConnected = Math.abs(state.playerX - state.guardX) <= 30;
  if (state.attackConnected) state.guardHits += 1;

  if (state.attackConnected && state.guardHits >= 3) {
    state.phase = "finisher";
    state.finisherStartedAt = state.elapsed;
    state.treasureX = state.guardX;
    show(gameControls, false);
    setDialog("旁白", "一刀两断，如意神剑");
    show(dialog, false);
    setPrompt("");
    sound("magic");
    later(() => setScene("treasure"), 5300);
  } else {
    sound("hit");
    if (!state.attackConnected) setPrompt("挥剑落空了，靠近小兵再攻击");
    later(() => {
      state.phase = "idle";
    }, 360);
  }
}

function jumpPlayer() {
  if (!["forest", "guard", "castle"].includes(state.scene) || state.playerY > 0 || state.phase === "attacking" || state.phase === "finisher") return;
  state.playerVelocityY = 155;
  sound("jump");
}

function updateGameplay(delta) {
  if (![
    "forest",
    "guard",
    "castle",
  ].includes(state.scene)) return;
  const direction = (state.controls.right ? 1 : 0) - (state.controls.left ? 1 : 0);
  const movement = direction * 64 * delta;
  const previousX = state.playerX;
  const nextX = Math.max(22, Math.min(W - 22, previousX + movement));
  if (state.playerY > 0 || state.playerVelocityY > 0) {
    state.playerY += state.playerVelocityY * delta;
    state.playerVelocityY -= 270 * delta;
    if (state.playerY <= 0) {
      state.playerY = 0;
      state.playerVelocityY = 0;
    }
  }
  if (state.scene === "forest") {
    const obstacleX = W * FOREST_STUMP.xRatio;
    const obstacleLeft = obstacleX - FOREST_STUMP.halfWidth;
    const obstacleRight = obstacleX + FOREST_STUMP.halfWidth;
    const partyLeftEdge = state.playerX + FOREST_PARTY.companionOffset - FOREST_PARTY.halfWidth;
    const partyRightEdge = state.playerX + FOREST_PARTY.halfWidth;
    const partyLeftStop = obstacleRight - FOREST_PARTY.companionOffset + FOREST_PARTY.halfWidth;
    const partyRightStop = obstacleLeft - FOREST_PARTY.halfWidth;
    const clearsStump = state.playerY > FOREST_STUMP.height;

    if (clearsStump) {
      state.playerX = nextX;
    } else if (direction > 0 && partyRightEdge <= obstacleLeft && nextX + FOREST_PARTY.halfWidth > obstacleLeft) {
      state.playerX = partyRightStop;
    } else if (direction < 0 && partyLeftEdge >= obstacleRight && nextX + FOREST_PARTY.companionOffset - FOREST_PARTY.halfWidth < obstacleRight) {
      state.playerX = partyLeftStop;
    } else if (partyLeftEdge < obstacleRight && partyRightEdge > obstacleLeft) {
      state.playerX = state.playerX <= obstacleX ? partyRightStop : partyLeftStop;
    } else {
      state.playerX = nextX;
    }
    if (!state.obstacleCleared && previousX < obstacleRight && state.playerX >= obstacleRight) {
      state.obstacleCleared = true;
      sound("confirm");
    }
    const lights = [
      { x: W * 0.34, y: 9 },
      { x: W * 0.59, y: 28 },
      { x: W * 0.81, y: 10 },
    ];
    lights.forEach((light, index) => {
      if (!state.forestLights[index] && Math.abs(state.playerX - light.x) < 11 && Math.abs(state.playerY - light.y) < 14) {
        state.forestLights[index] = true;
        sound("select");
        const collected = state.forestLights.filter(Boolean).length;
        setPrompt(`${state.warriorName || "勇士"}，收集光点并跳过障碍 ${collected}/3`);
      }
    });
    if (state.playerX >= W - 25) {
      setScene("guard");
      return;
    }
  }
  if (state.scene === "guard" && state.guardHits < 3) {
    state.guardX += state.guardDirection * 20 * delta;
    if (state.guardX < W * 0.52) state.guardDirection = 1;
    if (state.guardX > W * 0.82) state.guardDirection = -1;
    if (state.phase !== "attacking") {
      state.playerX = nextX;
      const separation = state.guardX - state.playerX;
      if (Math.abs(separation) < 25) {
        state.playerX = separation >= 0 ? state.guardX - 30 : state.guardX + 30;
        state.playerX = Math.max(22, Math.min(W - 22, state.playerX));
        setPrompt("哨兵正在逼近！靠近后按“击”反击");
      }
    }
  }
  if (state.scene === "castle") {
    state.playerX = Math.max(22, Math.min(W - 22, nextX));
  }
}

function chooseTreasure(item) {
  if (!choices.classList.contains("hidden") && ["can", "food", "egg"].includes(item)) {
    state.treasure = item;
    sound("select");
    show(choices, false);
    const names = { can: "猫罐头", food: "猫粮", egg: "鸡蛋" };
    setDialog("获得宝物", `你选择了「${names[item]}」。王子虽然有些疑惑，还是把它收进了行囊。`);
    setAction("前往城堡", () => setScene("castle"));
  }
}

function advanceCoupleDialog() {
  state.coupleStep += 1;
  sound("confirm");
  if (state.coupleStep === 1) {
    setDialog("公主", "我不需要你来救。但接下来的路，我想和你一起走。");
    primaryLabel.textContent = "一起出发";
  } else {
    setScene("photo");
  }
}

function takePhoto() {
  lockAction();
  sound("shutter");
  flash.classList.remove("active");
  void flash.offsetWidth;
  flash.classList.add("active");
  later(() => setScene("poster"), 620);
}

function showPosterDirectly() {
  sound("confirm");
  setScene("poster");
}

function fillPoster() {
  document.querySelector("#groom-name").textContent = GAME_CONFIG.groom;
  document.querySelector("#bride-name").textContent = GAME_CONFIG.bride;
  document.querySelector("#wedding-date").textContent = GAME_CONFIG.date;
  document.querySelector("#wedding-venue").textContent = GAME_CONFIG.venue;
  drawPosterPortrait();
}

function openFeature(screen) {
  show(poster, false);
  show(albumScreen, screen === "album");
  show(signatureScreen, screen === "signature");
  if (screen === "album") renderAlbum();
  if (screen === "signature") resetSignatureEditor();
}

function closeFeature() {
  show(albumScreen, false);
  show(signatureScreen, false);
  show(poster, true);
}


function renderAlbum() {
  const photos = GAME_CONFIG.albumPhotos;
  const photo = photos[albumIndex] || { full: GAME_CONFIG.welcomePhoto, thumb: GAME_CONFIG.welcomePhoto };
  const loadToken = ++albumLoadToken;
  filmFrame.classList.add("is-loading");
  albumImage.alt = `第 ${albumIndex + 1} 张相册照片`;
  albumCaption.textContent = "";
  albumCount.textContent = `${albumIndex + 1} / ${photos.length}`;
  filmStrip.replaceChildren();
  photos.forEach((source, index) => {
    const thumb = document.createElement("button");
    thumb.type = "button";
    thumb.className = `film-thumb${index === albumIndex ? " active" : ""}`;
    thumb.innerHTML = `<img src="${source.thumb}" alt="第 ${index + 1} 张照片" loading="lazy" decoding="async" />`;
    thumb.addEventListener("click", () => {
      albumIndex = index;
      renderAlbum();
    });
    filmStrip.appendChild(thumb);
  });

  const nextImage = new Image();
  nextImage.decoding = "async";
  nextImage.fetchPriority = "high";
  nextImage.onload = async () => {
    if (typeof nextImage.decode === "function") await nextImage.decode().catch(() => {});
    if (loadToken !== albumLoadToken) return;
    albumImage.src = nextImage.src;
    filmFrame.classList.remove("is-loading");
    preloadAlbumNeighbors(albumIndex);
  };
  nextImage.onerror = () => {
    if (loadToken === albumLoadToken) filmFrame.classList.remove("is-loading");
  };
  nextImage.src = photo.full;
}

function preloadAlbumNeighbors(index) {
  const photos = GAME_CONFIG.albumPhotos;
  [
    photos[(index - 1 + photos.length) % photos.length],
    photos[(index + 1) % photos.length],
  ].forEach(photo => {
    if (!photo) return;
    const image = new Image();
    image.decoding = "async";
    image.fetchPriority = "low";
    image.src = photo.full;
  });
}

function clearSignaturePad() {
  const signatureContext = signaturePad.getContext("2d");
  signatureContext.clearRect(0, 0, signaturePad.width, signaturePad.height);
  signatureHasInk = false;
}

function resetSignatureEditor() {
  clearSignaturePad();
  blessingText.value = "";
  document.querySelectorAll("[data-signature-tab]").forEach(tab => tab.classList.toggle("active", tab.dataset.signatureTab === "draw"));
  show(drawPanel, true);
  show(typePanel, false);
  signaturePhoto.loading = "eager";
  signaturePhoto.decoding = "async";
  signaturePhoto.src = signaturePhotoUrl;
  signaturePhoto.onerror = () => {
    signaturePhoto.onerror = null;
    signaturePhoto.src = GAME_CONFIG.welcomePhoto;
  };
  signatureStatus.textContent = "";
}

function getPadPoint(event) {
  const rect = signaturePad.getBoundingClientRect();
  return {
    x: (event.clientX - rect.left) * signaturePad.width / rect.width,
    y: (event.clientY - rect.top) * signaturePad.height / rect.height,
  };
}

async function submitSignature() {
  const text = blessingText.value.trim();
  const signatureDataUrl = signatureHasInk ? signaturePad.toDataURL("image/png") : null;
  if (!text && !signatureDataUrl) {
    signatureStatus.textContent = "请先写下签名或输入祝福。";
    return;
  }
  signatureStatus.textContent = "正在保存……";
  try {
    const response = await fetch(`${GAME_CONFIG.apiBase}/api/blessings`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text, signatureDataUrl }),
    });
    if (!response.ok) throw new Error("save failed");
    signatureStatus.textContent = "祝福已保存，感谢你的心意！";
  } catch {
    signatureStatus.textContent = "暂时无法连接服务，祝福仍可在本页继续预览。";
  }
}

async function shareGame() {
  const shareData = {
    title: GAME_CONFIG.title,
    text: GAME_CONFIG.shareText,
    url: window.location.href,
  };
  try {
    if (navigator.share) {
      await navigator.share(shareData);
      return;
    }
  } catch (error) {
    if (error?.name === "AbortError") return;
  }
  show(shareTip, true);
  window.setTimeout(() => show(shareTip, false), 5000);
}

function restartGame() {
  state.guardHits = 0;
  state.treasure = null;
  state.coupleStep = 0;
  state.warriorName = "";
  state.treasureX = 0;
  warriorNameInput.value = "";
  document.querySelector("#scene-ui").classList.remove("hidden");
  setScene("title");
}

function drawChoiceIcons() {
  document.querySelectorAll(".choice").forEach((button) => {
    const iconCanvas = button.querySelector("canvas");
    const iconCtx = iconCanvas.getContext("2d");
    iconCtx.imageSmoothingEnabled = false;
    iconCtx.clearRect(0, 0, 40, 40);
    drawItem(iconCtx, button.dataset.item, 4, 4, 4);
  });
}

function rect(context, x, y, width, height, color) {
  context.fillStyle = color;
  context.fillRect(Math.round(x), Math.round(y), Math.round(width), Math.round(height));
}

function pixel(x, y, width, height, color) {
  rect(ctx, x, y, width, height, color);
}

function drawItem(context, item, x, y, scale = 2) {
  if (item === "can") {
    rect(context, x + 2 * scale, y + 2 * scale, 7 * scale, 1 * scale, COLORS.stone2);
    rect(context, x + 1 * scale, y + 3 * scale, 9 * scale, 6 * scale, COLORS.red);
    rect(context, x + 2 * scale, y + 4 * scale, 7 * scale, 3 * scale, COLORS.cream);
    rect(context, x + 4 * scale, y + 4 * scale, 3 * scale, 3 * scale, COLORS.gold);
    rect(context, x + 2 * scale, y + 9 * scale, 7 * scale, 1 * scale, COLORS.stone2);
  } else if (item === "food") {
    rect(context, x + 3 * scale, y + 1 * scale, 6 * scale, 2 * scale, COLORS.gold);
    rect(context, x + 2 * scale, y + 3 * scale, 8 * scale, 7 * scale, COLORS.paper);
    rect(context, x + 3 * scale, y + 5 * scale, 6 * scale, 3 * scale, COLORS.green);
    rect(context, x + 5 * scale, y + 5 * scale, 2 * scale, 2 * scale, COLORS.gold);
  } else {
    rect(context, x + 4 * scale, y + 1 * scale, 3 * scale, 1 * scale, COLORS.white);
    rect(context, x + 3 * scale, y + 2 * scale, 5 * scale, 2 * scale, COLORS.white);
    rect(context, x + 2 * scale, y + 4 * scale, 7 * scale, 4 * scale, COLORS.cream);
    rect(context, x + 3 * scale, y + 8 * scale, 5 * scale, 2 * scale, COLORS.paper);
  }
}

function drawSky(time, dusk = false) {
  pixel(0, 0, W, H, dusk ? COLORS.night2 : COLORS.sky);
  const starColor = dusk ? COLORS.paper : COLORS.cream;
  for (let i = 0; i < 25; i += 1) {
    const x = (i * 47 + 17) % W;
    const y = (i * 31 + 13) % Math.max(120, H * 0.55);
    const flicker = Math.floor(time * 2 + i) % 3 === 0;
    pixel(x, y, flicker ? 2 : 1, flicker ? 2 : 1, starColor);
  }
  pixel(W - 42, 28, 18, 18, COLORS.cream);
  pixel(W - 37, 24, 10, 3, COLORS.cream);
  pixel(W - 24, 36, 5, 8, dusk ? COLORS.night2 : COLORS.sky);
}

function drawCastle(x, baseY, scale = 1, lit = false) {
  const stoneDeep = "#31394d";
  const stoneDark = "#4d566b";
  const stone = COLORS.stone;
  const stoneLight = "#aeb5c0";
  const roof = "#672431";
  const roofLight = COLORS.red;
  const windowColor = lit ? COLORS.gold : COLORS.ink;

  // 外围城墙与城垛：先建立宽阔的防御建筑基座，而不是一座小房子。
  pixel(x - 49 * scale, baseY - 24 * scale, 98 * scale, 24 * scale, stoneDeep);
  pixel(x - 47 * scale, baseY - 22 * scale, 94 * scale, 20 * scale, stone);
  for (let i = -5; i <= 5; i += 2) {
    pixel(x + i * 8 * scale - 4 * scale, baseY - 30 * scale, 8 * scale, 9 * scale, stoneLight);
    pixel(x + i * 8 * scale - 2 * scale, baseY - 27 * scale, 4 * scale, 6 * scale, stone);
  }
  pixel(x - 49 * scale, baseY - 3 * scale, 98 * scale, 3 * scale, stoneDark);

  // 中央主堡（keep）：厚重、竖向，并带独立城垛与高位窗。
  pixel(x - 27 * scale, baseY - 66 * scale, 54 * scale, 48 * scale, stoneDeep);
  pixel(x - 24 * scale, baseY - 64 * scale, 48 * scale, 46 * scale, stone);
  for (let i = -2; i <= 2; i += 1) {
    pixel(x + i * 10 * scale - 4 * scale, baseY - 72 * scale, 8 * scale, 10 * scale, stoneLight);
    pixel(x + i * 10 * scale - 2 * scale, baseY - 68 * scale, 4 * scale, 6 * scale, stone);
  }
  pixel(x - 27 * scale, baseY - 62 * scale, 54 * scale, 4 * scale, stoneDark);

  // 左右高塔：层层收分的石塔、尖顶、旗杆与射击孔。
  [-1, 1].forEach((side) => {
    const towerX = x + side * 38 * scale;
    pixel(towerX - 13 * scale, baseY - 57 * scale, 26 * scale, 55 * scale, stoneDeep);
    pixel(towerX - 10 * scale, baseY - 55 * scale, 20 * scale, 52 * scale, stoneLight);
    pixel(towerX - 14 * scale, baseY - 59 * scale, 28 * scale, 6 * scale, stoneDark);
    pixel(towerX - 12 * scale, baseY - 66 * scale, 24 * scale, 8 * scale, roofLight);
    pixel(towerX - 9 * scale, baseY - 73 * scale, 18 * scale, 7 * scale, roof);
    pixel(towerX - 6 * scale, baseY - 80 * scale, 12 * scale, 7 * scale, roof);
    pixel(towerX - 3 * scale, baseY - 86 * scale, 6 * scale, 6 * scale, roof);
    pixel(towerX - 1 * scale, baseY - 92 * scale, 2 * scale, 6 * scale, COLORS.gold);
    pixel(towerX + side * scale, baseY - 92 * scale, side * 9 * scale, 4 * scale, side < 0 ? COLORS.redDark : COLORS.red);
    pixel(towerX - 2 * scale, baseY - 48 * scale, 4 * scale, 12 * scale, windowColor);
    pixel(towerX - 1 * scale, baseY - 51 * scale, 2 * scale, 3 * scale, windowColor);
    pixel(towerX - 5 * scale, baseY - 20 * scale, 3 * scale, 8 * scale, stoneDark);
    pixel(towerX + 3 * scale, baseY - 30 * scale, 3 * scale, 8 * scale, stoneDark);
  });

  // 主堡高顶、双旗与盾徽，形成中世纪欧洲城堡的明确识别点。
  pixel(x - 25 * scale, baseY - 76 * scale, 50 * scale, 5 * scale, roofLight);
  pixel(x - 19 * scale, baseY - 83 * scale, 38 * scale, 7 * scale, roof);
  pixel(x - 12 * scale, baseY - 90 * scale, 24 * scale, 7 * scale, roof);
  pixel(x - 5 * scale, baseY - 96 * scale, 10 * scale, 6 * scale, roof);
  pixel(x - 1 * scale, baseY - 104 * scale, 2 * scale, 8 * scale, COLORS.gold);
  pixel(x + 1 * scale, baseY - 104 * scale, 12 * scale, 5 * scale, COLORS.red);
  pixel(x - 5 * scale, baseY - 57 * scale, 10 * scale, 12 * scale, COLORS.gold);
  pixel(x - 3 * scale, baseY - 55 * scale, 6 * scale, 8 * scale, COLORS.redDark);
  pixel(x - scale, baseY - 53 * scale, 2 * scale, 4 * scale, COLORS.cream);

  // 暖色高窗、十字窗棂与纵深明显的拱形门洞。
  [-14, 14].forEach((offsetX) => {
    pixel(x + (offsetX - 4) * scale, baseY - 42 * scale, 8 * scale, 14 * scale, stoneDeep);
    pixel(x + (offsetX - 2) * scale, baseY - 45 * scale, 4 * scale, 4 * scale, stoneDeep);
    pixel(x + (offsetX - 2) * scale, baseY - 40 * scale, 4 * scale, 10 * scale, windowColor);
    pixel(x + (offsetX - 4) * scale, baseY - 35 * scale, 8 * scale, 2 * scale, stoneDeep);
  });
  pixel(x - 13 * scale, baseY - 27 * scale, 26 * scale, 25 * scale, COLORS.gold);
  pixel(x - 10 * scale, baseY - 24 * scale, 20 * scale, 22 * scale, stoneDeep);
  pixel(x - 7 * scale, baseY - 29 * scale, 14 * scale, 8 * scale, stoneDeep);
  pixel(x - 7 * scale, baseY - 19 * scale, 14 * scale, 17 * scale, COLORS.ink);
  for (let bar = -5; bar <= 5; bar += 5) pixel(x + bar * scale, baseY - 19 * scale, 2 * scale, 17 * scale, stoneDark);

  // 克制的石砌纹理，让建筑有年代感但不碎成噪点。
  [-56, -38].forEach((offsetY, row) => {
    for (let i = -1; i <= 1; i += 1) {
      const brickX = x + (i * 13 + (row % 2 ? 6 : 0)) * scale;
      pixel(brickX - 4 * scale, baseY + offsetY * scale, 8 * scale, 2 * scale, stoneLight);
    }
  });
}

function drawTree(x, baseY, scale = 1, shade = 0) {
  const leafDark = shade === 0 ? "#203f32" : shade === 1 ? COLORS.green : "#3f6947";
  const leaf = shade === 0 ? COLORS.green : shade === 1 ? COLORS.green2 : COLORS.green3;
  pixel(x - 4 * scale, baseY - 25 * scale, 8 * scale, 25 * scale, COLORS.brown);
  pixel(x - 2 * scale, baseY - 24 * scale, 4 * scale, 24 * scale, COLORS.brown2);
  pixel(x - 16 * scale, baseY - 43 * scale, 32 * scale, 22 * scale, leafDark);
  pixel(x - 13 * scale, baseY - 55 * scale, 26 * scale, 18 * scale, leaf);
  pixel(x - 9 * scale, baseY - 65 * scale, 18 * scale, 14 * scale, leafDark);
  pixel(x - 4 * scale, baseY - 71 * scale, 8 * scale, 9 * scale, leaf);
  pixel(x - 12 * scale, baseY - 51 * scale, 7 * scale, 5 * scale, COLORS.green3);
  pixel(x + 5 * scale, baseY - 39 * scale, 8 * scale, 5 * scale, COLORS.green3);
}

function drawForest(time, darker = false) {
  drawSky(time, darker);
  const groundY = Math.round(H * 0.59);
  const scroll = state.scene === "forest" ? time * 28 : time * 4;
  const obstacleX = W * FOREST_STUMP.xRatio;

  // 少而巨大的树建立森林尺度，并用远近两层滚动形成空间深度。
  pixel(0, groundY - 76, W, 76, darker ? "#263947" : "#365b43");
  for (let i = 0; i < 3; i += 1) {
    const x = ((i * 105 - scroll * 0.22) % (W + 116) + W + 116) % (W + 116) - 50;
    if (state.scene === "forest" && Math.abs(x - obstacleX) < 42) continue;
    drawTree(x, groundY + 2, 2.75, (i + 1) % 3);
  }

  pixel(0, groundY, W, H - groundY, COLORS.green);
  pixel(0, groundY + 12, W, 8, COLORS.green2);
  pixel(0, groundY + 20, W, H - groundY - 20, COLORS.brown2);
  pixel(0, groundY + 24, W, 4, COLORS.paper);

  for (let i = 0; i < 5; i += 1) {
    const x = ((i * 54 - scroll) % (W + 56) + W + 56) % (W + 56) - 20;
    pixel(x, groundY + 5, 12, 3, i % 2 === 0 ? COLORS.green3 : COLORS.cream);
    pixel(x + 5, groundY, 3, 7, COLORS.green3);
  }
}

function drawHuman(x, baseY, scale, role, frame = 0, facing = 1) {
  const flip = facing < 0 ? -1 : 1;
  const hair = role === "princess" ? COLORS.brown2 : role === "prince" ? COLORS.gold : COLORS.stone2;
  const body = role === "princess" ? COLORS.red : role === "prince" ? COLORS.cream : COLORS.blue;
  const accent = role === "princess" ? COLORS.cream : role === "prince" ? COLORS.red : COLORS.stone;
  const skin = "#e7ad72";
  const step = frame % 2 === 0 ? 0 : scale;
  pixel(x - 4 * scale, baseY - 17 * scale, 8 * scale, 6 * scale, hair);
  pixel(x - 3 * scale, baseY - 15 * scale, 6 * scale, 5 * scale, skin);
  pixel(x + flip * 2 * scale, baseY - 14 * scale, scale, scale, COLORS.ink);
  pixel(x - 4 * scale, baseY - 10 * scale, 8 * scale, 8 * scale, body);
  pixel(x - 5 * scale, baseY - 8 * scale, scale, 6 * scale, accent);
  pixel(x + 4 * scale, baseY - 8 * scale, scale, 6 * scale, accent);
  if (role === "princess") {
    pixel(x - 6 * scale, baseY - 5 * scale, 12 * scale, 5 * scale, body);
    pixel(x - 1 * scale, baseY - 20 * scale, 2 * scale, 2 * scale, COLORS.gold);
  } else {
    pixel(x - 3 * scale, baseY - 2 * scale, 2 * scale, 3 * scale + step, COLORS.ink);
    pixel(x + scale, baseY - 2 * scale, 2 * scale, 4 * scale - step, COLORS.ink);
  }
  if (role === "warrior") {
    pixel(x - 5 * scale, baseY - 18 * scale, 10 * scale, 2 * scale, COLORS.stone);
    pixel(x - 6 * scale, baseY - 9 * scale, 2 * scale, 7 * scale, COLORS.stone2);
  }
}

function drawGuard(x, baseY, scale, hit = false) {
  const offset = hit ? Math.round(Math.sin(state.sceneElapsed * 45) * 4) : 0;
  const color = hit && Math.floor(state.sceneElapsed * 28) % 2 === 0 ? COLORS.white : COLORS.stone;
  pixel(x - 8 * scale + offset, baseY - 24 * scale, 16 * scale, 7 * scale, color);
  pixel(x - 6 * scale + offset, baseY - 18 * scale, 12 * scale, 9 * scale, COLORS.redDark);
  pixel(x - 7 * scale + offset, baseY - 9 * scale, 14 * scale, 9 * scale, color);
  pixel(x - 10 * scale + offset, baseY - 15 * scale, 4 * scale, 14 * scale, COLORS.stone2);
  pixel(x - 8 * scale + offset, baseY - 22 * scale, 2 * scale, 2 * scale, COLORS.ink);
  pixel(x + 5 * scale + offset, baseY - 22 * scale, 2 * scale, 2 * scale, COLORS.ink);
}

function drawDefeatedGuard(x, baseY, scale = 1.7, glow = 0) {
  const flicker = Math.floor(state.elapsed * 16) % 2;
  const bodyColor = glow > 0.7 && flicker === 0 ? COLORS.white : COLORS.stone;
  pixel(x - 20 * scale, baseY - 8 * scale, 30 * scale, 8 * scale, bodyColor);
  pixel(x + 8 * scale, baseY - 14 * scale, 10 * scale, 11 * scale, bodyColor);
  pixel(x + 10 * scale, baseY - 12 * scale, 2 * scale, 2 * scale, COLORS.ink);
  pixel(x + 16 * scale, baseY - 12 * scale, 2 * scale, 2 * scale, COLORS.ink);
  pixel(x - 25 * scale, baseY - 5 * scale, 8 * scale, 5 * scale, COLORS.stone2);
  pixel(x - 8 * scale, baseY, 5 * scale, 2 * scale, COLORS.ink);
  pixel(x + 13 * scale, baseY - 3 * scale, 5 * scale, 3 * scale, COLORS.ink);

  if (glow > 0) {
    const sparkle = Math.floor(state.elapsed * 10) % 2;
    const points = [
      [-24, -18], [-4, -17], [7, -24], [25, -10], [1, 5],
    ];
    points.forEach(([offsetX, offsetY], index) => {
      if ((index + sparkle) % 2 === 0) {
        pixel(x + offsetX * scale, baseY + offsetY * scale, 2 * scale, 2 * scale, COLORS.gold);
      }
    });
  }
}

function drawSeatedGuard(x, baseY, scale = 1.15, silhouette = false) {
  const body = silhouette ? COLORS.white : COLORS.stone;
  const armor = silhouette ? COLORS.white : COLORS.redDark;
  const limbs = silhouette ? COLORS.white : COLORS.stone2;
  pixel(x - 8 * scale, baseY - 18 * scale, 16 * scale, 7 * scale, body);
  pixel(x - 7 * scale, baseY - 12 * scale, 14 * scale, 10 * scale, armor);
  pixel(x - 12 * scale, baseY - 5 * scale, 24 * scale, 5 * scale, body);
  pixel(x - 14 * scale, baseY - 2 * scale, 10 * scale, 3 * scale, limbs);
  pixel(x + 4 * scale, baseY - 2 * scale, 10 * scale, 3 * scale, limbs);
  if (!silhouette) {
    pixel(x - 5 * scale, baseY - 16 * scale, 2 * scale, 2 * scale, COLORS.ink);
    pixel(x + 4 * scale, baseY - 16 * scale, 2 * scale, 2 * scale, COLORS.ink);
  }
}

function drawFinisherBubble(x, y) {
  const text = "一刀两断，如意神剑";
  ctx.save();
  ctx.font = 'bold 10px "PingFang SC", "Microsoft YaHei", sans-serif';
  const width = Math.ceil(ctx.measureText(text).width + 20);
  ctx.restore();
  const height = 25;
  const left = Math.max(8, Math.min(W - width - 8, x - width / 2));
  const top = Math.max(30, y - height);
  pixel(left + 4, top - 2, width - 8, 2, COLORS.ink);
  pixel(left, top + 2, width, height - 6, COLORS.ink);
  pixel(left + 4, top + height - 4, width - 12, 4, COLORS.ink);
  pixel(left + 5, top, width - 10, height - 7, COLORS.cream);
  pixel(left + 9, top + height - 3, 6, 5, COLORS.ink);
  pixel(left + 10, top + height - 5, 5, 4, COLORS.cream);
  ctx.save();
  ctx.fillStyle = COLORS.ink;
  ctx.font = 'bold 10px "PingFang SC", "Microsoft YaHei", sans-serif';
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText(text, left + width / 2, top + 11);
  ctx.restore();
}

function drawChest(x, baseY, open = true, scale = 2) {
  pixel(x - 14 * scale, baseY - 9 * scale, 28 * scale, 10 * scale, COLORS.brown);
  pixel(x - 12 * scale, baseY - 7 * scale, 24 * scale, 6 * scale, COLORS.brown2);
  pixel(x - 2 * scale, baseY - 7 * scale, 4 * scale, 5 * scale, COLORS.gold);
  if (open) {
    pixel(x - 14 * scale, baseY - 21 * scale, 28 * scale, 9 * scale, COLORS.brown2);
    pixel(x - 12 * scale, baseY - 19 * scale, 24 * scale, 4 * scale, COLORS.gold);
    pixel(x - 10 * scale, baseY - 27 * scale, 2 * scale, 5 * scale, COLORS.cream);
    pixel(x, baseY - 31 * scale, 2 * scale, 7 * scale, COLORS.cream);
    pixel(x + 9 * scale, baseY - 27 * scale, 2 * scale, 5 * scale, COLORS.cream);
  } else {
    pixel(x - 14 * scale, baseY - 17 * scale, 28 * scale, 8 * scale, COLORS.brown2);
  }
}

function drawGoldenChest(x, baseY, scale = 0.8) {
  pixel(x - 14 * scale, baseY - 9 * scale, 28 * scale, 10 * scale, COLORS.gold);
  pixel(x - 12 * scale, baseY - 7 * scale, 24 * scale, 6 * scale, COLORS.cream);
  pixel(x - 2 * scale, baseY - 7 * scale, 4 * scale, 5 * scale, COLORS.brown);
  pixel(x - 14 * scale, baseY - 21 * scale, 28 * scale, 9 * scale, COLORS.gold);
  pixel(x - 12 * scale, baseY - 19 * scale, 24 * scale, 4 * scale, COLORS.cream);
  pixel(x - 10 * scale, baseY - 27 * scale, 2 * scale, 5 * scale, COLORS.gold);
  pixel(x, baseY - 31 * scale, 2 * scale, 7 * scale, COLORS.cream);
  pixel(x + 9 * scale, baseY - 27 * scale, 2 * scale, 5 * scale, COLORS.gold);
}

function drawCat(x, baseY, scale, frame = 0) {
  const step = frame % 2 === 0 ? 0 : scale;
  const coat = COLORS.catBlue;
  const shadow = COLORS.catBlueDark;
  const light = COLORS.catBlueLight;

  // 参考图的圆润正面蓝猫：头、身体、爪子与卷尾分开，缩小后仍保持清晰。
  pixel(x - 17 * scale, baseY - 12 * scale, 6 * scale, 4 * scale, shadow);
  pixel(x - 21 * scale, baseY - 17 * scale, 6 * scale, 6 * scale, shadow);
  pixel(x - 24 * scale, baseY - 23 * scale, 5 * scale, 8 * scale, shadow);
  pixel(x - 22 * scale, baseY - 22 * scale, 2 * scale, 4 * scale, light);

  pixel(x - 13 * scale, baseY - 17 * scale, 25 * scale, 16 * scale, shadow);
  pixel(x - 11 * scale, baseY - 15 * scale, 21 * scale, 12 * scale, coat);
  pixel(x - 8 * scale, baseY - 14 * scale, 15 * scale, 3 * scale, light);

  pixel(x - 11 * scale, baseY - 7 * scale + step, 4 * scale, 8 * scale - step, shadow);
  pixel(x - 4 * scale, baseY - 7 * scale + (scale - step), 4 * scale, 8 * scale - (scale - step), shadow);
  pixel(x + 4 * scale, baseY - 7 * scale + step, 4 * scale, 8 * scale - step, shadow);
  pixel(x + 10 * scale, baseY - 7 * scale + (scale - step), 4 * scale, 8 * scale - (scale - step), shadow);

  pixel(x - 10 * scale, baseY - 29 * scale, 20 * scale, 18 * scale, shadow);
  pixel(x - 8 * scale, baseY - 33 * scale, 6 * scale, 8 * scale, shadow);
  pixel(x + 2 * scale, baseY - 33 * scale, 6 * scale, 8 * scale, shadow);
  pixel(x - 8 * scale, baseY - 27 * scale, 16 * scale, 14 * scale, light);
  pixel(x - 7 * scale, baseY - 31 * scale, 4 * scale, 5 * scale, coat);
  pixel(x + 3 * scale, baseY - 31 * scale, 4 * scale, 5 * scale, coat);
  pixel(x - 7 * scale, baseY - 29 * scale, 2 * scale, 3 * scale, COLORS.pink);
  pixel(x + 5 * scale, baseY - 29 * scale, 2 * scale, 3 * scale, COLORS.pink);
  pixel(x - 7 * scale, baseY - 24 * scale, 3 * scale, 4 * scale, COLORS.catEye);
  pixel(x + 4 * scale, baseY - 24 * scale, 3 * scale, 4 * scale, COLORS.catEye);
  pixel(x - 6 * scale, baseY - 24 * scale, scale, 4 * scale, COLORS.ink);
  pixel(x + 5 * scale, baseY - 24 * scale, scale, 4 * scale, COLORS.ink);
  pixel(x - 1 * scale, baseY - 20 * scale, 3 * scale, 2 * scale, COLORS.pink);
  pixel(x - 9 * scale, baseY - 19 * scale, 5 * scale, 2 * scale, COLORS.pink);
  pixel(x + 4 * scale, baseY - 19 * scale, 5 * scale, 2 * scale, COLORS.pink);
}

function drawMonster(x, baseY, scale = 2.5, mood = "threat", frame = 0) {
  if (mood === "cat") {
    drawCat(x, baseY, scale, frame);
    return;
  }
  const body = mood === "cat" ? COLORS.brown2 : COLORS.monster;
  const highlight = mood === "cat" ? COLORS.brown : COLORS.monsterLight;
  const eye = mood === "cat" ? COLORS.green3 : COLORS.gold;
  const step = mood === "threat" && frame % 2 !== 0 ? scale : 0;
  const oppositeStep = mood === "threat" ? scale - step : 0;
  if (mood === "threat") {
    // 深色外轮廓和亮色边缘把怪物从蓝灰石墙中明确分离出来。
    pixel(x - 16 * scale, baseY - 28 * scale, 32 * scale, 28 * scale, COLORS.black);
    pixel(x - 14 * scale, baseY - 40 * scale, 28 * scale, 18 * scale, COLORS.black);
    pixel(x - 14 * scale, baseY - 46 * scale, 11 * scale, 11 * scale, COLORS.black);
    pixel(x + 3 * scale, baseY - 46 * scale, 11 * scale, 11 * scale, COLORS.black);
    pixel(x - 21 * scale, baseY - 21 * scale, 8 * scale, 21 * scale, COLORS.black);
    pixel(x + 13 * scale, baseY - 20 * scale, 8 * scale, 20 * scale, COLORS.black);
    pixel(x + 15 * scale, baseY - 28 * scale, 15 * scale, 6 * scale, COLORS.black);
    pixel(x + 25 * scale, baseY - 40 * scale, 6 * scale, 18 * scale, COLORS.black);
  }
  pixel(x - 14 * scale, baseY - 26 * scale, 28 * scale, 24 * scale, body);
  pixel(x - 12 * scale, baseY - 37 * scale, 24 * scale, 16 * scale, body);
  pixel(x - 12 * scale, baseY - 43 * scale, 8 * scale, 9 * scale, body);
  pixel(x + 4 * scale, baseY - 43 * scale, 8 * scale, 9 * scale, body);
  pixel(x - 7 * scale, baseY - 34 * scale, 3 * scale, 3 * scale, eye);
  pixel(x + 4 * scale, baseY - 34 * scale, 3 * scale, 3 * scale, eye);
  pixel(x - 19 * scale, baseY - 19 * scale + step, 7 * scale, 18 * scale - step, body);
  pixel(x + 12 * scale, baseY - 17 * scale + oppositeStep, 7 * scale, 16 * scale - oppositeStep, body);
  pixel(x + 14 * scale, baseY - 25 * scale, 13 * scale, 4 * scale, body);
  pixel(x + 24 * scale, baseY - 37 * scale, 4 * scale, 16 * scale, body);
  pixel(x - 10 * scale, baseY - 39 * scale, 5 * scale, 3 * scale, highlight);
  pixel(x - 13 * scale, baseY - 23 * scale, 4 * scale, 15 * scale, highlight);
  pixel(x + 10 * scale, baseY - 21 * scale, 3 * scale, 13 * scale, highlight);
  if (mood === "threat") {
    pixel(x - 11 * scale, baseY - 43 * scale, 6 * scale, 2 * scale, COLORS.monsterRim);
    pixel(x - 14 * scale, baseY - 27 * scale, 3 * scale, 5 * scale, COLORS.monsterRim);
    pixel(x - 8 * scale, baseY - 36 * scale, 3 * scale, 2 * scale, COLORS.white);
    pixel(x + 4 * scale, baseY - 36 * scale, 3 * scale, 2 * scale, COLORS.white);
  }
}

function drawSword(x, y, scale = 1) {
  pixel(x, y, 2 * scale, 14 * scale, COLORS.stone2);
  pixel(x - 3 * scale, y + 12 * scale, 8 * scale, 2 * scale, COLORS.gold);
  pixel(x, y + 14 * scale, 2 * scale, 5 * scale, COLORS.brown);
}

function drawSwordSwing(x, y, scale = 1, progress = 0) {
  const swing = Math.sin(progress * Math.PI);
  const angle = -1.15 + swing * 2.3;
  ctx.save();
  ctx.translate(x, y);
  ctx.rotate(angle);
  drawSword(-scale, -18 * scale, scale);
  ctx.restore();

  if (progress > 0.18 && progress < 0.88) {
    const trail = Math.round((1 - Math.abs(progress - 0.53) / 0.35) * 5);
    for (let index = 0; index < trail; index += 1) {
      const trailAngle = angle - 0.28 - index * 0.12;
      const trailX = x + Math.round(Math.cos(trailAngle) * (14 + index * 3) * scale);
      const trailY = y + Math.round(Math.sin(trailAngle) * (14 + index * 3) * scale);
      pixel(trailX, trailY, Math.max(1, scale), Math.max(1, scale), COLORS.cream);
    }
  }
}

function drawFinisherSword(x, y, scale, progress) {
  const angle = -1.05 + Math.min(1, progress) * 1.95;
  ctx.save();
  ctx.translate(x, y);
  ctx.rotate(angle);
  drawSword(-scale, -18 * scale, scale);
  pixel(-2 * scale, -14 * scale, 1 * scale, 7 * scale, COLORS.white);
  ctx.restore();
}

function drawObstacle(x, baseY) {
  pixel(x - FOREST_STUMP.halfWidth, baseY - FOREST_STUMP.height, FOREST_STUMP.halfWidth * 2, FOREST_STUMP.height, COLORS.brown);
  pixel(x - 8, baseY - 16, 16, 4, COLORS.brown2);
  pixel(x - 5, baseY - 14, 3, 11, COLORS.paper);
  pixel(x - 2, baseY - 13, 2, 9, COLORS.brown2);
  pixel(x + 5, baseY - 14, 3, 11, COLORS.brown2);
  pixel(x - FOREST_STUMP.halfWidth, baseY - 2, FOREST_STUMP.halfWidth * 2, 2, COLORS.brown2);
}

function createFireworks() {
  const centerX = W * 0.72;
  const centerY = H * 0.22;
  for (let i = 0; i < 28; i += 1) {
    const angle = (Math.PI * 2 * i) / 28;
    state.particles.push({
      x: centerX,
      y: centerY,
      vx: Math.cos(angle) * (10 + (i % 4) * 3),
      vy: Math.sin(angle) * (10 + (i % 4) * 3),
      life: 1,
      color: i % 3 === 0 ? COLORS.cream : i % 3 === 1 ? COLORS.gold : COLORS.red,
    });
  }
  sound("magic");
}

function updateParticles(delta) {
  state.particles.forEach((particle) => {
    particle.x += particle.vx * delta;
    particle.y += particle.vy * delta;
    particle.vy += 9 * delta;
    particle.life -= delta * 0.5;
  });
  state.particles = state.particles.filter((particle) => particle.life > 0);
}

function drawParticles() {
  state.particles.forEach((particle) => {
    pixel(particle.x, particle.y, particle.life > 0.5 ? 3 : 2, particle.life > 0.5 ? 3 : 2, particle.color);
  });
}

function drawTitleScene(time) {
  drawSky(time, true);
  const hillY = H * 0.81;
  pixel(0, hillY, W, H - hillY, COLORS.green);
  // 城堡是远景主建筑；两棵巨树只负责框景，不再与人物争抢同一尺度。
  drawTree(20, hillY + 4, 2.35, 0);
  drawTree(W - 19, hillY + 4, 2.55, 1);
  const castleScale = Math.min(1.82, 1.5 + (H - 384) / 260);
  drawCastle(W / 2, hillY + 5, castleScale, true);
  const frame = Math.floor(time * 2);
  const baseY = H - 24;
  drawHuman(W / 2 - 38, baseY, 1.7, "princess", frame, 1);
  drawHuman(W / 2, baseY, 1.7, "prince", frame, 1);
  drawMonster(W / 2 + 34, baseY, 0.72, "cat", frame);
}

function drawBriefingScene(time) {
  drawSky(time, false);
  pixel(0, H * 0.71, W, H * 0.29, COLORS.green);
  drawTree(15, H * 0.72, 2.55, 0);
  drawTree(W - 14, H * 0.72, 2.7, 1);
  drawCastle(W / 2, H * 0.71 + 6, Math.min(1.76, 1.46 + (H - 384) / 270), true);

  // “据传”过场：小怪物在前、公主在后，一同向右走。
  // 怪物略小于公主，提前埋下它并非真正巨兽的喜剧伏笔。
  const travel = ((state.sceneElapsed * 34) % (W + 92)) - 46;
  const walkFrame = Math.floor(time * 7);
  const walkBase = H * 0.82;
  drawMonster(travel + 25, walkBase, 0.64, "threat", walkFrame);
  drawHuman(travel, walkBase, 1.62, "princess", walkFrame, 1);
}

function drawForestScene(time) {
  drawForest(time, false);
  const groundY = Math.round(H * 0.59);
  const obstacleX = W * FOREST_STUMP.xRatio;
  drawObstacle(obstacleX, groundY);
  const lights = [
    { x: W * 0.34, y: 9 },
    { x: W * 0.59, y: 28 },
    { x: W * 0.81, y: 10 },
  ];
  lights.forEach((light, index) => {
    if (state.forestLights[index]) return;
    const glow = Math.floor(time * 6 + index) % 2 === 0 ? 3 : 2;
    pixel(light.x - glow / 2, groundY - light.y - glow, glow, glow, COLORS.gold);
    pixel(light.x, groundY - light.y - glow - 3, 1, 2, COLORS.cream);
  });
  const frame = Math.floor(time * 8);
  const warriorX = state.playerX;
  const princeX = warriorX - 18;
  drawHuman(princeX, groundY - state.playerY, 1.35, "prince", frame, 1);
  drawHuman(warriorX, groundY - state.playerY, 1.45, "warrior", frame, 1);
}

function drawGuardScene(time) {
  drawForest(time * 0.1, true);
  if (state.phase === "finisher") {
    const groundY = Math.round(H * 0.59);
    const finisherTime = state.elapsed - state.finisherStartedAt;
    const warriorX = state.playerX;
    const princeX = warriorX + FOREST_PARTY.companionOffset;
    const guardX = state.guardX;
    const attackFrame = Math.floor(time * 3);
    const actionProgress = Math.min(1, Math.max(0, (finisherTime - 1) / 2));
    const swordScale = 3.4;
    const flash = finisherTime >= 3.1 && finisherTime < 5.1;
    const chestVisible = finisherTime >= 5.1;

    if (finisherTime < 3) {
      drawGuard(guardX, groundY, 1.7, false);
    } else if (!chestVisible) {
      if (flash && Math.floor(finisherTime * 8) % 2 === 0) {
        drawSeatedGuard(guardX - 1, groundY, 1.15, true);
        drawSeatedGuard(guardX + 1, groundY, 1.15, true);
        drawSeatedGuard(guardX, groundY - 1, 1.15, true);
        drawSeatedGuard(guardX, groundY + 1, 1.15, true);
      }
      drawSeatedGuard(guardX, groundY, 1.15);
    } else {
      drawGoldenChest(guardX, groundY, 0.8);
    }
    drawHuman(princeX, groundY - state.playerY, 1.4, "prince", attackFrame, 1);
    drawHuman(warriorX, groundY - state.playerY, 1.45, "warrior", attackFrame, 1);
    if (finisherTime >= 1 && finisherTime < 3) {
      drawFinisherSword(warriorX + 8, groundY - state.playerY - 22, swordScale, actionProgress);
    }
    if (finisherTime < 3) {
      drawFinisherBubble(princeX, groundY - state.playerY - 98);
    }

    return;
  }
  const attacking = state.phase === "attacking";
  const hit = attacking && state.attackConnected;
  const groundY = Math.round(H * 0.59);
  if (state.guardHits < 3 || hit) drawGuard(state.guardX, groundY, 1.7, hit);
  const warriorX = state.playerX;
  const princeX = warriorX + FOREST_PARTY.companionOffset;
  drawHuman(princeX, groundY - state.playerY, 1.4, "prince", Math.floor(time * 3), 1);
  drawHuman(warriorX, groundY - state.playerY, 1.45, "warrior", Math.floor(time * 3), 1);
  if (attacking) {
    const attackProgress = Math.min(1, (state.elapsed - state.attackStartedAt) / 0.36);
    drawSwordSwing(state.playerX + 8, groundY - state.playerY - 22, 1.2, attackProgress);
  }
}

function drawTreasureScene(time) {
  drawForest(time * 0.08, false);
  const groundY = Math.round(H * 0.59);
  drawGoldenChest(state.treasureX || W * 0.66, groundY, 0.8);
  drawHuman(state.playerX + FOREST_PARTY.companionOffset, groundY, 1.4, "prince", 0, 1);
  drawHuman(state.playerX, groundY, 1.45, "warrior", 0, 1);
}

function drawCastleInterior(time) {
  pixel(0, 0, W, H, "#242a43");
  pixel(0, 0, W, 18, "#151a31");

  // 大尺度石墙分区，避免密集小砖与角色争夺注意力。
  for (let y = 30; y < H * 0.7; y += 36) {
    const offset = (Math.floor(y / 36) % 2) * 24;
    for (let x = -offset; x < W; x += 48) {
      pixel(x + 2, y, 34, 3, "#323a55");
    }
  }

  // 两侧石柱、红色长旗和暖色壁灯构成正式大厅。
  [18, W - 28].forEach((x, index) => {
    pixel(x, H * 0.16, 11, H * 0.56, COLORS.stone);
    pixel(x - 3, H * 0.15, 17, 8, COLORS.stone2);
    pixel(x - 3, H * 0.69, 17, 8, "#4d566b");
    const bannerX = index === 0 ? x + 18 : x - 17;
    pixel(bannerX, H * 0.2, 10, 64, COLORS.redDark);
    pixel(bannerX + 2, H * 0.2 + 8, 6, 6, COLORS.gold);
  });
  pixel(W * 0.08, H * 0.18, 15, 7, COLORS.gold);
  pixel(W * 0.81, H * 0.18, 15, 7, COLORS.gold);
  pixel(0, H * 0.72, W, H * 0.28, COLORS.ink);
  pixel(0, H * 0.72, W, 6, COLORS.stone);
}

function drawCastleScene(time) {
  drawCastleInterior(time);
  const breath = 1 + Math.sin(time * 2.4) * 0.025;
  drawMonster(W / 2, H * 0.52, 3.25 * breath, "threat");
  const frame = Math.floor(time * 8);
  const partyBase = H * 0.64;
  drawHuman(state.playerX - 18, partyBase - state.playerY, 1.45, "warrior", frame, 1);
  drawHuman(state.playerX + 18, partyBase - state.playerY, 1.45, "prince", frame, -1);
  if (state.phase === "sword") {
    drawSword(state.playerX - 8, partyBase - state.playerY - 27, 1.15);
  }
}

function drawBranchScene(time) {
  drawCastleInterior(time);
  drawHuman(W * 0.27, H * 0.58, 1.45, "princess", 0);
  const catX = W * 0.59;
  const catBase = H * 0.62;

  if (state.phase === "egg") {
    const eggX = W * 0.5 + Math.sin(time * 3.2) * W * 0.28;
    const catFollow = catX + Math.sin(time * 3.2 - 0.55) * W * 0.2;
    drawMonster(catFollow, catBase, 2.65, "threat");
    drawItem(ctx, "egg", eggX - 9, H * 0.67, 1.5);
  } else {
    drawMonster(catX, catBase, 2.65, "threat");
    drawItem(ctx, state.phase, W * 0.7, H * 0.65, 1.7);
  }

  if (state.phase === "can") {
    drawParticles();
    pixel(W * 0.64, H * 0.39, 3, 20, COLORS.red);
    pixel(W * 0.66, H * 0.35, 5, 7, COLORS.gold);
  }
}

function drawRevealScene(time) {
  drawCastleInterior(time);
  const progress = state.phase === "cat" ? 1 : Math.min(1, state.sceneElapsed / 1.4);
  const scale = 3.1 - progress * 2.38;
  const mood = state.phase === "cat" ? "cat" : "threat";
  const flickerX = state.phase === "shrinking" && Math.floor(time * 14) % 2 === 0 ? 2 : 0;
  const lineupProgress = Math.max(0, Math.min(1, (progress - 0.55) / 0.45));
  const partyBase = H * 0.74;
  const princessX = W / 2 - 18 - lineupProgress * 20;
  const princeX = W / 2 + 18 - lineupProgress * 18;
  const monsterBase = H * (0.6 + progress * 0.07);

  if (mood === "cat") {
    drawHuman(W / 2 - 38, partyBase, 1.7, "princess", 0, 1);
    drawHuman(W / 2, partyBase, 1.7, "prince", 0, 1);
    drawMonster(W / 2 + 34, partyBase, 0.72, mood);
  } else {
    drawMonster(W / 2 + flickerX, monsterBase, scale, mood);
    drawHuman(princessX, partyBase, 1.45 + lineupProgress * 0.25, "princess", 0, 1);
    drawHuman(princeX, partyBase, 1.45 + lineupProgress * 0.25, "prince", 0, 1);
  }
}

function drawCoupleScene(time, photoMode = false) {
  drawSky(time, false);
  pixel(0, H * 0.73, W, H * 0.27, COLORS.green);
  drawTree(15, H * 0.74, 2.5, 0);
  drawTree(W - 14, H * 0.74, 2.65, 1);
  drawCastle(W / 2, H * 0.73 + 5, Math.min(1.78, 1.48 + (H - 384) / 270), true);
  const baseY = H * 0.72;
  drawHuman(W / 2 - 15, baseY, 1.75, "prince", 0);
  drawHuman(W / 2 + 16, baseY, 1.75, "princess", 0, -1);
  pixel(W / 2 - 4, baseY - 15, 8, 3, COLORS.gold);
  if (photoMode) {
    const corner = 13;
    const length = 22;
    pixel(corner, corner + 18, length, 2, COLORS.cream);
    pixel(corner, corner + 18, 2, length, COLORS.cream);
    pixel(W - corner - length, corner + 18, length, 2, COLORS.cream);
    pixel(W - corner - 2, corner + 18, 2, length, COLORS.cream);
    pixel(corner, H - corner - 18, length, 2, COLORS.cream);
    pixel(corner, H - corner - 18 - length, 2, length, COLORS.cream);
    pixel(W - corner - length, H - corner - 18, length, 2, COLORS.cream);
    pixel(W - corner - 2, H - corner - 18 - length, 2, length, COLORS.cream);
  }
}

function drawPosterPortrait() {
  const portraitCtx = posterCanvas.getContext("2d");
  if (welcomePhoto.complete && welcomePhoto.naturalWidth > 0) {
    posterPortrait.classList.add("photo-mode");
    poster.classList.add("photo-mode");
    poster.style.setProperty("--welcome-photo", `url("${welcomePhotoUrl}")`);
    const canvasWidth = posterCanvas.width;
    const canvasHeight = posterCanvas.height;
    const imageRatio = welcomePhoto.naturalWidth / welcomePhoto.naturalHeight;
    const canvasRatio = canvasWidth / canvasHeight;
    let sourceWidth = welcomePhoto.naturalWidth;
    let sourceHeight = welcomePhoto.naturalHeight;
    let sourceX = 0;
    let sourceY = 0;
    if (imageRatio > canvasRatio) {
      sourceWidth = welcomePhoto.naturalHeight * canvasRatio;
      sourceX = (welcomePhoto.naturalWidth - sourceWidth) / 2;
    } else {
      sourceHeight = welcomePhoto.naturalWidth / canvasRatio;
      sourceY = (welcomePhoto.naturalHeight - sourceHeight) / 2;
    }
    portraitCtx.imageSmoothingEnabled = true;
    portraitCtx.drawImage(welcomePhoto, sourceX, sourceY, sourceWidth, sourceHeight, 0, 0, canvasWidth, canvasHeight);
    return;
  }
  posterPortrait.classList.remove("photo-mode");
  poster.classList.remove("photo-mode");
  poster.style.removeProperty("--welcome-photo");
  portraitCtx.imageSmoothingEnabled = false;
  portraitCtx.fillStyle = COLORS.sky;
  portraitCtx.fillRect(0, 0, 160, 144);
  portraitCtx.fillStyle = COLORS.green;
  portraitCtx.fillRect(0, 94, 160, 50);

  function pRect(x, y, w, h, c) {
    portraitCtx.fillStyle = c;
    portraitCtx.fillRect(Math.round(x), Math.round(y), Math.round(w), Math.round(h));
  }

  function portraitHuman(x, baseY, scale, role, facing = 1) {
    const hair = role === "princess" ? COLORS.brown2 : COLORS.gold;
    const body = role === "princess" ? COLORS.red : COLORS.cream;
    const accent = role === "princess" ? COLORS.cream : COLORS.red;
    const skin = "#e7ad72";
    pRect(x - 4 * scale, baseY - 17 * scale, 8 * scale, 6 * scale, hair);
    pRect(x - 3 * scale, baseY - 15 * scale, 6 * scale, 5 * scale, skin);
    pRect(x + facing * 2 * scale, baseY - 14 * scale, scale, scale, COLORS.ink);
    pRect(x - 4 * scale, baseY - 10 * scale, 8 * scale, 8 * scale, body);
    pRect(x - 5 * scale, baseY - 8 * scale, scale, 6 * scale, accent);
    pRect(x + 4 * scale, baseY - 8 * scale, scale, 6 * scale, accent);
    if (role === "princess") {
      pRect(x - 6 * scale, baseY - 5 * scale, 12 * scale, 5 * scale, body);
      pRect(x - scale, baseY - 20 * scale, 2 * scale, 2 * scale, COLORS.gold);
    } else {
      pRect(x - 3 * scale, baseY - 2 * scale, 2 * scale, 4 * scale, COLORS.ink);
      pRect(x + scale, baseY - 2 * scale, 2 * scale, 4 * scale, COLORS.ink);
    }
  }

  // 与游戏远景一致的对称红顶婚礼城堡。
  pRect(45, 75, 70, 7, "#4d566b");
  pRect(56, 40, 48, 35, COLORS.stone);
  pRect(61, 34, 38, 8, COLORS.stone2);
  [48, 112].forEach((towerX) => {
    pRect(towerX - 8, 43, 16, 32, COLORS.stone2);
    pRect(towerX - 10, 40, 20, 4, "#4d566b");
    pRect(towerX - 7, 34, 14, 6, COLORS.red);
    pRect(towerX - 4, 29, 8, 5, COLORS.redDark);
    pRect(towerX - 1, 25, 2, 4, COLORS.gold);
    pRect(towerX - 2, 52, 4, 8, COLORS.gold);
  });
  pRect(59, 31, 42, 4, COLORS.red);
  pRect(66, 25, 28, 6, COLORS.redDark);
  pRect(73, 20, 14, 5, COLORS.redDark);
  pRect(79, 13, 2, 7, COLORS.gold);
  pRect(81, 13, 9, 3, COLORS.red);
  pRect(76, 46, 8, 7, COLORS.gold);
  pRect(69, 59, 22, 16, COLORS.gold);
  pRect(72, 57, 16, 18, COLORS.ink);
  pRect(79, 58, 2, 17, "#4d566b");
  portraitHuman(66, 124, 2, "prince", 1);
  portraitHuman(94, 124, 2, "princess", -1);

  for (let i = 0; i < 16; i += 1) {
    pRect((i * 37 + 9) % 160, (i * 19 + 7) % 72, i % 3 === 0 ? 2 : 1, i % 3 === 0 ? 2 : 1, COLORS.gold);
  }

}

function drawScene(time) {
  const shakeX = state.screenShake > 0 ? Math.round(Math.sin(time * 80) * state.screenShake) : 0;
  const shakeY = state.screenShake > 0 ? Math.round(Math.cos(time * 70) * state.screenShake * 0.5) : 0;
  ctx.save();
  ctx.translate(shakeX, shakeY);
  if (state.scene === "title") drawTitleScene(time);
  else if (state.scene === "briefing") drawBriefingScene(time);
  else if (state.scene === "warrior-name") drawBriefingScene(time);
  else if (state.scene === "forest") drawForestScene(time);
  else if (state.scene === "guard") drawGuardScene(time);
  else if (state.scene === "treasure") drawTreasureScene(time);
  else if (state.scene === "castle") drawCastleScene(time);
  else if (state.scene === "branch") drawBranchScene(time);
  else if (state.scene === "reveal") drawRevealScene(time);
  else if (state.scene === "couple") drawCoupleScene(time, false);
  else if (state.scene === "photo") drawCoupleScene(time, true);
  else drawTitleScene(time);
  ctx.restore();
}

function frame(now) {
  const delta = Math.min(0.05, (now - lastFrame) / 1000);
  lastFrame = now;
  if (!paused) {
    state.elapsed += delta;
    state.sceneElapsed += delta;
    state.screenShake = Math.max(0, state.screenShake - delta * 19);
    if (state.scene !== "poster") {
      updateGameplay(delta);
      updateParticles(delta);
      drawScene(state.elapsed);
    }
  }
  requestAnimationFrame(frame);
}

document.querySelectorAll(".choice").forEach((button) => {
  button.addEventListener("click", () => chooseTreasure(button.dataset.item));
});

skipAction.addEventListener("click", showPosterDirectly);
signatureAction.addEventListener("click", () => openFeature("signature"));
albumAction.addEventListener("click", () => openFeature("album"));
document.querySelectorAll("[data-close-feature]").forEach(button => button.addEventListener("click", closeFeature));
document.querySelector("#album-prev").addEventListener("click", () => {
  albumIndex = (albumIndex - 1 + GAME_CONFIG.albumPhotos.length) % GAME_CONFIG.albumPhotos.length;
  renderAlbum();
});
document.querySelector("#album-next").addEventListener("click", () => {
  albumIndex = (albumIndex + 1) % GAME_CONFIG.albumPhotos.length;
  renderAlbum();
});
document.querySelectorAll("[data-signature-tab]").forEach(button => button.addEventListener("click", () => {
  document.querySelectorAll("[data-signature-tab]").forEach(tab => tab.classList.toggle("active", tab === button));
  const drawing = button.dataset.signatureTab === "draw";
  show(drawPanel, drawing);
  show(typePanel, !drawing);
}));
document.querySelector("#clear-signature").addEventListener("click", clearSignaturePad);
document.querySelector("#submit-signature").addEventListener("click", submitSignature);

function openImageLightbox() {
  lightboxImage.src = signaturePhoto.currentSrc || signaturePhoto.src;
  show(imageLightbox, true);
  closeLightbox.focus();
}

function closeImageLightbox() {
  show(imageLightbox, false);
}

signaturePreview.addEventListener("click", openImageLightbox);
closeLightbox.addEventListener("click", closeImageLightbox);
imageLightbox.addEventListener("click", event => {
  if (event.target === imageLightbox) closeImageLightbox();
});
document.addEventListener("keydown", event => {
  if (event.key === "Escape" && !imageLightbox.classList.contains("hidden")) closeImageLightbox();
});

signaturePad.addEventListener("pointerdown", event => {
  signatureDrawing = true;
  signaturePad.setPointerCapture(event.pointerId);
  const point = getPadPoint(event);
  const signatureContext = signaturePad.getContext("2d");
  signatureContext.beginPath();
  signatureContext.moveTo(point.x, point.y);
});
signaturePad.addEventListener("pointermove", event => {
  if (!signatureDrawing) return;
  const point = getPadPoint(event);
  const signatureContext = signaturePad.getContext("2d");
  signatureContext.lineTo(point.x, point.y);
  signatureContext.strokeStyle = "#71232d";
  signatureContext.lineWidth = 7;
  signatureContext.lineCap = "round";
  signatureContext.lineJoin = "round";
  signatureContext.stroke();
  signatureHasInk = true;
});
signaturePad.addEventListener("pointerup", () => { signatureDrawing = false; });
signaturePad.addEventListener("pointercancel", () => { signatureDrawing = false; });

document.querySelectorAll("[data-control]").forEach((button) => {
  const control = button.dataset.control;
  const press = (event) => {
    event.preventDefault();
    if (control === "jump") jumpPlayer();
    else if (control === "attack") attackGuard();
    else state.controls[control] = true;
  };
  const release = (event) => {
    event.preventDefault();
    if (control === "left" || control === "right") state.controls[control] = false;
  };
  button.addEventListener("pointerdown", press);
  button.addEventListener("pointerup", release);
  button.addEventListener("pointercancel", release);
  button.addEventListener("pointerleave", release);
});

document.addEventListener("keydown", (event) => {
  if (event.key === "ArrowLeft" || event.key.toLowerCase() === "a") state.controls.left = true;
  if (event.key === "ArrowRight" || event.key.toLowerCase() === "d") state.controls.right = true;
  if (event.key === " " || event.key === "ArrowUp" || event.key.toLowerCase() === "w") {
    event.preventDefault();
    if (!event.repeat) jumpPlayer();
  }
  if (event.key.toLowerCase() === "j" || event.key.toLowerCase() === "k") {
    event.preventDefault();
    if (!event.repeat) attackGuard();
  }
});

document.addEventListener("keyup", (event) => {
  if (event.key === "ArrowLeft" || event.key.toLowerCase() === "a") state.controls.left = false;
  if (event.key === "ArrowRight" || event.key.toLowerCase() === "d") state.controls.right = false;
});

warriorNameForm.addEventListener("submit", (event) => {
  event.preventDefault();
  state.warriorName = warriorNameInput.value.trim().slice(0, 12);
  sound("confirm");
  setScene("forest");
});


document.addEventListener("visibilitychange", () => {
  paused = document.hidden;
  lastFrame = performance.now();
});

window.addEventListener("resize", resizeCanvas, { passive: true });

document.querySelector("#groom-name").textContent = GAME_CONFIG.groom;
document.querySelector("#bride-name").textContent = GAME_CONFIG.bride;
document.querySelector("#wedding-date").textContent = GAME_CONFIG.date;
document.querySelector("#wedding-venue").textContent = GAME_CONFIG.venue;

resizeCanvas();
setScene("title");
requestAnimationFrame(frame);
