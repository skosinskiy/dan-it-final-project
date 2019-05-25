package com.danit.finalproject.application.service.place;

import com.danit.finalproject.application.entity.User;
import com.danit.finalproject.application.entity.place.Place;
import com.danit.finalproject.application.entity.place.PlaceMessage;
import com.danit.finalproject.application.repository.place.PlaceMessageRepository;
import com.danit.finalproject.application.service.UserService;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.ArgumentCaptor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.context.junit4.SpringRunner;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import static junit.framework.TestCase.assertEquals;
import static junit.framework.TestCase.assertNull;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;
import static org.mockito.internal.verification.VerificationModeFactory.times;

@RunWith(SpringRunner.class)
@SpringBootTest
public class PlaceMessageServiceTest {

  @MockBean
  private PlaceMessageRepository placeMessageRepository;

  @MockBean
  private PlaceService placeService;

  @MockBean
  private UserService userService;

  @Autowired
  private PlaceMessageService placeMessageService;

  @Test
  public void getByIdTest() {
    Long id = 1L;

    PlaceMessage placeMessage = new PlaceMessage();
    placeMessage.setMessage("test");

    when(placeMessageRepository.findById(id)).thenReturn(Optional.of(placeMessage));

    PlaceMessage foundPlaceMessage = placeMessageService.getById(id);

    verify(placeMessageRepository, times(1)).findById(id);
    assertEquals(foundPlaceMessage, placeMessage);
  }

  @Test
  public void getAllTest() {

    PlaceMessage firstPlaceMessage = new PlaceMessage();
    firstPlaceMessage.setMessage("test1");

    PlaceMessage secondPlaceMessage = new PlaceMessage();
    secondPlaceMessage.setMessage("test2");

    ArrayList<PlaceMessage> placeMessages = new ArrayList<>();
    placeMessages.add(firstPlaceMessage);
    placeMessages.add(secondPlaceMessage);

    when(placeMessageRepository.findAll()).thenReturn(placeMessages);

    List<PlaceMessage> foundPlaceMessages = placeMessageService.getAll();

    verify(placeMessageRepository, times(1)).findAll();
    assertEquals(foundPlaceMessages, placeMessages);
  }

  @Test
  public void createTest() {
    String expectedMessage = "test";

    PlaceMessage placeMessage = new PlaceMessage();
    placeMessage.setMessage(expectedMessage);
    placeMessage.setId(1L);

    placeMessageService.create(placeMessage);

    ArgumentCaptor<PlaceMessage> captor = ArgumentCaptor.forClass(PlaceMessage.class);
    verify(placeMessageRepository, times(1)).save(captor.capture());
    PlaceMessage placeMessageToSave = captor.getValue();

    assertNull(placeMessageToSave.getId());
    assertEquals(expectedMessage, placeMessageToSave.getMessage());
  }

  @Test
  public void createForCurrentUserTest() {
    String expectedMessage = "test";
    Long placeId = 1L;

    PlaceMessage placeMessage = new PlaceMessage();
    placeMessage.setMessage(expectedMessage);
    placeMessage.setId(1L);

    User expectedUser = new User();
    Place expectedPlace = new Place();

    when(userService.getPrincipalUser()).thenReturn(expectedUser);
    when(placeService.getById(placeId)).thenReturn(expectedPlace);

    placeMessageService.create(placeMessage, placeId);

    ArgumentCaptor<PlaceMessage> captor = ArgumentCaptor.forClass(PlaceMessage.class);
    verify(placeMessageRepository, times(1)).save(captor.capture());
    PlaceMessage placeMessageToSave = captor.getValue();

    assertNull(placeMessageToSave.getId());
    assertEquals(expectedMessage, placeMessageToSave.getMessage());
    assertEquals(expectedUser, placeMessageToSave.getUser());
    assertEquals(expectedPlace, placeMessageToSave.getPlace());
  }

  @Test
  public void updateTest() {
    assertNull(placeMessageService.update(1L, new PlaceMessage()));
  }

  @Test
  public void deleteTest() {
    Long id = 1L;

    PlaceMessage placeMessage = new PlaceMessage();
    placeMessage.setMessage("test");

    when(placeMessageRepository.findById(id)).thenReturn(Optional.of(placeMessage));

    PlaceMessage deletedPlaceMessage = placeMessageService.delete(id);

    verify(placeMessageRepository, times(1)).findById(id);
    verify(placeMessageRepository, times(1)).delete(placeMessage);
    assertEquals(deletedPlaceMessage, placeMessage);
  }

  @Test
  public void getAllByNullParamTest() {
    PlaceMessage firstPlaceMessage = new PlaceMessage();
    firstPlaceMessage.setMessage("test1");

    PlaceMessage secondPlaceMessage = new PlaceMessage();
    secondPlaceMessage.setMessage("test2");

    ArrayList<PlaceMessage> placeMessages = new ArrayList<>();
    placeMessages.add(firstPlaceMessage);
    placeMessages.add(secondPlaceMessage);

    when(placeMessageRepository.findAll()).thenReturn(placeMessages);

    List<PlaceMessage> foundPlaceMessages = placeMessageService.getAllByParam(null);

    verify(placeMessageRepository, times(1)).findAll();
    assertEquals(foundPlaceMessages, placeMessages);
  }

  @Test
  public void getAllByParamTest() {
    Long placeId = 1L;

    PlaceMessage firstPlaceMessage = new PlaceMessage();
    firstPlaceMessage.setMessage("test1");

    PlaceMessage secondPlaceMessage = new PlaceMessage();
    secondPlaceMessage.setMessage("test2");

    ArrayList<PlaceMessage> placeMessages = new ArrayList<>();
    placeMessages.add(firstPlaceMessage);
    placeMessages.add(secondPlaceMessage);

    when(placeMessageRepository.findAllByPlaceId(placeId)).thenReturn(placeMessages);

    List<PlaceMessage> foundPlaceMessages = placeMessageService.getAllByParam(placeId);

    verify(placeMessageRepository, times(1)).findAllByPlaceId(placeId);
    assertEquals(foundPlaceMessages, placeMessages);
  }
}