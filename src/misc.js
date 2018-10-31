import * as Validator from './helper/validate'
const validate = Validator.validate
/**
 * Constructor
 */
function PaymentObject() {
    this.amount = "";
    this.currency = "";
    this.customer_email = "";
    this.txref = ""
    this.redirect_url = ""
    this.meta = ""
    this.custom_description = ""
    this.customer_phone = ""
    this.PBFPubkey = ""
    this.integrity_hash = ""
    this.payment_options = ""
    this.payment_plan = ""
    this.subaccounts = []
    this.country = ""
    this.customer_firstname = ""
    this.customer_lastname = ""
    this.custom_title = ""
}

/**
 * Creates and returns a payment object
 * @param {*} amount 
 * @param {*} currency 
 * @param {*} customer_email 
 * @param {*} txref 
 * @param {*} redirect_url 
 */
PaymentObject.prototype.create =  function (payload) {
    const result = validate(payload)
    if(result.valid == false) return result.error
    else {
        for (const key in result.payload) {
            if (result.payload.hasOwnProperty(key)) {
                this.key = result.payload[key];
            }
        }
        return result.payload;
    }
}

PaymentObject.prototype.getAmount = function () {
    
}

PaymentObject.prototype.getCurrency = function () {
    
}

PaymentObject.prototype.getEmail = function () {
    
}

export { PaymentObject }

window.PaymentObject = PaymentObject;