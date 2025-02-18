
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



// billの値をリアルタイムで取得
bill.addEventListener("input", function(e) {
    e.target.value = e.target.value.replace(/[^0-9.]/g, ""); // 数字以外を削除
    billValue = parseFloat(e.target.value); // 数値に変換
    checkInputValue(e);
    multiplication(selectedButtonTipNumber);
    division();
    updateResetButton();
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

        updateResetButton();
    })
    
})

//customに入った数字を数値としてリアルタイムで取得
tip.addEventListener("input", function(e){
    e.target.value = e.target.value.replace(/[^0-9.]/g, ""); // 数字以外を削除
    isClicked = false
    customValue = parseFloat(e.target.value) || 0; // 数値変換（NaNなら0）
    buttons.forEach(btn => btn.classList.remove("active", "select-button-active"))
    multiplication(customValue);
    division();

    checkInputValue(e);
    updateResetButton();
})



// 人数の値をリアルタイムで取得
number.addEventListener("input", function(e) {
    e.target.value = e.target.value.replace(/[^0-9]/g, ""); // 数字以外を削除
    numberValue = parseFloat(e.target.value); // 数値に変換

    //人数が0ならエラーテキストが表示＆枠がオレンジに変わる
    errorText.classList.toggle("block", numberValue === 0)
    numberInput.classList.toggle("number__input--error", numberValue === 0)
    division();

    checkInputValue(e);
    updateResetButton ();
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
        //値を全て空に
        bill.value = ""
        number.value = ""
        tip.value = ""
        billTip = ""
        billValue = ""
        numberValue = ""
        //errorTextとnumberInputを初期のスタイルに
        errorText.classList.remove("block")
        numberInput.classList.remove("number__input--error")
        displayAmount.innerText = "$0.00";
        displayTotal.innerText = "$0.00";
        resetButton.classList.remove("reset-button-active")
        //selectedButtonが選択されていた時、選択されていない初期状態にする
        if (selectedButton !== undefined){
            selectedButton.classList.remove("active", "select-button-active")
        }
    })
}
reset();



const updateResetButton = ()=>{
    let hasAllDate = ((hasValue === true) || (isClicked === true))
    //resetButtonがhasAllDateの時ボタンの色が変わる
    resetButton.classList.toggle("reset-button-active", hasAllDate)
    //値がどこかに入っていたらボタン機能を有効にする
    //下記のif文を一文に短縮した↓
    resetButton.disabled = !hasAllDate
    // if ((hasValue === true) || (isClicked === true)){
    //     resetButton.classList.add("reset-button-active")
    //     resetButton.disabled = false
    // }else {
    //     resetButton.classList.remove("reset-button-active")
    //     resetButton.disabled = true
    // }
}


const checkInputValue = (e)=>{
    // if(e.target.value.length > 0){
    //     hasValue = true
    // }else {
    //     hasValue = false
    // }
    //上記のif文を一文に短縮した↓
    hasValue = e.target.value.length > 0 ? true : false
}

