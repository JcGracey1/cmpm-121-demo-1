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
counterDiv.innerHTML = `${counter.toFixed(2)} Ducks`;
app.append(counterDiv);

// Div element to display the current growth rate:
const growthRateDiv = document.createElement("div");
let growthRate: number = 0; // Initial growth rate is 0
growthRateDiv.innerHTML = `Growth Rate: ${growthRate.toFixed(2)} Ducks/sec`;
app.append(growthRateDiv);

// Define the interface for upgrade items
interface UpgradeItem {
  name: string;
  cost: number;
  rate: number;
  count: number;
  button?: HTMLButtonElement; // Optional button reference
}

// Upgrade options:
const items: UpgradeItem[] = [
  { name: "A", cost: 10, rate: 0.1, count: 0 },
  { name: "B", cost: 100, rate: 2.0, count: 0 },
  { name: "C", cost: 1000, rate: 50.0, count: 0 },
];

// Create upgrade buttons and status displays for each item
items.forEach((item) => {
  const upgradeButton = document.createElement("button");
  upgradeButton.innerHTML = `Buy ${item.name} (+${item.rate} ducks/sec, costs ${item.cost})`;
  upgradeButton.disabled = true; // Initially disabled
  app.append(upgradeButton);

  const itemStatusDiv = document.createElement("div");
  itemStatusDiv.innerHTML = `${item.name} purchased: ${item.count}`;
  app.append(itemStatusDiv);

  // Add event listener to each upgrade button
  upgradeButton.addEventListener("click", () => {
    if (counter >= item.cost) {
      counter -= item.cost; // Deduct cost
      growthRate += item.rate; // Increase growth rate by item's rate
      item.count++; // Increment the purchase count

      // Update the display
      counterDiv.innerHTML = `${counter.toFixed(2)} Ducks`;
      itemStatusDiv.innerHTML = `${item.name} purchased: ${item.count}`;
      growthRateDiv.innerHTML = `Growth Rate: ${growthRate.toFixed(2)} Ducks/sec`; // Update growth rate display
      checkUpgradeAvailability(); // Recheck if other items are available
    }
  });

  // Save button reference for future enabling/disabling
  item.button = upgradeButton;
});

// Check if any upgrade button should be enabled
function checkUpgradeAvailability() {
  items.forEach((item) => {
    if (item.button) {
      item.button.disabled = counter < item.cost; // Enable only if player can afford it
    }
  });
}

let lastTime = performance.now();

function updateCounter(currentTime: number) {
  const deltaTime = (currentTime - lastTime) / 1000; // Time passed in seconds
  lastTime = currentTime;

  // Increment counter based on how much time passed
  counter += deltaTime * growthRate;
  counterDiv.innerHTML = `${counter.toFixed(2)} Ducks`; // Limit to 2 decimal places

  // Request the next animation frame
  requestAnimationFrame(updateCounter);
}

// Start the animation loop
requestAnimationFrame(updateCounter);

// Add event listener to main button (when it's clicked)
button.addEventListener("click", () => {
  counter++;
  counterDiv.innerHTML = `${counter.toFixed(2)} Ducks`;
  checkUpgradeAvailability();
});
