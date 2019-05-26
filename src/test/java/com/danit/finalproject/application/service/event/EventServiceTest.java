package com.danit.finalproject.application.service.event;

import com.danit.finalproject.application.entity.event.Event;
import com.danit.finalproject.application.entity.event.EventPhoto;
import com.danit.finalproject.application.repository.event.EventRepository;
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

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertNotNull;
import static org.junit.Assert.assertTrue;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

@RunWith(SpringRunner.class)
@SpringBootTest
public class EventServiceTest {

  @Autowired
  private EventService eventService;

  @MockBean
  private EventRepository eventRepository;

  @Test
  public void getAll() {
    when(eventRepository.findAll()).thenReturn(new ArrayList<>());

    List<Event> eventCategories = eventService.getAll();

    verify(eventRepository, times(1)).findAll();
    assertNotNull(eventCategories);
  }

  @Test
  public void update() {
    Long eventId = 1L;

    EventPhoto mainPhoto = new EventPhoto();
    mainPhoto.setId(1L);
    mainPhoto.setImageKey("main");
    EventPhoto eventPhoto = new EventPhoto();
    mainPhoto.setId(2L);
    eventPhoto.setImageKey("photo1");
    ArrayList<EventPhoto> eventPhotos = new ArrayList<>();
    eventPhotos.add(eventPhoto);

    Event event = new Event();

    event.setMainPhoto(mainPhoto);
    event.setPhotos(eventPhotos);

    when(eventRepository.findById(eventId)).thenReturn(Optional.of(event));

    eventService.update(eventId, event);

    ArgumentCaptor<Event> captor = ArgumentCaptor.forClass(Event.class);
    verify(eventRepository, times(1)).save(captor.capture());
    Event savedEvent = captor.getValue();

    assertEquals(2, savedEvent.getPhotos().size());
    assertTrue(savedEvent.getPhotos().stream().noneMatch(photo -> photo.getEvent() == null));
  }
}