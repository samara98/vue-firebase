import Vue from "vue";
import VueRouter from "vue-router";
import firebase from "firebase/app";
import Home from "../views/home";

Vue.use(VueRouter);

const router = new VueRouter({
	mode: "history",
	base: process.env.BASE_URL,
	routes: [
		{
			path: "/",
			name: "Home",
			component: Home,
			meta: {
				requiresAuth: true
			}
		},
		{
			path: "/about",
			name: "About",
			// route level code-splitting
			// this generates a separate chunk (about.[hash].js) for this route
			// which is lazy-loaded when the route is visited.
			component: () =>
				import(/* webpackChunkName: "about" */ "../views/About.vue")
		},
		{
			path: "/signup",
			name: "Signup",
			// route level code-splitting
			// this generates a separate chunk (about.[hash].js) for this route
			// which is lazy-loaded when the route is visited.
			component: () =>
				import(/* webpackChunkName: "auth" */ "../views/auth/Signup.vue")
		},
		{
			path: "/login",
			name: "Login",
			// route level code-splitting
			// this generates a separate chunk (about.[hash].js) for this route
			// which is lazy-loaded when the route is visited.
			component: () =>
				import(/* webpackChunkName: "auth" */ "../views/auth/Login.vue")
		}
	]
});

router.beforeEach((to, from, next) => {
	// check to see if route requires auth
	if (to.matched.some(rec => rec.meta.requiresAuth)) {
		// check auth state of user
		const user = firebase.auth().currentUser;
		if (user) {
			// user signed in, proceed route
			next();
		} else {
			// no user signed in, redirect to login
			next({ name: "Login" });
		}
	} else {
		next();
	}
});

export default router;
