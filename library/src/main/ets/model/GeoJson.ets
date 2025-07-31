import { buffer } from '@kit.ArkTS'
import { FeatureCollection, GeoJSON } from './GeoJson.type'
import { geoJsonDecode } from './GeoJsonTools'
export const getGenJSON = (context: Context, areaCode: string) => {
	const data: Uint8Array = context.resourceManager.getRawFileContentSync(`${areaCode}.json`)
	const compressed = JSON.parse(buffer.from(data.buffer).toString()) as GeoJSON
	return geoJsonDecode(compressed) as FeatureCollection
}