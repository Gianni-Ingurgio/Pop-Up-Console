const BEAUTIFY = false;
const SOURCE = "bookmarklet.js";

var code

loadCode()
function autoReload (delay) {
	setInterval(loadCode, delay || 1000)
}

function loadCode() {
	fetch(SOURCE)
	.then(x => x.text())
	.then(y => {
		if (y != code) {
			code = y

			if (BEAUTIFY) code = js_beautify(code)

			document.getElementById("codeBox").innerHTML = hljs.highlight(code, {language: "javascript", ignoreIllegals: true}).value

			document.getElementById("codeSave").href = "javascript:" + code

			document.getElementById("codeBox").style.filter = "invert(1)"
			setTimeout(() => {
				document.getElementById("codeBox").style.filter = "invert(0)"
			}, 200)
			
		}
	})
}