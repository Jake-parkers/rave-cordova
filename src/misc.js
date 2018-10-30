function PaymentObject() {
    this.amount = "";
    this.currency = "";
    this.customer_email = "";
    this.txref = ""
    this.redirect_url = ""
}

PaymentObject.prototype.create =  function (amount, currency, customer_email, txref, redirect_url) {
    this.amount = amount;
    this.currency = currency;
    this.customer_email = customer_email
    this.txref = txref;
    this.redirect_url = redirect_url

    return {
        amount, 
        currency, 
        customer_email,
        txref,
        redirect_url
    }
}

PaymentObject.prototype.getAmount = function () {
    return this.amount
}

PaymentObject.prototype.getCurrency = function () {
    return this.currency
}

PaymentObject.prototype.getEmail = function () {
    return this.customer_email
}

export { PaymentObject }

window.PaymentObject = PaymentObject;