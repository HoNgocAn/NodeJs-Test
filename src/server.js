require('dotenv').config(); // Nạp biến môi trường từ .env
const { log } = require('console');
const express = require('express');
const app = express();
const webRoutes = require("./routes/web.js");
const webAPI = require("./routes/api.js");


const configViewEngine = require('./config/viewEngine.js');

const port = process.env.PORT || 8888; // Sử dụng cổng mặc định 3000 nếu PORT không được thiết lập
const hostname = process.env.HOST_NAME;

configViewEngine(app);
app.use(express.json());
app.use(express.urlencoded({ extended: true }))

app.use("/", webRoutes)
app.use("/api", webAPI)

app.use((req, res) => {
    return res.send("404 Not Found")
})


app.listen(port, hostname, () => {
    console.log(`Example app listening on port ${port}`);
});