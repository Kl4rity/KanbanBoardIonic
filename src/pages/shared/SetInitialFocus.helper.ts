import { NavController, TextInput } from 'ionic-angular';

export function setInitialFocus(navController:NavController, fieldToSetFocusOn:TextInput) {
        navController.viewDidEnter.subscribe(
            ()=>{
                setTimeout(()=>{
                    fieldToSetFocusOn.setFocus();
                },100);
            }
        );
}