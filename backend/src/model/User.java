package model;

import logic.Balance;

public class User {
    private String username;
    private String email;
    private Balance userBalance;

    public User(String username, String email) {
        this.username = username;
        this.email = email;
        this.userBalance = new Balance();
    }

    // Gettery i settery
}
