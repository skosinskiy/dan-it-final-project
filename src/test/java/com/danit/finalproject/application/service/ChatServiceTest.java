package com.danit.finalproject.application.service;

import com.danit.finalproject.application.entity.Chat;
import com.danit.finalproject.application.entity.ChatMessage;
import com.danit.finalproject.application.entity.Gender;
import com.danit.finalproject.application.entity.User;
import com.danit.finalproject.application.repository.ChatMessageRepository;
import com.danit.finalproject.application.repository.ChatRepository;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.context.junit4.SpringRunner;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertNull;
import static org.mockito.Mockito.*;

@RunWith(SpringRunner.class)
@SpringBootTest
public class ChatServiceTest {
  @Autowired
  private ChatService chatService;

  @MockBean
  protected ChatRepository chatRepository;

  @Autowired
  private ChatMessageRepository chatMessageRepository;

  private static Chat firtsMockChat;
  private static Chat secondMockChat;
  private static ChatMessage firstMockMessage;
  private static ChatMessage secondMockMessage;
  private static ChatMessage thirdMockMessage;
  private static ChatMessage fourthMockMessage;
  private static User firstMockUser;
  private static User secondMockUser;

  @Before
  public void initialChastAndMessages() throws ParseException {
    User firstUser = new User();
    firstUser.setId(1L);
    firstUser.setCreatedDate(new SimpleDateFormat("yyyy-MM-dd hh:mm:ss")
                                 .parse("2019-03-12 12:00:00"));
    firstUser.setModifiedDate(new SimpleDateFormat("yyyy-MM-dd hh:mm:ss")
                                  .parse("2019-03-12 12:01:00"));
    firstUser.setAge(24);
    firstUser.setEmail("first.user@test.com");
    firstUser.setFirstName("Elon");
    firstUser.setLastName("Musk");
    firstUser.setGender(Gender.MALE);
    firstUser.setToken("ddcc2361-ce4f-47bc-bf5e-fc39ca73d0e0");
    firstMockUser = firstUser;

    User secondUser = new User();
    secondUser.setId(2L);
    secondUser.setCreatedDate(new SimpleDateFormat("yyyy-MM-dd hh:mm:ss")
                                  .parse("2019-03-13 13:00:00"));
    secondUser.setModifiedDate(new SimpleDateFormat("yyyy-MM-dd hh:mm:ss")
                                   .parse("2019-03-13 13:01:00"));
    secondUser.setAge(25);
    secondUser.setEmail("first.user@test2.com");
    secondUser.setFirstName("Mark");
    secondUser.setLastName("Zuckerberg");
    secondUser.setGender(Gender.MALE);
    secondMockUser = secondUser;

    Chat chat1 = new Chat();
    chat1.setId(1L);
    chat1.setCreatedDate(new SimpleDateFormat("yyyy-MM-dd hh:mm:ss")
                             .parse("2019-03-12 12:00:00"));
    chat1.setModifiedDate(new SimpleDateFormat("yyyy-MM-dd hh:mm:ss")
                              .parse("2019-03-12 12:00:00"));
    chat1.setName("chat-1");

    Chat chat2 = new Chat();
    chat2.setId(2L);
    chat2.setCreatedDate(new SimpleDateFormat("yyyy-MM-dd hh:mm:ss")
                             .parse("2019-03-12 12:00:00"));
    chat2.setModifiedDate(new SimpleDateFormat("yyyy-MM-dd hh:mm:ss")
                              .parse("2019-03-12 12:00:00"));
    chat2.setName("chat-2");
    firtsMockChat = chat1;
    secondMockChat = chat2;

    ChatMessage chatMessage1 = new ChatMessage();
    chatMessage1.setId(1L);
    chatMessage1.setMessage("text-1");
    chatMessage1.setCreatedDate(new SimpleDateFormat("yyyy-MM-dd hh:mm:ss")
                                    .parse("2019-03-12 12:00:00"));
    chatMessage1.setModifiedDate(new SimpleDateFormat("yyyy-MM-dd hh:mm:ss")
                                     .parse("2019-03-12 12:00:00"));
    chatMessage1.setUser(firstMockUser);
    chatMessage1.setChat(firtsMockChat);

    ChatMessage chatMessage2 = new ChatMessage();
    chatMessage2.setId(2L);
    chatMessage2.setMessage("text-2");
    chatMessage2.setCreatedDate(new SimpleDateFormat("yyyy-MM-dd hh:mm:ss")
                                    .parse("2019-03-12 12:00:00"));
    chatMessage2.setModifiedDate(new SimpleDateFormat("yyyy-MM-dd hh:mm:ss")
                                     .parse("2019-03-12 12:00:00"));
    chatMessage2.setUser(secondMockUser);
    chatMessage2.setChat(firtsMockChat);

    List<ChatMessage> messages = new ArrayList<>();
    messages.add(chatMessage1);
    messages.add(chatMessage2);
    firtsMockChat.setChatMessages(messages);

    firstMockMessage = chatMessage1;
    secondMockMessage = chatMessage2;
  }

  @Test
  public void getChatByIdTest() {
    Long exprctedId = 1L;
    String expectedTitle = "chat-1";

    when(chatRepository.findById(exprctedId)).thenReturn(Optional.of(firtsMockChat));
    Chat chat = chatService.getById(exprctedId);

    assertEquals(exprctedId, chat.getId());
    assertEquals(expectedTitle, chat.getName());
  }

  @Test
  public void getAllChatsTest() {
    int exprctedSize = 2;
    List<Chat> chats = new ArrayList<>();
    chats.add(firtsMockChat);
    chats.add(secondMockChat);

    when(chatRepository.findAll()).thenReturn(chats);
    List<Chat> allChats = chatService.getAll();

    assertEquals(exprctedSize, allChats.size());
  }

  @Test
  public void createChatTest() {
    Long exprctedId = 1L;
    String expectedTitle = "chat-1";

    when(chatRepository.save(firtsMockChat)).thenReturn(firtsMockChat);
    Chat chat = chatService.create(firtsMockChat);

    assertEquals(exprctedId, chat.getId());
    assertEquals(expectedTitle, chat.getName());
  }

  @Test
  public void updateChatTest() {
    Long exprctedId = 1L;
    String expectedTitle = "chat-111";
    firtsMockChat.setName(expectedTitle);

    when(chatRepository.save(firtsMockChat)).thenReturn(firtsMockChat);
    Chat chat = chatService.update(exprctedId, firtsMockChat);

    assertEquals(exprctedId, chat.getId());
    assertEquals(expectedTitle, chat.getName());
  }

  @Test
  public void deleteChatTest() {
    when(chatRepository.findById(2L)).thenReturn(Optional.ofNullable(secondMockChat));
    chatService.delete(2L);
    verify(chatRepository, times(1)).delete(secondMockChat);
  }


  @Test
  public void createNewMessage() {
    Long expectedId = 3L;
    String expectedTitle = "text-3";
    int expectedSize = 3;
    ChatMessage chatMessage = new ChatMessage();
    chatMessage.setId(expectedId);
    chatMessage.setMessage(expectedTitle);

    when(chatRepository.findById(1L)).thenReturn(Optional.ofNullable(firtsMockChat));
    Chat chat = chatService.addNewMessage(chatMessage, 1L);

    verify(chatRepository, times(1)).save(firtsMockChat);
    assertEquals(expectedSize, chat.getChatMessages().size());
    assertEquals(expectedId, chat.getChatMessages().get(2).getId());
  }
}
