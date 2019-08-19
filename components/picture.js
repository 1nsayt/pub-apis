// здесь использовал следующее api = https://unsplash.com/developers

// Обяъявление переменных
const picture = document.querySelector(".picture-img"),
      picDescription = document.querySelector(".picture-description"),
      picLikes = document.querySelector(".picture-likes"),
      delay = 5000;
      clientId = "a5abe91c63efb0b7b83d07e1a9abfd6c6a3e86307f6f1d1d748a0e2d7acd4cfb"; // API key

// Функция, которая будет выполнять http запрос к api-unsplash и создавать разметку страницы с соотвествующими данными 
function requestApi(url) {

  // http запрос
  const request = new XMLHttpRequest();

  request.open("GET", url);

  request.responseType = "json";

  request.send();

  // полученный запрос
  request.onload = () => {
    if (request.status != 200) {
      console.log(
        `Ошибка ${request.status}: ${request.statusText || "status not founded, use google"}`
      );
    } else {
      let { urls, description, likes } = request.response;
      
      picture.style.backgroundImage = `url(${urls.thumb})`; // вставка рандомной фотографии
      picDescription.textContent = description || "Lorem ipsum dolor sit amet, consectetur adipiscing elit."; // вставка описания, если существует иначе "Lorem..."
      picLikes.textContent = `likes:${likes}`; // вствка количества лайков фототографии
    }
  };
}

// Рекурсивный вызов функции requestApi() каждые 5сек
let timerId = setTimeout(function request() {
  const server = `https://api.unsplash.com/photos/random/?&client_id=${clientId}`; // url куда стучимся
  requestApi(server);
  timerId = setTimeout(request, delay); // новый запрос к api
}, delay);
