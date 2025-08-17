const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const db = require('./db');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Récupérer tous les assignments
app.get('/assignments', (req, res) => {
  db.query('SELECT * FROM assignments', (err, results) => {
    if (err) {
      res.status(500).send('Erreur serveur');
    } else {
      res.json(results);
    }
  });
});

// Ajouter un assignment
app.post('/assignments', (req, res) => {
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
    `INSERT INTO assignments 
      (nom, prenom, site, code_projet, nom_projet, type_materiel, detail_materiel, num_serie) 
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
    [nom, prenom, site, code_projet, nom_projet, type_materiel, detail_materiel, num_serie],
    (err, result) => {
      if (err) {
        res.status(500).json({ message: 'Erreur serveur' });
      } else {
        res.status(201).json({ message: 'Assignment ajouté', id: result.insertId });
      }
    }
  );
});

// Modifier un assignment
app.put('/assignments/:id', (req, res) => {
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
    `UPDATE assignments SET nom=?, prenom=?, site=?, code_projet=?, nom_projet=?, type_materiel=?, detail_materiel=?, num_serie=? WHERE id=?`,
    [nom, prenom, site, code_projet, nom_projet, type_materiel, detail_materiel, num_serie, id],
    (err, result) => {
      if (err) {
        res.status(500).json({ message: 'Erreur serveur' });
      } else {
        res.status(200).json({ message: 'Assignment modifié' });
      }
    }
  );
});

// Supprimer un assignment
app.delete('/assignments/:id', (req, res) => {
  const id = req.params.id;
  db.query('DELETE FROM assignments WHERE id = ?', [id], (err, result) => {
    if (err) {
      res.status(500).json({ message: 'Erreur serveur' });
    } else if (result.affectedRows === 0) {
      res.status(404).json({ message: 'Assignment non trouvé' });
    } else {
      res.status(200).json({ message: 'Assignment supprimé' });
    }
  });
});

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

// Insertion en masse dans la table products
app.post('/products/batch', (req, res) => {
  const products = req.body; // Tableau d'objets produits

  if (!Array.isArray(products) || products.length === 0) {
    return res.status(400).json({ message: 'Aucun produit à insérer.' });
  }

  const values = products.map(p => [
    p.productName || '',
    p.code || '',
    p.available || '',
    p.price || 0,
    p.rating || 0,
    p.image || ''
  ]);

  db.query(
    `INSERT INTO products (productName, code, available, price, rating, image) VALUES ?`,
    [values],
    (err, result) => {
      if (err) {
        console.error(err);
        res.status(500).json({ message: 'Erreur serveur' });
      } else {
        res.status(201).json({ message: 'Produits ajoutés', count: result.affectedRows });
      }
    }
  );
});

// Récupérer tous les produits de la table products
app.get('/products', (req, res) => {
  db.query('SELECT * FROM products', (err, results) => {
    if (err) {
      res.status(500).send('Erreur serveur');
    } else {
      res.json(results);
    }
  });
});

// Supprimer un produit de la table products
app.delete('/products/:id', (req, res) => {
  const id = req.params.id;
  db.query('DELETE FROM products WHERE id = ?', [id], (err, result) => {
    if (err) {
      res.status(500).json({ message: 'Erreur serveur' });
    } else if (result.affectedRows === 0) {
      res.status(404).json({ message: 'Produit non trouvé' });
    } else {
      res.status(200).json({ message: 'Produit supprimé' });
    }
  });
});

// Modifier un produit de la table products
app.put('/products/:id', (req, res) => {
  const id = req.params.id;
  const { productName, code, available, price, rating, image } = req.body;

  db.query(
    `UPDATE products SET productName=?, code=?, available=?, price=?, rating=?, image=? WHERE id=?`,
    [productName, code, available, price, rating, image, id],
    (err, result) => {
      if (err) {
        res.status(500).json({ message: 'Erreur serveur' });
      } else {
        res.status(200).json({ message: 'Produit modifié' });
      }
    }
  );
});

app.post('/products', (req, res) => {
  const { productName, code, available, price, rating, image } = req.body;
  db.query(
    `INSERT INTO products (productName, code, available, price, rating, image) VALUES (?, ?, ?, ?, ?, ?)`,
    [productName, code, available, price, rating, image],
    (err, result) => {
      if (err) {
        res.status(500).json({ message: 'Erreur serveur' });
      } else {
        res.status(201).json({ message: 'Produit ajouté', id: result.insertId });
      }
    }
  );
});

// Ajouter un assignment
app.post('/assignments', (req, res) => {
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
    `INSERT INTO assignments 
      (nom, prenom, site, code_projet, nom_projet, type_materiel, detail_materiel, num_serie) 
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
    [nom, prenom, site, code_projet, nom_projet, type_materiel, detail_materiel, num_serie],
    (err, result) => {
      if (err) {
        res.status(500).json({ message: 'Erreur serveur' });
      } else {
        res.status(201).json({ message: 'Assignment ajouté', id: result.insertId });
      }
    }
  );
});

app.listen(3000, () => {
  console.log('Serveur Node.js lancé sur http://localhost:3000');
});


