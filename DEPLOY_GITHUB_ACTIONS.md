# GitHub Actions deploy OVH

Ce workflow deploie automatiquement le projet sur le VPS OVH apres chaque `git push` sur `main`.

## Fichier

- `.github/workflows/deploy-ovh.yml`

## Secrets GitHub a ajouter

Dans GitHub:

`Settings -> Secrets and variables -> Actions`

Creer ces secrets:

```txt
VPS_HOST
VPS_USER
VPS_SSH_KEY
VPS_PORT
VPS_APP_DIR
```

Exemple:

```txt
VPS_HOST=123.123.123.123
VPS_USER=root
VPS_PORT=22
VPS_APP_DIR=/var/www/3d-services
```

`VPS_SSH_KEY` doit contenir la cle privee SSH complete utilisee pour se connecter au VPS.

## Preparation du VPS

Une seule fois sur le VPS:

1. Installer Docker et le plugin Docker Compose.
2. Cloner le repo dans le dossier cible.
3. Creer `.env.docker`.
4. Verifier que le VPS peut faire `git pull` depuis GitHub.

Exemple:

```bash
mkdir -p /var/www
cd /var/www
git clone git@github.com:Oumaima-Jlidi/3D-Services.git 3d-services
cd 3d-services
cp .env.docker.example .env.docker
docker compose --env-file .env.docker up -d --build
```

## Important

Le serveur doit aussi avoir une cle SSH autorisee sur GitHub pour que `git pull` fonctionne sur le VPS.

## Deploiement

A chaque push sur `main`, GitHub Actions execute:

```bash
cd /var/www/3d-services
git fetch origin main
git checkout main
git pull --ff-only origin main
docker compose --env-file .env.docker down
docker compose --env-file .env.docker up -d --build
```
