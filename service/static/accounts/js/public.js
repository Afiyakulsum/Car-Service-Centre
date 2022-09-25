

var count = 0;
var flag = false;
var $errorMessage = $('.error-message');

function showErr(message) {
  $errorMessage.text(message).css({'opacity': 1});
}

function setErr(dom, message) {
  $errorMessage.text(message).css({'opacity': 1});
  if(dom) {
    dom.css({'borderColor': '#ec284d'});
  }
}

function clearErr(dom) {
  $errorMessage.css({'opacity': 0});
  dom.css({'borderColor': '#E9E9E9'});
}


function isInWeMeet() {
  var ua = window.navigator.userAgent.toLowerCase();
  return ua.indexOf('app/tencent_wemeet') !== -1;
}


function getUrlParam(name) {
  var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
  var url = window.location.search.substr(1).match(reg);
  if (url !== null) {
    return unescape(url[2]);
  }
  return null;
}

function validEmail(email) {
  var reg = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return reg.test(email);
}

function verifyPhone(tel) {
  var reg = /^(1[3-9]\d{9})$|^(852[569]\d{7})$|^(853[6]\d{5})$|^(88609\d{8})$/;
  return reg.test(tel);
}

function showReloadMessage(message, domMsg, url) {
  var $msg = $('<div class="msg-box">' +
    '<div class="warning">!</div>' +
    '<p>' + message +
    '<a href="' + url + '">' + domMsg +
    '</a></p>' +
    '</div>');
  $msg.appendTo(document.body);
}

function showMessage(message) {
  var $msg = $('<div class="msg-box">' +
    '<img class="success" src="/images/icon/error.png" width="20"/>' +
    '<p>' + message + '</p>' +
    '</div>');
  $msg.appendTo(document.body);
  setTimeout(function () {
    $msg.remove();
  }, 2e3);
}


function showSuccess(message) {
  var $msg = $(
    '<div class="msg-box">' +
    '<img class="success" src="/images/icon/success.png" width="20"/>' +
    '<p>' +
    message +
    '</p>' +
    '</div>');
  $msg.appendTo(document.body);
  setTimeout(function () {
    $msg.remove();
  }, 2e3);
}


function showLoading() {
  var $loading = $('<div class="loading" id="loading">' +
    '<img src="/images/loading.gif">' +
    '</div>');
  setTimeout(function () {
    $loading.appendTo(document.body);
  }, 200);
}

function hideLoading() {
  setTimeout(function () {
    var child = document.getElementById('loading');
    document.body.removeChild(child);
  }, 500);
}