
const buttons = document.querySelectorAll(".select-button")
const errorText = document.querySelector(".error-text")
const numberInput = document.querySelector(".number__input")
const resetButton = document.getElementById("reset-button")
let bill = document.getElementById("js_bill")
let number = document.getElementById("js_number")
let selectedButtonTipNumber
let billTip
let billValue
let numberValue
let amount
let total
let displayAmount = document.getElementById("amount")
let displayTotal = document.getElementById("total")




//最初は0.00を表示
displayAmount.innerText = "$0.00";
displayTotal.innerText = "$0.00";



// billの値をリアルタイムで取得
bill.addEventListener("input", function() {
    billValue = parseFloat(this.value); // 数値に変換
    // console.log(billValue)
});

//select-buttonは一つしか選択出来ない＆選択したら色が変わる
buttons.forEach(button => {
    button.addEventListener("click", function () {
        buttons.forEach(btn => btn.classList.remove("active", "select-button-active"))
        this.classList.add("active")
        this.classList.add("select-button-active")

        // 選択中のボタンを取得
        const selectedButton = document.querySelector(".select-button.active");
        
        //選択されたボタンを数値として扱う
        selectedButtonTipNumber = parseInt(selectedButton.textContent.replace("%", "").trim(), 10);
        // console.log(selectedButtonTipNumber)
        multiplication();
    })
})

// 人数の値をリアルタイムで取得
number.addEventListener("input", function() {
    numberValue = parseFloat(this.value); // 数値に変換
    //人数が0ならエラーテキストが表示＆枠がオレンジに変わる
    if (numberValue === 0) {
        errorText.classList.add("block")
        numberInput.classList.add("number__input--error")
    } else {
        division();
        reset();
    }
});


//チップの計算(bill×tip)
const multiplication = ()=>{
    billTip = billValue * (0.01 * selectedButtonTipNumber)
}


//Amountの計算(billTip÷number)
const division = ()=> {
    amount = billTip / numberValue
    let truncatedAmount = Math.floor(amount * 100) / 100; // 小数点以下3位を切り捨て
    displayAmount.innerText = `$${truncatedAmount}`;
    totalCalculation();
}

//Totalの計算（(amount×number+bill)÷number）
const totalCalculation = ()=>{
    total = (amount * numberValue + billValue) / numberValue
    let roundedTotal = Math.round(total * 100) / 100; // 小数点以下3位で四捨五入
    displayTotal.innerText = `$${roundedTotal}`;
}


//resetButtonの色が変わる+入力したものや選んだ値が0になる
const reset = ()=>{
    resetButton.classList.add("reset-button-active")
    console.log(bill.placeholder)
    resetButton.addEventListener("click", ()=>{
        bill.placeholder = "0"
        billValue = ""
        console.log(billValue)
        console.log(bill.placeholder)
    })
}
