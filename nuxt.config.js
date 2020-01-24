// import nodeExternals from "webpack-node-externals";

export default {
  mode: "universal",
  /*
   ** Headers of the page
   */
  head: {
    title: process.env.npm_package_name || "",
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      {
        hid: "description",
        name: "description",
        content: process.env.npm_package_description || ""
      }
    ],
    link: [
      { rel: "icon", type: "image/x-icon", href: "/favicon.ico" },
      {
        rel: "stylesheet",
        type: "text/css",
        href: "/plugins/bootstrap4/bootstrap.min.css"
      },
      {
        rel: "stylesheet",
        type: "text/css",
        href: "/plugins/font-awesome-4.7.0/css/font-awesome.min.css"
      },
      {
        rel: "stylesheet",
        type: "text/css",
        href: "/plugins/OwlCarousel2-2.2.1/owl.carousel.css"
      },
      {
        rel: "stylesheet",
        type: "text/css",
        href: "/plugins/OwlCarousel2-2.2.1/owl.theme.default.css"
      },
      {
        rel: "stylesheet",
        type: "text/css",
        href: "/plugins/OwlCarousel2-2.2.1/animate.css"
      }
    ],
    script: [
      {
        src: "https://cdnjs.cloudflare.com/ajax/libs/jquery/3.1.1/jquery.min.js"
      },
      { src: "/plugins/OwlCarousel2-2.2.1/owl.carousel.js" },
      { src: "/plugins/Isotope/isotope.pkgd.min.js" }
    ]
  },
  /*
   ** Customize the progress-bar color
   */
  loading: { color: "#fff" },
  /*
   ** Global CSS
   */
  css: ["~/assets/styles/global.scss"],
  /*
   ** Plugins to load before mounting the App
   */
  plugins: [
    { src: "~/plugins/vue-isotope", ssr: false },
    { src: "~/plugins/vue-imagesLoaded", ssr: false }
  ],
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: [],
  /*
   ** Nuxt.js modules
   */
  modules: [],
  /*
   ** Build configuration
   */
  build: {
    /*
     ** You can extend webpack config here
     */
    vendor: ["vue-isotope"],
    extend(config, ctx) {
<<<<<<< HEAD
      if (ctx.isServer) {
        config.externals = [
          nodeExternals({
            whitelist: [/^vue-isotope/]
          })
        ];
      }
=======
      config.output.globalObject = "this";
      // if (ctx.isServer) {
      //   config.externals = [
      //     nodeExternals({
      //       whitelist: [/^vue-isotope/]
      //     })
      //   ];
      // }
>>>>>>> 5b50cbab29219bf4936608577378754abdb5348a
    }
  }
};
