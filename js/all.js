const selectCity = document.querySelector('.selectCity');
const listLocation = document.querySelector('.listLocation');
let data = {};
const getData = () => {
  const proxy = 'https://script.google.com/macros/s/AKfycby6bUHQkwhWPYkdpAcp4IxIdT7rG87fTr6cN6sdkA/exec?url=';
  const url = 'https://opendata.epa.gov.tw/ws/Data/AQI/?$format=json';
  fetch(proxy+url,[{
    mode:'cors'
  }]) // 404 (Not Found)
    .then(response => {
      if (response.ok) {
        return response.text();
      } else {
        return Promise.reject(new Error('エラーです！'));
      }
    })
    .then(json => {
      json = JSON.parse(json);
      data = json;
      addToOption();
      console.log(data);
    })
    .catch(e => {
      console.log(e.message); // エラーです！
    });
};
const addToOption = () => {
  var str = '';
  var zone = [];
  str += '<option>請選擇地區</option>';
  for(var i = 0;i < data.length; i++){
    if(zone.indexOf(data[i].County) == -1){
      zone.push(data[i].County);
      str += '<option>'+data[i].County+'</option>';
    }
  }
  selectCity.innerHTML = str;
};
const getColor = (num) => {
  if (num <= 50) {
    return 'color-01';
  }else if (num >= 51 && num <= 100) {
    return 'color-02';
  }else if (num >= 101 && num <= 150) {
    return 'color-03';
  }else if (num >= 151 && num <= 200) {
    return 'color-04';
  }else if (num >= 201 && num <= 300) {
    return 'color-05';
  }else if (num >= 301 && num <= 400) {
    return 'color-06';
  }
};
const createCard = (e) =>{
  const city = e.target.value;
  let str = '';
  for (var i = 0; i < data.length; i++) {
    if (data[i].County === city) {
      let aqi = data[i].AQI;
      if (data[i].AQI == '') {
        aqi = 'null';
      }
      str += `
      <div class="card" data-num="${i}">
        <div class="location">${data[i].SiteName}</div>
        <div class="aqi color-01 ${getColor(data[i].AQI)}">${aqi}</div>
      </div>
      `;
      changeCity(data[i]);
    }
  }
  listLocation.innerHTML = str;
};

const showData = (e) => {
  const card = e.target.parentElement;
  if (card.className === 'card') {
    let dataList = data[card.dataset.num];
    const location = document.querySelector('.selectLocation .location');
    const aqi = document.querySelector('.selectLocation .aqi');
    const listNum = document.querySelectorAll('.allAqi-list-num');
    const cf = ['O3','PM10','PM2.5','CO','SO2','NO2'];
    if (dataList.AQI == '') { dataList.AQI = 'null'; }
    location.textContent = dataList.SiteName;
    aqi.textContent = dataList.AQI;
    aqi.classList = 'aqi '+getColor(dataList.AQI);
    for (var i = 0; i < listNum.length; i++) {
      if (dataList[cf[i]] == '') { dataList[cf[i]] = 'null'; }
      listNum[i].textContent = dataList[cf[i]];
    }
  }
};
const changeCity = (city) => {
  document.querySelector('.city').textContent = city.County;
  document.querySelector('.updateTime').textContent = city.PublishTime+' 更新';
};
setTimeout(getData,10000);
selectCity.addEventListener('change',createCard);
listLocation.addEventListener('click',showData,false);
