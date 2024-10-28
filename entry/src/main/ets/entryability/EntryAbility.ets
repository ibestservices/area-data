import { AbilityConstant, UIAbility, Want } from '@kit.AbilityKit';
import { hilog } from '@kit.PerformanceAnalysisKit';
import { window } from '@kit.ArkUI';
export default class EntryAbility extends UIAbility {
	onCreate(want: Want, launchParam: AbilityConstant.LaunchParam): void {

	}
	onDestroy(): void {

	}
	onWindowStageCreate(windowStage: window.WindowStage): void {
		// Main window is created, set main page for this ability
		windowStage.loadContent('pages/Index', (err) => {

		})
	}
}
