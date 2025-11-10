// 輔助函數：檢查輸入是否符合要求
// 簡化驗證邏輯，移除 setCustomValidity 和 reportValidity，改用更基礎的 alert 提示
function checkInput(input, patternMessage) {
  // 檢查是否為空 (valueMissing)
  if (input.value.trim() === '') {
    // 檢查 input.labels 是否存在，以確保程式碼健壯性
    const labelText = input.labels && input.labels[0] ? input.labels[0].textContent : '此欄位';
    alert(labelText + ' 必填');
    input.focus();
    return false;
  }

  // 檢查是否符合 pattern (正規表達式)
  if (input.pattern) {
    const regex = new RegExp(input.pattern);
    if (!regex.test(input.value)) {
      alert(patternMessage);
      input.focus();
      return false;
    }
  }
  
  return true;
}

// 應援禮1的詳情介紹
// 移除 DOMContentLoaded，因為 <script> 標籤已放在 <body> 結尾
const detailsButton1 = document.getElementById('detailsBtn1');
detailsButton1.addEventListener('click', function() {
  const detailText = "以SEVENTEEN的「酒精男團」形象為靈感，刻印成員專屬動物形象，舉起杯，一起慶祝十週年吧!";
  alert(detailText);
});

// 應援禮2的詳情介紹
const detailsButton2 = document.getElementById('detailsBtn2');
detailsButton2.addEventListener('click', function() {
  const detailText = "印有SVT logo的鍵盤吊飾，按壓即有解壓效果，每一次按下鍵盤，就像與SEVENTEEN一起釋放壓力。";
  alert(detailText);
});

// 應援禮3的詳情介紹
const detailsButton3 = document.getElementById('detailsBtn3');
detailsButton3.addEventListener('click', function() {
  const detailText = "收錄成員曾說過的話與歌詞，短短一句，在需要的時刻也能帶來溫暖與力量。";
  alert(detailText);
});

// 展覽預約表單
const reserveForm = document.getElementById('reserveForm');
const reservePhone = document.getElementById('reservePhone');
const reserveEmail = document.getElementById('reserveEmail');
const reserveCheck = document.getElementById('reserveCheck');

const RESERVE_STORAGE_KEY = 'reserveFormData';

// 1. 載入表單資料
function loadReserveForm() {
    const savedData = localStorage.getItem(RESERVE_STORAGE_KEY);
    if (savedData) {
        const data = JSON.parse(savedData);
        // 遍歷表單元素並填入值
        Array.from(reserveForm.elements).forEach(element => {
            if (element.name && data[element.name]) {
                element.value = data[element.name];
            }
        });
    }
}

// 2. 儲存表單資料
function saveReserveForm() {
    const data = {};
    Array.from(reserveForm.elements).forEach(element => {
        if (element.name && element.type !== 'checkbox' && element.type !== 'submit') {
            data[element.name] = element.value;
        }
    });
    localStorage.setItem(RESERVE_STORAGE_KEY, JSON.stringify(data));
}

// 監聽表單輸入事件，即時儲存
reserveForm.addEventListener('input', saveReserveForm);

// 頁面載入時執行載入
loadReserveForm();


reserveForm.addEventListener('submit', e => {
  e.preventDefault();
  
  // 檢查 Email 和電話
  const emailOk = checkInput(reserveEmail, '請輸入有效 Email');
  if (!emailOk) return;
  
  const phoneOk = checkInput(reservePhone, '請輸入 09 開頭的 10 碼手機');
  if (!phoneOk) return;

  // 檢查確認勾選
  if (!reserveCheck.checked) {
    alert('請勾選確認所有資料皆正確');
    return;
  }
  
  // 這裡可以加入送出資料到後端的程式碼
  alert('展覽預約成功！');
  reserveForm.reset();
  
  // 3. 清除 localStorage
  localStorage.removeItem(RESERVE_STORAGE_KEY);
});

// 應援物購買表單
const orderForm = document.getElementById('orderForm');
const quantityInput = document.getElementById('quantity');
const totalInput = document.getElementById('total');
const orderPhone = document.getElementById('orderPhone');
const orderEmail = document.getElementById('orderEmail');
const orderCheck = document.getElementById('orderCheck');
const pricePerItem = 250; // 單價

// 實作總金額即時計算
quantityInput.addEventListener('input', () => {
  const q = parseInt(quantityInput.value) || 0;
  totalInput.value = `$${q * pricePerItem}`;
});

orderForm.addEventListener('submit', e => {
  e.preventDefault();
  
  // 檢查 Email 和電話
  const emailOk = checkInput(orderEmail, '請輸入有效 Email');
  if (!emailOk) return;
  
  const phoneOk = checkInput(orderPhone, '請輸入 09 開頭的 10 碼手機');
  if (!phoneOk) return;

  // 檢查確認勾選
  if (!orderCheck.checked) {
    alert('請勾選確認所有資料皆正確');
    return;
  }
  
  // 這裡可以加入送出資料到後端的程式碼
  alert('訂購成功！');
  orderForm.reset();
  totalInput.value = `$${pricePerItem}`; // 提交成功後，總金額重設為單份價格
});

// 會員註冊表單
const signupForm = document.getElementById('signupForm');
const signupEmail = document.getElementById('signupEmail');
const signupPhone = document.getElementById('signupPhone');
const signupPassword = document.getElementById('signupPassword');
const signupConfirmPassword = document.getElementById('signupConfirmPassword');
const signupCheck = document.getElementById('signupCheck');
const passwordStrength = document.getElementById('passwordStrength');

// 密碼強度判斷邏輯
function evaluatePassword(password) {
  let strength = '弱';
  const strongRegex = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-[\]{};':"\\|,.<>/?]).{8,}$/;
  const mediumRegex = /^(?=.*[a-zA-Z])(?=.*\d).{8,}$/;
  if (strongRegex.test(password)) strength = '強';
  else if (mediumRegex.test(password)) strength = '中';
  return strength;
}

// 實作密碼強度即時顯示
signupPassword.addEventListener('input', () => {
  const pwd = signupPassword.value;
  const strength = evaluatePassword(pwd);
  passwordStrength.textContent = '密碼強度: ' + strength;
  
  // 根據強度改變顏色 (可選，但有助於使用者體驗)
  if (strength === '強') {
    passwordStrength.style.color = 'green';
  } else if (strength === '中') {
    passwordStrength.style.color = 'orange';
  } else {
    passwordStrength.style.color = 'red';
  }
});


signupForm.addEventListener('submit', e => {
  e.preventDefault();
  
  // 檢查 Email 和電話
  const emailOk = checkInput(signupEmail, '請輸入有效 Email');
  if (!emailOk) return;
  
  const phoneOk = checkInput(signupPhone, '請輸入 09 開頭的 10 碼手機');
  if (!phoneOk) return;
  
  // 檢查密碼強度
  const pwdStrength = evaluatePassword(signupPassword.value);
  if (pwdStrength === '弱') {
    alert('密碼太弱，請至少包含英文+數字（可加符號）');
    signupPassword.focus();
    return;
  }
  
  // 檢查密碼一致性
  if (signupPassword.value !== signupConfirmPassword.value) {
    alert('確認密碼與密碼不一致');
    signupConfirmPassword.focus();
    return;
  }
  
  // 檢查確認勾選
  if (!signupCheck.checked) {
    alert('請勾選確認註冊資訊正確');
    return;
  }
  
  // 這裡可以加入送出資料到後端的程式碼
  alert('註冊成功！');
  signupForm.reset();
  passwordStrength.textContent = '密碼強度: ';
  passwordStrength.style.color = ''; // 清除顏色
});