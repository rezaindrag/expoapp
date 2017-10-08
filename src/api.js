export default {
	validateEmail: (email) => {
	    const re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
	    return re.test(email);
	},
	ucWord: (str) => {
		return str.toLowerCase().replace(/\b[a-z]/g, function(letter) {
			return letter.toUpperCase();
		});
	},
	limitWords: (textToLimit, wordLimit) => {
		let finalText = "";
		const text2 = textToLimit.replace(/\s+/g, ' ');
		const text3 = text2.split(' ');
		const numberOfWords = text3.length;

		let i=0;

		if(numberOfWords > wordLimit) {
			for(i = 0; i < wordLimit; i++)
			finalText = finalText + "" + text3[i] + " ";

			return finalText;
		} else {
			return textToLimit;
		}
	},
	humanDate: (date) => {
		const day = date.substr(8, 2);
		const month = date.substr(5, 2);
		const year = date.substr(0, 4);

		return `${day}/${month}/${year}`;
	},
	pad(num, size) {
	    var s = num+"";
	    while (s.length < size) s = "0" + s;
	    return s;
	},
	stringToTimeFormat(milliSeconds) {
		const seconds = milliSeconds/1000;
		var date = new Date(seconds * 1000);
		var hh = date.getUTCHours();
		var mm = date.getUTCMinutes();
		var ss = date.getSeconds();

		if (hh < 10) {hh = "0"+hh;}
		if (mm < 10) {mm = "0"+mm;}
		if (ss < 10) {ss = "0"+ss;}

		var t = mm+":"+ss;
		
		return t;
	}
} 