var _id;

function login(username, password) {
	fetch('/users/login', {
		method: 'POST',
		headers: {
			'content-type': 'application/json',
		},
		body: JSON.stringify({
			username: username,
			password: password,
		}),
	})
		.then((response) => response.json())
		.then((json) => {
			console.log('🚀 ~ login ~ json:', json);

			document.cookie = `token=${json.data.token}`;
			window.location.href = '/bookmarks';
		})
		.catch((err) => {
			console.error(err);
		});
}

function editBookmark(id) {
	_id = id
	var myModal = new bootstrap.Modal(document.getElementById('editModal'), {});
	myModal.show();
}

function addBookmark() {
	var myModal = new bootstrap.Modal(document.getElementById('addModal'), {});
	myModal.show();
}

function saveBookmark(Name, URL) {
	fetch('/bookmarks', {
		method: 'POST',
		headers: {
			authorization: `Bearer ${getCookie('token')}`,
			'content-type': 'application/json',
		},
		body: JSON.stringify({
			Name: Name,
			URL: URL,
		}),
	})
		.then((response) => {
			window.location.href = '/bookmarks';
		})
		.catch((err) => {
			console.error(err);
		});
}

function changeBookmark(Name, URL) {
	fetch(`/bookmarks/${_id}`, {
		"method": "PUT",
		"headers": {
			"authorization": `Bearer ${getCookie('token')}`,
			"content-type": "application/json"
		},
		"body": JSON.stringify({
			"Name": Name,
			"URL": URL
		})
	})
	.then(response => {
		window.location.href = '/bookmarks';
	})
	.catch(err => {
		console.error(err);
	});
}

function register(firstname, lastname, username, password) {
	fetch('/users', {
		method: 'POST',
		headers: {
			'content-type': 'application/json',
		},
		body: JSON.stringify({
			firstname: firstname,
			lastname: lastname,
			username: username,
			password: password,
		}),
	})
		.then((response) => {
			window.location.href = '/';
		})
		.catch((err) => {
			console.error(err);
		});
}

function getCookie(cookieName) {
	const cookies = document.cookie.split(';');
	for (let i = 0; i < cookies.length; i++) {
		const cookie = cookies[i].trim();
		if (cookie.startsWith(cookieName + '=')) {
			return cookie.substring(cookieName.length + 1);
		}
	}

	return null;
}

