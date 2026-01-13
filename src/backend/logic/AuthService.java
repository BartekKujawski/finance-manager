package logic;

import model.User;

public class AuthService {
    private static User activeUser = null;

    public static boolean login(String user, String pass, User registeredUser) {
        if (registeredUser.getUsername().equals(user) && registeredUser.getPassword().equals(pass)) {
            activeUser = registeredUser;
            return true;
        }
        return false;
    }

    public static boolean isLoggedIn() {
        return activeUser != null;
    }
}
