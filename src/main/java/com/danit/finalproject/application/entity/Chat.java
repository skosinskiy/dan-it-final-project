package com.danit.finalproject.application.entity;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import javax.persistence.Column;
import javax.persistence.Entity;
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

  @ManyToMany(mappedBy = "chats")
  private List<User> users;

  @OneToMany(mappedBy = "chat")
  @ToString.Exclude
  private List<ChatMessage> chatMessages = new ArrayList<>();
}
