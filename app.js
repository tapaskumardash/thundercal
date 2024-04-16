// Getting references to the HTML elements
const unitKm = document.getElementById("unit-km");
const unitMi = document.getElementById("unit-mi");

// Function to handle click on unitKm
const handleKmClick = () => {
  unitKm.classList.add("active-unit-toggle");
  unitMi.classList.remove("active-unit-toggle");
}

// Function to handle click on unitMi
const handleMiClick = () => {
  unitKm.classList.remove("active-unit-toggle");
  unitMi.classList.add("active-unit-toggle");
}

// Adding click event listeners to the elements
unitKm.addEventListener("click", handleKmClick);
unitMi.addEventListener("click", handleMiClick);

// Getting thunder references from the DOM
const thunderButton = document.getElementById("thunder-btn");
const thunderInstructionMsg = document.getElementById("thunder-instruction-msg");
const scanSound = new Audio("audios/scan.mp3");
let interval;
let count = 0;

// Function to show result
const showResult = (dis, unit) => {
  const resultPopUp = document.getElementById("result-popup");
  const unitText = unit;
  let distance = dis;

  if(unit === "mile"){
    distance *= 0.621371;
  }

  const dangerMsg = `<div class="result-popup-box danger-box">
        <span>Danger!</span>
        <div class="result-popup-box-text">
          <p>The distance of lightning from you is ${distance.toFixed(3)} ${unitText}(s).</p>
          <ul>
            <li>Seek immediate shelter to avoid direct exposure.</li>
            <li>Avoid contact with electronic devices.</li>
            <li>Stay away from windows, doors, and tall objects.</li>
          </ul>
        </div>

        <i class='bx bx-x' id="close-result-btn"></i>
      </div>`;

  const moderateMsg = `<div class="result-popup-box moderate-box">
        <span>Moderate Danger!</span>
        <div class="result-popup-box-text">
          <p>The distance of lightning from you is ${distance.toFixed(3)} ${unitText}(s).</p>
          <ul>
            <li>Monitor weather updates for changes.</li>
            <li>Be prepared to seek shelter if conditions worsen.</li>
            <li>Stay indoors and avoid open areas if thunder is audible.</li>
          </ul>
        </div>

        <i class='bx bx-x' id="close-result-btn"></i>
      </div>`;

  const safeMsg = `<div class="result-popup-box safe-box">
        <span>You are safe!</span>
        <div class="result-popup-box-text">
          <p>The distance of lightning from you is ${distance.toFixed(3)} ${unitText}(s).</p>
          <ul>
            <li>Stay informed through reliable weather sources for updates.</li>
            <li>You are safe for now.</li>
          </ul>
        </div>

        <i class='bx bx-x' id="close-result-btn"></i>
      </div>`;

  if(dis <= 5){
    resultPopUp.innerHTML = dangerMsg;
    resultPopUp.style.display = "flex";
  }
  else if(dis > 5 && dis <= 14){
    resultPopUp.innerHTML = moderateMsg;
    resultPopUp.style.display = "flex";
  }
  else{
    resultPopUp.innerHTML = safeMsg;
    resultPopUp.style.display = "flex";
  }

  document.getElementById("close-result-btn").addEventListener("click", () => {
    resultPopUp.style.display = "none";
  })
}

// Function to calculate the distance
const calculateDistance = (sec) => {
  const distance = sec / 2.9155;

  if(unitKm.classList.contains("active-unit-toggle")) {
    showResult(distance, "kilometer");
  }
  else{
    showResult(distance, "mile");
  }

  thunderInstructionMsg.innerText = "Press the thunder icon when you see the light!";
}

// Function handle the 1st click
const thunderFirstClickHandler = () => {
  // Reset count to 0 when thunder calculation starts
  count = 0;
  // Adding animation to thunder button
  thunderButton.classList.add("thunder-btn-in-process");

  // Sound Effect
  scanSound.play();

  thunderInstructionMsg.innerText = "Now click again when you hear the sound!";

  // Counting the seconds
  interval = setInterval(() => {
    count++;
    thunderButton.classList.remove("bx", "bxs-bolt");
    thunderButton.innerText = count.toString();

    if(count === 120){
      thunderSecondClickHandler();
    }
  }, 1000);

  // Remove click event listener to prevent multiple intervals
  thunderButton.removeEventListener("click", thunderFirstClickHandler);
  thunderButton.addEventListener("click", thunderSecondClickHandler);
}

// Function to handle the 2nd click
const thunderSecondClickHandler = () => {
  clearInterval(interval);
  thunderButton.classList.add("bx", "bxs-bolt");
  thunderButton.innerText = "";
  thunderButton.classList.remove("thunder-btn-in-process");
  thunderButton.removeEventListener("click", thunderSecondClickHandler);
  thunderButton.addEventListener("click", thunderFirstClickHandler);
  calculateDistance(count);
}

// Adding click event to thunder button
thunderButton.addEventListener("click", thunderFirstClickHandler);

// Getting reference from DOM for about popup
const aboutButton = document.getElementById("about-app-btn");
const aboutPopup = document.getElementById("about-popup");
const aboutCloseButton = document.getElementById("about-popup-close-btn");

aboutButton.addEventListener("click", () => {
  aboutPopup.style.display = "flex";
});

aboutCloseButton.addEventListener("click", () => {
  aboutPopup.style.display = "none";
});

// Getting reference from DOM for contact me
const contactButton = document.getElementById("contact-btn");

contactButton.addEventListener("click", () => {
  location.replace("mailto:tapasreeve@gmail.com");
});













