#!/usr/bin/env sh
set -e

mkdir -p storage/framework/cache storage/framework/sessions storage/framework/views storage/logs bootstrap/cache

SEED_MARKER_FILE="${SEED_MARKER_FILE:-storage/app/.seeded}"

php artisan storage:link >/dev/null 2>&1 || true
php artisan config:clear >/dev/null 2>&1 || true

if [ "${RUN_MIGRATIONS:-false}" = "true" ]; then
  php artisan migrate --force
fi

if [ "${RUN_SEEDERS:-false}" = "true" ]; then
  php artisan db:seed --force
fi

if [ "${RUN_SEEDERS_ONCE:-false}" = "true" ] && [ ! -f "${SEED_MARKER_FILE}" ]; then
  mkdir -p "$(dirname "${SEED_MARKER_FILE}")"
  php artisan db:seed --force
  touch "${SEED_MARKER_FILE}"
fi

php artisan config:cache
php artisan view:cache

exec "$@"
