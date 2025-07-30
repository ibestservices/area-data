import { provinceData, provinceAndCityData, regionData, codeToText, getGenJSON } from "@ibestservices/area-data"
import { IBestButton, IBestCascader } from '@ibestservices/ibest-ui'
@Entry
@Component
struct Index {
	@State select: number = 0
	@State select1: number = 0
	@State select2: number = 0
	@State value: string[] = []
	@State visible: boolean = false

	onPageShow(): void {
		console.log("####getGenJSON:", JSON.stringify(getGenJSON('440300')))
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
					onClickBtn: () => {
						this.visible = true
					}
				})
				IBestCascader({
					visible: $visible,
					options: regionData,
					value: $value
				})
			}.width('100%')
		}
		.height('100%')
	}
}