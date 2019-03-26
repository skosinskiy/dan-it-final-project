package com.danit.finalproject.application.facade;

import com.danit.finalproject.application.dto.request.MenuItemRequest;
import com.danit.finalproject.application.dto.response.MenuItemResponse;
import com.danit.finalproject.application.entity.MenuItem;
import org.springframework.stereotype.Component;

@Component
public class MenuItemFacade extends AbstractDtoFacade<MenuItem, MenuItemRequest, MenuItemResponse> {
}
