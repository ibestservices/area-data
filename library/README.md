# IBest China Area Data

## 简介

中国省市区数据，适用于 arkui的 TextPicker 和 IBest-ui 的 IBestCascader 等组件。

## 下载安装

`ohpm install @ibestservices/area-data`

OpenHarmony ohpm 环境配置等更多内容，请参考[如何安装 OpenHarmony ohpm 包](https://gitee.com/openharmony-tpc/docs/blob/master/OpenHarmony_har_usage.md)

## 需要权限
无

## 使用
在 ArkUI 的 TextPicker 组件中使用时，直接引用 `provinceData` 对象即可：

```ts
import { provinceData, provinceAndCityData, regionData, codeToText } from "@ibestservices/area-data"

TextPicker({ range: provinceData, selected: this.select })
    .onChange((value: string | string[], index: number | number[]) => {
        console.info('Picker item changed, value: ' + value + ', index: ' + index)
    })
```

在 IBestUI 的 IBestCascader 组件中使用时，直接引用即可：
```ts
import { provinceData, provinceAndCityData, regionData, codeToText } from "@ibestservices/area-data"
@Entry
@Component
struct Index {
    @State value: string[] = []
    @State visible: boolean = false
    build() {
        Column({ space: 20 }) {
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
}
```

## 数据更新

中国的行政区划每年都会有变动，如果发现省市区数据未及时更新，欢迎提 Pull Request 帮助我们更新。


## 仓库地址
https://github.com/ibestservices/area-data.git

## QQ群
953492584

## 微信群
先进QQ群，拉你进微信群

## 开源协议
本项目基于 Apache License 2.0，请自由地享受和参与开源。

## 贡献者
感谢以下同学对IBestAreaData做的贡献:

<a href="https://github.com/ibestservices/ibest-ui/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=ibestservices/ibest-ui" />
</a>