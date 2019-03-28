package com.danit.finalproject.application.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToMany;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import java.util.List;

@Entity
@Table(name = "chats")
@Data
@NoArgsConstructor
public class Chat extends BaseEntity {

  @Column(name = "name")
  private String name;

  @ManyToMany(mappedBy = "chats")
  @JsonIgnore
  @ToString.Exclude
  private List<User> users;

  @OneToMany(mappedBy = "chat")
  @JsonIgnore
  @ToString.Exclude
  private List<ChatMessage> chatMessages;
}
