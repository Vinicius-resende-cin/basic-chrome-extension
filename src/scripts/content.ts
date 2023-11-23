// Function to generate a random compliment
function generateCompliment(): string {
  const compliments = [
    "You're doing great!",
    "You're awesome!",
    "You're a superstar!",
    "You're amazing!",
    "You're killing it!"
  ];

  const randomIndex = Math.floor(Math.random() * compliments.length);
  return compliments[randomIndex];
}

// Send an alert with a compliment
alert(generateCompliment());
