function createCheckout(data){
    url = "https://staging-api.flowertop.xyz/api/v1/checkout-inline?publicKey=" + data.publicKey + "&callbackUrl=" + data.callbackUrl + "&successUrl=" + data.successUrl + "&notificationEmail=" + data.notificationEmail + "&customerEmail=" + data.customerEmail + "&satoshis=" + data.satoshis + "&reference=" + data.reference
    fetch(url, {
        method: 'GET',
        cache: 'no-cache', 
        credentials: 'same-origin',
        headers: {
          'Content-Type': 'application/json'
        },
        redirect: 'follow',
        referrerPolicy: 'no-referrer',
      }).then(function(res){
        return res.json()
      }).then(function(r){
        console.log(r)
        return r.data
      }).then(setIframe)
}

function setIframe(checkout) {
    console.log(checkout)
    iframe = document.createElement("iframe")
    url = "http://localhost:8080/" + checkout.id
    iframe.src = url
    setAttribute("allowtransparency", "true"),
    iframe.allow="clipboard-read; clipboard-write *"
    iframe.style.cssText = "z-index: 999999999999999;background: transparent;border: 0px none transparent;overflow-x: hidden;overflow-y: hidden;margin: 0;padding: 0;-webkit-tap-highlight-color: transparent;-webkit-touch-callout: none;position: fixed;left: 0;top: 0;width: 100%;height: 100%;visibility:hidden;"
    document.body.appendChild(iframe);
}

function removeIframe(iframe) {
    document.body.removeChild(iframe);
    document.getElementById("button-pay").style.display = "block";
}

window.createCheckout = createCheckout
