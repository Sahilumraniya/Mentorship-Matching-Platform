import { HookContext } from '@feathersjs/feathers';
import { UploadUtilities } from '../utils/UploadUtilities/UploadUtilities';
import { BadRequest } from '@feathersjs/errors';

export const ImagesUpload = (foldername:string) => async (context:HookContext) => {
  const data = context.data;
  const files: Express.Multer.File[] = data.files;
  const uploadUrls: string[] = [];

  if (!files) {
    return context;
  }

  for(const file of files) {
    const fileType = file.originalname.split('.').pop();
    const filename = file.originalname.split('.').shift();
    const timeNow = Date.now();
    const path = `public/${foldername}/${filename}_${timeNow}.${fileType}`;
    const uploadData = await UploadUtilities.uploadFileToServer(path, file.buffer, 'http://localhost:3030');

    if(!uploadData) {
      throw new BadRequest('File upload failed');
    }

    uploadUrls.push(uploadData.Location);
  }

  if(uploadUrls.length === 1) {
    context.data.image = uploadUrls[0];
  }else{
    context.data.images = uploadUrls;
  }
  return context;
};