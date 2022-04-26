var checkoutData = null;

function createCheckout(data) {
  url = "https://staging-api.flowertop.xyz/api/v1/checkout-inline?publicKey=" + data.publicKey + "&callbackUrl=" + data.callbackUrl + "&successUrl=" + data.successUrl + "&notificationEmail=" + data.notificationEmail + "&customerEmail=" + data.customerEmail + "&satoshis=" + data.satoshis + "&reference=" + data.reference
  createLoaderIframe();
  fetch(url, {
    method: 'GET',
    cache: 'no-cache',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json'
    },
    redirect: 'follow',
    referrerPolicy: 'no-referrer',
  }).then(function (res) {
    return res.json()
  }).then(function (r) {
    console.log(r)
    return r.data
  }).then(setIframe)
}

function removeIframe(id) {
  var iframe = document.getElementById(id);
  document.body.removeChild(iframe);
}

function createLoaderIframe() {
  iframe = document.createElement("iframe")
  iframe.setAttribute("allowtransparency", "true"),
    iframe.setAttribute("id", "loader")
  iframe.src = "data:text/html;charset=utf-8, <body style='background-color:rgba(0, 0, 0, 0.8);'>" +
    "<div style='position: absolute;display: flex;flex-direction: column;align-items: center;justify-content: center;height: 100%;width: 100%;z-index: 1000; text-align:center'>" +
    "<img src='https://res.cloudinary.com/gabbyprecious/image/upload/v1651003230/haxqforaozaqsl0ksber.gif'width='100px' alt='Logo'/>" +
    "</div></body>"
  iframe.style.cssText = "z-index: 999999999999999;background: transparent;border: 0px none transparent;overflow-x: hidden;overflow-y: hidden;margin: 0;padding: 0;-webkit-tap-highlight-color: transparent;-webkit-touch-callout: none;position: fixed;left: 0;top: 0;width: 100%;height: 100%;"
  document.body.appendChild(iframe);
}

function setIframe(checkout) {
  checkoutData = checkout;
  iframe = document.createElement("iframe")
  url = "https://staging-popup.flowertop.xyz/" + checkout.id
  iframe.src = url
  iframe.setAttribute("allowtransparency", "true"),
    iframe.setAttribute("id", "checkout"),
    iframe.setAttribute("sandbox", "allow-scripts allow-same-origin")
  iframe.allow = "clipboard-read; clipboard-write *"
  iframe.style.cssText = "z-index: 999999999999999;background: transparent;border: 0px none transparent;overflow-x: hidden;overflow-y: hidden;margin: 0;padding: 0;-webkit-tap-highlight-color: transparent;-webkit-touch-callout: none;position: fixed;left: 0;top: 0;width: 100%;height: 100%;"
  document.body.appendChild(iframe);
}

function callSuccessUrl() {
  url = checkoutData.successUrl + "?checkoutId=" + checkoutData.id + "&reference=" + checkoutData.reference + "&status=" + 'paid'
  window.location.replace(url);
}

window.onmessage = function (e) {
  if (e.data == 'mounting-loader') {
    console.log('mounting-loader')
    removeIframe('loader');
  }
  if (e.data == 'paid') {
    window.callSuccessUrl();
  }
}

window.callSuccessUrl = callSuccessUrl

window.createCheckout = createCheckout

