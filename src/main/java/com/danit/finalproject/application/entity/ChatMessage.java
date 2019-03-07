package com.danit.finalproject.application.entity;

import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Table(name = "chat_messages")
@Data
@NoArgsConstructor
public class ChatMessage extends BaseEntity{
    private String message;

    @ManyToOne
    @JoinColumn(name = "chat_id", nullable = false)
    private Chat chat;
}
