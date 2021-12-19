const BEAUTIFY = false;
const SOURCE = "bookmarklet.js";

var code

fetch(SOURCE)
.then(x => x.text())
.then(y => {
	code = y

	if (BEAUTIFY) code = js_beautify(code)

	document.getElementById("codeBox").innerHTML = hljs.highlight(code, {language: "javascript", ignoreIllegals: true}).value

	document.getElementById("codeSave").href = "javascript:" + code
})
