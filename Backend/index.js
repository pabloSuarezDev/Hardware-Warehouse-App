const express = require('express')
const cors = require('cors');
const app = express();
const PORT = 3900;

app.use(express.json()); // recibir datos con content-type app/json
app.use(express.urlencoded({ extended: true })); // form-urlencoded
app.use(cors());

const categoria = require('./routes/categoria');
const marca = require('./routes/marca');
const producto = require('./routes/producto');

app.use('/api/v1/categoria', categoria);
app.use('/api/v1/marca', marca);
app.use('/api/v1/producto', producto);

app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});