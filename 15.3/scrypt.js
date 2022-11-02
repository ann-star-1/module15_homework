'use strict';
//Находим элементы страницы
const textInput = document.querySelector('.chat-box__input');
const btnSend = document.querySelector('.btn-send');
const btnGeo = document.querySelector('.btn-geo');
const outputBox = document.querySelector('.chat-box__output');
//Адрес эхо-сервера
const serverUrl = 'wss://echo-ws-service.herokuapp.com';

//Открываем WebSocket
let socket = new WebSocket(serverUrl);

const displayMessage = (message, direction) => {//Функция отображения сообщений в окне переписки
  let html;
  if (direction === 'send') {//Присваиваем элементам сообщений разные классы для отображения отправленных - справа, принятых - слева
    html = `<p class="send-message message">${message}</p>`;
  } else if (direction === 'receive') {
    html = `<p class="serv-message message">${message}</p>`;
  }
  outputBox.insertAdjacentHTML('beforeend', html);

  if (outputBox.children) {
    outputBox.lastElementChild.scrollIntoView(false);//Прокручиваем чат к самому нижнему сообщению
  }
};

const sendMessage = (message) => {//Функция отправки сообщения на сервер
  socket.send(message);
};

const getGeoPosition = (position) => {//Функция получения ссылки на карту
  let geoPosition = {
    marker: '#$Geoposition$',//Ключ marker добавлен для фильтрации сообщения с гео-данными при выводе принятых сообщений
    latitude: position.coords.latitude,
    longitude: position.coords.longitude
  };
  let anchor = `<a href="https://www.openstreetmap.org/#map=18/${geoPosition.latitude}/${geoPosition.longitude}" target="_blank">My location</a>`;

  sendMessage(JSON.stringify(geoPosition));//Отправка на сервер гео-данных в видде JSON
  displayMessage(anchor, 'send');
};

socket.onopen = () => {//Проверяем соединение
  console.log('Connected');
};

btnSend.addEventListener('click', () => {//Обработка клика по кнопке Отправить
  let message = textInput.value;//Получаем значение из поля ввода
  if(message) {//Если поле ввода не пустое, отправляем сообщение на сервер и выводим в переписке
    sendMessage(message);
    displayMessage(message, 'send');
  }
  textInput.value = '';//Очищаем поле воода после отправки
});

btnGeo.addEventListener('click', () => {//Обработка клика по кнопе Геолокация
  if(!navigator.geolocation) {
    alert('Your browser doesn\'t support geolocation');
  } else {
    navigator.geolocation.getCurrentPosition(getGeoPosition);//Получаем гео-данные и вызываем коллбэк-функцию getGeoPosition
  }
});

socket.onmessage = (event) => {//Обрабатываем полученные сообщения
  if (event.data.indexOf('#$Geoposition$') < 0 ) {//Отфильтровываем сообщение в гео-данными

    displayMessage(event.data, 'receive');
  }
};