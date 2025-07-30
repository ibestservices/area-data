import { buffer } from '@kit.ArkTS';
import { FeatureCollection, GeoJSON } from './GeoJson.type';
import { GeoJsonDecode } from './GeoJsonTools';

export const getGenJSON = (areaCode: string) => {
  const data: Uint8Array = getContext().resourceManager.getRawFileContentSync(`${areaCode}.json`);
  const compressed = JSON.parse(buffer.from(data.buffer).toString()) as GeoJSON
  return GeoJsonDecode(compressed) as FeatureCollection;
}