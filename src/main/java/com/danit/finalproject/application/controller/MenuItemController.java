package com.danit.finalproject.application.controller;

import com.danit.finalproject.application.entity.menuitem.MenuItem;
import com.danit.finalproject.application.service.MenuItemService;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("api/menu-items")
public class MenuItemController {

  private MenuItemService menuItemService;

  @Autowired
  public MenuItemController(MenuItemService menuItemService) {
    this.menuItemService = menuItemService;
  }

  @GetMapping
  public List<MenuItem> getAllMenuItems() {
    return menuItemService.getAllMenuItems();
  }

  @PutMapping("{menuItemId}")
  public MenuItem updateMenuItem(@PathVariable Long menuItemId, @RequestBody MenuItem menuItem) {
    return menuItemService.updateMenuItem(menuItemId, menuItem);
  }

}