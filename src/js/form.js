// modal
const modal = document.querySelector("#sign-in-success-modal");
const modalMessage = document.querySelector(".modal-message");
const modalContent = document.querySelector(".modal-content");
const closeModalBtn = document.querySelector(".close");

closeModalBtn.addEventListener("click", () => {
	modal.classList.remove("active-modal");
});

modal.addEventListener("click", (e) => {
	console.log(e.target);

	// მოდალის ელემენტზე (ნაცრისფერ ბლოკზე) კლიკი როცა ხდება, დავხუროთ მოდალი
	if (e.target === modal) {
		modal.classList.remove("active-modal");
	}
});

// form
const form = document.querySelector("form");
const emailInput = document.querySelector("#email");
const passwordInput = document.querySelector("#password");
const idNumber = document.querySelector("#id-number");
const repeatPassword = document.querySelector("#repeat-password");

function addErrorClass(parent) {
	parent.classList.remove("success");
	parent.classList.add("error");
}

function addSuccessClass(parent) {
	parent.classList.remove("error");
	parent.classList.add("success");
}

function checkPassword() {
	const parent = passwordInput.parentElement;
	if (passwordInput.value.length < 8) {
		addErrorClass(parent);
		parent.querySelector(".error-message").innerText =
			"password must be at least 8 char";
		return false;
	} else {
		addSuccessClass(parent);
		parent.querySelector(".error-message").innerText = "";
		return true;
	}
}

function checkEmail() {
	const parent = emailInput.parentElement;
	if (emailInput.value == "") {
		addErrorClass(parent);
		parent.querySelector(".error-message").innerText = "email is required";
		return false;
	} else if (!/@academy.edu.ge$/.test(emailInput.value)) {
		addErrorClass(parent);
		parent.querySelector(".error-message").innerText =
			"email ending must be 'academy.edu.ge'";
		return false;
	} else {
		addSuccessClass(parent);
		parent.querySelector(".error-message").innerText = "";
		return true;
	}
}
// 1. არსებულ ფორმაში დაამატეთ 2 ველი id-number, repeat-password

// 2.  id-number - ვალიდაცია:  სავალდებულოა, უნდა შეიცავდეს მხოლოდ რიცხვებს, შეყვანილი სიმბოლოების რაოდენობა უნდა იყოს 11-ის ტოლი.
function checkIdNumber() {
	const parent = idNumber.parentElement;
	if (idNumber.value.trim() === "") {
		//'   text    '
		addErrorClass(parent);
		parent.querySelector(".error-message").innerText = "id number is required";
		return false;
	} else if (!/^\d+$/.test(idNumber.value)) {
		addErrorClass(parent);
		parent.querySelector(".error-message").innerText =
			"id number must contain numbers";
		idNumber.value = "";
		return false;
	} else if (idNumber.value.length !== 11) {
		addErrorClass(parent);
		parent.querySelector(".error-message").innerText =
			"id number must contain 11 number";
		return false;
	} else {
		addSuccessClass(parent);
		parent.querySelector(".error-message").innerText = "";
		return true;
	}
}

// 3.  repeat-password - ვალიდაცია: სავალდებულოა, მნიშვნელობა უნდა ემთხვეოდეს password ველის მნიშვნელობას
function checkRepeatPassword() {
	const parent = repeatPassword.parentElement;
	const passValue = passwordInput.value;
	if (repeatPassword.value.trim() === "") {
		addErrorClass(parent);
		parent.querySelector(".error-message").innerText = "password is required";
		return false;
	} else if (repeatPassword.value !== passValue) {
		addErrorClass(parent);
		parent.querySelector(".error-message").innerText = "passwords must be same";
		return false;
	} else {
		addSuccessClass(parent);
		parent.querySelector(".error-message").innerText = "";
		return true;
	}
}

emailInput.addEventListener("input", checkEmail);
passwordInput.addEventListener("input", checkPassword);
repeatPassword.addEventListener("input", checkRepeatPassword);
idNumber.addEventListener("input", checkIdNumber);

form.addEventListener("submit", (e) => {
	e.preventDefault();
	const isPasswordCorrect = checkPassword();
	const isEmailCorrect = checkEmail();
	const isIdNumberCorrect = checkIdNumber();
	const isRepeatedPasswordSame = checkRepeatPassword();
	if (
		isEmailCorrect &&
		isPasswordCorrect &&
		isIdNumberCorrect &&
		isRepeatedPasswordSame
	) {
		// form.submit();
		modalMessage.innerText = "form sent successfully";
		modal.classList.add("active-modal");
	}
});
