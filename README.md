# Construire son propre site ChatGPT AI

## Introduction

OpenAI étant souvent en surchage à cause de sa popularité.
J'ai donc voulu tenter de créer un projet basé sur son API car bien souvent, on peut envoyer des requêtes sur des endpoints et recevoir une réponse même si le site de base est en PLS.

[Machina ChatGPT](https://machina-project-openai-api.vercel.app/)


## Installation

- Télécharger le projet : 
	```bash
	git clone git@github.com:MachinaDev/machina-project-openai.git && cd machina-project-openai
	```

### Démarrer la partie frontend

1. Modifier l'url qui permet d'envoyer les requêtes vers la partie back
   - Dans le fichier `script.js`, à la ligne 4, remplacer l'url du serveur back par :
     - Si le serveur est en local : "http://localhost:5200/"
     - Si le serveur est en production : "votre url de production"
  
2. Lancer l'interface front
	```bash
	cd frontend && npm i && npm run dev
	```


### Démarrer la partie backend

1. Récupérer une clé API depuis votre compte OpenAI : [Lien des clé API d'OpenAI](https://beta.openai.com/account/api-keys)
2. Créer un fichier `.env` que vous mettez dans le dossier backend
   - Créer la variable et rajouter votre clé ce qui ressemble à cela
		```
		URL="http://localhost"
		PORT=5200

		OPENAI_API_KEY="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"
		```
  
3. Lancer l'interface back
	```bash
	cd backend && npm i && npm run server
	```