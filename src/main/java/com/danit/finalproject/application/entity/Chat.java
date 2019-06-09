package com.danit.finalproject.application.entity;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "chats")
@Data
@NoArgsConstructor
public class Chat extends BaseEntity {

  @Column(name = "name")
  private String name;

  @ManyToMany
  @JoinTable(name = "users_chats",
      joinColumns = {@JoinColumn(name = "chat_id")},
      inverseJoinColumns = {@JoinColumn(name = "user_id")})
  @ToString.Exclude
  private List<User> users;

  @OneToMany(cascade = CascadeType.ALL)
  @JoinColumn(name = "chat_id")
  private List<ChatMessage> chatMessages = new ArrayList<>();
}
