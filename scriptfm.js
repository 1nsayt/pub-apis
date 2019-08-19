const genre = document.querySelector(".genre-select"),
      input = document.querySelector(".genre-submit"),
      list = document.querySelector(".topTen"),
      btnClean = document.querySelector(".genre-clean");

function apiSearch(e) {

  e.preventDefault();

  const searchText = genre.value;
  if (searchText == "") {
    return alert("please select genre");
  }
  const server = `http://ws.audioscrobbler.com/2.0/?limit=10&method=tag.gettoptracks&tag=${searchText}&api_key=b43ce99d4f1d944951e254318ecae510&format=json`;
  
  fetch(server)
    .then(response => response.json())
    .then(result => {
      if (list.dataset.state) {
        list.innerHTML = "";
      }
      let topTen = result.tracks.track,
          title = document.createElement("h4");
      title.textContent = `Top 10 of genre ${genre.value}`;
      list.append(title);
      topTen.map(item => {
        let li = document.createElement("li"),
           { url, name } = item;
        li.insertAdjacentHTML(
          "beforeend",
          `<a href=${url}><p>${item.artist.name} - ${name}</p></a>`
        );
        list.append(li);
        list.dataset.state = true;
        genre.value = "";
      });
    })
    .catch(error => console.error("Error:" + error.status));
}

input.addEventListener("click", apiSearch);

btnClean.addEventListener("click",function(e){

  e.preventDefault();
  genre.value = "";
  list.innerHTML = "";
})