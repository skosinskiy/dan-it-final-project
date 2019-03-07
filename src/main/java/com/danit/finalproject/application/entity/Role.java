package com.danit.finalproject.application.entity;

import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.List;

@Entity
@Table(name = "roles")
@Data
@NoArgsConstructor
public class Role extends BaseEntity{

    private String role;

    @ManyToMany
    @JoinTable(name = "permissions_roles",
    joinColumns = {@JoinColumn(name = "role_id")},
    inverseJoinColumns = {@JoinColumn(name = "permission_id")})
    private List<Permission> permissions;

    @ManyToMany(mappedBy = "roles")
    private List<User> users;
}
