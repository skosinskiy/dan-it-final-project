package com.danit.finalproject.application.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class EmailService {

  private JavaMailSender mailSender;

  @Autowired
  public EmailService(JavaMailSender mailSender) {
    this.mailSender = mailSender;
  }

  public void sendSimpleMessage(String recipient, String subject, String text) {
    SimpleMailMessage message = new SimpleMailMessage();
    message.setTo(recipient);
    message.setSubject(subject);
    message.setText(text);
    mailSender.send(message);
  }

}
