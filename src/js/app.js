const openModalBtn = document.querySelector(".open-form");
const modal = document.querySelector(".modal");

const closeModalBtn = document.querySelector(".close");

closeModalBtn.addEventListener("click", () => {
	modal.classList.remove("active-modal");
});

modal.addEventListener("click", (e) => {
	// console.log(e.target);

	// მოდალის ელემენტზე (ნაცრისფერ ბლოკზე) კლიკი როცა ხდება, დავხუროთ მოდალი
	if (e.target === modal) {
		modal.classList.remove("active-modal");
	}
});

openModalBtn.addEventListener("click", () => {
	modal.classList.add("active-modal");
});

const createUserUrl = "https://borjomi.loremipsum.ge/api/register", //method POST  ყველა ველი სავალდებულო
	getAllUsersUrl = "https://borjomi.loremipsum.ge/api/all-users", //method GET
	getSingleUserUrl = "https://borjomi.loremipsum.ge/api/get-user/1 ", //id, method  GET
	updateUserUrl = "https://borjomi.loremipsum.ge/api/update-user/1 ", //id, method PUT
	deleteUserUrl = "https://borjomi.loremipsum.ge/api/delete-user/1"; //id, method DELETE

const form = document.querySelector("#register-user");
const userName = document.querySelector("#user_name"),
	userSurname = document.querySelector("#user_surname"),
	userPhone = document.querySelector("#user_phone"),
	userPersonalId = document.querySelector("#user_personal-id"),
	userEmail = document.querySelector("#user_email"),
	userZipCode = document.querySelector("#user_zip-code");
let userGender = document.querySelector("[name='gender']");

// const user = {
// 	first_name: "satesto",
// 	last_name: "text",
// 	phone: "123456789",
// 	id_number: "12345678909",
// 	email: "text@gmail.com",
// 	gender: "male",
// 	zip_code: "1245",
// };

function getAllUsersFn() {
	fetch("https://borjomi.loremipsum.ge/api/all-users")
		.then((res) => {
			return res.json();
		})
		.then((data) => {
			console.log(data.users);
			// renderUsers(data.users)
		});
}

getAllUsersFn();

function createUserFn(user) {
	fetch("https://borjomi.loremipsum.ge/api/register", {
		method: "post",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(user),
	})
		.then((res) => res.json())
		.then((data) => {
			console.log(data);
			if (data.status) {
				form.reset();
				modal.classList.remove("active-modal");
			}
		});
}

form.addEventListener("submit", (e) => {
	e.preventDefault();
	userGender = document.querySelector("[name='gender']:checked");
	// console.log(userGender);

	const userData = {
		first_name: userName.value,
		last_name: userSurname.value,
		phone: userPhone.value,
		id_number: userPersonalId.value,
		email: userEmail.value,
		gender: userGender.value,
		zip_code: userZipCode.value,
	};

	// console.log(JSON.stringify(userData));

	if (true) {
		createUserFn(userData);
	}
});

function getCountriesData() {
	fetch("https://restcountries.com/v3.1/all")
		.then((response) => {
			return response.json();
		})
		.then((counties) => {
			console.log(counties);
			// renderCountries();
		});
}
function getCountryData(country) {
	fetch(`https://restcountries.com/v3.1/name/${country}`)
		.then((response) => {
			return response.json();
		})
		.then((data) => {
			console.log(data);
			// renderCountries();
		})
		.catch((err) => {
			console.log(err);
		});
}

async function getCountryDataAsync(country) {
	// try catch finally
	try {
		const response = await fetch(
			`https://restcountries.com/v3.1/name/${country}`
		);
		const data = await response.json();
		console.log(data);
	} catch (error) {
		console.log(error);
	} finally {
		console.log("finally");
	}
}

// getCountryDataAsync("georgia");
// new Promise()
