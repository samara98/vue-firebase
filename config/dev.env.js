"use strict";
require("dotenv").config({ path: ".env.local" });
const merge = require("webpack-merge");
const prodEnv = require("./prod.env");

module.exports = merge(prodEnv, {
	NODE_ENV: '"development"',
	VUE_APP_FIREBASE_API_KEY: `"${process.env.VUE_APP_FIREBASE_API_KEY}"`,
	VUE_APP_FIREBASE_AUTH_DOMAIN: `"${process.env.VUE_APP_FIREBASE_AUTH_DOMAIN}"`,
	VUE_APP_FIREBASE_DB_URL: `"${process.env.VUE_APP_FIREBASE_DB_URL}"`,
	VUE_APP_FIREBASE_PROJECT_ID: `"${process.env.VUE_APP_FIREBASE_PROJECT_ID}"`,
	VUE_APP_FIREBASE_STORAGE_BUCKET: `"${process.env.VUE_APP_FIREBASE_STORAGE_BUCKET}"`,
	VUE_APP_FIREBASE_MESSAGING_SENDER_ID: `"${process.env.VUE_APP_FIREBASE_MESSAGING_SENDER_ID}"`,
	VUE_APP_FIREBASE_APP_ID: `"${process.env.VUE_APP_FIREBASE_APP_ID}"`,
	VUE_APP_FIREBASE_MEASUREMENT_ID: `"${process.env.VUE_APP_FIREBASE_MEASUREMENT_ID}"`,
});
