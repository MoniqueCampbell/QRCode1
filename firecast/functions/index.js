// const functions = require('firebase-functions');

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions

// exports.helloWorld = functions.https.onRequest((request, response) => {
	
// 		response.send("Hello from Firebase!");
// 		response.send(request);
// 		response.send(response);
	
// });


exports.qrCode = functions.https.onRequest((req, res) => {
	cors(req, res, () => {
		const name = req.body.name;

		//Prints the generated QR Code 
        function printContent(tag_id){
            alert("Print the QR Code in COLOUR!");
            var restorepage = document.body.innerHTML;
            var printcontent = document.getElementById(tag_id).innerHTML;
            document.body.innerHTML = printcontent;
            window.print();
            document.body.innerHTML = restorepage;
        }

		//Generates a random 6 digit number between 100000 and 999999 (both numbers inclusively)
        function getrandNum(min,max){
            randnum = Math.floor(Math.random() * (max - min +1))+min;
            if isPrime(randnum){
            	return (randnum);
            }
            else{
            	return (getrandNum(min,max));
            }
        }
            

        //Checks if the given number is prime
        function isPrime(num){
            flag = true
            for(let i = 2; i <= randnum - 1; i++){

                //Calls function getrandNum if a factor is found
                if (randnum % i == 0){
                    return true
                }
                else{
                	return false
                }
            }     
        }

        getrandNum(100000,999999);

        //Gets today's date
        var today = new Date();
        var date = today.getFullYear() + '-' + (today.getMonth()+1) + '-' +today.getDate();
    
        //Gets today's time
        var t_time = new Date();
        var time = t_time.getHours() + ":" + t_time.getMinutes() + ":" + t_time.getSeconds();
        
        let resv_time = time;
        let resv_date = date;
        let user_name = name;
        let prime_num = randnum;
        let datagiven = resv_time + user_name + resv_date + prime_num;

        //Use HmacSHA256 to Hash the data given
        var hash = CryptoJS.HmacSHA256(datagiven, "i19IcCpVwVmMzz2x4hhmqbgl1KeU0WnXBgoDYFeWNgs");
        var hmac = CryptoJS.enc.Base64.stringify(hash);

        //Data required to generate the QR Code 
        let qrcode = new QRCode(document.getElementById("qroutput").innerHTML, {
            text: hmac,
            width: 300,
            height: 300,
            colorDark : "black",
            colorLight : "blue",
            correctLevel : QRCode.CorrectLevel.H
        });

        function getDataUrl(img) {
		    // Get canva
		    const canvas = document.querySelector('#myCanvas');
		    const ctx = canvas.getContext('2d');

		    // Set width and height
		    canvas.width = img.width;
		    canvas.height = img.height;

		    // Draw the image
		    ctx.drawImage(img, 0, 0);
		    return canvas.toDataURL('image/jpeg');
		}

		// Select the image
		const img = document.querySelector('#qroutput');
		img.addEventListener('load', function (event) {
		 	const dataUrl = getDataUrl(event.currentTarget);
            return res.send((dataUrl);
		    //return res.send(JSON.stringify(dataUrl));
		});

	});
});