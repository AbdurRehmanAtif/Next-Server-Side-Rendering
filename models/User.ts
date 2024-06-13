import { Auth, Profile } from "@/app/components/auth/login/route";
import performNextRequest from "@/service/http/NextApi";
import { ServerResponse } from "http";

enum Roles {
    ADMIN,
    USER
}

export default class User {

    public email: string | undefined;
    public role: string | undefined;
    public firstName: string | undefined;
    public lastName: string | undefined;
    public dob: string | undefined;
    public mobile: string | undefined;
    public about: string | undefined;
    public gender: string | undefined;
    public avatar: string | undefined;
    public coverImage: string | undefined;
    // this trick let the whole application know if the state of user was updated or not.
    public isStateUpdated: boolean = false;

    constructor() {

        // Initialize attributes
        this.email = undefined
        this.role = "user"
        this.firstName = undefined
        this.lastName = undefined;
        this.dob = undefined;
        this.mobile = undefined;
        this.about = undefined;
        this.gender = undefined;
        this.avatar = undefined;
        this.coverImage = undefined;
    }

    isUserStateUpdated() {
        return this.isStateUpdated;
    }

    public parseAuth(auth: Auth) {

        if (auth.hasOwnProperty("email")) {
            this.email = auth.email;
        }
        if (auth.hasOwnProperty("role")) {
            this.role = auth.role
        }

        this.isStateUpdated = true
    }

    public parseProfile(profileData: Profile | undefined): void {

        if (profileData === null || profileData === undefined) {
            if (this.email) {
                const username = this.email.substring(0, this.email.indexOf("@"));
                this.firstName = username
            } else {
                this.firstName = "Guest User"
            }
            return;
        }

        // Update profile data if the property exists in the profileData object
        if (profileData.hasOwnProperty("email")) {
            this.email = profileData.email!.charAt(0).toUpperCase() + profileData.email!.slice(1).split('@')[0]
            this.firstName = profileData.email!.charAt(0).toUpperCase() + profileData.email!.slice(1).split('@')[0]
        }
        if (profileData.hasOwnProperty("firstName")) {
            this.firstName = profileData.firstName
        }
        if (profileData.hasOwnProperty("lastName")) {
            this.lastName = profileData.lastName;
        }
        if (profileData.hasOwnProperty("dob")) {
            this.dob = profileData.dob;
        }
        if (profileData.hasOwnProperty("mobile")) {
            this.mobile = profileData.mobile;
        }
        if (profileData.hasOwnProperty("about")) {
            this.about = profileData.about;
        }
        if (profileData.hasOwnProperty("gender")) {
            this.gender = profileData.gender;
        }
        if (profileData.hasOwnProperty("avatar")) {
            this.avatar = profileData.avatar;
        }
        if (profileData.hasOwnProperty("coverImage")) {
            this.coverImage = profileData.coverImage;
        }

        this.isStateUpdated = true
    }



}