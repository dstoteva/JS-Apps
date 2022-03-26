function loadRepos() {
	const repos = document.getElementById("repos");
	repos.innerHTML = '';
	const username = document.getElementById("username").value;
	const url = `https://api.github.com/users/${username}/repos`;

	fetch(url)
	.then((response) => response.json())
	.then((data) => displayRepos(data))
	.catch((err) => displayError(err))

	function createRepo(name, url) {
		let li = document.createElement('li');
		let a = document.createElement('a');
		a.innerHTML = name;
		a.href = url;
		li.appendChild(a);
		return li;
		}
		
	function displayRepos(repoItems) {
		
		repoItems.forEach(repo => {
		const { full_name, html_url } = repo;
		const repoItem = createRepo(full_name, html_url);
		repos.appendChild(repoItem)
		})
		};
		
		function displayError(err) {
		const listItem = document.createElement('li');
		listItem.textContent = err;
		
		repos.appendChild(listItem); }
}