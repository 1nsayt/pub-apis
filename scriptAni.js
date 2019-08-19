const searchForm = document.querySelector(".search-form"),
      searchInput = document.querySelector(".search-input"),
      info = document.querySelector(".info");

function apiSearch(e) {
  e.preventDefault();

  const query = searchInput.value.trim();
  if (query === "") {
    alert("please enter name of anime");
    return;
  }
  if (
    document.querySelector(".title").textContent.toLowerCase() ===
    query.toLowerCase()
  ) {
    alert("you found what you wanted");
    return;
  }
  const server = `https://api.jikan.moe/v3/search/anime/?q=${query}&limit=1`;

  fetch(server)
    .then(response => response.json())
    .then(result => {
      console.log(result);
      let {title, episodes, score, type, synopsis, image_url } = result.results[0],
        obj = { 
          title, 
          avatar: image_url, 
          episodes, 
          score, 
          type,
          synopsis },
        arr = [...info.children].map(el => el.className);

      for (i = 0; i < arr.length; i++) {
        let query = document.querySelector(`.${arr[i]}`);
        text = obj[arr[i]];
        console.log(query.tagName);
        if (arr[i] === "avatar") {
          query.style.border = "1px solid black";
          query.style.visibility = "visible";
          query.src = obj[arr[i]];
          continue;
        } else if (query.tagName == "SPAN") {
          query.textContent = arr[i] + ": " + text;
        } else {
          query.textContent = text;
        }
      }
    })
    .catch(error => console.error("Error:" + error.status));
}

searchForm.addEventListener("submit", apiSearch);
