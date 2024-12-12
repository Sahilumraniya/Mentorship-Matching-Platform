import { HookContext } from "@feathersjs/feathers";

export const GetAllRequest = () => async (context: HookContext) => {
    const { params } = context;
    const { user } = params;

    params.query = {
        $or: [
            {
                sender_id: user?.id
            },
            {
                receiver_id: user?.id
            }
        ]
    }
}