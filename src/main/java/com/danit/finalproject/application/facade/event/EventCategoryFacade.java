package com.danit.finalproject.application.facade.event;

import com.danit.finalproject.application.dto.request.event.EventCategoryRequest;
import com.danit.finalproject.application.dto.response.event.EventCategoryResponse;
import com.danit.finalproject.application.entity.event.EventCategory;
import com.danit.finalproject.application.facade.AbstractDtoFacade;
import com.danit.finalproject.application.service.event.EventCategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class EventCategoryFacade
    extends AbstractDtoFacade<EventCategory, EventCategoryRequest, EventCategoryResponse> {

  private EventCategoryService eventCategoryService;

  @Autowired
  public EventCategoryFacade(EventCategoryService eventCategoryService) {
    this.eventCategoryService = eventCategoryService;
  }

  public EventCategoryResponse deleteEventCategory(Long eventCategoryId) {
    EventCategory eventCategory = eventCategoryService.getById(eventCategoryId);
    eventCategory
        .getEvents()
        .forEach(event -> event.getCategories().remove(eventCategory));
    eventCategoryService.delete(eventCategoryId);
    return mapEntityToResponseDto(eventCategory);

  }

}
