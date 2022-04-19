var $start = document.querySelector('.start-button');
var $header = document.querySelector('header');
var $agentScreen = document.querySelector('.agents-screen');
var $mainScreen = document.querySelector('.main-screen');
var $agentList = document.querySelector('#agent-list');

$start.addEventListener('click', handleStart);
function handleStart(event) {
  $header.className = 'header';
  $agentScreen.className = 'agents-screen';
  $mainScreen.className = 'main-screen hidden';
}

var xhr = new XMLHttpRequest();
xhr.open('GET', 'https://valorant-api.com/v1/agents');
xhr.responseType = 'json';
xhr.addEventListener('load', function () {
  console.log('xhr.status:', xhr.status);
  console.log('xhr.response:', xhr.response);
  for (var i = 0; i < xhr.response.data.length; i++) {
    if (xhr.response.data[i].isPlayableCharacter === true) {
      var $iconHolder = document.createElement('div');
      var $icon = document.createElement('img');
      $icon.setAttribute('class', 'agent-icon');
      $icon.setAttribute('src', xhr.response.data[i].displayIconSmall);
      $iconHolder.appendChild($icon);
      $agentList.appendChild($iconHolder);
    }
  }
});
xhr.send();
