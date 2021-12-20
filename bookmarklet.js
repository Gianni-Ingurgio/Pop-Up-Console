(function() {
	var evalHistory = "";
	var result;
	var lastEntry;

	console.stdlog = console.log;
	console.log = function(args) {
		console.stdlog(args);
		window.alert("console.log: " + args);
		evalHistory = "console.log: " + args + "\n" + evalHistory;
	};

	console.stderror = console.error;
	console.error = function(args) {
		console.stderror(args);
		window.alert("console.error: " + args);
		evalHistory = "console.error: " + args + "\n" + evalHistory;
	};

	console.stdinfo = console.info;
	console.info = function(args) {
		console.stdlog(args);
		window.alert("console.info: " + args);
		evalHistory = "console.info: " + args + "\n" + evalHistory;
	};

	while (true) {
		let input = prompt(">_\n" + evalHistory, "result");
		if (input == null) {
			console.log = console.stdlog;
			console.error = console.stderror;
			console.info = console.stdinfo;
			break;
		};
		let output = "";
		try {
			output = eval(input);
			lastEntry = input;
		} catch(e) {
			output = e.toString()
		}
		evalHistory = input + " = " + output + "\n" + evalHistory;
		result = output;
	}

	function entry() {
		return eval(lastEntry);
	};
}())