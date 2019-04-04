package com.danit.finalproject.application.service;

import com.danit.finalproject.application.entity.Chat;
import com.danit.finalproject.application.entity.ChatMessage;
import com.danit.finalproject.application.entity.Gender;
import com.danit.finalproject.application.entity.User;
import com.danit.finalproject.application.entity.VisitAction;
import com.danit.finalproject.application.repository.ChatMessageRepository;
import com.danit.finalproject.application.repository.ChatRepository;
import com.danit.finalproject.application.repository.VisitActionRepository;
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
import static org.mockito.Mockito.*;

@RunWith(SpringRunner.class)
@SpringBootTest
public class VisitActionServiceTest {
  @Autowired
  private VisitActionService visitActionService;

  @MockBean
  protected VisitActionRepository visitActionRepository;

  private static VisitAction firstMockVisitAction;

  @Before
  public void initialChastAndMessages() throws ParseException {
    VisitAction visitAction = new VisitAction();
    visitAction.setId(1L);
    visitAction.setCreatedDate(new SimpleDateFormat("yyyy-MM-dd hh:mm:ss")
                                 .parse("2019-03-12 12:00:00"));
    visitAction.setModifiedDate(new SimpleDateFormat("yyyy-MM-dd hh:mm:ss")
                                  .parse("2019-03-12 12:01:00"));

    firstMockVisitAction = visitAction;

  }

  @Test
  public void getVisitActionById() {
    Long exprctedId = 1L;

    when(visitActionRepository.findById(exprctedId)).thenReturn(Optional.of(firstMockVisitAction));
    VisitAction visitAction = visitActionService.getById(exprctedId);

    assertEquals(exprctedId, visitAction.getId());
  }
}
