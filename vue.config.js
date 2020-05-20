const mdl = {
  chainWebpack: (config) => {
    config.plugin("html").tap((args) => {
      args[0].title = "Ninja Smoothies";
      return args;
    });
  },
};

module.exports = mdl;
