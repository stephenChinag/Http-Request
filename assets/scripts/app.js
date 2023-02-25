const listElement = document.querySelector(".posts");
const postTemplate = document.getElementById("single-post");
const form = document.querySelector("#new-post form ");
const fetchButton = document.querySelector("#available-post button");
function sendHttpRequest(method, url, data) {
	const promise = new Promise((resolve, reject) => {
		const xhr = new XMLHttpRequest();
		xhr.open(method, url);
		xhr.onload = function () {
			resolve(JSON.parse(xhr.response));
			//	const loadedPost = ;
		};
		xhr.send(JSON.stringify(data));
	});

	return promise;
}
async function fetchPost() {
	const getPost = await sendHttpRequest(
		"GET",
		"https://jsonplaceholder.typicode.com/posts",
	);
	const loadedPost = getPost;
	for (const post of loadedPost) {
		const postEl = document.importNode(postTemplate.content, true);
		postEl.querySelector("h2").textContent = post.title.toUpperCase();
		postEl.querySelector("p").textContent = post.body;
		listElement.append(postEl);
	}
}
function createPosts(title, content) {
	const userId = Math.random();
	const post = {
		title: title,
		body: content,
		userId,
	};
	sendHttpRequest("POST", "https://jsonplaceholder.typicode.com/posts", post);
}

fetchButton.addEventListener();
fetchPost();
createPosts("DUMMY", "THIS IS ONE OF THE CONTENT");

//"GET", "https://jsonplaceholder.typicode.com/posts"
// i Bless your name Lord for there's no one like you thank you for the gift of life family and health
