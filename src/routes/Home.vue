<script setup></script>

<template>
	<div class="min-h-screen flex flex-col justify-center items-center">
		<div class="text-center">
			<div
				class="logo text-3xl font-bold text-blue-600 font-title text-center"
			>
				Audaisytee
			</div>
			<p class="text-slate-700 mt-2">A personal diary notes</p>
		</div>
		<div class="flex gap-2 mt-7">
			<router-link
				class="py-2 px-6 rounded-full border-2 border-slate-700 transition hover:bg-slate-700 hover:text-white"
				to="/viewentry"
				>View Diaries</router-link
			>
			<router-link
				class="py-2 px-6 rounded-full border-2 border-slate-700 transition hover:bg-slate-700 hover:text-white"
				to="/addentry"
				>Add Diary</router-link
			>
		</div>
	</div>
</template>

<style lang="scss"></style>
