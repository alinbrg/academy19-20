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
	userZipCode = document.querySelector("#user_zip-code"),
	// user id ფორმში, რომელიც გვჭირდება დაედითებისთვის
	user_id = document.querySelector("#user_id");
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

// TODO: დაასრულეთ შემდეგი ფუნქციები
function renderUsers(usersArray) {
	// TODO: usersArray არის სერვერიდან დაბრუნებული ობიექტების მასივი
	// TODO: ამ მონაცმების მიხედვით html ში ჩასვით ცხრილი როგორც "ცხრილი.png" შია

	console.log(usersArray);
	userActions(); // ყოველ რენდერზე ახლიდან უნდა მივაბათ ივენთ ლისნერები
}

// TODO: დაასრულე
function userActions() {
	// 1. ცხრილში ღილაკებზე უნდა მიამაგროთ event listener-ები
	// 2. იქნება 2 ღილაკი რედაქტირება და წაშლა როგორც "ცხრილი.png" ში ჩანს
	// 3. id შეინახეთ data-user-id ატრიბუტად ღილაკებზე, data ატრიბუტებზე წვდომა შეგიძლიათ dataset-ის გამოყენებით მაგ:selectedElement.dataset
	// 4. წაშლა ღილაკზე დაჭერისას უნდა გაიგზავნოს წაშლის მოთხოვნა (deleteUserFn ფუნქციის მეშვეობით) სერვერზე და გადაეცეს id
	// 5. ედიტის ღილაკზე უნდა გაიხსნას მოდალი სადაც ფორმი იქნება იმ მონაცემებით შევსებული რომელზეც მოხდა კლიკი. ედიტის ღილაკზე უნდა გამოიძახოთ getUserFn ფუნქცია და რომ დააბრუნებს ერთი მომხმარებლის დატას (ობიექტს და არა მასივს)  ეს დატა უნდა შეივსოს ფორმში და ამის შემდეგ შეგიძლიათ დააედიტოთ ეს ინფორმაცია და ფორმის დასაბმითებისას უნდა მოხდეს updateUserFn() ფუნქციის გამოძახება, სადაც გადასცემთ განახლებულ იუზერის ობიექტს, გვჭირდება იუზერის აიდიც, რომელიც  მოდალის გახსნისას user_id-ის (hidden input არის და ვიზუალურად არ ჩანს) value-ში შეგიძლიათ შეინახოთ
}

function getAllUsersFn() {
	fetch("https://borjomi.loremipsum.ge/api/all-users")
		.then((res) => {
			return res.json();
		})
		.then((data) => {
			// console.log(data.users);

			// html-ში გამოტანა მონაცემების
			renderUsers(data.users);
		});
}

function deleteUserFn(id) {
	fetch(`https://borjomi.loremipsum.ge/api/delete-user/${id}`, {
		method: "delete",
	})
		.then((res) => res.json())
		.then((data) => {
			console.log(data);
			// გვიბრუნებს სტატუსს
			getAllUsersFn(); // შენახვის, ედიტირების და წაშლის შემდეგ ახლიდან უნდა წამოვიღოთ დატა
			// ამიტომ აქ ყველგან დაგვჭირდება უბრალოდ ამ ფუნქციის გამოძახება, რომელიც ხელახლა გადახატავს ინფორმაციას
		})
		.catch((error) => {
			console.log(error);
		});
}

function getUserFn(id) {
	fetch(`https://borjomi.loremipsum.ge/api/get-user/${id}`, {
		method: "get",
	})
		.then((res) => res.json())
		.then((data) => {
			// გვიბრუნებს იუზერის ობიექტს
			console.log(data);
			//TODO: შენახვის, ედიტირების და წაშლის შემდეგ ახლიდან წამოიღეთ დატა
		})
		.catch((error) => {
			console.log(error);
		});
}

function updateUserFn(userObj) {
	// მიიღებს დაედითებულ ინფორმაციას და გააგზავნით სერვერზე
	// TODO დაასრულეთ ფუნქცია
	//  method: "put",  https://borjomi.loremipsum.ge/api/update-user/${userObj.id}
	// TODO: შენახვის, ედიტირების და წაშლის შემდეგ ახლიდან წამოიღეთ დატა
}

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

				// შენახვის, ედიტირების და წაშლის შემდეგ ხელახლა გამოგვაქვს ყველა იუზერი
				getAllUsersFn();
			}
		});
}

getAllUsersFn();

form.addEventListener("submit", (e) => {
	e.preventDefault();
	userGender = document.querySelector("[name='gender']:checked");
	// console.log(userGender);

	const userData = {
		id: user_id.value, //ეს #user_id hidden input გვაქვს html-ში და ამას გამოვიყენებთ მხოლოდ დაედითებისთვის
		first_name: userName.value,
		last_name: userSurname.value,
		phone: userPhone.value,
		id_number: userPersonalId.value,
		email: userEmail.value,
		gender: userGender.value,
		zip_code: userZipCode.value,
	};

	// console.log(JSON.stringify(userData));

	// if (true) {
	// 	createUserFn(userData);
	// }

	//  TODO: თუ user_id.value არის ცარიელი (თავიდან ცარიელია) მაშინ უნდა შევქმნათ  -->  createUserFn(user);

	// თუ დაედითებას ვაკეთებთ, ჩვენ ვანიჭებთ მნიშვნელობას userActions ფუნქციაში
	// TODO: თუ user_id.value არის (არაა ცარიელი სტრინგი) მაშინ უნდა დავაედიტოთ, (როცა ფორმს ედითის ღილაკის შემდეგ იუზერის ინფუთით ვავსებთ, ვაედითებთ და ვასაბმითებთ) -->  updateUserFn(user);
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
