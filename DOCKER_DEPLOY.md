# Deploiement Docker OVH

## 1. Preparer l'environnement

Copier l'exemple et remplir les secrets sur le serveur:

```bash
cp .env.docker.example .env.docker
```

Generer une cle Laravel:

```bash
docker run --rm -v "$PWD/backend:/app" -w /app php:8.3-cli php artisan key:generate --show
```

Mettre la valeur dans `APP_KEY` de `.env.docker`, puis changer `POSTGRES_PASSWORD` et `VITE_RECAPTCHA_SITE_KEY`.

## 2. Lancer

```bash
docker compose --env-file .env.docker up -d --build
```

Le site est expose par Nginx sur:

- `http://3dservices.fr`
- `http://www.3dservices.fr`

## 3. HTTPS

Le fichier `docker/nginx/default.conf` contient deja l'emplacement ACME:

```nginx
location /.well-known/acme-challenge/
```

Tu peux ensuite brancher Certbot ou le SSL OVH, puis ajouter le bloc `listen 443 ssl;` avec les certificats dans `docker/nginx/default.conf`.

## 4. Commandes utiles

```bash
docker compose --env-file .env.docker logs -f
docker compose --env-file .env.docker exec backend php artisan migrate --force
docker compose --env-file .env.docker exec backend php artisan storage:link
docker compose --env-file .env.docker down
```
