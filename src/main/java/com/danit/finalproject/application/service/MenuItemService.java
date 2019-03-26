package com.danit.finalproject.application.service;

import com.danit.finalproject.application.entity.MenuItem;
import com.danit.finalproject.application.repository.MenuItemRepository;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class MenuItemService {

  private MenuItemRepository menuItemRepository;

  @Autowired
  public MenuItemService(MenuItemRepository menuItemRepository) {
    this.menuItemRepository = menuItemRepository;
  }

  public List<MenuItem> getAllMenuItems() {
    return menuItemRepository.findAll();
  }

  public MenuItem updateMenuItem(Long menuItemId, MenuItem menuItem) {
    menuItem.setId(menuItemId);
    return menuItemRepository.save(menuItem);
  }

}