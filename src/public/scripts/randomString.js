const fibo = (fibo1, fibo2) => {
	let l = [];
	for (let i = 0; i < 8; i++) {
		l.push(0);
	}

	let f1 = fibo1;
	let f2 = fibo2;

	for (let i = 0; i < l.length; i++) {
		if (i === 0) {
			l[i] = f1;
		} else if (i === 1) {
			l[i] = f2;
		} else {
			let k = fibo1 + fibo2;
			l[i] = k;
			fibo1 = fibo2;
			fibo2 = k;
		}
	}
	return l;
};

const dec_to_base = (num, base) => {
	let base_num = "";

	while (num > 0) {
		let dig = num % base;
		if (dig < 10) {
			base_num += String.fromCharCode(dig + 97);
		} else {
			base_num += String.fromCharCode("a".charCodeAt(0) + dig - 10);
		}
		num = Math.floor(num / base);
	}
	base_num = base_num.split("").reverse().join("");
	return base_num;
};

const f_to_h = (fibo_list) => {
	let s = "";

	for (let i of fibo_list) {
		s += dec_to_base(i, 25);
	}
	return s;
};

const randomStringFromUniverse = (fibo1, fibo2) => {
	let ans = f_to_h(fibo(fibo1, fibo2)).substring(0, 13);
	return ans;
};
