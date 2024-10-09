import "./style.css";

const app: HTMLDivElement = document.querySelector("#app")!;

const gameName = "Devious Ducks";
document.title = gameName;

const header = document.createElement("h1");
header.innerHTML = gameName;
app.append(header);

// Create main button:
const button = document.createElement("button");
// Add text and emoji to the button:
button.innerHTML = "Quack 🦆";
app.append(button);

// Div element to display count:
const counterDiv = document.createElement("div");
let counter: number = 0;
counterDiv.innerHTML = `${counter} Ducks`;
app.append(counterDiv);

// Upgrade button:
const upgradeButton = document.createElement("button");
upgradeButton.innerHTML = "Buy Upgrade (+1 Growth Rate)";
upgradeButton.disabled = true; // Initially disabled until 10 units are reached
app.append(upgradeButton);


// Add event listener to button (when its clicked)
button.addEventListener("click", () => {
  counter++;
  counterDiv.innerHTML = `${counter.toFixed(1)} Ducks`;
  checkUpgradeAvailability();
});

let lastTime = performance.now();
let growthRate = 0;

function updateCounter(currentTime: number) {
  const deltaTime = (currentTime - lastTime) / 1000; // Time passed in seconds
  lastTime = currentTime;

  // Increment counter based on how much time passed
  counter += deltaTime * growthRate;
  counterDiv.innerHTML = `${counter.toFixed(1)} Ducks`; // Limit to 2 decimal places

  // Request the next animation frame
  requestAnimationFrame(updateCounter);
}

// Add event listener to upgrade button (purchasing the upgrade)
upgradeButton.addEventListener("click", () => {
    if (counter >= 10) {
      counter -= 10; // Deduct 10 units from counter
      growthRate += 1; // Increase the automatic growth rate
      counterDiv.innerHTML = `${counter.toFixed(2)} Ducks`;
      checkUpgradeAvailability(); // Check if upgrade button should remain enabled
    }
});

// Check if upgrade button should be enabled or disabled
function checkUpgradeAvailability() {
    upgradeButton.disabled = counter < 10; // Enable if counter is >= 10, otherwise disable
}

// Start the animation loop
requestAnimationFrame(updateCounter);
