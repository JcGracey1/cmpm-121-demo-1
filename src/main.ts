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

// Add event listener to button (when its clicked)
button.addEventListener("click", () => {
    // add event
})
