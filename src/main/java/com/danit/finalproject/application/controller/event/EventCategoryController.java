package com.danit.finalproject.application.controller.event;

import com.danit.finalproject.application.dto.request.event.EventCategoryRequest;
import com.danit.finalproject.application.dto.response.event.EventCategoryResponse;
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
  public EventCategoryResponse getEventCategoryById(@PathVariable("id") Long eventCategoryId) {
    return eventCategoryFacade.getById(eventCategoryId);
  }

  @GetMapping
  public List<EventCategoryResponse> getAllEventCategories() {
    return eventCategoryFacade.getAll();
  }

  @PostMapping
  public EventCategoryResponse createNewEventCategory(@RequestBody EventCategoryRequest eventCategoryRequest) {
    return eventCategoryFacade.create(eventCategoryRequest);
  }

  @PutMapping("{id}")
  public EventCategoryResponse updateEventCategory(
      @PathVariable Long id,
      @RequestBody EventCategoryRequest eventCategoryRequest) {
    return eventCategoryFacade.update(id, eventCategoryRequest);
  }

  @DeleteMapping("{id}")
  public EventCategoryResponse deleteEvent(@PathVariable("id") Long eventCategoryId) {
    return eventCategoryFacade.delete(eventCategoryId);
  }
}
