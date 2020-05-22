const mdl = {
	chainWebpack: config => {
		config.plugin("html").tap(args => {
			args[0].title = "Geo Ninjas";
			return args;
		});
	}
};

module.exports = mdl;
