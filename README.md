<p align="center">
    <img src="https://ibestservices.github.io/ibest-ui/AppScope/resources/base/media/app_logo_trans.png" width="100">
</p>

<p align="center">IBest China Area Data</p>

<p align="center">中国省市区数据</p>

<p align="center">
    <a style="color:#0366d6;" onclick="openPage('https://github.com/ibestservices/area-data')">Github</a>
</p>

---

## 简介

中国省市区数据，适用于鸿蒙ArkUI的 TextPicker 和 IBest-UI的 IBestCascader 等组件。

## 推荐⭐️⭐️⭐️
IBest-UI由 <a style="color:#0366d6;" href="https://www.ibestservices.com/" target="_blank">安徽百得思维信息科技有限公司</a>
开源，是一个**轻量、简单易用、可定制主题、支持深色模式和浅色模式**的鸿蒙开源UI组件库, 包含 Button、Calendar、Form、Field、Picker、Popup、Toast、Dialog、ImageCropper 等50+个优质组件，上手简单，使用方便，可大大提高鸿蒙开发者的开发效率。

<a style="color:#0366d6;" onclick="openPage('https://ohpm.openharmony.cn/#/cn/detail/@ibestservices%2Fucharts')">UCharts</a>
一个类型丰富、高性能、可扩展、支持主题定制的鸿蒙开源图表库。

## 下载安装

`ohpm install @ibestservices/area-data`

OpenHarmony ohpm 环境配置等更多内容，请参考[如何安装 OpenHarmony ohpm 包](https://gitee.com/openharmony-tpc/docs/blob/master/OpenHarmony_har_usage.md)

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

## 官方生态

| 项目                         | 描述                                                    |                                                                                                                             |
|:---------------------------|:------------------------------------------------------|:----------------------------------------------------------------------------------------------------------------------------|
| @ibestservices/ibest-ui    | 一个**轻量、简单易用、可定制主题、支持深色模式和浅色模式**的鸿蒙开源UI组件库。            | <a style="color:#0366d6;" onclick="openPage('https://ohpm.openharmony.cn/#/cn/detail/@ibestservices%2Fibest-ui')">地址</a>    |
| @ibestservices/ibest-ui-v2 | 一个**轻量、简单易用、可定制主题、支持深色模式和浅色模式**的鸿蒙开源UI组件库，基于状态管理v2版本。 | <a style="color:#0366d6;" onclick="openPage('https://ohpm.openharmony.cn/#/cn/detail/@ibestservices%2Fibest-ui-v2')">地址</a> |
| @ibestservices/ucharts     | 一个类型丰富、高性能、可扩展、支持主题定制的图表库。                            | <a style="color:#0366d6;" onclick="openPage('https://ohpm.openharmony.cn/#/cn/detail/@ibestservices%2Fucharts')">地址</a>     |

## 交流QQ群
官方QQ群 953492584

![QQ1群](https://ibestservices.github.io/ibest-ui/screenshot/QQ%E7%BE%A4.jpg)

## 微信群
添加IBest-UI助手, 备注 "鸿蒙开发"
![微信群](https://ibestservices.github.io/ibest-ui/screenshot/IBest-UI助手.jpg)

## 开源协议
本项目基于 Apache License 2.0，请自由地享受和参与开源。

## 贡献者
感谢以下同学对IBestAreaData做的贡献:

<a href="https://github.com/damengbuxing">
  <img src="https://avatars.githubusercontent.com/u/42673795?s=64&v=4" />
</a>
<a href="https://github.com/542154968">
  <img src="https://avatars.githubusercontent.com/u/25705659?s=64&v=4" />
</a>