// Helper for setting focus on item on viewDidEnter (was too much duplication on that)

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