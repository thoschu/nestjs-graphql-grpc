#!/usr/bin/env bash

# =========================
# Configuration
# =========================
IMAGE_NAME="apachepulsar/pulsar:4.1.2"
CONTAINER_NAME="pulsar"
PORT_MAPPING_1="8080:8080"
PORT_MAPPING_2="6650:6650"

# =========================
# 1️⃣ Docker installiert?
# =========================
if ! command -v docker >/dev/null 2>&1; then
  echo "❌  Docker ist nicht installiert. Bitte Docker installieren."
  exit 1
fi
echo "✅  Docker ist installiert."

# =========================
# 2️⃣ Docker läuft?
# =========================
if ! docker info >/dev/null 2>&1; then
  echo "❌  Docker läuft nicht. BITTE STARTEN!"
  exit 2
fi
echo "✅  Docker läuft."

# =========================
# 3️⃣ Container läuft bereits?
# =========================
if docker ps --filter "name=^/${CONTAINER_NAME}$" --format '{{.Names}}' | grep -q "^${CONTAINER_NAME}$"; then
  echo "ℹ️ Container '$CONTAINER_NAME' läuft bereits."
  exit 0
fi

# =========================
# 4️⃣ Container existiert (gestoppt)?
# =========================
if docker ps -a --filter "name=^/${CONTAINER_NAME}$" --format '{{.Names}}' | grep -q "^${CONTAINER_NAME}$"; then
  echo "▶️  Container existiert, wird gestartet..."
  docker start "$CONTAINER_NAME"
  exit 0
fi

# =========================
# 5️⃣ Image vorhanden?
# =========================
if ! docker image inspect "$IMAGE_NAME" >/dev/null 2>&1; then
  echo "📦 Image nicht vorhanden – wird gepullt: $IMAGE_NAME"
  docker pull "$IMAGE_NAME" || exit 3
else
  echo "✅  Image bereits vorhanden: $IMAGE_NAME"
fi

# =========================
# 6️⃣ Container neu erstellen & starten
# =========================
echo "🚀 Erstelle und starte Container '$CONTAINER_NAME'"
docker run -d \
  --name "$CONTAINER_NAME" \
  -p "$PORT_MAPPING_1" \
  -p "$PORT_MAPPING_2" \
  --mount source=pulsardata,target=/pulsar/data \
  --mount source=pulsarconf,target=/pulsar/conf \
  "$IMAGE_NAME" \
  bin/pulsar standalone
echo "✅  Container '$CONTAINER_NAME' wurde gestartet."
exit 0
