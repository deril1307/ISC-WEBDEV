import express from "express";
import fetch from "node-fetch";
import cors from "cors";

const app = express();
const port = 3000;
const apiKey = "a42c2709196635074c089d59efebd744";
const cityId = "1642911";
app.use(cors());

app.get("/weather", async (req, res) => {
  try {
    const response = await fetch(`http://api.openweathermap.org/data/2.5/forecast?id=${cityId}&appid=${apiKey}`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    res.json(data);
  } catch (error) {
    res.status(500).send("Error fetching weather data");
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
