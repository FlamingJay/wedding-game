import { mkdir, readFile, writeFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { randomUUID } from "node:crypto";
import { fileURLToPath } from "node:url";
import http from "node:http";

const root = dirname(fileURLToPath(import.meta.url));
const port = Number(process.env.PORT || 8787);
const frontendOrigin = process.env.FRONTEND_ORIGIN || "http://127.0.0.1:4173";
const dataFile = resolve(root, process.env.DATA_FILE || "./data/blessings.json");
const maxBodyBytes = 1_500_000;

const send = (response, status, payload, extraHeaders = {}) => {
  response.writeHead(status, {
    "Content-Type": "application/json; charset=utf-8",
    "Cache-Control": "no-store",
    "Access-Control-Allow-Origin": frontendOrigin,
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Allow-Methods": "GET,POST,OPTIONS",
    ...extraHeaders,
  });
  response.end(payload === undefined ? undefined : JSON.stringify(payload));
};

const readBlessings = async () => {
  try {
    return JSON.parse(await readFile(dataFile, "utf8"));
  } catch (error) {
    if (error.code === "ENOENT") return [];
    throw error;
  }
};

const saveBlessings = async (blessings) => {
  await mkdir(dirname(dataFile), { recursive: true });
  await writeFile(dataFile, `${JSON.stringify(blessings, null, 2)}\n`, "utf8");
};

const readJsonBody = (request) => new Promise((resolveBody, reject) => {
  let body = "";
  let size = 0;
  request.setEncoding("utf8");
  request.on("data", chunk => {
    size += Buffer.byteLength(chunk);
    if (size > maxBodyBytes) {
      reject(Object.assign(new Error("Request body is too large"), { statusCode: 413 }));
      request.destroy();
      return;
    }
    body += chunk;
  });
  request.on("end", () => {
    try {
      resolveBody(body ? JSON.parse(body) : {});
    } catch {
      reject(Object.assign(new Error("Request body must be valid JSON"), { statusCode: 400 }));
    }
  });
  request.on("error", reject);
});

const validateBlessing = (payload) => {
  const text = typeof payload.text === "string" ? payload.text.trim() : "";
  const signatureDataUrl = typeof payload.signatureDataUrl === "string" ? payload.signatureDataUrl : null;
  const position = payload.position && typeof payload.position === "object" ? payload.position : {};
  if (!text && !signatureDataUrl) throw Object.assign(new Error("text or signatureDataUrl is required"), { statusCode: 400 });
  if (text.length > 200) throw Object.assign(new Error("text must be 200 characters or fewer"), { statusCode: 400 });
  if (signatureDataUrl && !/^data:image\/(png|jpeg);base64,/.test(signatureDataUrl)) {
    throw Object.assign(new Error("signatureDataUrl must be a PNG or JPEG data URL"), { statusCode: 400 });
  }
  return {
    text,
    signatureDataUrl,
    position: {
      x: Number.isFinite(Number(position.x)) ? Math.min(1, Math.max(0, Number(position.x))) : 0.5,
      y: Number.isFinite(Number(position.y)) ? Math.min(1, Math.max(0, Number(position.y))) : 0.8,
    },
  };
};

const server = http.createServer(async (request, response) => {
  if (request.method === "OPTIONS") return send(response, 204);
  const url = new URL(request.url, `http://${request.headers.host || "localhost"}`);

  try {
    if (request.method === "GET" && url.pathname === "/health") {
      return send(response, 200, { ok: true, service: "wedding-game-api" });
    }

    if (request.method === "POST" && url.pathname === "/api/blessings") {
      const payload = validateBlessing(await readJsonBody(request));
      const blessing = { id: randomUUID(), ...payload, createdAt: new Date().toISOString() };
      const blessings = await readBlessings();
      blessings.push(blessing);
      await saveBlessings(blessings);
      return send(response, 201, { data: blessing });
    }

    if (request.method === "GET" && url.pathname === "/api/blessings") {
      const blessings = await readBlessings();
      return send(response, 200, { data: blessings });
    }

    const match = url.pathname.match(/^\/api\/blessings\/([^/]+)$/);
    if (request.method === "GET" && match) {
      const blessing = (await readBlessings()).find(item => item.id === match[1]);
      return blessing ? send(response, 200, { data: blessing }) : send(response, 404, { error: "Blessing not found" });
    }

    return send(response, 404, { error: "Not found" });
  } catch (error) {
    console.error(error);
    return send(response, error.statusCode || 500, { error: error.statusCode ? error.message : "Internal server error" });
  }
});

server.listen(port, () => {
  console.log(`Wedding Game API listening on http://127.0.0.1:${port}`);
});
