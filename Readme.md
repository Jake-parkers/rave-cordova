# Cordova Rave

 This Cordova extension let's you add [Rave](https://www.flutterwave.com) Pay Button into your Cordova/Phonegap apps builds.

## Installation
<br/>

The Rave Cordova extension adds support for spinning up the Rave modal on IOS and Android. It uses the Rave Standard endpoint and has done all the hard work for you. All you need to is add the necessary file and call the appropriate functions.

1. Follow the official [Rave](https://www.flutterwave.com) documentation on how to create an account if you don't have one yet.
2. Create a dummy project. For example ```cordova create RaveTest com.test.ravetest "RaveTest"```
3. Install the sdk and add platforms

```
$ cd RaveTest
$ npm install --save rave-cordova-sdk
$ cd node_modules/rave-cordova-sdk
$ npm start - installs the necessary dependencies and injects a file ```rave.js``` in www/js
# go back to your project folder
$ cordova platform add ios
$ cordova platform add android
```
4. See App Integration below


## App Integration
<br/>
Add this script tage to www/index.html
```
<script type="text/javascript" src="js/rave.js"></script>
```

The Rave Cordova extension exposes a class ```Rave```. You can create an instance of  ```Rave``` by passing in your ```public key``` and a boolean ```true or false``` specifying whether you want to be live or on staging. See example below

```
var rave = new Rave("YOUR_PUBLIC_KEY", false)
```
Now that you've done that, you can now call its methods

1. init(payload) - This method creates a payment object for you. However, you must pass in an object containing the necesssary payment details. Go [here](https://developer.flutterwave.com/docs/rave-inline-1) for details on what parameters to have in the object. A sample ```init(payload)``` call is shown below.

```
var payment_obj = rave.init({
    customer_email: "user@example.com",
    amount: 10,
    customer_phone: "234099940409",
    currency: "NGN",
    txref: "MD-10000",
    meta: [{
        metaname: "flightID",
        metavalue: "AP1234"
    }]
})
```

Depending on whether the payload you passed in is correct or not, ```payment_obj``` would hold your valid ```payload``` or an ```error object``` if any issue is found.

**HINT: ** customer_email, amount, customer_phone, txref and the public key you passed when creating the instace of ```Rave``` are all compulsory. Omitting any one of them would result in and error object being returned instead of your payload.

2. preRender(payment_obj, callback) - This method gets a secure ```link``` which you can then use to spin up the Rave modal with your payment details. The secure link can be accessed by the ```callback function``` you passed in (See Example below). 
In case you didn't call ```init(payload)``` before calling this method, An ```error``` will be returned instead of a secure ```link```. An example is shown below 

```
rave.preRender(payment_obj, function(err, link) {
    if(err) console.log(`error: ${err}`)
    // open up link
})
```

3. render(link) - All this method does is spin up the Rave modal in your inappbrowser. The only parameter it requires is the ```secure link``` that the ```preRender``` method got for you. A sample call is shown below. **Note** that this method should be called inside the ```preRender``` callback
```
rave.preRender(payment_obj, function(err, link) {
    if(err) console.log(`error: ${err}`)
    rave.render(link)
})
```



## Basic Example of the App
<br/>

1. A complete example code can be checked [here]()
2. In /www/index.html add the following lines after ```<div id="deviceready" class="blink"><p class="event listening">Connecting to Device</p> <p class="event received">Device is Ready</p></div>```

```
<button class="btn btn-primary" type="button" onclick="pay()">Pay Now</button>
```
3. Still in /www/index.html add the following lines after ```<script type="text/javascript" src="js/rave.js"></script>```

```
<script>
    var rave = new Rave("REPLACE_WITH_YOUR_PUBLIC_KEY", true)
    function pay(){
        var payment_obj = rave.init({
            customer_email: "user@example.com",
            amount: 10,
            customer_phone: "234099940409",
            currency: "NGN",
            txref: "MD-10000",
            meta: [{
                metaname: "flightID",
                metavalue: "AP1234"
            }]
        })
    
        rave.preRender(payment_obj, function(err, link) {
            if(err) console.log(`error: ${err}`)
            rave.render(link)
        })
    }
</script>
```
4. Add the Cordova InAppBrowser plugin. Read more about it [here](https://cordova.apache.org/docs/en/latest/reference/cordova-plugin-inappbrowser/)

```
cordova plugin add cordova-plugin-inappbrowser
```

5. In /www/js/index.js, add this line to the ```onDeviceReady``` function
```
window.open = cordova.InAppBrowser.open;
```

6. Excecute ```cordova run browser``` or ```cordova run android```
To deploy to the ios simulator, follow steps [here](https://cordova.apache.org/docs/en/latest/guide/platforms/ios/index.html#project-configuration)