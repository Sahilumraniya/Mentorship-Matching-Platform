import { HookContext } from "@feathersjs/feathers";
import { UserRole } from "../../../../db_services/v1/user/interfaces/UserInterface";
import { MentorshipRequestStatus } from "../../../../db_services/v1/mentorship_requests/interfaces/MentorshipRequestInterface";
import { MentorshipRequestDBOperations } from "../../../../db_services/v1/mentorship_requests/utils/MentorshipRequestDBOperations";
import { BadRequest } from "@feathersjs/errors";
import { error } from "console";

export const UpdateRequest = () => async (context: HookContext) => {
    const { id, data } = context;

    const login_user = context.params.user;

    // check if the user is not mentor and status is true
    // if (login_user?.role !== UserRole.MENTOR && data.status) {
    //     throw new BadRequest("Only mentor can update the request");
    // }

    const request = await MentorshipRequestDBOperations.getDetails({
        id: Number(id),
        dbQuery: {
            status: { $ne: MentorshipRequestStatus.DELETED }
        }
    }).then((result) => {
        console.log("Request found", result);
        console.log("login_user", login_user);
        if (result.receiver_id !== login_user?.id) {
            throw new BadRequest("Only receiver mentor can update the request");
        }
    }).catch((error) => {
        console.log("Request not found", error);
        throw new BadRequest("Request not found");
    });

}