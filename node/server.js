const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const db = require('./db');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Récupérer tous les produits
app.get('/produits', (req, res) => {
  db.query('SELECT * FROM produits', (err, results) => {
    if (err) {
      res.status(500).send('Erreur serveur');
    } else {
      res.json(results);
    }
  });
});

// Ajouter un produit
app.post('/produits', (req, res) => {
  const { nom, quantite } = req.body;
  db.query('INSERT INTO produits (nom, quantite) VALUES (?, ?)', [nom, quantite], (err, result) => {
    if (err) {
      res.status(500).json({ message: 'Erreur serveur' });
    } else {
      res.status(201).json({ message: 'Produit ajouté', id: result.insertId }); // <-- Réponse JSON
    }
  });
});

app.listen(3000, () => {
  console.log('Serveur Node.js lancé sur http://localhost:3000');
});
