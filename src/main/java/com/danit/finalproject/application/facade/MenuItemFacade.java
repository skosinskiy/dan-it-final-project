package com.danit.finalproject.application.facade;

import com.danit.finalproject.application.dto.request.place.MenuItemRequest;
import com.danit.finalproject.application.dto.response.MenuItemResponse;
import com.danit.finalproject.application.entity.menuitem.MenuItem;
import com.danit.finalproject.application.entity.menuitem.MenuItemName;
import com.danit.finalproject.application.service.MenuItemService;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class MenuItemFacade extends AbstractDtoFacade<MenuItem, MenuItemRequest, MenuItemResponse> {
  private MenuItemService menuItemService;

  @Autowired
  public MenuItemFacade(MenuItemService menuItemService) {
    this.menuItemService = menuItemService;
  }

  public List<MenuItemName> getAvailableMenuItemNames() {
    return menuItemService.getAvailableMenuItemNames();
  }
}
