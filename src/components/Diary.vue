<script setup>
import { defineProps, ref } from "vue";
import Dropdown from "./Dropdown.vue";
import {
	DotsHorizontalIcon,
	EmojiHappyIcon,
	CloudIcon,
	LocationMarkerIcon,
} from "@heroicons/vue/solid";
import moment from "moment";

const props = defineProps({
	diary: Object,
	removeDiary: Function,
});

const isDropdownOpen = ref(false);

const toggleDropdown = () => {
	isDropdownOpen.value = !isDropdownOpen.value;
};

const closeDropdown = () => {
	isDropdownOpen.value = false;
};

const dropdownActions = [
	{
		name: "Delete",
		handler: () => props.removeDiary(props.diary.id),
	},
];
</script>

<template>
	<div class="rounded-2xl bg-white p-4">
		<div class="diary-text">{{ props.diary.text }}</div>
		<div class="flex justify-between items-center mt-4 text-slate-500">
			<div class="flex items-center gap-5">
				<router-link
					:to="'/diary/' + props.diary.id"
					class="py-1.5 px-5 rounded-full text-blue-500 border-2 border-blue-500 transition hover:bg-blue-500 hover:text-white"
				>
					View
				</router-link>
				<div class="flex">
					<EmojiHappyIcon class="h-5 mr-2" />
					{{ props.diary.feeling }}
				</div>
				<div class="flex">
					<LocationMarkerIcon class="h-5 mr-2" />

					{{ props.diary.location }},
					{{ moment(props.diary.date).format("MMM Do YY") }}
				</div>
				<div class="flex">
					<CloudIcon class="h-5 mr-2" />

					{{ props.diary.weather }} {{ props.diary.temperature }}F
				</div>
			</div>
			<button>
				<DotsHorizontalIcon @click="toggleDropdown" class="h-5" />
				<Dropdown
					:isOpen="isDropdownOpen"
					:close="closeDropdown"
					:actions="dropdownActions"
				/>
			</button>
		</div>
	</div>
</template>

<style lang="scss">
.diary-text {
	display: -webkit-box;
	-webkit-line-clamp: 4;
	-webkit-box-orient: vertical;
	overflow: hidden;
}
</style>
