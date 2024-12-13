import { HookContext } from "@feathersjs/feathers";
import { S3Utilities } from "../../../../utils/S3Utilities";

export const UploadURL = () => async (context: HookContext) => {
    const { data } = context;
    // console.log("ata ::", data);
    const url = await S3Utilities.getPutUrl(data.fileNames);
    console.log("URL ::", url);
    context.result = {
        uploadURL: url
    }
}