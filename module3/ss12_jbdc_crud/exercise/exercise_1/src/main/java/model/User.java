package model;

public class User {
    private int idUser;
    private String nameUser;
    private String emailUser;
    private String countryUser;

    public User() {
    }

    public User(int idUser, String nameUser, String emailUser, String countryUser) {
        this.idUser = idUser;
        this.nameUser = nameUser;
        this.emailUser = emailUser;
        this.countryUser = countryUser;
    }

    public User(String nameUser, String emailUser, String countryUser) {
        this.nameUser = nameUser;
        this.emailUser = emailUser;
        this.countryUser = countryUser;
    }

    public int getIdUser() {
        return idUser;
    }

    public void setIdUser(int idUser) {
        this.idUser = idUser;
    }

    public String getNameUser() {
        return nameUser;
    }

    public void setNameUser(String nameUser) {
        this.nameUser = nameUser;
    }

    public String getEmailUser() {
        return emailUser;
    }

    public void setEmailUser(String emailUser) {
        this.emailUser = emailUser;
    }

    public String getCountryUser() {
        return countryUser;
    }

    public void setCountryUser(String countryUser) {
        this.countryUser = countryUser;
    }
}
