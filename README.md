# 🥪 Casse-Croûte

Une application web fullstack de **consultation et gestion de recettes**, développée avec **React**, **Express** et **MySQL** dans le cadre du projet P3 à la Wild Code School.

🌐 **Démo live** : [casse-croute.vercel.app](https://casse-croute.vercel.app)

> ⚠️ **Note** : La base de données n'est pas déployée actuellement, la démo en ligne est donc non fonctionnelle. Pour tester l'application, veuillez l'installer en local en suivant les instructions ci-dessous.

---

## ✨ Fonctionnalités

- 📖 **Consultation de recettes** — navigation et recherche de recettes
- ❤️ **Favoris** — sauvegarde et consultation de ses recettes favorites
- 👤 **Authentification sécurisée** — inscription, connexion avec **JWT**
- 🔒 **Sécurité** — hashage des mots de passe, tokens JWT
- 🎭 **Rôles** — gestion des accès `utilisateur` et `admin`
- 🛠️ **Dashboard admin** — interface de gestion complète :
  - Voir, créer, modifier et supprimer des recettes
  - Gérer les utilisateurs (modifier les rôles, supprimer un compte, voir les favoris)
- 🐳 **Docker** — environnement de développement et déploiement conteneurisé

---

## 🛠️ Stack technique

| Technologie | Rôle |
|---|---|
| React + TypeScript | Frontend |
| Express + TypeScript | Backend / API REST |
| MySQL | Base de données |
| Vite | Bundler frontend |
| Biome | Linting & formatting |
| Docker | Conteneurisation |
| Husky + Commitlint | Qualité du code |

---

## 🚀 Installation & lancement

### Prérequis

- [Node.js](https://nodejs.org/) v18+
- [MySQL](https://www.mysql.com/) en local ou via Docker

### Cloner le projet

```bash
git clone https://github.com/FarCodeFR/Casse-Croute.git
cd Casse-Croute
```

### Installer les dépendances

```bash
npm install
```

### Configurer les variables d'environnement

Copie les fichiers `.env.sample` dans `server/` et `client/` :

```bash
cp server/.env.sample server/.env
cp client/.env.sample client/.env
```

Puis remplis `server/.env` avec tes infos MySQL :

```env
DB_HOST=localhost
DB_PORT=3306
DB_USER=ton_user
DB_PASSWORD=ton_mot_de_passe
DB_NAME=casse_croute
```

### Initialiser la base de données

```bash
npm run db:migrate
npm run db:seed
```

### Démarrer l'application

```bash
npm run dev
```

Le client sera accessible sur [http://localhost:5173](http://localhost:5173) et l'API sur [http://localhost:3310](http://localhost:3310).

---

## 📁 Structure du projet

```
Casse-Croute/
├── client/                  # Frontend React
│   ├── src/
│   │   ├── components/      # Composants réutilisables
│   │   ├── pages/           # Pages de l'application
│   │   └── App.tsx
│   └── .env.sample
│
├── server/                  # Backend Express
│   ├── app/
│   │   ├── modules/         # Modules métier (routes, actions, repository)
│   │   ├── app.ts
│   │   └── router.ts
│   ├── database/
│   │   ├── schema.sql       # Schéma de la BDD
│   │   └── client.ts
│   └── .env.sample
│
├── Dockerfile
├── docker-compose.yml
└── package.json
```

---

## 🔧 Scripts disponibles

| Commande | Description |
|---|---|
| `npm run dev` | Démarre le client et le serveur en parallèle |
| `npm run build` | Build de production |
| `npm run db:migrate` | Applique le schéma SQL à la base de données |
| `npm run db:seed` | Insère les données de test |
| `npm run check` | Vérifie le code avec Biome |
| `npm run test` | Lance les tests |

---


<p align="center">Réalisé par <a href="https://github.com/FarCodeFR">FarCodeFR</a> — Wild Code School P3</p>
