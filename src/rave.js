import {PaymentObject}  from './misc'
const paymentObject = new PaymentObject();

const live = "https://api.ravepay.co/flwv3-pug/getpaidx/api/v2/hosted/pay"
const sandbox = " https://ravesandboxapi.flutterwave.com/flwv3-pug/getpaidx/api/v2/hosted/pay"

function Rave(publicKey, production) {
    this.production = production;
    this.publicKey = publicKey;
}

Rave.prototype.init = function (amount, currency, customer_email, txref, redirect_url) {  
    return paymentObject.create(amount, currency, customer_email, txref, redirect_url)
}

Rave.prototype.preRender = function (paymentObject, cb) {
    var url = this.production == true ? live : sandbox;
        fetch(url, {
            method: "POST", 
            mode: "cors", 
            cache: "no-cache", 
            credentials: "same-origin",
            headers: {
                "Content-Type": "application/json; charset=utf-8",
            },
            redirect: "follow",
            referrer: "no-referrer",
            body: JSON.stringify(paymentObject), 
        }).then(response => {
            if(response["status"] = "error") cb(response["message"], null)
            else cb(null,response["data"]["link"])
        })
}

Rave.prototype.render = function (link) {
    window.open(link, '_blank')
}

window.Rave = Rave;