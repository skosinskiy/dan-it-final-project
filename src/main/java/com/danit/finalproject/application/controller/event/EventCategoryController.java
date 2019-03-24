package com.danit.finalproject.application.controller.event;

import com.danit.finalproject.application.dto.request.event.EventCategoryRequestDto;
import com.danit.finalproject.application.dto.response.event.EventCategoryResponseDto;
import com.danit.finalproject.application.facade.event.EventCategoryFacade;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("api/event-categories")
public class EventCategoryController {
  private EventCategoryFacade eventCategoryFacade;

  @Autowired
  public EventCategoryController(EventCategoryFacade eventCategoryFacade) {
    this.eventCategoryFacade = eventCategoryFacade;
  }

  @GetMapping("{id}")
  public EventCategoryResponseDto getEventCategoryById(@PathVariable("id") Long eventCategoryId) {
    return eventCategoryFacade.getById(eventCategoryId);
  }

  @GetMapping
  public List<EventCategoryResponseDto> getAllEventCategories() {
    return eventCategoryFacade.getAll();
  }

  @PostMapping
  public EventCategoryResponseDto createNewEventCategory(@RequestBody EventCategoryRequestDto eventCategoryRequestDto) {
    return eventCategoryFacade.create(eventCategoryRequestDto);
  }

  @PutMapping("{id}")
  public EventCategoryResponseDto updateEventCategory(
      @PathVariable Long id,
      @RequestBody EventCategoryRequestDto eventCategoryRequestDto) {
    return eventCategoryFacade.update(id, eventCategoryRequestDto);
  }

  @DeleteMapping("{id}")
  public EventCategoryResponseDto deleteEvent(@PathVariable("id") Long eventCategoryId) {
    return eventCategoryFacade.delete(eventCategoryId);
  }
}
