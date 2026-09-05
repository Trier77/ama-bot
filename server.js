import express, { request, urlencoded } from "express";

const app = express();
const port = 3000;
const messages = [];

app.use(express.static("public"));
app.use(express.urlencoded({extended: true}));

app.set("view engine", "ejs");


const answers = [
  {
    keywords: ["navn", "hedder", "hvem er du"],
    answer: "Jeg hedder Trier. Hvad vil du ellers vide om mig?"
  },
  {
    keywords: ["bor", "by", "fra"],
    answer: "Jeg bor i Aarhus."
  },
  {
    keywords: ["fritid", "hobby", "kan lide"],
    answer: "Jeg bruger minfritid på bl.a. sport og videografi og spil."
  }
];


app.get("/", (request, response) =>{
    response.render("index", {messages});
});

app.post("/ask", (request, response) =>{
    const question = request.body.question;
    messages.push({type: "question", text: question});
    messages.push({type: "answer", text: "Jeg leder efter et svar"});
    response.render("index", {messages})
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
})