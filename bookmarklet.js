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
		console.stdinfo(args);
		window.alert("console.info: " + args);
		evalHistory = "console.info: " + args + "\n" + evalHistory;
	};

	console.stddir = console.dir;
	console.dir = function(args) {
		console.stddir(args);
		let json = JSON.stringify(args);
		window.alert("console.dir: " + json);
		evalHistory = "console.dir: " + json + "\n" + evalHistory;
	};

	while (true) {
		let input = prompt(">_\n" + evalHistory, "result");
		if (input == null) {
			console.log = console.stdlog;
			console.error = console.stderror;
			console.info = console.stdinfo;
			console.dir = console.stddir;
			break;
		};
		let output = "";
		try {
			output = eval(input);
			lastEntry = input;
		} catch(e) {
			output = e.toString();
		}
		evalHistory = input + " = " + format(output) + "\n" + evalHistory;
		result = output;
	}

	function entry() {
		return eval(lastEntry);
	};

	function format(arg) {
		switch (typeof arg) {
			case "String":
				arg = arg.valueOf();
			case "string":
				return '"' + arg + '"';
				break;
			case "Number":
				arg = arg.valueOf();
			case "number":
				return arg.toString();
				break;
			case "Boolean":
				arg = arg.valueOf();
			case "boolean":
				return arg;
				break;
			case "Object":
				arg = arg.valueOf();
			case "object":
				if (arg === null) {
					return "null";
				}
				if (arg.constructor === Array) {
					arg = arg.map(format);
					return "[" + arg.toString() + "]";
				}
				if (arg.constructor === Date) {
					return arg.toLocaleString();
				}
				return JSON.stringify(arg);
				break;
			case "Date":
				return arg.toLocaleString();
				break;
			case "Array":
				arg = arg.map(format);
				return "[" + arg.toString() + "]";
				break;
			case "null":
				return "null";
				break;
			case "undefined":
				return "undefined";
				break;
		}
		return arg;
	}
}())