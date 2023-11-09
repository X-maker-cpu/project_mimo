window.onscroll = function() {myFunction()};
var navbar = document.getElementById("navbar");
var sticky = navbar.offsetTop;
function myFunction() {
    if (window.pageYOffset >= sticky) {
      navbar.classList.add("sticky")
    } else {
      navbar.classList.remove("sticky");
    }
  }

  // Function to prompt the user for input
function promptUser() {
  return prompt("Ask me a question:");
}

// Function to retrieve answer from API
async function getAnswerFromAPI(question) {
  // Capitalize the first letter of the question
  question = question.charAt(0).toUpperCase() + question.slice(1);

  const response = await fetch(
    `https://en.wikipedia.org/api/rest_v1/page/summary/${question}`
  );
  const data = await response.json();
  return data.extract;
}
// Function to check if input matches basic questions and retrieve answer
async function getBasicAnswer(question) {
  let answer = "";
  if (question.toLowerCase().includes("what is your name")) {
    answer = `
      My name is Wiki Bot.
      I am a chat bot.
      I am still learning how to answer questions.
      I hope to be able to answer more questions in the future.
    `;
  } else if (question.toLowerCase().includes("what is the date")) {
    answer = `Today is ${new Date().toLocaleDateString()}.`;
  } else if (question.toLowerCase().includes("what is the time")) {
    answer = `The time is ${new Date().toLocaleTimeString()}.`;
  } else if (question.toLowerCase().includes("what is")) {
    const words = question.split(" ");
    const name = words.slice(words.indexOf("is") + 1).join(" ");
    answer = await getAnswerFromAPI(name);
  } else if (question.toLowerCase().includes("who is")) {
    const words = question.split(" ");
    // Note, name can include fist name and last name
    const name = words.slice(words.indexOf("is") + 1).join(" ");
    response = await getAnswerFromAPI(name);
    if (response) {
      answer = response;
    } else {
      answer = "Sorry, I cant any information on that person.";
    }
  } else {
    answer = "Sorry, I don't understand your question.";
  }
  return answer;
}

// Main function to run the chat bot
async function runChatBot() {
  const question = promptUser();
  const answer = await getBasicAnswer(question);
  alert(answer);
  runChatBot();
}
