import { HookContext } from "@feathersjs/feathers";
import { UserDBOperations } from "../../../../db_services/v1/user/utils/UserDBOperations";

export const AddProfileId = () => async (context: HookContext) => {
    const login_user = context.params.user;
    // console.log("Data ::", context.data);

    console.log("Login User ::", login_user);
    
    await UserDBOperations.modifyDatum({
        id: login_user?.id,
        dbBody: {
            profile_id: context.result.id
        }
    });
}