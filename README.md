Le serveur Strapi sera accessible à l'adresse : [http://localhost:1337/admin](http://localhost:1337/admin)

Lancer le frontend Next.js

Créez d'abord un fichier `.env.local` dans le dossier frontend avec la variable suivante :

NEXT_PUBLIC_STRAPI_API_URL=http://localhost:1337


Puis lancez le serveur :

cd frontend
npm run dev


Le frontend sera accessible à l'adresse : [http://localhost:3000](http://localhost:3000)


Ce README est simple et direct, contenant uniquement les informations essentielles pour lancer le projet rapidement.
