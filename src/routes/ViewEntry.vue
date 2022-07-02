<script setup>
import { reactive, ref, onMounted } from "vue";
import moment from "moment";
import { faker } from "@faker-js/faker";

import Diary from "../components/Diary.vue";

const time = reactive({
	day: moment().format("dddd"),
	date: moment().format("MMM Do YY"),
});

const diaries = ref([]);

onMounted(async () => {
	const jsonRes = await fetch(import.meta.env.VITE_SERVER_URL + "/all");
	const res = await jsonRes.json();

	diaries.value = res.diaries || [];
});

const removeDiary = async (id) => {
	const jsonRes = await fetch(import.meta.env.VITE_SERVER_URL + "/" + id, {
		method: "delete",
	});

	const res = await jsonRes.json();

	if (res.message && res.message.errors) {
		alert("There is an error while removing the diary");
	} else {
		diaries.value = diaries.value.filter((diary) => diary.id !== id);
	}
};
</script>

<template>
	<div class="max-w-[768px] mx-auto pb-12">
		<div class="py-8 text-center flex flex-col items-center gap-3">
			<router-link to="/" class="font-title text-4xl font-bold"
				>Personal Diary Notes</router-link
			>
			<p class="">{{ time.day }}, {{ time.date }}</p>
		</div>
		<div class="mt-4 flex flex-col gap-4">
			<Diary
				v-for="diary in diaries"
				:diary="diary"
				:key="diary.id"
				:removeDiary="removeDiary"
			/>
			<div v-if="diaries.length === 0" class="text-center py-5">
				No diaries yet. Add
				<router-link class="text-blue-500" to="/addentry"
					>here</router-link
				>
			</div>
		</div>
	</div>
</template>

<style lang="scss"></style>
