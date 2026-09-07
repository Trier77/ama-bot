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
  },
  {
    keywords: ["fremtid", "arbejde", "vil du være", "vil du gerne være" , "vil du gerne lave"],
    answer: "Jeg vil i fremtiden gerne arbejde med at lave digitale løsninger. Ikke så meget hjemmesider."
  }
];
function findAnswers(question){
  const normalizedQuestion =question.toLowerCase();

  for (const answerGroup of answers) {
    const hasMatch =answerGroup.keywords.some((keyword) => normalizedQuestion.includes(keyword));

    if(hasMatch){
      return answerGroup.answer;
    }
  }
  return "Det ved jeg ikke.";
}
console.log(findAnswers("Hvad hedder du?"));

app.get("/", (request, response) =>{
    response.render("index", {messages, error: ""});
});

app.post("/ask", (request, response) =>{
    const question = request.body.question.trim();
    let error = "";

    if(!question){
      error = "Skriv et spørgsmål, før du sender.";
    } else {
      messages.push({type: "question", text: question});
      const answer = findAnswers(question);
      messages.push({type: "answer", text: answer});
    }   
    response.render("index", {messages, error});
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
})