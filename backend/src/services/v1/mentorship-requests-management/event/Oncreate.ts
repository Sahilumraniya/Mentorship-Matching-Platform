import { HookContext } from "@feathersjs/feathers";
import { MentorshipRequest_GET } from "../../../../db_services/v1/mentorship_requests/interfaces/MentorshipRequestInterface";
import { SendNotifications } from "../utils/SendNotifications";
import { NotificationType } from "../../../../db_services/v1/notification/interfaces/NotificationInterface";

export const OnCreate = async (result: MentorshipRequest_GET, context: HookContext) => {

    const { receiver_id, sender_id } = result;

    await SendNotifications(NotificationType.MentorshipRequest, sender_id, receiver_id);
}