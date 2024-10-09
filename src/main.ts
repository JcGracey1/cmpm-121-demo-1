import "./style.css";

const app: HTMLDivElement = document.querySelector("#app")!;

const gameName = "Devious Ducks";
document.title = gameName;

const header = document.createElement("h1");
header.innerHTML = gameName;
app.append(header);

// Create button:
const button = document.createElement("button");
// Add text and emoji to the button:
button.innerHTML = "Quack 🦆";
app.append(button);

// Div element to display count:
const counterDiv = document.createElement("div");
let counter: number = 0;
counterDiv.innerHTML = `${counter} Ducks`;
app.append(counterDiv);

// Add event listener to button (when its clicked)
button.addEventListener("click", () => {
  counter++;
  counterDiv.innerHTML = `${counter} Ducks`;
});

// Automatically increment count by 1 per second:
setInterval(() => {
    counter++;
    counterDiv.innerHTML = `${counter} Ducks`;
  }, 1000); // Increment every 1000ms (1 second)