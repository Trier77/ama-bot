import express, { request, urlencoded } from "express";

const app = express();
const port = 3000;
const meassages = [];

app.use(express.static("public"));
app.use(express.urlencoded({extended: true}));

app.set("view engine", "ejs");



app.get("/", (request, response) =>{
    response.render("index", {meassages});
});

app.post("/ask", (request, response) =>{
    const question = request.body.question;
    response.render("index", {question})
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
})