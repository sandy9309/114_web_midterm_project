// 共用驗證函數
function checkValidity(input, patternMessage) {
  if (input.validity.valueMissing) {
    input.setCustomValidity('這個欄位必填');
  } else if (input.validity.patternMismatch) {
    input.setCustomValidity(patternMessage);
  } else {
    input.setCustomValidity('');
  }
  return input.reportValidity() ? true : false;
}
//應援禮1的詳情介紹
document.addEventListener('DOMContentLoaded', function() {
  const detailsButton = document.getElementById('detailsBtn1');
  detailsButton.addEventListener('click', function() {
    const detailText = "以SEVENTEEN的「酒精男團」形象為靈感，刻印成員專屬動物形象，舉起杯，一起慶祝十週年吧!";
    alert(detailText);
  });
});
//應援禮2的詳情介紹
document.addEventListener('DOMContentLoaded', function() {
  const detailsButton = document.getElementById('detailsBtn2');
  detailsButton.addEventListener('click', function() {
    const detailText = "印有SVT logo的鍵盤吊飾，按壓即有解壓效果，每一次按下鍵盤，就像與SEVENTEEN一起釋放壓力。";
    alert(detailText);
  });
});
//應援禮3的詳情介紹
document.addEventListener('DOMContentLoaded', function() {
  const detailsButton = document.getElementById('detailsBtn3');
  detailsButton.addEventListener('click', function() {
    const detailText = "收錄成員曾說過的話與歌詞，短短一句，在需要的時刻也能帶來溫暖與力量。";
    alert(detailText);
  });
});
// 展覽預約表單
const reserveForm = document.getElementById('reserveForm');
reserveForm.addEventListener('submit', e => {
  e.preventDefault();
  const phone = document.getElementById('reservePhone');
  const email = document.getElementById('reserveEmail');
  const check = document.getElementById('reserveCheck');
  const emailOk = checkValidity(email, '請輸入有效 Email');
  const phoneOk = checkValidity(phone, '請輸入 09 開頭的 10 碼手機');
  if (!check.checked) {
    alert('請勾選確認資料正確');
    return;
  }
  if (emailOk && phoneOk) {
    alert('展覽預約成功！');
    reserveForm.reset();
  }
});

// 應援物購買表單
const orderForm = document.getElementById('orderForm');
const quantityInput = document.getElementById('quantity');
const totalInput = document.getElementById('total');
const pricePerItem = 250; // 單價
quantityInput.addEventListener('input', () => {
  const q = parseInt(quantityInput.value) || 0;
  totalInput.value = `$${q * pricePerItem}`;
});
orderForm.addEventListener('submit', e => {
  e.preventDefault();
  const phone = document.getElementById('orderPhone');
  const email = document.getElementById('orderEmail');
  const check = document.getElementById('orderCheck');
  const emailOk = checkValidity(email, '請輸入有效 Email');
  const phoneOk = checkValidity(phone, '請輸入 09 開頭的 10 碼手機');
  if (!check.checked) {
    alert('請勾選確認資料正確');
    return;
  }
  if (emailOk && phoneOk) {
    alert('訂購成功！');
    orderForm.reset();
    totalInput.value = '';
  }
});

// 會員註冊表單
const signupForm = document.getElementById('signupForm');
const signupEmail = document.getElementById('signupEmail');
const signupPhone = document.getElementById('signupPhone');
const signupPassword = document.getElementById('signupPassword');
const signupConfirmPassword = document.getElementById('signupConfirmPassword');
const signupCheck = document.getElementById('signupCheck');
const passwordStrength = document.getElementById('passwordStrength');

function evaluatePassword(password) {
  let strength = '弱';
  const strongRegex = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-[\]{};':"\\|,.<>/?]).{8,}$/;
  const mediumRegex = /^(?=.*[a-zA-Z])(?=.*\d).{6,}$/;
  if (strongRegex.test(password)) strength = '強';
  else if (mediumRegex.test(password)) strength = '中';
  return strength;
}

signupPassword.addEventListener('input', () => {
  passwordStrength.textContent = `密碼強度: ${evaluatePassword(signupPassword.value)}`;
});

signupForm.addEventListener('submit', e => {
  e.preventDefault();
  const emailOk = checkValidity(signupEmail, '請輸入有效 Email');
  const phoneOk = checkValidity(signupPhone, '請輸入 09 開頭的 10 碼手機');
  const pwdStrength = evaluatePassword(signupPassword.value);
  if (pwdStrength === '弱') {
    alert('密碼太弱，請至少包含英文+數字（可加符號）');
    return;
  }
  if (signupPassword.value !== signupConfirmPassword.value) {
    alert('確認密碼與密碼不一致');
    return;
  }
  if (!signupCheck.checked) {
    alert('請勾選確認註冊資訊正確');
    return;
  }
  if (emailOk && phoneOk) {
    alert('註冊成功！');
    signupForm.reset();
    passwordStrength.textContent = '密碼強度: ';
  }
});
