console.log("From Javascript file");

const weatherForm = document.querySelector("form");
const search = document.querySelector("input");

const messageOne = document.getElementById("message-one");
const messageTwo = document.getElementById("message-two");

// event listener when form is submited
weatherForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const location = search.value;
  messageOne.textContent = "Loading...";
  messageTwo.textContent = "";
  fetch(`http://localhost:3000/weather?address=${location}`).then(
    (response) => {
      response.json().then((data) => {
        if (data.error) {
          messageOne.textContent = data.error;
        } else {
          messageOne.textContent = data.location;
          messageTwo.textContent = data.forecast;
        }
      });
    }
  );
});
