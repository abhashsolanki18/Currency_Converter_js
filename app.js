baseURL = "https://v6.exchangerate-api.com/v6/7ad5476b65bc6dcf90111490/latest"

const dropdowns = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("form button");
const fromcurr = document.querySelector(".from select");
const tocurr = document.querySelector(".to select");
const msg = document.querySelector(".msg");

for(let select of dropdowns) {
    for(currcode in countryList){
        let newOption = document.createElement("option");
        newOption.innerText = currcode; 
        newOption.value = currcode;
        if(select.name === "from" && currcode === "USD"){
            newOption.selected = "selected"
        }
        if(select.name === "to" && currcode === "INR"){
            newOption.selected = "selected"
        }
        select.append(newOption)
    }

    select.addEventListener("change", (evt) => {
        updateFlag(evt.target);
    });
 }

const updateFlag = (element) => {
    let currcode = element.value;
    let countryCode = countryList[currcode];
    let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`
    let img = element.parentElement.querySelector("img");
    img.src = newSrc;
};

btn.addEventListener("click", async (evt) => {
    evt.preventDefault();
    let amt = document.querySelector(".amount input");
    let amtVal = amt.value;
    if(amtVal === "" || amtVal < 1){
        amtVal = 1;
        amt.value = "1";
    }

const URL = `${baseURL}/${fromcurr.value}`
let reponse = await fetch(URL);
let data = await reponse.json();
let rate = data.conversion_rates[tocurr.value];
console.log(rate);

let finalAmt = amt.value * rate;
msg.innerText = `${amtVal} ${fromcurr.value} = ${finalAmt} ${tocurr.value}`;
});