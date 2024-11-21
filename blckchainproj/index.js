import express from "express";
import bodyParser from "body-parser";
import axios from "axios";

const API_URL = "https://api.blockchain.com/v3/exchange"

const app = express();
const port = 3000;

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req,res) => {
    res.render("index.ejs");
});

app.post("/", async(req, res) => {
    try {
        console.log(req.body);
        const coin = req.body["coin"];
        const curr = req.body["currency"];
        const response = await axios.get(
            `${API_URL}/tickers/${coin}-${curr}`
        );
        const result = response.data;
        console.log(result);
        res.render("index.ejs", {data: result, });
    } catch (error) {
        console.error("No market data matches criteria", error.message);
        res.render("index.ejs", {
          error: error.message,
         });
    }
});

app.listen(port, () => {
    console.log(`Server running on port: ${port}`);
});
  