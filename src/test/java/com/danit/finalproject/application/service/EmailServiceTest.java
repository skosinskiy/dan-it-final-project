package com.danit.finalproject.application.service;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.test.context.junit4.SpringRunner;

import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;

@RunWith(SpringRunner.class)
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.MOCK)
public class EmailServiceTest {

  @Autowired
  private EmailService emailService;

  @MockBean
  private JavaMailSender mailSender;

  @Test
  public void verifyMailSenderCalledOnce() {
    String text = "test";
    String recipient = "testRecipient";
    String subject = "testSubject";
    emailService.sendSimpleMessage(recipient, subject, text);
    SimpleMailMessage message = new SimpleMailMessage();
    message.setTo(recipient);
    message.setSubject(subject);
    message.setText(text);

    verify(mailSender, times(1)).send(message);
  }
}