
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.json());

// Exemple de route
app.get('/produits', (req, res) => {
  res.json([{ id: 1, nom: 'Clavier' }, { id: 2, nom: 'Souris' }]);
});

app.listen(PORT, () => {
  console.log(`Serveur lancé sur http://localhost:${PORT}`);
});
