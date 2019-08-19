// здесь использовал следующее api = https://www.last.fm/api/intro

// Обяъявление переменных
const genre = document.querySelector(".genre-select"),
      input = document.querySelector(".genre-submit"),
      list = document.querySelector(".topTen"),
      btnClean = document.querySelector(".genre-clean"),
      apiKey = "b43ce99d4f1d944951e254318ecae510";

// Функция выполняющая запрос к api-last.fm     
function apiSearch(e) {

  e.preventDefault(); // предотварщение всплытия события onclick и дальнейшей перезагруки страницы

  const searchText = genre.value; // наш введенный поисковый запрос

  if (searchText.trim() == "") {
    return alert("please select genre");
  }

  const server = `http://ws.audioscrobbler.com/2.0/?limit=10&method=tag.gettoptracks&tag=${searchText}&api_key=${apiKey}&format=json`; // url
  
  // http запрос посредством Fetch API
  fetch(server)
    .then(response => response.json()) // преобразование ответа с api в json-объект
    .then(result => { // работа с ответом 

      if (list.dataset.state) { // если у элемента ul присутствуют дочерние элементы li,то удалить их.
        list.innerHTML = "";
      }

      let topTen = result.tracks.track, // ссылка на массив топ-10 трэков выбранного жанра
          title = document.createElement("h4");

      title.textContent = `Top 10 of genre ${genre.value}`; 
      list.append(title); // вставка в созданный тэг h4 название выбранного жанра

      topTen.map(item => { // преобразуем массив с полученными данными и вставим их в созданный тэг li   
        let li = document.createElement("li"),
           { url, name } = item;

        li.insertAdjacentHTML(
          "beforeend",
          `<a href=${url}><p>${item.artist.name} - ${name}</p></a>`
        );
        list.append(li); // каждый тэг li вкладываем в элемент ul
        
        list.dataset.state = true; // установим флаг в true, информирующий о том, что у элемента ul есть дочерние элементы
        genre.value = ""; // очистим поле выбора жанра 
      });

    })
    .catch(error => console.error("Error:" + error.status)); // выведет ошибку, если выше возникнет ошибка
}

input.addEventListener("click", apiSearch); // повесим прослушку на событие onclick при нажатии на кнопку show. После этого будет выполняться коллбэк функция apiSearch()

btnClean.addEventListener("click",function(e){ // повесим прослушку на событие onclick при нажатии на кнопку clear. После будет очистино поле выбора жанра и удалены дочерние элементы ul
  e.preventDefault();
  genre.value = "";
  list.innerHTML = "";
})