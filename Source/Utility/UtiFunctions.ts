import {Logging} from "./Logging";

export class UtilFunctions {
	public static Sleep(milliseconds: number) {
		Logging.Log(`ᴢzZ Sleeping for ${milliseconds} ms Zzᴢ`);

		const timeInitial: Date = new Date();
		var timeNow: Date = new Date();
		while (timeNow.getTime() - timeInitial.getTime() < milliseconds) {
			timeNow = new Date();
		}
		Logging.Log(`I'm awake!`);
	}
}