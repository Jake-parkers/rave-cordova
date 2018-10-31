import {PaymentObject}  from './misc'
const paymentObject = new PaymentObject();

const live = "https://api.ravepay.co/flwv3-pug/getpaidx/api/v2/hosted/pay"
const sandbox = " https://ravesandboxapi.flutterwave.com/flwv3-pug/getpaidx/api/v2/hosted/pay"

/**
 * COnstructor
 * @param {*} publicKey 
 * @param {*} production 
 */
function Rave(publicKey, production) {
    this.production = production;
    this.publicKey = publicKey;
}

/**
 * Creates a payment object
 * @param {*} amount 
 * @param {*} currency 
 * @param {*} customer_email 
 * @param {*} txref 
 * @param {*} redirect_url 
 */
Rave.prototype.init = function (payload) {  
    console.log(payload)
    return paymentObject.create(payload)
}

/**
 * Gets payment link from Rave that will be used to spin up modal
 * @param {*} paymentObject 
 * @param {*} cb - a callback function that handles the preRender request. It's params are (err, link) 
 */
Rave.prototype.preRender = function (paymentObject, cb) {
    var url = this.production == true ? live : sandbox;
    if(!Object.keys(PaymentObject).includes("validated")) return "Be sure to have called the init() method";
    paymentObject["PBFPubKey"] = this.publicKey;
        return fetch(url, {
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
        }).then(function (response) { return response.json() })
        .then(function(data) {
            if(data["status"] == "error") return cb(data["message"], null)
            else return cb(null, data["data"]["link"])
        })
        
}

/**
 * Spins up the modal in the inappbrowser
 */
Rave.prototype.render = function (link) {
    window.open(link, '_blank')
}




window.Rave = Rave;