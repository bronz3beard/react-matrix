#!/usr/bin/env sh
# Runs the Playwright suite inside the pinned Playwright image, the same image
# CI uses, so screenshots match byte for byte. Extra arguments are passed to
# `playwright test` (e.g. --update-snapshots=missing).
#
# - The container gets its own Linux node_modules through an anonymous volume,
#   so the host's macOS binaries are never touched.
# - No ports are published: the preview server lives only inside the container
#   and cannot collide with other local containers or services.
# Keep IMAGE in sync with the @playwright/test version in package.json and ci.yml.
set -eu

IMAGE="mcr.microsoft.com/playwright:v1.63.0-noble@sha256:eff16c30e6f3f4af0a03fa4b706120d5e9b0891c344a27d64559aff5900a4a27"

exec docker run --rm --ipc=host \
  -v "$PWD":/work \
  -v /work/node_modules \
  -w /work \
  -e CI=1 \
  "$IMAGE" \
  sh -c 'npm ci --no-audit --no-fund && npm run test:e2e -- "$@"' sh "$@"
