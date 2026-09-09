import express, { request, urlencoded } from "express";

const app = express();
const port = 3000;
const messages = [];

app.use(express.static("public"));
app.use(express.urlencoded({extended: true}));


app.set("view engine", "ejs");

function sanitizeQuestion(input) {
  return input.replace(/[\u0000-\u001F\u007F]/g, "");
}


const answers = [
  {
    keywords: ["navn", "hedder", "hvem er du"],
    answers: [
      "Jeg hedder Trier. Hvad vil du ellers vide om mig?",
      "Trier, dafuq you want",
      "Mit er navn er Trier. Var der ellers noget?"]
  },
  {
    keywords: ["bor", "by", "fra"],
    answers: [
      "Jeg bor i Aarhus.",
      "Jeg huserer i Aarhus, men kommer oprindeligt fra Vejen",
      "Jeg kommer fra Vejen, men bor nu i Aarhus"]
  },
  {
    keywords: ["fritid", "hobby", "kan lide"],
    answers:[
      "Jeg går badminton og HEMA i min fritid.",
      "Jeg bruger min fritid på bl.a. videografi, som jeg forsøger at gøre mere til noget karriere. ",
      "Når jeg bare skal slappe af, kan jeg godt lide at spille på min PS3 eller PC"]
  },
  {
    keywords: ["fremtid", "arbejde", "vil du være", "vil du gerne være" , "vil du gerne lave"],
    answers: "Jeg vil i fremtiden gerne arbejde med at lave digitale løsninger. Ikke så meget hjemmesider."
  }
];
function findAnswers(question){
  const normalizedQuestion =question.toLowerCase();

  for (const answerGroup of answers) {
    const hasMatch =answerGroup.keywords.some((keyword) => normalizedQuestion.includes(keyword));

    if(hasMatch){
      const randomIndex = Math.floor(Math.random() * answerGroup.answers.length);
      return answerGroup.answers[randomIndex];
    }
  }
  return "Det ved jeg ikke.";
}
console.log(findAnswers("Hvad hedder du?"));

app.get("/", (request, response) =>{
    response.render("index", {messages, error: ""});
});

app.post("/ask", (request, response) =>{
    const rawquestion = request.body.question;
    const question = sanitizeQuestion(rawquestion).trim();
    let error = "";

    if(!question){
      error = "Skriv et spørgsmål, før du sender.";
    }
    else if(question.length > 280) {
      error = "Det er for meget tekst. Det gider jeg altså ikke at læse. Skriv lidt kortere.";
    }
    else {
      messages.push({type: "question", text: question});
      const answers = findAnswers(question);
      messages.push({type: "answers", text: answers});
    }   
    response.render("index", {messages, error});
});

app.post("/clear-messages", (request, response) =>{
  messages.length = 0;
  response.redirect("/");
})
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
})