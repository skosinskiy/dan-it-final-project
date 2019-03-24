package com.danit.finalproject.application.facade.event;

import com.danit.finalproject.application.dto.request.event.EventCategoryRequestDto;
import com.danit.finalproject.application.dto.response.event.EventCategoryResponseDto;
import com.danit.finalproject.application.entity.event.EventCategory;
import com.danit.finalproject.application.facade.AbstractDtoFacade;
import org.springframework.stereotype.Component;

@Component
public class EventCategoryFacade
    extends AbstractDtoFacade<EventCategory, EventCategoryRequestDto, EventCategoryResponseDto> {
}
