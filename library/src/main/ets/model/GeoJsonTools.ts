import {
	GeoJSON,
	FeatureCollection,
	Feature,
	Polygon,
	MultiPolygon,
	MultiLineString,
	Position
} from './GeoJson.type'
// 扩展 Geometry，增加 encodeOffsets 字段
interface PolygonWithEncodeOffsets extends Polygon {
	encodeOffsets?: number[][]
	coordinates: Position[][]
}
interface MultiPolygonWithEncodeOffsets extends MultiPolygon {
	encodeOffsets?: number[][][]
	coordinates: Position[][][]
}
interface MultiLineStringWithEncodeOffsets extends MultiLineString {
	encodeOffsets?: number[][]
	coordinates: Position[][]
}
type GeometryWithEncodeOffsets =
	| PolygonWithEncodeOffsets
	| MultiPolygonWithEncodeOffsets
	| MultiLineStringWithEncodeOffsets

interface FeatureWithEncodeOffsets extends Feature<GeometryWithEncodeOffsets> {}
interface FeatureCollectionWithEncodeOffsets extends FeatureCollection<GeometryWithEncodeOffsets> {}
// 压缩geojson格式数据
export const geoJsonEncode = (json_: GeoJSON): string | undefined => {
	const json = json_ as FeatureCollectionWithEncodeOffsets
	let results = ''
	const features = json.features
	if (!features) {
		return
	}
	features.forEach((feature) => {
		const geometry = feature.geometry
		if (!geometry) {
			return
		}
		if (geometry.type === 'Polygon') {
			const poly = geometry as PolygonWithEncodeOffsets
			poly.encodeOffsets = [] // 初始化二维数组
			poly.coordinates.forEach((coordinate, idx) => {
				poly.encodeOffsets![idx] = []; // 初始化当前环的偏移量数组（一维）
				// 只在压缩时将坐标编码为string
				(poly.coordinates as unknown as (string | Position[])[])[idx] = encodePolygon(
					coordinate, poly.encodeOffsets![idx]
				)
			})
		} else if (geometry.type === 'MultiPolygon') {
			const mpoly = geometry as MultiPolygonWithEncodeOffsets
			mpoly.encodeOffsets = []
			mpoly.coordinates.forEach((polygon, idx1) => {
				mpoly.encodeOffsets![idx1] = []
				polygon.forEach((coordinate, idx2) => {
					(mpoly.coordinates[idx1] as unknown as (string | Position[])[])[idx2] = encodePolygon(
						coordinate, mpoly.encodeOffsets![idx1][idx2] = []
					)
				})
			})
		} else if (geometry.type === 'MultiLineString') {
			const mline = geometry as MultiLineStringWithEncodeOffsets
			mline.encodeOffsets = []
			mline.coordinates.forEach((coordinate, idx) => {
				(mline.coordinates as unknown as (string | Position[])[])[idx] = encodePolygon(
					coordinate, mline.encodeOffsets![idx] = []
				)
			})
		}
	})
	results = JSON.stringify(json)
	return results
}
// 编码单个polygon/line
const encodePolygon = (coordinate: Position[], encodeOffsets: number[]): string => {
	if (coordinate.length === 0) {
		return ''
	}
	let result = ''
	let prevX = quantize(coordinate[0][0])
	let prevY = quantize(coordinate[0][1])
	encodeOffsets[0] = prevX
	encodeOffsets[1] = prevY
	for (let i = 0; i < coordinate.length; i++) {
		let point = coordinate[i]
		result += encode(point[0], prevX)
		result += encode(point[1], prevY)
		prevX = quantize(point[0])
		prevY = quantize(point[1])
	}
	return result
}
const encode = (val: number, prev: number): string => {
	val = quantize(val)
	val = val - prev
	if (((val << 1) ^ (val >> 15)) + 64 === 8232) {
		val--
	}
	val = (val << 1) ^ (val >> 15)
	return String.fromCharCode(val + 64)
}
const quantize = (val: number): number => {
	return Math.ceil(val * 1024)
}

// 解压geojson格式数据
export const geoJsonDecode = (json_: GeoJSON): GeoJSON => {
	const json = json_ as FeatureCollectionWithEncodeOffsets
	const features = json.features
	if (!features) {
		return json
	}
	features.forEach((feature) => {
		const geometry = feature.geometry
		if (!geometry) {
			return
		}
		if (geometry.type === 'Polygon') {
			const poly = geometry as PolygonWithEncodeOffsets
			const encodeOffsets = poly.encodeOffsets
			delete poly.encodeOffsets
			poly.coordinates.forEach((coordinate, idx) => {
				if (typeof coordinate === 'string' && encodeOffsets && Array.isArray(encodeOffsets[idx])) {
					poly.coordinates[idx] = decodePolygon(
						coordinate,
						encodeOffsets[idx] as number[]
					)
				}
			})
		} else if (geometry.type === 'MultiPolygon') {
			const mpoly = geometry as MultiPolygonWithEncodeOffsets
			const encodeOffsets = mpoly.encodeOffsets
			delete mpoly.encodeOffsets
			mpoly.coordinates.forEach((polygon, idx1) => {
				polygon.forEach((coordinate, idx2) => {
					if (typeof coordinate === 'string' && encodeOffsets && Array.isArray(encodeOffsets[idx1]) &&
					Array.isArray(encodeOffsets[idx1][idx2])) {
						mpoly.coordinates[idx1][idx2] = decodePolygon(
							coordinate,
							encodeOffsets[idx1][idx2] as number[]
						)
					}
				})
			})
		} else if (geometry.type === 'MultiLineString') {
			const mline = geometry as MultiLineStringWithEncodeOffsets
			const encodeOffsets = mline.encodeOffsets
			delete mline.encodeOffsets
			mline.coordinates.forEach((coordinate, idx) => {
				if (typeof coordinate === 'string' && encodeOffsets && Array.isArray(encodeOffsets[idx])) {
					mline.coordinates[idx] = decodePolygon(
						coordinate,
						encodeOffsets[idx] as number[]
					)
				}
			})
		}
	})
	return json
}
const decodePolygon = (coordinate: string, encodeOffsets: number[]): Position[] => {
	if (!encodeOffsets) {
		return []
	}
	let result: Position[] = []
	let prevX = encodeOffsets[0]
	let prevY = encodeOffsets[1]
	for (let i = 0; i < coordinate.length; i += 2) {
		let x = coordinate.charCodeAt(i) - 64
		let y = coordinate.charCodeAt(i + 1) - 64
		x = (x >> 1) ^ -(x & 1)
		y = (y >> 1) ^ -(y & 1)
		x += prevX
		y += prevY
		prevX = x
		prevY = y
		result.push([x / 1024, y / 1024])
	}
	return result
}