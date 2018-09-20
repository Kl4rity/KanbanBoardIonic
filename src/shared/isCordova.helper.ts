import { Platform } from 'ionic-angular';

export function isCordova(){
    let platform = new Platform();
    return platform.is('cordova');
};