// здесь использовал следующее api = https://jikan.docs.apiary.io/#introduction/information

// Обяъявление переменных 
const searchForm = document.querySelector(".search-form"),
      searchInput = document.querySelector(".search-input"),
      info = document.querySelector(".info");

function apiSearch(e) {
  
  e.preventDefault();

  const searchText = searchInput.value.trim(); // наш введенный поисковый запрос.Также удаляем пробелы, если они есть

  if (searchText === "") {
    alert("please enter name of anime");
    return;
  }

  if (document.querySelector(".title").textContent.toLowerCase() === searchText.toLowerCase() ) { // если нынешний запрос равен предыдущему, то запроса не будет. Проверка по существующему title.
    alert("you found what you wanted");
    return;
  }
  const server = `https://api.jikan.moe/v3/search/anime/?q=${searchText}&limit=1`; // url

  // http запрос посредством Fetch API
  fetch(server)
    .then(response => response.json())
    .then(result => {

      let {title, episodes, score, type, synopsis, image_url } = result.results[0], // Деструктуризация выбранных данных
        obj = { // создание хэш-объекта с полученными выше данными
          title, 
          avatar: image_url, 
          episodes, 
          score, 
          type,
          synopsis },
        classes = [...info.children].map(el => el.className); // массив классов CSS, дочерних элемента div с классом info

      for (i = 0; i < classes.length; i++) { // проходим по массиву classes, для каждого класса отбираем соотвествующий элемент HTML и затем вставляем соответствующую инофрмацию c хэш-объекта
        let query = document.querySelector(`.${classes[i]}`); // ссылка на элемент HTML
        text = obj[classes[i]] // соотвествующий текст для элемента 
        if (classes[i] === "avatar") { // если элемент c классом avatar, то делаем так...
          query.style.border = "1px solid black";
          query.style.visibility = "visible";
          query.src = obj[classes[i]];
          continue;
        } else if (query.tagName == "SPAN") { // если элемент span, то...
          query.textContent = classes[i] + ": " + text;
        } else { // иначе просто вставляем текст в элемент
          query.textContent = text;
        }
      }
      searchInput.value = "";
    })
    .catch(error => console.error("Error:" + error.status)); // ловим ошибки при запросе, если они есть
}

searchForm.addEventListener("submit", apiSearch); // вешаем событие onsubmit на элемент HTML в перменной searchForm при отправке запроса.Посел выполняется функция apisearch().
