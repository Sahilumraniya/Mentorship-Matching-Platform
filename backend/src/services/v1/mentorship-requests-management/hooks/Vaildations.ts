import { HookContext } from "@feathersjs/feathers";
import { MentorshipRequestDBOperations } from "../../../../db_services/v1/mentorship_requests/utils/MentorshipRequestDBOperations";
import { MentorshipRequestStatus } from "../../../../db_services/v1/mentorship_requests/interfaces/MentorshipRequestInterface";
import { BadRequest } from "@feathersjs/errors";

export const Vaildations = () => async (context: HookContext) => {
    const { data } = context;
    const { sender_id, receiver_id } = data;

    await MentorshipRequestDBOperations.getDataWithPagination({
        dbQuery: {
            sender_id,
            receiver_id,
            status: { $in: [MentorshipRequestStatus.PENDING, MentorshipRequestStatus.ACCEPTED] },
        }
    }).then((result) => {
        if (result.total > 0) {
            throw new BadRequest('Mentorship request already exists or accepted');
        }
    })
};