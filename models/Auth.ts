type Instance = {
    instance: Auth;
};

class Auth {

    static instance: Auth;
    public JWT: any
    private constructor() { }

    static getInstance(): Auth {
        if (!Auth.instance) {
            Auth.instance = new Auth();
        }
        return Auth.instance;
    }

    setJWT(jwt: string) {
        this.JWT = jwt;
        console.log("JWT set for auth", this.JWT)
    }
    getJWT() {

        console.log("get JWTfor auth ", this.JWT)
    }
    // Other methods and properties can be added here
}

export default Auth.getInstance();
