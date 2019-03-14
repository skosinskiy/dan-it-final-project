package com.danit.finalproject.application.service.event;

import com.danit.finalproject.application.entity.event.Event;
import com.danit.finalproject.application.repository.event.EventRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class EventService {
  private EventRepository eventRepository;

  @Autowired
  public EventService(EventRepository eventRepository) {
    this.eventRepository = eventRepository;
  }

  public Event getEventById(Long id) {
    return eventRepository.getOne(id);
  }

//  public List<Business> findAllByLocation() {
//    return businessRepository.findAll();
//  }

  public Event createNewEvent(Event event) {
    return eventRepository.save(event);
  }

  public Event updateEvent(Event event) {
    return eventRepository.saveAndFlush(event);
  }

  public void deleteEvent(Long id) {
    eventRepository.deleteById(id);
  }
}
