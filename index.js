const base_url =
  "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies";
let drop = document.querySelectorAll(".dropdown select");

let inputElement = document.querySelector('input[type="text"]');
let btn = document.querySelector("button");
let fromcurr = document.querySelector(".from select");
let tocurr = document.querySelector(".to select");
let msg = document.querySelector(".msg");
let swap = document.querySelector("i");

for (let i = 0; i < drop.length; i++) {
  for (code in countryList) {
    let newOp = document.createElement("option");
    newOp.innerText = code;
    newOp.value = code;
    if (drop[i].name === "from" && code === "PKR") {
      newOp.selected = true;
    } else if (drop[i].name === "to" && code === "USD") {
      newOp.selected = true;
    }
    drop[i].append(newOp);
  }
  drop[i].addEventListener("change", (e) => {
    updateFlag(e.target);
  });
}
function updateFlag(ele) {
  let currcode = ele.value;
  let councode = countryList[currcode];
  let newImg = `https://flagsapi.com/${councode}/flat/64.png`;
  let img = ele.parentElement.querySelector("img");
  img.src = newImg;
}

btn.addEventListener("click", async (e) => {
  e.preventDefault();
  let amount = document.querySelector(".amount input");
  let am = amount.value;
  if (am === "" || am < 1) {
    am = 1;
    amount.value = am;
  }
  const url = `${base_url}/${fromcurr.value.toLowerCase()}.json`;
  let resp = await fetch(url);
  let data = await resp.json();
  let rate = data[fromcurr.value.toLowerCase()][tocurr.value.toLowerCase()];
  msg.innerText = `${am} ${fromcurr.value} = ${am * rate} ${tocurr.value}`;
});

swap.addEventListener("click", () => {
  let temp = fromcurr.value;
  fromcurr.value = tocurr.value;
  tocurr.value = temp;
  updateFlag(fromcurr);
  updateFlag(tocurr);
  btn.click();
});
