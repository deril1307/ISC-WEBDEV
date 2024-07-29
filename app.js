const express = require("express");
const bodyParser = require("body-parser");

const produkRoutes = require("./routes/produk");

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use("/api/produk", produkRoutes);

app.listen(port, () => {
  console.log(`Server berjalan di http://localhost:${port}`);
});
