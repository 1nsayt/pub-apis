const searchForm = document.querySelector(".search-form"),
  picture = document.querySelector(".picture-img");

function apiSearch(e) {
  e.preventDefault();
  const searchText = document.querySelector(".search-input").value;
  const server = `https://api.unsplash.com/photos/random/?query=${searchText}&client_id=a5abe91c63efb0b7b83d07e1a9abfd6c6a3e86307f6f1d1d748a0e2d7acd4cfb`;
  requestApi(server);
}

searchForm.addEventListener("submit", apiSearch);

function requestApi(url) {
  const request = new XMLHttpRequest();

  request.open("GET", url);
  request.responseType = "json";
  console.log(request);
  request.send();

  request.onload = () => {
    if (request.status != 200) {
      console.log(`Ошибка ${request.status}: ${request.statusText || "status not found, use google"}`);
    } else {
      let responseObj = request.response;
      console.log(responseObj);
      let url = responseObj.urls.thumb;
      picture.src = url;
    }
  };
}
