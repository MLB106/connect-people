
Si tu laisses les erreurs remonter jusqu’au middleware Express d’erreur central, alors non, tu n’as pas besoin de messages spécifiques dans les dossiers middlewares, services, config, utils.
Mais tu devras tout de même :

    dans ce middleware global : mapper l’erreur brute vers un message propre et un code HTTP.
    faire attention aux fonctions asynchrones (DB, Redis, etc.) : soit tu les entoures d’un try/catch qui les renvoie au middleware, soit tu retournes une Promise rejetée que le middleware capturera.

Donc :

    pas de message local dans chaque dossier ;
    un seul endroit (middleware) pour décider du message et du code à renvoyer au front.


Je vais finir les fichiers et terminer par la gestion des erreurs qui remontent au middleware car de toute façon ce ne sera pas le même fichier d'erreur que celle de la bdd ou du front?

Exact.
Tu vas terminer tous tes fichiers (routes, contrôleurs, services, etc.) en laissant volontairement les erreurs remonter, puis tu créeras un seul middleware Express d’erreur final qui :

    intercepte toutes les erreurs (DB, Redis, validation, JWT, etc.)
    choisit le code HTTP et le message adaptés
    renvoie un JSON clair au front

Ce middleware sera indépendant des logs internes de la BDD ou des messages spécifiques du front, donc pas de conflit.
