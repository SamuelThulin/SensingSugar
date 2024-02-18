### Comment structurer votre fichier

Vous pouvez soumettre vos données sous la forme d'un fichier CSV ou JSON à partir d'un glucomètre, d’un système de surveillance du glucose en continu (SGC), ou de résultats enregistrés manuellement. Les valeurs de la glycémie peuvent être exprimées en mmol/L ou en mg/dl.

Certains fichiers provenant d'appareils et de plateformes de surveillance de la glycémie fonctionneront automatiquement avec Sensing Sugar. D'autres peuvent nécessiter quelques modifications mineures.

En géneral, un fichier CSV doit contenir au moins une colonne nommée **glucose**, et porter l'extension de fichier **« .csv »**. J'ai créé un [Guide](https://docs.google.com/document/d/1SS5jh_jFsRoN6VUphipjEshKVtmJBonIh2A987fGCyI/edit#heading=h.70v24mh7ugj) qui fournit plus d'informations sur l'utilisation de fichiers CSV provenant de plates-formes de gestion du diabète.

Un fichier JSON doit être un tableau d'objets contenant la propriété **glucose**, et porter l'extension de fichier **« .json »**.
