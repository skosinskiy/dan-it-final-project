package com.danit.finalproject.application.entity;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

@Entity
@Table(name = "chat_messages")
@Data
@NoArgsConstructor
public class ChatMessage extends BaseEntity {

  @Column(name = "message")
  private String message;

  @ManyToOne
  @JoinColumn(name = "user_id")
  private User user;

  @ManyToOne
  @JoinColumn(name = "chat_id")
  @ToString.Exclude
  private Chat chat;

}
