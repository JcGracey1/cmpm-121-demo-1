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
button.innerHTML = "🦆";
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

// Define an interface to represent each item
interface Item {
  name: string;
  cost: number;
  rate: number;
  count: number;
  baseCost: number;
  description: string;
  button?: HTMLButtonElement; // Optional button property
}

// Upgrade options with an additional cost multiplier:
const availableItems: Item[] = [
  { name: "quack", cost: 10, rate: 0.1, count: 0, baseCost: 1,  description: "A simple quack. Slightly increases your duck count per second."  },
  { name: "QUACK", cost: 50, rate: 2.0, count: 0, baseCost: 50, description: "A louder QUACK! This one draws attention, earning you more ducks." },
  { name: "QUACK QUACK QUACK", cost: 100, rate: 50.0, count: 0, baseCost: 100, description: "A triple-quack combo! Watch those ducks flock to you." },
  { name: "QUACKKK", cost: 1000, rate: 100, count: 0, baseCost: 1000, description: "The QUACKKK that echoes across the lake, attracting massive numbers of ducks." },
  { name: "Honk", cost: 10000, rate: 200, count: 0, baseCost: 10000, description: "HONK! Goose power is here. It really speeds up duck production." },
];

// Create a div element to display item descriptions
const descriptionDiv = document.createElement("div");
descriptionDiv.style.border = "1px solid #ccc";
descriptionDiv.style.padding = "10px";
descriptionDiv.style.background = "white"; // White background for visibility
descriptionDiv.style.position = "absolute"; // Set position to absolute
descriptionDiv.style.display = "none"; // Initially hidden
descriptionDiv.style.pointerEvents = "none"; // Allow mouse to pass through
app.append(descriptionDiv);

// Create upgrade buttons and status displays for each item
availableItems.forEach((item) => {
  const upgradeButton = document.createElement("button");
  upgradeButton.innerHTML = `${item.name} (costs ${item.cost.toFixed(2)})`;
  upgradeButton.disabled = true; // Initially disabled
  app.append(upgradeButton);

  const itemStatusDiv = document.createElement("div");
  itemStatusDiv.innerHTML = `${item.name} purchased: ${item.count}`;
  app.append(itemStatusDiv);

  // Add event listener to display item description on mouse hover
  upgradeButton.addEventListener("mousemove", (event) => {
    descriptionDiv.style.display = "block"; // Show the description
    descriptionDiv.innerHTML = item.description; // Set the description text

    // Position the description div near the mouse cursor
    descriptionDiv.style.left = `${event.pageX + 15}px`; // Offset slightly from cursor
    descriptionDiv.style.top = `${event.pageY + 15}px`;
  });
  
  upgradeButton.addEventListener("mouseout", () => {
    descriptionDiv.style.display = "none"; // Hide the description when mouse leaves
  });

  // Add event listener to each upgrade button
  upgradeButton.addEventListener("click", () => {
    if (counter >= item.cost) {
      counter -= item.cost; // Deduct cost
      growthRate += item.rate; // Increase growth rate by item's rate
      item.count++; // Increment the purchase count

      // Increase the item's cost by 1.15x after each purchase
      item.cost = item.cost * 1.15;

      // Update the display
      counterDiv.innerHTML = `${counter.toFixed(2)} Ducks`;
      itemStatusDiv.innerHTML = `${item.name} purchased: ${item.count}`;
      upgradeButton.innerHTML = `Buy ${item.name} (+${item.rate} ducks/sec, costs ${item.cost.toFixed(2)})`;
      growthRateDiv.innerHTML = `Growth Rate: ${growthRate.toFixed(2)} Ducks/sec`; // Update growth rate display
      checkUpgradeAvailability(); // Recheck if other items are available
    }
  });

  // Save button reference for future enabling/disabling
  item.button = upgradeButton;
});

// Add event listener to the main quack button (click event)
button.addEventListener("click", () => {
  counter++; // Increment counter by 1
  counterDiv.innerHTML = `${counter.toFixed(2)} Ducks`; // Update display
  checkUpgradeAvailability(); // Recheck if upgrades are available
});

// Check if any upgrade button should be enabled
function checkUpgradeAvailability() {
  availableItems.forEach((item) => {
    const upgradeButton = item.button!;
    upgradeButton.disabled = counter < item.cost; // Enable only if player can afford it
  });
}

let lastTime = performance.now();

function updateCounter(currentTime: number) {
  const deltaTime = (currentTime - lastTime) / 1000; // Time passed in seconds
  lastTime = currentTime;

  // Increment counter based on how much time passed
  counter += deltaTime * growthRate;
  counterDiv.innerHTML = `${counter.toFixed(2)} Ducks`; // Limit to 2 decimal places

  checkUpgradeAvailability(); // Recheck availability each frame

  // Request the next animation frame
  requestAnimationFrame(updateCounter);
}

// Start the animation loop
requestAnimationFrame(updateCounter);
