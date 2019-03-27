package com.danit.finalproject.application.service;

import com.danit.finalproject.application.entity.MenuItem;
import com.danit.finalproject.application.repository.MenuItemRepository;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class MenuItemService implements CrudService<MenuItem> {

  private MenuItemRepository menuItemRepository;

  @Autowired
  public MenuItemService(MenuItemRepository menuItemRepository) {
    this.menuItemRepository = menuItemRepository;
  }

  @Override
  public List<MenuItem> getAll() {
    return menuItemRepository.findAll();
  }

  @Override
  public MenuItem update(Long menuItemId, MenuItem menuItem) {
    menuItem.setId(menuItemId);
    return menuItemRepository.save(menuItem);
  }

  @Override
  public MenuItem getById(Long id) {
    return menuItemRepository.findById(id).orElse(null);
  }

  @Override
  public MenuItem create(MenuItem entity) {
    return menuItemRepository.save(entity);
  }

  @Override
  public MenuItem delete(Long id) {
    MenuItem menuItem = menuItemRepository.findById(id).orElse(null);
    menuItemRepository.delete(menuItem);
    return menuItem;
  }
}