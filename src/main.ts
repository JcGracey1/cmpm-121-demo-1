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

let lastTime = performance.now();
const incrementPerSecond = 1;

function updateCounter(currentTime: number) {
  const deltaTime = (currentTime - lastTime) / 1000; // Time passed in seconds
  lastTime = currentTime;
  
  // Increment counter based on how much time passed
  counter += deltaTime * incrementPerSecond;
  counterDiv.innerHTML = `${counter.toFixed(1)} Ducks`; // Limit to 2 decimal places

  // Request the next animation frame
  requestAnimationFrame(updateCounter);
}

// Start the animation loop
requestAnimationFrame(updateCounter);