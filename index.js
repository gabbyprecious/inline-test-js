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
    iframe.setAttribute("width", window.innerWidth)
    iframe.setAttribute("width", window.innerWidth)
    iframe.setAttribute("height", window.innerHeight)
    document.body.appendChild(iframe);
}

function removeIframe(iframe) {
    document.body.removeChild(iframe);
    document.getElementById("button-pay").style.display = "block";
}

window.createCheckout = createCheckout
