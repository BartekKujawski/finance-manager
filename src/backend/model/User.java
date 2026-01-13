package model;

public class User {
    private String username;
    private String password;
    private Balance balance;

    public User(String username, String password) {
        this.username = username;
        this.password = password;
        this.balance = new Balance();
    }

    public String getUsername() { return username; }
    public String getPassword() { return password; }
    public Balance getBalance() { return balance; }
}
