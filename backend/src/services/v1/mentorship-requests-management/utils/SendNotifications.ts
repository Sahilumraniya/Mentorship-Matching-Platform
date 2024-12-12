import { HookContext } from "@feathersjs/feathers";
import { NotificationType } from "../../../../db_services/v1/notification/interfaces/NotificationInterface";
import { NotificationDBOperations } from "../../../../db_services/v1/notification/utils/NotificationDBOperations";

export const SendNotifications = async (type: NotificationType, sender_id: number, receiver_id: number) => {
    console.log('SendNotifications -> type', type);
    // const { data } = result;

    await NotificationDBOperations.createDatum({
        dbBody: {
            sender_id,
            receiver_id,
            type,
        }
    }).catch((error) => {
        console.error('error while send a notifications ', error);
    });
};