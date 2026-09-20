import { mkdir, readFile, unlink, writeFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { randomUUID } from "node:crypto";
import { fileURLToPath } from "node:url";
import http from "node:http";

const root = dirname(fileURLToPath(import.meta.url));
const port = Number(process.env.PORT || 8787);
const frontendOrigin = process.env.FRONTEND_ORIGIN || "http://127.0.0.1:4173";
const dataFile = resolve(root, process.env.DATA_FILE || "./data/blessings.json");
const signatureDir = resolve(root, process.env.SIGNATURE_DIR || "./data/signatures");
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
  if (signatureDataUrl && !/^data:image\/png;base64,/.test(signatureDataUrl)) {
    throw Object.assign(new Error("signatureDataUrl must be a PNG data URL"), { statusCode: 400 });
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

const toPublicBlessing = (blessing) => {
  const { signatureDataUrl, ...metadata } = blessing;
  return {
    ...metadata,
    ...(signatureDataUrl ? { signatureUrl: `/api/blessings/${blessing.id}/signature.png` } : {}),
  };
};

const saveSignature = async (id, signatureDataUrl) => {
  if (!signatureDataUrl) return null;
  const encoded = signatureDataUrl.slice("data:image/png;base64,".length);
  const signature = Buffer.from(encoded, "base64");
  if (!signature.length || signature.length > maxBodyBytes) {
    throw Object.assign(new Error("signature image is too large"), { statusCode: 413 });
  }
  await mkdir(signatureDir, { recursive: true });
  await writeFile(resolve(signatureDir, `${id}.png`), signature, { flag: "wx" });
  return `/api/blessings/${id}/signature.png`;
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
      const id = randomUUID();
      const signatureUrl = await saveSignature(id, payload.signatureDataUrl);
      const { signatureDataUrl, ...metadata } = payload;
      const blessing = { id, ...metadata, ...(signatureUrl ? { signatureUrl } : {}), createdAt: new Date().toISOString() };
      const blessings = await readBlessings();
      try {
        blessings.push(blessing);
        await saveBlessings(blessings);
      } catch (error) {
        if (signatureUrl) await unlink(resolve(signatureDir, `${id}.png`)).catch(() => {});
        throw error;
      }
      return send(response, 201, { data: toPublicBlessing(blessing) });
    }

    if (request.method === "GET" && url.pathname === "/api/blessings") {
      const blessings = await readBlessings();
      return send(response, 200, { data: blessings.map(toPublicBlessing) });
    }

    const signatureMatch = url.pathname.match(/^\/api\/blessings\/([^/]+)\/signature\.png$/);
    if (request.method === "GET" && signatureMatch) {
      const blessing = (await readBlessings()).find(item => item.id === signatureMatch[1]);
      if (!blessing || !blessing.signatureUrl) return send(response, 404, { error: "Signature not found" });
      const signature = await readFile(resolve(signatureDir, `${blessing.id}.png`));
      response.writeHead(200, {
        "Content-Type": "image/png",
        "Cache-Control": "public, max-age=31536000, immutable",
        "Access-Control-Allow-Origin": frontendOrigin,
        "Content-Disposition": `inline; filename="signature-${blessing.id}.png"`,
      });
      return response.end(signature);
    }

    const match = url.pathname.match(/^\/api\/blessings\/([^/]+)$/);
    if (request.method === "GET" && match) {
      const blessing = (await readBlessings()).find(item => item.id === match[1]);
      return blessing ? send(response, 200, { data: toPublicBlessing(blessing) }) : send(response, 404, { error: "Blessing not found" });
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
