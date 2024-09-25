// const BASE_URL =
//     "https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies";
const BASE_URL = "https://v6.exchangerate-api.com/v6/cd868803e7a280c541409e0b/latest/";
let dropdown = document.querySelectorAll(".dropdown select");
let submit = document.querySelector("button");
let fromCurr = document.querySelector(".from select");
let toCurr = document.querySelector(".to select");
let msg = document.querySelector(".msg");


// this is logic to give many options for dropdown
for (let select of dropdown) { // total jitna jagah dropdown use ho rha,...agar same option rakhna h hr dropdown m
    for (let currCode in countryList) { // jo jo option dena h usko ek array m rakh lo
        let newOption = document.createElement("option"); // ek naya option banao
        newOption.innerText = currCode; // usme option daal do
        newOption.value = currCode; // uske value m we can add this

        // this we write the logic to add a particular option selected
        if (select.name === "from" && currCode === "USD") {
            newOption.selected = true;
        } else if (select.name === "to" && currCode === "INR") {
            newOption.selected = true;
        }

        select.append(newOption);
    }
    select.addEventListener("change", (evt) => {
        updateFlag(evt.target);
    });
}

const updateFlag = (element) => {
    let currFlag = element.value;
    let countryCode = countryList[currFlag];
    let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
    let img = element.parentElement.querySelector("img");
    if (img) {
        img.src = newSrc;
    }
}

submit.addEventListener("click", async (evt) => {
    evt.preventDefault();
    let amount = document.querySelector(".amount input");
    let amountValue = amount.value;
    if (amountValue === "" || amountValue < 1) {
        amountValue = 1;
        amount.value = "1";
    }
    // console.log(fromCurr.value, toCurr.value);
    // let url = `${BASE_URL}/${fromCurr.value.toLowerCase()}/${toCurr.value.toLowerCase()}.json`;
    let url = `${BASE_URL}${fromCurr.value.toLowerCase()}`;
    console.log("Fetching data from URL:", url); // Log the URL
    try {
        let response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        let data = await response.json();
        // console.log(data);
        let convert =  data.conversion_rates[toCurr.value];
        let afterconvert = amountValue * convert;
        // console.log(`${amountValue} ${fromCurr.value} -> ${afterconvert} ${toCurr.value}`);
        msg.innerText = `${amountValue} ${fromCurr.value}  ->  ${afterconvert} ${toCurr.value}`;

    } catch (error) {
        console.error("Error fetching data:", error);
    }
});