import { HookContext } from "@feathersjs/feathers";

export const AddAWSURL = (field_name = "image") => (context: HookContext) => {
    const { data } = context;
    // console.log("Data ::", field_name);

    if (!data[field_name]) {
        return;
    }

    context.data = {
        ...context.data,
        [field_name]: `https://swapnshare.s3.ap-south-1.amazonaws.com/images/${data[field_name]}`
    }
    // console.log("Data ::", context.data);
}