// Initializes the `upload` service on path `/upload`
import { Upload } from './upload.class';
import multer from 'multer';
import fs from 'fs';
import hooks from './upload.hooks';
import { Application } from '../../../declarations';
import { ServiceAddons } from '@feathersjs/feathers';
import { NextFunction, Request, Response } from 'express';

// Add this service to the service type index
declare module '../../../declarations' {
    interface ServiceTypes {
        'v1/upload': Upload & ServiceAddons<any>;
    }
}

export default function (app: Application) {
    const options = {
        paginate: app.get('paginate'),
        multi: true,
    };

    const storage = multer.memoryStorage();
    const upload = multer({ storage: storage });

    // Initialize our service with any options it requires
    app.use(
        '/v1/upload',
        upload.any(),
        (req: Request, res: Response, next: NextFunction) => {
            req.body.files = req.files && req.files.length ? req.files : null;
            next();
        },
        new Upload(options, app),
    );

    // Get our initialized service so that we can register hooks
    const service = app.service('v1/upload');

    service.hooks(hooks);
}
