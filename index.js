require("dotenv").config();
const express = require("express");
const app = express();

const PORT = process.env.PORT || 8000;

app.use(express.json());
app.use(express.static('public'));

const userRoutes = require("./routes/users");
const expenseRoutes = require("./routes/expenses");
const incomeRoutes = require("./routes/income");

app.use('/', userRoutes);
app.use('/', expenseRoutes);
app.use('/', incomeRoutes);


app.get("/", (req, res) => {
  res.sendFile(_dirname + 'public/index.html');
});


app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
});
