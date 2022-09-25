

var $bodyContainer = $('body');

var next = $bodyContainer.data('next');
var source = $bodyContainer.data('source');
var plugin_code = $bodyContainer.data('plugin_code');
var timers2;
var timers2Count = 0;

var $inputText = $('.input-text'); 
var $accountContainer = $('.account-container');
var $rightContainer = $('.right-container');

$(function () {
  if ($('#signin-password').length > 0) {
    timers2 = setInterval(function () {
      timers2Count = timers2Count + 1;
      if ($('#signin-password').is(':-webkit-autofill')) {
        $('#normal-login').removeClass('disabled').addClass('auto-fill');
        clearInterval(timers2);
      }
      if (timers2Count === 1000) {
        clearInterval(timers2);
      }
    }, 100);
  }
  function setRigtContainer() {
    var rightContainerHeight = $rightContainer.innerHeight();
    var theContainerHeight = $('.account-container').innerHeight();
    var theMargin = (theContainerHeight - rightContainerHeight) / 2;
    theMargin = theMargin > 50 ? theMargin : 50;
    if ($(window).innerWidth() < 600) {
      theMargin = 68;
      $rightContainer.css('top', 'auto');
    } else {
      $rightContainer.css('top', '0');
    }
    $rightContainer.css('marginTop', theMargin);
  }

  $rightContainer.addClass('right-loaded');
  setRigtContainer();
  $(window).resize(function () {
    setRigtContainer();
  });
});

function checkOtherError($dom) {
  var $parentsCon = $dom.parents('.input-list-con');
  var inputList = $parentsCon.find('input:not(.hide)');
  var canRemoveDisabled = false;

  if ($dom.data('errortext') === $parentsCon.find('.error-text').text() || $dom.data('errortext2') === $parentsCon.find('.error-text').text()) {
    $dom.parents('.input-list-con').find('.error-text').text('');
  }

  for (var item of inputList) {
    if ($(item).hasClass('hide')) {
      continue;
    }
    if ($(item).val() && $(item).val().trim() && !$(item).hasClass('error')) {
      canRemoveDisabled = true;
    } else {
      canRemoveDisabled = false;
      break;
    }
    if ($(item).attr('data-job') === 'none') {
      canRemoveDisabled = false;
      break;
    }
  }

  if (canRemoveDisabled) {
    $dom.parents('.input-list-con').find('.button').removeClass('disabled');
    $dom.parent('.list').removeClass('error');
    $dom.removeClass('error');
  }else {
    $dom.parents('.input-list-con').find('.button').addClass('disabled');
  }
}

function addErrorFun($dom, errorText, addError) {
  if (addError) {
    $dom.parents('.input-list-con').find('.error-text').text(errorText || $dom.data('errortext'));
    $dom.parent('.list').addClass('error');
    $dom.addClass('error');
  }
  $dom.parents('.input-list-con').find('.button').addClass('disabled');
}

function clearErrorFun($dom) {
  $dom.parent('.list').removeClass('error');
  $dom.removeClass('error');
}

function checkAccount($dom, text, addError) {
  var otherType = $dom.data('othertype');
  var result = true;
  
  switch (otherType) {
    case 'phone':
      if (!verifyPhone(text)) {
        result = false;
      }
      break;
    case 'email':
      if (!validEmail(text)) {
        result = false;
      }
      break;
    default:
      if (!verifyPhone(text) && !validEmail(text)) {
        result = false;
      }
  }
  if (!result) {
    addErrorFun($dom, '', addError);
  }else {
    clearErrorFun($dom)
  }
  return result;
}

function checkPassword($dom, text, addError) {
  var result = true;
  
  if (!text || !text.trim() || text.trim().length < 6 || text.trim().length > 20) {
    addErrorFun($dom, '', addError);
    result = false;
  } else if($dom.data('othertype') === 'confirm_password'){
    var $prevPassword = $dom.parent('.list').prev('.list').find('.input-text');
    var prevText = $prevPassword.val();
    if (!prevText || !prevText.trim() || prevText.trim().length < 6 || prevText.trim().length > 20) {
      result = false;
      addErrorFun($dom, '', addError);
    } else if (prevText.trim() !== text.trim()) {
      result = false;
      addErrorFun($dom, $dom.attr('data-errortext2'), addError);
    }
  }
  if (result) {
    clearErrorFun($dom);
  }
  return result;
}

function onInputChange(dom, addError) {
  var type = $(dom).data('type');
  var text = $(dom).val();
  var result = false;
  switch (type) {
    case 'account':
      result = checkAccount($(dom), text, addError === 'addError');
      break;
    case 'password':
      result = checkPassword($(dom), text, addError === 'addError');
      break;
    case 'verify-code':
      result = checkVerifyCode($(dom), text, addError === 'addError');
      break;
    default:
      break;
  }
  if (result) {
    checkOtherError($(dom));
  }
  if (($(dom).hasClass('.the-signin-password') || $(dom).hasClass('the-signin-account')) && $('#normal-login').hasClass('auto-fill')) {// è´¦å·å¯†ç ç™»å½•è‡ªåŠ¨å¡«å……å†…å®¹ç‰¹æ®Šå¤„ç†
    $('#normal-login').removeClass('auto-fill');
  }
  return result;
}

// inputæ¡†èšç„¦
$inputText.focus(function() {
  $(this).parent('.list').removeClass('error');
  $(this).removeClass('error');
  $(this).parent('.list').addClass('focus');
});

// è¾“å…¥æ¡†å¤±ç„¦
$inputText.blur(function() {
  $(this).parent('.list').removeClass('focus');
  if (($(this).hasClass('.the-signin-password') || $(this).hasClass('the-signin-account')) && $('#normal-login').hasClass('auto-fill')) {// è´¦å·å¯†ç ç™»å½•è‡ªåŠ¨å¡«å……å†…å®¹ç‰¹æ®Šå¤„ç†
    return;
  }
  onInputChange($(this), 'addError');
});

$inputText.keydown(function(e) {
  if (e.which === 13) {
    var inputListCon = $(this).parents('.input-list-con');
    var inputList = $(inputListCon).find('input:not(.hide)');
    var thisIndex = $(this).data('index');
    if (thisIndex === inputList.length - 1) {
      $($(inputListCon).find('.submit .button')).click();
    }else {
      $(inputList).eq(thisIndex + 1).focus();
    }
  }
});

function setInputFocusInit($dom) {
  $dom.parents('.input-list-con').find('.input-text').eq(0).focus();
}