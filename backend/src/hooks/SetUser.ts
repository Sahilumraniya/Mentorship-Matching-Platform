/*
* Created By Sahil(sahilumraniya9512@gmail.com) on 27-11-2024 
*/

import { HookContext } from "@feathersjs/feathers";

const setUser = (key = 'createdBy') => async (context: HookContext) => {
    console.log('setUser');
    console.log(context.params.user);
    context.params.query = {
        ...context.params.query,
        [key]: context.params.user?._id,
    };
};


export default setUser;