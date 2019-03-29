package com.danit.finalproject.application.service;

import com.danit.finalproject.application.entity.menuitem.MenuItem;
import com.danit.finalproject.application.entity.menuitem.MenuItemName;
import com.danit.finalproject.application.repository.MenuItemRepository;
import java.util.Arrays;
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
  public MenuItem update(Long id, MenuItem entity) {
    entity.setId(id);
    return menuItemRepository.save(entity);
  }

  @Override
  public MenuItem getById(Long id) {
    return menuItemRepository.getOne(id);
  }

  @Override
  public MenuItem create(MenuItem entity) {
    return menuItemRepository.save(entity);
  }

  @Override
  public MenuItem delete(Long id) {
    MenuItem menuItem = getById(id);
    menuItemRepository.delete(menuItem);
    return menuItem;
  }

  public List<MenuItemName> getAvailableMenuItemNames() {
    return Arrays.asList(MenuItemName.values());
  }
}