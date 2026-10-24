/** 首页光景：关闭 enable 即可恢复原来的图片横幅。 */
export const asciiBannerConfig = {
	enable: true,
	defaultScene: "aurora-fjord",
	maxFps: 15,
};

const groups = [
	["风景漫游", "alpine-dawn:雪山破晓|aurora-fjord:极光峡湾|deep-reef:深海珊瑚|desert-night:沙漠之夜|earthrise:地球升起|kyoto-dusk:京都暮色|lantern-lake:灯火湖畔|marine-drive:滨海大道|misty-forest:雾中森林|night-coast:静夜海岸|ocean-sunset:海上落日|storm-plains:风暴原野|taj-dawn:泰姬晨光|tokyo-rain:东京雨夜|varanasi-ghats:恒河晨曦|lighthouse:灯塔|skyline:城市天际线"],
	["自然生息", "aurora:极光|bonsai:盆景|campfire:篝火|cherry-blossom:樱花|contour-map:等高线|fern:蕨叶|fireflies:萤火虫|fractal-tree:分形树|landscape:山水|lightning:闪电|rain:雨幕|ruled-mountains:层峦|sea-swell:海浪|snowfall:落雪|sunrise:日出|wind:风的形状"],
	["宇宙漫游", "black-hole:黑洞|earth:地球|eclipse:日食|galaxy:星系|moon-phases:月相|planet:行星|rocket:火箭|saptarishi:北斗七星|solar-system:太阳系|starfield:星空|three-body:三体"],
	["几何与物理", "cube:旋转立方体|dna-helix:双螺旋|donut:甜甜圈|glxgears:齿轮|gyroscope:陀螺仪|heart:心跳|icosahedron:二十面体|mobius-strip:莫比乌斯环|spring:弹簧|tesseract:四维立方体|torus-knot:环面纽结|twisted-ring:扭转圆环|bouncing-balls:弹跳小球|chladni:克拉尼图形|double-pendulum:双摆|falling-sand:流沙|flag:风中旗帜|fountain:喷泉|harmonograph:和谐摆|lorenz:洛伦兹吸引子|newtons-cradle:牛顿摆|pendulum-wave:摆的波浪|plucked-string:拨动琴弦|pond-ripples:池塘涟漪|smoke:烟雾|wave-interference:波的干涉"],
	["数字幻境", "doom-fire:像素火焰|fireworks:烟花|matrix-rain:数字雨|rotozoomer:旋转缩放|sparks:火花|synthwave:霓虹公路|tunnel:时空隧道|tv-static:电视雪花"],
] as const;

export const asciiScenes = groups.flatMap(([category, entries]) =>
	entries.split("|").map((entry) => {
		const [id, label] = entry.split(":");
		return { id, label, category };
	}),
);
export const asciiCategories = groups.map(([label]) => ({
	label,
	count: asciiScenes.filter((scene) => scene.category === label).length,
}));
