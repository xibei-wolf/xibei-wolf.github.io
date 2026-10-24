import assert from "node:assert/strict";
import test from "node:test";
import { asciiScenes, asciiCategories } from "../src/config/asciiBannerConfig.ts";

test("all selectable scenes render valid frames and palette buffers", async () => {
	assert.equal(asciiScenes.length, 78);
	assert.equal(new Set(asciiScenes.map(({ id }) => id)).size, asciiScenes.length);
	assert.equal(asciiCategories.reduce((sum, group) => sum + group.count, 0), 78);
	for (const { id } of asciiScenes) {
		const piece = await import(`../src/vendor/ascii-rest/pieces/${id}.js`);
		const { cols, rows, palette } = piece.meta;
		const frame = piece.default();
		const color = palette ? new Uint8Array(cols * rows) : undefined;
		for (const time of [0, 1.5, 8]) {
			const text = frame(time, { color, paper: false });
			const lines = text.trimEnd().split("\n");
			assert.ok(lines.length <= rows, `${id}: row overflow`);
			assert.ok(lines.every((line) => line.length <= cols), `${id}: column overflow`);
			assert.ok(text.length > 0 && !text.includes("undefined") && !text.includes("NaN"), `${id}: invalid frame`);
			if (color) assert.ok(color.every((index) => index < palette.length), `${id}: invalid colour`);
		}
	}
});

test("default aurora and other landscape scenes change over time", async () => {
	for (const id of ["aurora-fjord", "tokyo-rain", "ocean-sunset", "starfield"]) {
		const piece = await import(`../src/vendor/ascii-rest/pieces/${id}.js`);
		const frame = piece.default();
		assert.notEqual(frame(0), frame(3), `${id}: frozen animation`);
	}
});
