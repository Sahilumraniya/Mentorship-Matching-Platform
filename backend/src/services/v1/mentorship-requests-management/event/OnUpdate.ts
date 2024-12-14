import { HookContext } from "@feathersjs/feathers";
import { MentorshipRequest_GET, MentorshipRequestStatus } from "../../../../db_services/v1/mentorship_requests/interfaces/MentorshipRequestInterface";
import { SendNotifications } from "../utils/SendNotifications";
import { NotificationType } from "../../../../db_services/v1/notification/interfaces/NotificationInterface";

export const OnUpdate = async (result: MentorshipRequest_GET, context: HookContext) => {

    const { receiver_id, sender_id, status } = result;

    if (status === MentorshipRequestStatus.ACCEPTED) {
        await SendNotifications(NotificationType.MentorshipAccept, receiver_id, sender_id);
    } else if (status === MentorshipRequestStatus.REJECTED) {
        await SendNotifications(NotificationType.MentorshipReject, receiver_id, sender_id);
    }
}