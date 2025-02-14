
const buttons = document.querySelectorAll(".select-button")
const errorText = document.querySelector(".error-text")
const numberInput = document.querySelector(".number__input")
const resetButton = document.getElementById("reset-button")
const bill = document.getElementById("js_bill")
const number = document.getElementById("js_number")
const tip = document.getElementById("tip")
let selectedButtonTipNumber = 0
let billTip = 0
let billValue = 0
let numberValue = 0
let amount = 0
let total = 0
let displayAmount = document.getElementById("amount")
let displayTotal = document.getElementById("total")
let customValue = 0
let hasValue = false
let isClicked = false
let selectedButton


//最初は0.00を表示
displayAmount.innerText = "$0.00";
displayTotal.innerText = "$0.00";



// billの値をリアルタイムで取得
bill.addEventListener("input", function(e) {
    billValue = parseFloat(e.target.value); // 数値に変換
    if(e.target.value.length > 0){
        hasValue = true
    }else {
        hasValue = false
    }
    
    division();
    somethingInput();
});

//select-buttonは一つしか選択出来ない＆選択したら色が変わる
buttons.forEach(button => {
    button.addEventListener("click", function () {
        isClicked = true
        buttons.forEach(btn => btn.classList.remove("active", "select-button-active"))
        this.classList.add("active", "select-button-active")
        tip.value = "";

        // 選択中のボタンを取得
        selectedButton = document.querySelector(".select-button.active");
        
        //選択されたボタンを数値として扱う
        selectedButtonTipNumber = parseInt(selectedButton.textContent.replace("%", "").trim(), 10);
        multiplication(selectedButtonTipNumber);
        division();

        somethingInput();
    })
    
})

//customに入った数字を数値としてリアルタイムで取得
tip.addEventListener("input", function(e){
    isClicked = false
    customValue = parseFloat(e.target.value) || 0; // 数値変換（NaNなら0）
    buttons.forEach(btn => btn.classList.remove("active", "select-button-active"))
    multiplication(customValue);
    division();

    if(e.target.value.length > 0){
        hasValue = true
    }else {
        hasValue = false
    }
    somethingInput();
})



// 人数の値をリアルタイムで取得
number.addEventListener("input", function(e) {
    numberValue = parseFloat(e.target.value); // 数値に変換
    //人数が0ならエラーテキストが表示＆枠がオレンジに変わる
    if (numberValue === 0) {
        errorText.classList.add("block")
        numberInput.classList.add("number__input--error")
    } else {
        division();
    }

    if(this.value.length > 0){
        hasValue = true
    }else {
        hasValue = false
    }
    somethingInput ();
});

//チップの計算(bill×tip)selectedButtonTipNumber
const multiplication = (num)=>{
    billTip = billValue * (0.01 * num)
}


//Amountの計算(billTip÷number)
const division = ()=> {
    amount = billTip / numberValue
    let truncatedAmount = Math.floor(amount * 100) / 100; // 小数点以下3位を切り捨て
    // `NaN` や `Infinity` の場合は `0.00` を表示
    displayAmount.innerText = `$${isFinite(truncatedAmount) ? truncatedAmount.toFixed(2) : "0.00"}`;

    totalCalculation();
}

//Totalの計算（(amount×number+bill)÷number）
const totalCalculation = ()=>{
    total = (amount * numberValue + billValue) / numberValue
    let roundedTotal = Math.round(total * 100) / 100; // 小数点以下3位で四捨五入
    // `NaN` や `Infinity` の場合は `0.00` を表示
    displayTotal.innerText = `$${isFinite(roundedTotal) ? roundedTotal.toFixed(2) : "0.00"}`;

}


//resetButtonの色が変わる+入力したものや選んだ値が0になる
const reset = ()=>{
    
    resetButton.addEventListener("click", ()=>{
        bill.value = ""
        number.value = ""
        tip.value = ""
        displayAmount.innerText = "$0.00";
        displayTotal.innerText = "$0.00";
        resetButton.classList.remove("reset-button-active")
        if (selectedButton !== undefined){
            selectedButton.classList.remove("active", "select-button-active")
        }
        
    })
}
reset();



const somethingInput = ()=>{
    if ((hasValue === true) || (isClicked === true)){
        resetButton.classList.add("reset-button-active")
        resetButton.disabled = false
    }else {
        resetButton.classList.remove("reset-button-active")
        resetButton.disabled = true
    }
}

