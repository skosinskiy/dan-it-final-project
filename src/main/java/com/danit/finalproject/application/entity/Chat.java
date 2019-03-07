package com.danit.finalproject.application.entity;

import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.List;

@Entity
@Table(name = "chats")
@Data
@NoArgsConstructor
public class Chat extends BaseEntity {
    private String name;

    @ManyToMany(mappedBy = "chats")
    private List<User> users;

    @OneToMany(mappedBy = "chat", fetch = FetchType.LAZY)
    private List<ChatMessage> chatMessages;
}
