package com.danit.finalproject.application.mock;

import com.danit.finalproject.application.entity.User;

public class DummyUser extends  User{
    private String email;
    private String password;
    private String photo;
    private String firstName;
    private String lastName;
    private Long age;
    private boolean gender;

    public DummyUser(String email, String password, String photo, String firstName, String lastName, Long age, boolean gender) {
        super();
        this.email = email;
        this.password = password;
        this.photo = photo;
        this.firstName = firstName;
        this.lastName = lastName;
        this.age = age;
        this.gender = gender;
    }

    @Override
    public String getEmail() {
        return email;
    }

    @Override
    public String getPassword() {
        return password;
    }

    @Override
    public String getPhoto() {
        return photo;
    }

    @Override
    public String getFirstName() {
        return firstName;
    }

    @Override
    public String getLastName() {
        return lastName;
    }

    @Override
    public Long getAge() {
        return age;
    }

    @Override
    public boolean isGender() {
        return gender;
    }
}
