const jwtHelper = require("@services/jwt");

class JwtController {


    static async generateUserTokens(user, role) {
        // Generate access token using user ID and role.
        const accessToken = await jwtHelper.signAccessToken(user, role);
        return { accessToken };
    };
}

// Export JwtController to be used by other parts of the application.
module.exports = JwtController;