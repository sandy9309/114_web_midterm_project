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
const pricePerItem = 300; // 單價
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
