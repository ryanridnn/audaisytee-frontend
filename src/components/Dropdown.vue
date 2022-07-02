<script setup>
import { defineProps } from "vue";

const props = defineProps({
	actions: {
		type: Array,
		default: [],
	},
	isOpen: Boolean,
	close: Function,
});

const onActionClick = (action) => {
	action();
	props.close();
};
</script>

<template>
	<div class="relative">
		<div
			class="modal absolute top-2 right-0 p-2 bg-slate-100 shadow-xl rounded-2xl min-w-[240px] flex flex-col gap-2"
			:class="{ 'modal--open': props.isOpen }"
		>
			<div
				v-for="action in props.actions"
				class="text-white p-2 bg-blue-600 rounded-xl"
				@click="onActionClick(action.handler)"
			>
				{{ action.name }}
			</div>
			<div
				@click="props.close"
				class="bg-red-500 rounded-lg p-2 text-white"
			>
				Cancel
			</div>
		</div>
	</div>
</template>

<style lang="scss">
.modal {
	@apply opacity-0 pointer-events-none;

	&--open {
		@apply opacity-100 pointer-events-auto;
	}
}
</style>
