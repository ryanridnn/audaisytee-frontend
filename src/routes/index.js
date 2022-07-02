import { createRouter, createWebHistory } from "vue-router";

import Home from "./Home.vue";
import AddEntry from "./AddEntry.vue";
import ViewEntry from "./ViewEntry.vue";
import Diary from "./Diary.vue";

const routes = [
	{
		path: "/",
		component: Home,
	},
	{
		path: "/addentry",
		component: AddEntry,
	},
	{
		path: "/viewentry",
		component: ViewEntry,
	},
	{
		path: "/diary/:id",
		component: Diary,
	},
];

const router = createRouter({
	routes,
	history: createWebHistory(),
	scrollBehavior() {
		return { x: 0, y: 0 };
	},
});

export default router;
