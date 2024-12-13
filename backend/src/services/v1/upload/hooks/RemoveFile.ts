import { BadRequest } from "@feathersjs/errors";
import { S3Utilities } from "../../../../utils/S3Utilities";
import { HookContext } from "@feathersjs/feathers";

export const RemoveFile = () => async (context: HookContext) => {
    const { id } = context;

    // console.log("Delete ::", id);

    const fileName = id?.toString().split("/").pop();

    // console.log("Filename ::", fileName);
    if (!id) {
        throw new BadRequest("please give fileName");
    }
    S3Utilities.deleteFile(fileName!);
    context.result = {
        "meassage": "file sucessflly deleted"
    }
}