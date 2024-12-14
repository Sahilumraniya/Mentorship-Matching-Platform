import auth, {
    AuthenticationClient,
    AuthenticationClientOptions,
} from "@feathersjs/authentication-client";
import { CookieStorage } from "cookie-storage";
import rest from "@feathersjs/rest-client";
import Axios from "axios";
import feathers from "@feathersjs/feathers";
import { ApiRoutes } from "./routes";

/**
 * CookieStorage
 * @type {CookieStorage}
 */

export const cookieStorage = new CookieStorage();

console.log("process.env.BASEURL ::", process.env.NEXT_PUBLIC_BASEURL);

const restClient = rest(process.env.NEXT_PUBLIC_BASEURL || "http://localhost:3030");

// const socketClient = io(process.env.baseUrl);

export const authCookieName = process.env.NEXT_PUBLIC_COOKIENAME ?? "cookie";
export const loginTime = "login-time";

/**
 * Feathers application
 */

export const restApp = feathers();

restApp.configure(restClient.axios(Axios));

// restApp.configure(socketio(socketClient, {}));
// feathers().configure(socketio(socketClient, {}))

class MyAuthenticationClient extends AuthenticationClient {
    getFromLocation(location: Location) {
        // Do custom location things here
        return super.getFromLocation(location);
    }
}

const options: AuthenticationClientOptions = {
    path: ApiRoutes.authentication,
    storageKey: authCookieName,
    storage: cookieStorage,
    header: "authorization",
    scheme: "Bearer",
    locationKey: authCookieName,
    locationErrorKey: "error",
    jwtStrategy: "jwt",
    Authentication: MyAuthenticationClient,
};
restApp.configure(auth(options));

export default restApp;

export const authenticationService = restApp.service(ApiRoutes.authentication);
export const accessTokenService = restApp.service(ApiRoutes.accesToken);
export const userService = restApp.service(ApiRoutes.user);
export const profileService = restApp.service(ApiRoutes.profile);
export const uploadService = restApp.service(ApiRoutes.upload);
export const mentorRequestService = restApp.service(ApiRoutes.mentorRequest);
export const notificationService = restApp.service(ApiRoutes.notification);
export const matchUserService = restApp.service(ApiRoutes.matchUser);