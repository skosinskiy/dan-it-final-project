package com.danit.finalproject.application.entity;

import com.danit.finalproject.application.entity.place.Place;
import lombok.Data;
import lombok.NoArgsConstructor;
import javax.persistence.*;
import java.util.List;

@Entity
@Table(name = "users")
@Data
@NoArgsConstructor
public class User extends BaseEntity{

    private String email;
    private String password;
    private String photo;

    @Column(name = "first_name")
    private String firstName;

    @Column(name = "last_name")
    private String lastName;

    private Long age;
    private Boolean sex;

    @ManyToMany
    @JoinTable(name = "users_roles",
    joinColumns = {@JoinColumn(name = "user_id")},
    inverseJoinColumns = {@JoinColumn(name = "role_id")})
    private List<Role> roles;

    @ManyToOne
    @JoinColumn(name = "place_id")
    private Place place;

    @ManyToMany
    @JoinTable(name = "users_chats",
    joinColumns = {@JoinColumn(name = "user_id")},
    inverseJoinColumns = {@JoinColumn(name = "chat_id")})
    private List<Chat> chats;

    @OneToMany(mappedBy = "user", fetch = FetchType.LAZY)
    private List<Visit> visits;
}
