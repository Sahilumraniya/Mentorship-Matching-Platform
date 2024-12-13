import { Unavailable } from "@feathersjs/errors";
import { DeleteObjectCommand, PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { v4 as uuidv4 } from 'uuid';
import getMimeType from "./getMimeType";
import { Application } from "../declarations";

export class S3Utilities {
    private static _s3: S3Client;
    private static _backet: string;

    static async initializeS3(app: Application) {
        const awsConfig = app.get('aws');
        const bucketName = app.get('aws_s3_backet');
        if (!awsConfig) throw new Unavailable('Please provide AWS configuration as mentioned in documentation.');

        const { accessKey, secretAccessKey, region } = awsConfig;
        if (!accessKey || !secretAccessKey || !region) {
            throw new Unavailable('Please provide all the required configuration values for AWS initialization.');
        }

        S3Utilities._backet = bucketName;

        S3Utilities._s3 = new S3Client({
            region: region,
            credentials: {
                accessKeyId: accessKey,
                secretAccessKey: secretAccessKey
            }
        });
    }

    static async getPutUrl(fileNames: Array<string>) {
        const signedUrls = [];
        try {
            if (Array.isArray(fileNames)) {
                for (const fileName of fileNames) {

                    const uniqueId = uuidv4(); // Generate a unique identifier
                    const dateTime = new Date().toISOString().replace(/[:.]/g, '-'); // Format datetime for filename
                    const ufileName = `${dateTime}-${uniqueId}-${fileName}`; // Create a unique filename

                    const contentType = getMimeType(fileName); // Use the custom function

                    const command = new PutObjectCommand({
                        Bucket: S3Utilities._backet,
                        Key: `images/${ufileName}`,
                        ContentType: contentType,

                    });
                    // console.log("Com :", command);

                    const url = await getSignedUrl(S3Utilities._s3, command, { expiresIn: 60 });
                    signedUrls.push({ url, uniqueFileName: ufileName, originalFileName: fileName });
                }

                return signedUrls;
            } else {
                const uniqueId = uuidv4(); // Generate a unique identifier
                const dateTime = new Date().toISOString().replace(/[:.]/g, '-'); // Format datetime for filename
                const ufileName = `${dateTime}-${uniqueId}-${fileNames}`; // Create a unique filename

                const contentType = getMimeType(fileNames); // Use the custom function

                const command = new PutObjectCommand({
                    Bucket: S3Utilities._backet,
                    Key: `images/${ufileName}`,
                    ContentType: contentType,

                });
                // console.log("Com :", command);

                const url = await getSignedUrl(S3Utilities._s3, command, { expiresIn: 60 });
                signedUrls.push({ url, uniqueFileName: ufileName, originalFileName: fileNames });
                return signedUrls;
            }

        }
        catch (error) {
            console.log("Error ::", error);

            return "";

        }
    }

    static deleteFile(fileName: string) {
        const deleteCommand = new DeleteObjectCommand({
            Bucket: S3Utilities._backet,
            Key: `images/${fileName}`
        });

        S3Utilities._s3.send(deleteCommand);
    }
}