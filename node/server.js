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
  const {
    nom,
    prenom,
    site,
    code_projet,
    nom_projet,
    type_materiel,
    detail_materiel,
    num_serie
  } = req.body;

  db.query(
    `INSERT INTO produits 
      (nom, prenom, site, code_projet, nom_projet, type_materiel, detail_materiel, num_serie) 
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
    [nom, prenom, site, code_projet, nom_projet, type_materiel, detail_materiel, num_serie],
    (err, result) => {
      if (err) {
        res.status(500).json({ message: 'Erreur serveur' });
      } else {
        res.status(201).json({ message: 'Produit ajouté', id: result.insertId });
      }
    }
  );
});

// Supprimer un produit
app.delete('/produits/:id', (req, res) => {
  const id = req.params.id;
  db.query('DELETE FROM produits WHERE id = ?', [id], (err) => {
    if (err) {
      res.status(500).json({ message: 'Erreur serveur' });
    } else {
      res.status(200).json({ message: 'Produit supprimé' });
    }
  });
});

// Modifier un produit
app.put('/produits/:id', (req, res) => {
  const id = req.params.id;
  const {
    nom,
    prenom,
    site,
    code_projet,
    nom_projet,
    type_materiel,
    detail_materiel,
    num_serie
  } = req.body;

  db.query(
    `UPDATE produits SET nom=?, prenom=?, site=?, code_projet=?, nom_projet=?, type_materiel=?, detail_materiel=?, num_serie=? WHERE id=?`,
    [nom, prenom, site, code_projet, nom_projet, type_materiel, detail_materiel, num_serie, id],
    (err, result) => {
      if (err) {
        res.status(500).json({ message: 'Erreur serveur' });
      } else {
        res.status(200).json({ message: 'Produit modifié' });
      }
    }
  );
});

app.listen(3000, () => {
  console.log('Serveur Node.js lancé sur http://localhost:3000');
});
