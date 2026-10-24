import { asciiBannerConfig, asciiScenes } from "../config/asciiBannerConfig";
import { mount } from "../vendor/ascii-rest/mount.js";
import type { Piece } from "../vendor/ascii-rest/types";

// Every scene becomes a local, lazy-loaded chunk; only the selected one is fetched.
const pieces = import.meta.glob<Piece>("../vendor/ascii-rest/pieces/*.js");
const storageKey = "growth-journal:ascii-scene";
const pauseKey = "growth-journal:ascii-paused";

export function initAsciiBackdrop() {
	const root = document.querySelector<HTMLElement>("#ascii-banner");
	if (!root || root.dataset.initialized) return;
	root.dataset.initialized = "true";
	const stage = root.querySelector<HTMLElement>(".ascii-stage")!;
	const canvas = root.querySelector("canvas")!;
	const trigger = root.querySelector<HTMLButtonElement>(".ascii-trigger")!;
	const label = root.querySelector<HTMLElement>("[data-scene-label]")!;
	const dialog = root.querySelector<HTMLDialogElement>("dialog")!;
	const search = root.querySelector<HTMLInputElement>("input")!;
	const status = root.querySelector<HTMLElement>("[data-status]")!;
	const pause = root.querySelector<HTMLButtonElement>("[data-pause]")!;
	const sceneButtons = [...root.querySelectorAll<HTMLButtonElement>("[data-scene]")];
	const categoryButtons = [...root.querySelectorAll<HTMLButtonElement>("[data-category]")];
	const reduced = matchMedia("(prefers-reduced-motion: reduce)");
	const read = (key: string) => { try { return localStorage.getItem(key); } catch { return null; } };
	const save = (key: string, value: string) => { try { localStorage.setItem(key, value); } catch { /* Storage is optional. */ } };
	let selected = read(storageKey) || asciiBannerConfig.defaultScene;
	if (!asciiScenes.some((scene) => scene.id === selected)) selected = asciiBannerConfig.defaultScene;
	let paused = read(pauseKey) === "true";
	let explicitPlay = false;
	let current: Piece | undefined;
	let stop: (() => void) | undefined;
	let request = 0;
	let category = "";
	let suspended = false;
	const isHome = () => document.documentElement.dataset.layoutVariant === "home";
	const isStill = () => paused || (reduced.matches && !explicitPlay);
	function controls() {
		pause.textContent = isStill() ? "播放动效" : "暂停动效";
		pause.setAttribute("aria-pressed", String(isStill()));
	}
	function fit() {
		if (!current || !stage.clientWidth || !stage.clientHeight) return;
		const { cols, rows, cell = 2 } = current.meta;
		canvas.style.width = `${Math.min(stage.clientWidth, stage.clientHeight * cols / (rows * cell), 1200)}px`;
	}
	function render() {
		stop?.(); stop = undefined;
		if (!current || suspended || !isHome() || !stage.clientWidth) return;
		fit();
		stop = mount(canvas, current, {
			fps: isStill() ? 0 : Math.min(current.meta.fps, asciiBannerConfig.maxFps),
			motion: explicitPlay,
		});
	}
	async function choose(id: string) {
		const scene = asciiScenes.find((item) => item.id === id);
		const load = pieces[`../vendor/ascii-rest/pieces/${id}.js`];
		if (!scene || !load) return;
		const generation = ++request;
		status.textContent = "正在展开光景…";
		try {
			const next = await load();
			if (generation !== request) return;
			const previous = current;
			current = next;
			try { render(); } catch (error) { current = previous; render(); throw error; }
			selected = id;
			label.textContent = scene.label;
			root!.style.backgroundColor = next.meta.ground || "#09161b";
			root!.dataset.ready = "true";
			for (const button of sceneButtons) button.setAttribute("aria-pressed", String(button.dataset.scene === id));
			save(storageKey, id);
			status.textContent = `当前：${scene.label}`;
			controls();
		} catch {
			if (generation === request) status.textContent = "暂时未能加载，请重试或选择其他光景。";
		}
	}
	function filter() {
		const query = search.value.trim().toLowerCase();
		let count = 0;
		for (const button of sceneButtons) {
			button.hidden = !!((category && button.dataset.group !== category) || !`${button.textContent} ${button.dataset.scene}`.toLowerCase().includes(query));
			if (!button.hidden) count++;
		}
		root!.querySelector<HTMLElement>(".ascii-empty")!.hidden = count > 0;
	}
	trigger.hidden = false;
	trigger.addEventListener("click", () => { dialog.showModal(); search.focus(); });
	dialog.addEventListener("close", () => trigger.focus({ preventScroll: true }));
	root.querySelector("[data-close]")!.addEventListener("click", () => dialog.close());
	dialog.addEventListener("click", (event) => {
		if (event.target !== dialog) return;
		const rect = dialog.getBoundingClientRect();
		if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) dialog.close();
	});
	for (const button of sceneButtons) button.addEventListener("click", () => { void choose(button.dataset.scene!); dialog.close(); });
	for (const button of categoryButtons) button.addEventListener("click", () => {
		category = button.dataset.category!;
		for (const item of categoryButtons) item.setAttribute("aria-pressed", String(item === button));
		filter();
	});
	search.addEventListener("input", filter);
	pause.addEventListener("click", () => {
		const play = isStill();
		paused = !play;
		explicitPlay = play;
		save(pauseKey, String(paused));
		if (play) render(); else { stop?.(); stop = undefined; }
		controls();
	});
	root.querySelector("[data-random]")!.addEventListener("click", () => {
		const candidates = asciiScenes.filter((scene) => scene.id !== selected);
		void choose(candidates[Math.floor(Math.random() * candidates.length)].id);
		dialog.close();
	});
	const resize = new ResizeObserver(() => { fit(); if (!stop && current && isHome() && !suspended) render(); });
	const navigation = new MutationObserver(() => {
		if (!isHome() && dialog.open) dialog.close();
		render();
	});
	const observe = () => {
		resize.observe(stage);
		navigation.observe(document.documentElement, { attributes: true, attributeFilter: ["data-layout-variant"] });
	};
	reduced.addEventListener("change", () => { explicitPlay = false; controls(); render(); });
	window.addEventListener("pagehide", () => { suspended = true; stop?.(); stop = undefined; resize.disconnect(); navigation.disconnect(); });
	window.addEventListener("pageshow", () => { if (!suspended) return; suspended = false; observe(); render(); });
	observe();
	controls();
	void choose(selected);
}
