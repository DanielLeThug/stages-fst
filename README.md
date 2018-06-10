# Prérequis

- [Node.js](https://nodejs.org/)
- [Heroku CLI](https://devcenter.heroku.com/articles/getting-started-with-nodejs#set-up)
- [Git](https://git-scm.com/)
- [Visual Studio Code](https://code.visualstudio.com/)

# Visual Studio Code

## Extensions

- Auto-Open Markdown Preview
- Bracket Pair Colorizer
- ES7 React/Redux/GraphQL/React-Native snippets
- Live Server
- Node.js Modules Intellisense
- Prettier – Code formatter
- vscode-icons

## Paramètres

```javascript
{
    "editor.wordWrap": "on",
    "emmet.includeLanguages": {
        "javascript": "javascriptreact"
    },
    "emmet.syntaxProfiles": {
        "javascript": "jsx"
    },
    "terminal.integrated.shell.windows": "C:\\Program Files\\Git\\bin\\bash.exe",
    "editor.formatOnSave": true,
    "workbench.iconTheme": "vscode-icons"
}
```

# MongoDB

Pour le développement, utilisez [mLab](https://mlab.com/) pour héberger gratuitement et simplement une base de données sur le cloud. (Pensez à changer les identifiants dans le dossier config du projet).

# Heroku

Nous avons utilisé [Heroku](https://www.heroku.com/) pour déployer notre application sur le cloud. Les scripts sont spécialiement créés pour cela et il faudra changer légèrement le code pour un déploiement sur une autre plateforme. (Notamment sur le fichier server.js pour permettre à Express d'utiliser les ressources statiques)

# Extensions React/Redux

Il existe des extensions pour les navigateurs Mozilla Firefox et Google Chrome pour React et Redux afin de faciliter le développement. Une fois installé, il suffit ensuite de décommenter la ligne 15 dans le fichier client/src/store.js pour pouvoir accéder aux variables en ouvrant les outils de développement du navigateur. (A enlever en mode production)

# Lignes de commande

```bash
# Node.js
# Installer les paquets du serveur
npm install
# Installer les paquets du client
npm run client-install
# Lancer le client et le server en même temps
npm run dev
# Lancer le serveur Express uniquement
npm run server
# Lancer le client React uniquement
npm run client
# Le server se lance à l'adresse http://localhost:5000 et le client à l'adresse http://localhost:3000
```

# A faire

- Trouver une alternative au paquet mail-listener4 ou faire en sorte qu'il arrête de crasher
- Filtrer les mails écoutés pour éviter de publier du spamm comme offre de stage
- Utiliser le système d'authentification de l'UHA
- Faire en sorte que seules les IMR/MIAGE aient accès au site en se servant de l'annuaire LDAP de l'UHA
- Eventuellement griser les parties Informations personnelles quand on accède au formulaire sans être connecté (via URL)
- Adapter le schéma du formulaire pour qu'il soit identique à la saisie sur pstage
- Déployer le site sur les serveurs de l'UHA et déclencher la panique
