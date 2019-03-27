package com.danit.finalproject.application.controller;

import com.danit.finalproject.application.dto.request.MenuItemRequest;
import com.danit.finalproject.application.dto.response.MenuItemResponse;
import com.danit.finalproject.application.facade.MenuItemFacade;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("api/menu-items")
public class MenuItemController {

  private MenuItemFacade menuItemFacade;

  @Autowired
  public MenuItemController(MenuItemFacade menuItemFacade) {
    this.menuItemFacade = menuItemFacade;
  }

  @GetMapping
  public ResponseEntity<List<MenuItemResponse>> getAllMenuItems() {
    return new ResponseEntity<>(menuItemFacade.getAll(), HttpStatus.OK);
  }

  @PutMapping("{menuItemId}")
  public ResponseEntity<MenuItemResponse> updateMenuItem(
      @PathVariable Long menuItemId,
      @RequestBody MenuItemRequest menuItemRequest) {
    return new ResponseEntity<>(menuItemFacade.update(menuItemId, menuItemRequest), HttpStatus.OK);
  }

}