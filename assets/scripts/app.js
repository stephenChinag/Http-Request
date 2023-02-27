const listElement = document.querySelector(".posts");
const postTemplate = document.getElementById("single-post");
const form = document.querySelector("#new-post form");
const fetchButton = document.querySelector("#available-posts button");
const postList = document.querySelector("ul");

function sendHttpRequest(method, url, data) {
	//const promise = new Promise((resolve, reject) => {
	// 	const xhr = new XMLHttpRequest();
	// 	xhr.open(method, url);
	// 	xhr.responseType = "json";
	// 	xhr.onload = function () {
	// 		if (xhr.status >= 200 && xhr.status <= 300) {
	// 			resolve(xhr.response);
	// 		} else {
	// xhr.response;
	// 			reject(new Error("Something Went wrong"));
	// 		}
	// 		//	const loadedPost = ;
	// 	};
	// 	xhr.onerror = function () {
	// 		reject(new Error("its an error please try again"));
	// 	};

	// 	xhr.send(JSON.stringify(data));

	// });

	//	return promise;
	return fetch(url, {
		method: method,
		body: data,
		// body: JSON.stringify(data),
		// headers: {
		// 	"Content-type": "application/json",
		// },
	})
		.then((response) => {
			if (response.status >= 200 && response.status < 300) {
				return response.json();
			} else {
				return response.json().then((err) => {
					console.log(err);
					throw new Error("something went Wrong in the Server Side");
				});
			}
		})
		.catch((error) => {
			alert("please reconnect you phone to a good network");
			console.log(error);
		});
}

async function fetchPosts() {
	try {
		const responseData = await sendHttpRequest(
			"GET",
			"https://jsonplaceholder.typicode.com/posts",
		);
		const listOfPosts = responseData;
		for (const post of listOfPosts) {
			const postEl = document.importNode(postTemplate.content, true);
			postEl.querySelector("h2").textContent = post.title.toUpperCase();
			postEl.querySelector("p").textContent = post.body;
			postEl.querySelector("li").id = post.id;
			listElement.append(postEl);
		}
	} catch (error) {
		alert(error.message);
	}
}
async function createPosts(title, content) {
	const userId = Math.random();
	// const post = {
	// 	title: title,
	// 	body: content,
	// 	userId: userId,
	// };

	const fd = new FormData();
	fd.append("title", title);
	fd.append("body", content);
	fd.append("user-id", userId);
	sendHttpRequest("POST", "https://jsonplaceholder.typicode.com/posts", fd);
}

fetchButton.addEventListener("click", fetchPosts);
form.addEventListener("submit", (event) => {
	event.preventDefault();
	const enterdTitle = event.currentTarget.querySelector("#title").value;
	const enteredContent = event.currentTarget.querySelector("#content").value;

	createPosts(enterdTitle, enteredContent);
});

//"GET", "https://jsonplaceholder.typicode.com/posts"
// i Bless your name Lord for there's no one like you thank you for the gift of life family and health
postList.addEventListener("click", (event) => {
	if (event.target.tagName === "BUTTON") {
		const postId = event.target.closest("li").id;
		console.log(postId);
		sendHttpRequest(
			"DELETE",
			`https://jsonplaceholder.typicode.com/posts/${postId}`,
		);
	}
});
