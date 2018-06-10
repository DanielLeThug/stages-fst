# Prérequis

* [Node.js](https://nodejs.org/)
* [Heroku CLI](https://devcenter.heroku.com/articles/getting-started-with-nodejs#set-up)
* [Git](https://git-scm.com/)
* [Visual Studio Code](https://code.visualstudio.com/)

# Visual Studio Code

## Extensions

* Auto-Open Markdown Preview
* Bracket Pair Colorizer
* ES7 React/Redux/GraphQL/React-Native snippets
* Live Server
* Node.js Modules Intellisense
* Prettier – Code formatter
* vscode-icons

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

Nom de la base : stages_fst

Login : admin

Password : secret

# Lignes de commande

```bash
# Node.js
# Installer le CLI React globalement
npm i -g create-react-app
# Lancer le script qui lance le server avec nodemon
npm run server

# Heroku
# Se connecter
heroku login
# Cloner le dépot
heroku git:clone -a stages-fst
# Regarder les logs
heroku logs

# Git
# Récupérer la dernière version du dépôt (avant de commit)
git pull heroku master
# Commit les modifications avec un message descriptif
git commit -am 'envoi du mail'

# Envoyer les modification sur le dépôt
git push heroku master
```
