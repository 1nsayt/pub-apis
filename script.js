const picture = document.querySelector(".picture-img"),
      picDescription = document.querySelector(".picture-description"),
      picLikes = document.querySelector(".picture-likes");

let delay = 5000;

let timerId = setTimeout(function request() {
  const server = `https://api.unsplash.com/photos/random/?&client_id=a5abe91c63efb0b7b83d07e1a9abfd6c6a3e86307f6f1d1d748a0e2d7acd4cfb`;
  requestApi(server);
  timerId = setTimeout(request, delay);
}, delay);


function requestApi(url) {

  const request = new XMLHttpRequest();

  request.open("GET", url);

  request.responseType = "json";

  request.send();

  request.onload = () => {
    if (request.status != 200) {
      console.log(`Ошибка ${request.status}: ${request.statusText || "status not founded, use google"}`);
    } else {
      let {urls,description, likes} = request.response;
      picture.style.backgroundImage = `url(${urls.thumb})`
      picDescription.textContent = description || "Lorem ipsum dolor sit amet, consectetur adipiscing elit.";
      picLikes.textContent = `likes:${likes}`
    }
  };
}
