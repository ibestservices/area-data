import { provinceData, provinceAndCityData, regionData, codeToText, getGeoJSON } from "@ibestservices/area-data"
import { IBestButton, IBestCascader } from '@ibestservices/ibest-ui-v2'

@Entry
@ComponentV2
struct Index {
	@Local select: number = 0
	@Local select1: number = 0
	@Local select2: number = 0
	@Local value: string[] = []
	@Local visible: boolean = false
	private context = this.getUIContext().getHostContext() as Context

	onPageShow(): void {
		console.log("####getGeoJSON:", JSON.stringify(getGeoJSON(this.context, '440300')))
	}

	build() {
		Scroll(){
			Column({ space: 20 }) {
				TextPicker({ range: provinceData, selected: this.select })
					.onChange((value: string | string[], index: number | number[]) => {
						console.info('Picker item changed, value: ' + value + ', index: ' + index)
					})
				TextPicker({ range: provinceAndCityData, selected: this.select1 })
					.onChange((value: string | string[], index: number | number[]) => {
						console.info('Picker item changed, value: ' + value + ', index: ' + index)
					})
				TextPicker({ range: regionData, selected: this.select2 })
					.onChange((value: string | string[], index: number | number[]) => {
						console.info('Picker item changed, value: ' + value + ', index: ' + index)
					})
				Text(this.value.map(e => codeToText[e]).join(","))
				IBestButton({
					text: "选择城市",
					onBtnClick: () => {
						this.visible = true
					}
				})
				IBestCascader({
					visible: this.visible!!,
					options: regionData,
					value: this.value!!
				})
			}.width('100%')
		}
		.height('100%')
	}
}