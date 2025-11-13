// 輔助函數：顯示錯誤訊息
function displayError(input, message) {
    // 假設錯誤訊息元素的 ID 是 input ID + "Error"
    const errorElement = document.getElementById(input.id + 'Error');
    if (errorElement) {
        errorElement.textContent = message;
        errorElement.style.display = 'block';
        // 為了讓錯誤訊息更明顯，可以為輸入框添加一個錯誤樣式
        input.classList.add('is-invalid');
    }
}

// 輔助函數：清除錯誤訊息
function clearError(input) {
    const errorElement = document.getElementById(input.id + 'Error');
    if (errorElement) {
        errorElement.textContent = '';
        errorElement.style.display = 'none';
        input.classList.remove('is-invalid');
    }
}

// 輔助函數：檢查輸入是否符合要求 (重構為 DOM 錯誤提示)
function checkInput(input, patternMessage) {
    clearError(input); // 先清除之前的錯誤
    
    // 檢查是否為空 (valueMissing)
    if (input.value.trim() === '') {
        const labelText = input.labels && input.labels[0] ? input.labels[0].textContent : '此欄位';
        displayError(input, labelText + ' 必填');
        input.focus();
        return false;
    }

    // 檢查是否符合 pattern (正規表達式)
    if (input.pattern) {
        const regex = new RegExp(input.pattern);
        if (!regex.test(input.value)) {
            displayError(input, patternMessage);
            input.focus();
            return false;
        }
    }
    
    return true;
}

// 應援禮1的詳情介紹
const detailsButton1 = document.getElementById('detailsBtn1');
detailsButton1.addEventListener('click', function() {
  const detailText = "以SEVENTEEN的「酒精男團」形象為靈感，刻印成員專屬動物形象，舉起杯，一起慶祝十週年吧!";
  alert(detailText); // 這裡保留 alert，因為不是表單驗證
});

// 應援禮2的詳情介紹
const detailsButton2 = document.getElementById('detailsBtn2');
detailsButton2.addEventListener('click', function() {
  const detailText = "印有SVT logo的鍵盤吊飾，按壓即有解壓效果，每一次按下鍵盤，就像與SEVENTEEN一起釋放壓力。";
  alert(detailText); // 這裡保留 alert，因為不是表單驗證
});

// 應援禮3的詳情介紹
const detailsButton3 = document.getElementById('detailsBtn3');
detailsButton3.addEventListener('click', function() {
  const detailText = "收錄成員曾說過的話與歌詞，短短一句，在需要的時刻也能帶來溫暖與力量。";
  alert(detailText); // 這裡保留 alert，因為不是表單驗證
});

// 展覽預約表單 (保留 localStorage 邏輯)
const reserveForm = document.getElementById('reserveForm');
const reserveName = document.getElementById('reserveName'); // 新增
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
  
  // 檢查所有欄位
  const nameOk = checkInput(reserveName, '請輸入姓名');
  const emailOk = checkInput(reserveEmail, '請輸入有效 Email');
  const phoneOk = checkInput(reservePhone, '請輸入 09 開頭的 10 碼手機');
  
  // 只有所有驗證都通過才繼續
  if (!nameOk || !emailOk || !phoneOk) return;

  // 檢查確認勾選
  if (!reserveCheck.checked) {
    alert('請勾選確認所有資料皆正確'); // 這裡保留 alert，因為沒有專門的錯誤元素
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
const orderName = document.getElementById('orderName'); // 新增
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
  
  // 檢查所有欄位
  const nameOk = checkInput(orderName, '請輸入訂購人姓名');
  const emailOk = checkInput(orderEmail, '請輸入有效 Email');
  const phoneOk = checkInput(orderPhone, '請輸入 09 開頭的 10 碼手機');
  
  if (!nameOk || !emailOk || !phoneOk) return;

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

// 會員註冊/登入模擬
const signupForm = document.getElementById('signupForm');
const loginForm = document.getElementById('loginForm');
const loginFormContent = document.getElementById('loginForm'); // 登入表單本身
const loggedInMessage = document.getElementById('loggedInMessage');
const loggedInUser = document.getElementById('loggedInUser');
const authTitle = document.getElementById('authTitle');
const showSignupBtn = document.getElementById('showSignupBtn');
const showLoginBtn = document.getElementById('showLoginBtn');
const logoutBtn = document.getElementById('logoutBtn');

const signupName = document.getElementById('signupName'); // 新增
const signupEmail = document.getElementById('signupEmail');
const signupPhone = document.getElementById('signupPhone');
const signupPassword = document.getElementById('signupPassword');
const signupConfirmPassword = document.getElementById('signupConfirmPassword');
const signupCheck = document.getElementById('signupCheck');
const passwordStrength = document.getElementById('passwordStrength');

const loginEmail = document.getElementById('loginEmail');
const loginPassword = document.getElementById('loginPassword');

const MEMBER_STORAGE_KEY = 'memberData';
const LOGIN_STATUS_KEY = 'loginStatus';

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

// 狀態切換函數
function updateAuthUI(isLoggedIn, userName = '') {
    if (isLoggedIn) {
        // 顯示登入成功訊息
        loggedInUser.textContent = userName;
        loggedInMessage.style.display = 'block';
        
        // 隱藏註冊/登入表單
        document.getElementById('authContent').style.display = 'none';
    } else {
        // 隱藏登入成功訊息
        loggedInMessage.style.display = 'none';
        
        // 顯示註冊/登入表單
        document.getElementById('authContent').style.display = 'block';
        
        // 預設顯示註冊表單
        showSignupForm();
    }
}

function showSignupForm() {
    authTitle.textContent = '註冊會員';
    signupForm.style.display = 'block';
    loginForm.style.display = 'none';
    showSignupBtn.classList.add('btn-primary');
    showSignupBtn.classList.remove('btn-outline-secondary');
    showLoginBtn.classList.add('btn-outline-secondary');
    showLoginBtn.classList.remove('btn-primary');
}

function showLoginForm() {
    authTitle.textContent = '會員登入';
    signupForm.style.display = 'none';
    loginForm.style.display = 'block';
    showLoginBtn.classList.add('btn-primary');
    showLoginBtn.classList.remove('btn-outline-secondary');
    showSignupBtn.classList.add('btn-outline-secondary');
    showSignupBtn.classList.remove('btn-primary');
}

// 頁面載入時檢查登入狀態
function checkLoginStatus() {
    const status = localStorage.getItem(LOGIN_STATUS_KEY);
    if (status) {
        const memberData = JSON.parse(localStorage.getItem(MEMBER_STORAGE_KEY));
        if (memberData) {
            updateAuthUI(true, memberData.name);
            return;
        }
    }
    updateAuthUI(false);
}

// 註冊表單提交
signupForm.addEventListener('submit', e => {
  e.preventDefault();
  
  // 檢查所有欄位
  const nameOk = checkInput(signupName, '請輸入會員姓名');
  const emailOk = checkInput(signupEmail, '請輸入有效 Email');
  const phoneOk = checkInput(signupPhone, '請輸入 09 開頭的 10 碼手機');
  
  if (!nameOk || !emailOk || !phoneOk) return;
  
  // 檢查密碼強度
  const pwdStrength = evaluatePassword(signupPassword.value);
  if (pwdStrength === '弱') {
    displayError(signupPassword, '密碼太弱，請至少包含英文+數字（可加符號）');
    signupPassword.focus();
    return;
  }
  
  // 檢查密碼一致性
  if (signupPassword.value !== signupConfirmPassword.value) {
    displayError(signupConfirmPassword, '確認密碼與密碼不一致');
    signupConfirmPassword.focus();
    return;
  }
  
  // 檢查確認勾選
  if (!signupCheck.checked) {
    alert('請勾選確認註冊資訊正確');
    return;
  }
  
  // 模擬註冊成功：將資料儲存到 localStorage
  const memberData = {
      name: signupName.value,
      email: signupEmail.value,
      password: signupPassword.value // 實際應用中密碼不應明文儲存
  };
  localStorage.setItem(MEMBER_STORAGE_KEY, JSON.stringify(memberData));
  
  alert('註冊成功！您現在可以登入了。');
  signupForm.reset();
  passwordStrength.textContent = '密碼強度: ';
  passwordStrength.style.color = ''; // 清除顏色
  
  // 註冊成功後切換到登入畫面
  showLoginForm();
});

// 登入表單提交
loginFormContent.addEventListener('submit', e => {
    e.preventDefault();
    
    // 檢查 Email 和密碼是否為空
    const emailOk = checkInput(loginEmail, '請輸入有效 Email');
    const passwordOk = checkInput(loginPassword, '請輸入密碼');
    
    if (!emailOk || !passwordOk) return;
    
    // 從 localStorage 讀取會員資料
    const memberData = JSON.parse(localStorage.getItem(MEMBER_STORAGE_KEY));
    
    if (!memberData) {
        displayError(loginEmail, '查無此帳號，請先註冊。');
        return;
    }
    
    // 驗證帳號密碼
    if (loginEmail.value === memberData.email && loginPassword.value === memberData.password) {
        // 登入成功
        localStorage.setItem(LOGIN_STATUS_KEY, 'true');
        alert('登入成功！');
        loginFormContent.reset();
        updateAuthUI(true, memberData.name);
    } else {
        displayError(loginPassword, 'Email 或密碼錯誤。');
    }
});

// 登出按鈕
logoutBtn.addEventListener('click', () => {
    localStorage.removeItem(LOGIN_STATUS_KEY);
    alert('已登出。');
    updateAuthUI(false);
});

// 註冊/登入切換按鈕
showSignupBtn.addEventListener('click', showSignupForm);
showLoginBtn.addEventListener('click', showLoginForm);

// 頁面載入時執行
checkLoginStatus();