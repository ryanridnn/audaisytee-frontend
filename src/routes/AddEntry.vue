<script setup>
import { ref, reactive, onMounted, watchEffect } from "vue";
import { useRouter } from "vue-router";
import { QuillEditor } from "@vueup/vue-quill";
import "@vueup/vue-quill/dist/vue-quill.snow.css";
import { ChevronLeftIcon } from "@heroicons/vue/solid";
import moment from "moment";
// import EmojiPicker from "vue-emoji-picker";

const router = useRouter();

const time = reactive({
	day: moment().format("dddd"),
	date: moment().format("MMM Do YY"),
});

const editor = ref(null);
const feeling = ref("");

onMounted(() => {
	if (window.navigator.geolocation) {
		window.navigator.geolocation.getCurrentPosition(
			() => {},
			() => {
				alert(
					"Make sure to allow location access to make this app working!"
				);
			}
		);
	}
});

const onSubmit = (e) => {
	window.navigator.geolocation.getCurrentPosition(
		async (location) => {
			const lat = location.coords.latitude;
			const long = location.coords.longitude;

			const content = editor.value.getHTML();
			const text = editor.value.getText();

			if (
				text === "" ||
				feeling.value === "" ||
				lat === "" ||
				long === ""
			) {
				alert(
					"Can't add diary. Fill all inputs and make sure to allow location access!"
				);
			} else {
				const data = {
					content,
					text,
					feeling: feeling.value,
					location: {
						lat,
						long,
					},
				};

				const jsonRes = await fetch(import.meta.env.VITE_SERVER_URL, {
					body: JSON.stringify(data),
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
				});

				const res = await jsonRes.json();

				if (res.message && res.message.errors) {
					alert("There's an error while adding the diary!");
				} else {
					router.push("/viewentry");
				}
			}
		},
		() => {
			alert(
				"Make sure to allow location access to make this app working!"
			);
		}
	);
};
</script>

<template>
	<div class="max-w-[768px] mx-auto">
		<div class="py-8 text-center flex flex-col items-center gap-4">
			<h1 class="font-title text-4xl font-bold">Add Diary</h1>
			<router-link class="link link--icon" to="/">
				<ChevronLeftIcon class="icon" />
				<span> Go back home </span>
			</router-link>
		</div>
		<div
			class="mb-6 pb-3 border-b-2 border-dashed border-slate-400 text-2xl font-medium"
		>
			{{ time.day }}, {{ time.date }}
		</div>

		<div class="flex flex-col gap-6">
			<div class="input-group">
				<label for="feeling" class="label"
					>How is your feeling today?</label
				>
				<input
					type="text"
					class="input"
					id="feeling"
					placeholder="Happy"
					v-model="feeling"
				/>
			</div>
			<div class="input-group">
				<label class="label">Diary Content</label>
				<div class="bg-white">
					<QuillEditor
						ref="editor"
						class="editor"
						theme="snow"
						toolbar="essential"
					/>
				</div>
			</div>

			<button
				class="py-2 px-6 rounded-full border-2 border-blue-500 text-blue-700 transition hover:bg-blue-700 hover:text-white self-start"
				@click="onSubmit"
			>
				Add Diary
			</button>
		</div>
	</div>
</template>

<style lang="scss">
.input-group {
	@apply flex flex-col gap-2;
}

.label {
}

.input {
	@apply rounded-lg py-2 px-4 outline-blue-700;
}

.ql-container {
	min-height: 20rem;
}
</style>
