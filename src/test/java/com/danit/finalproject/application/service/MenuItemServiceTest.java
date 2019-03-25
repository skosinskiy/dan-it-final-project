package com.danit.finalproject.application.service;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertNotEquals;
import static org.junit.Assert.assertTrue;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import com.danit.finalproject.application.entity.menuitem.MenuItem;
import com.danit.finalproject.application.entity.menuitem.MenuItemName;
import com.danit.finalproject.application.repository.MenuItemRepository;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.List;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.context.junit4.SpringRunner;

@RunWith(SpringRunner.class)
@SpringBootTest
public class MenuItemServiceTest {

  @Autowired
  private MenuItemService menuItemService;

  @MockBean
  private MenuItemRepository menuItemRepository;

  private MenuItem mockMenuItem1;
  private MenuItem mockMenuItem2;

  @Before
  public void initMenuItemMocks() throws ParseException {
    final MenuItemName MOCK_NAME_1 = MenuItemName.SHOPS;
    final String MOCK_DISPLAY_NAME_1 = "The Bazar";
    final MenuItemName MOCK_NAME_2 = MenuItemName.RESTAURANTS;
    final String MOCK_DISPLAY_NAME_2 = "Healthy food zone";
    final String SIMPLE_DATE_FORMAT_PATTERN = "YYYY-MM-DD hh:mm:ss";
    mockMenuItem1 = new MenuItem() {{
      setId(1L);
      setName(MOCK_NAME_1);
      setDisplayName(MOCK_DISPLAY_NAME_1);
      setCreatedDate(new SimpleDateFormat(SIMPLE_DATE_FORMAT_PATTERN)
          .parse("2019-03-21 01:15:00"));
      setModifiedDate(new SimpleDateFormat(SIMPLE_DATE_FORMAT_PATTERN)
          .parse("2019-03-21 02:55:50"));
    }};
    mockMenuItem2 = new MenuItem() {{
      setId(2L);
      setName(MOCK_NAME_2);
      setDisplayName(MOCK_DISPLAY_NAME_2);
      setCreatedDate(new SimpleDateFormat(SIMPLE_DATE_FORMAT_PATTERN)
          .parse("2019-03-22 06:25:00"));
      setModifiedDate(new SimpleDateFormat(SIMPLE_DATE_FORMAT_PATTERN)
          .parse("2019-03-22 07:05:02"));
    }};
  }

  @Test
  public void verifyFindAllCalledOnce() {
    when(menuItemRepository.findAll())
        .thenReturn(new ArrayList<MenuItem>() {{
          add(mockMenuItem1);
          add(mockMenuItem2);
        }});
    final int EXPECTED_MENU_ITEMS_SIZE = 2;
    List<MenuItem> menuItems = menuItemService.getAllMenuItems();
    verify(menuItemRepository, times(1)).findAll();
    assertEquals(EXPECTED_MENU_ITEMS_SIZE, menuItems.size());
    assertEquals(menuItemRepository.findAll().get(0), menuItems.get(0));
    assertNotEquals(menuItemRepository.findAll().get(0), menuItems.get(1));
  }

  @Test
  public void verifySaveOnUpdateCalledOnce() {
    final MenuItemName newName = MenuItemName.SERVICES;
    mockMenuItem1.setName(newName);
    when(menuItemRepository.save(mockMenuItem1)).thenReturn(mockMenuItem1);
    MenuItem updatedMenuItem = menuItemService.updateMenuItem(1L, mockMenuItem1);
    verify(menuItemRepository, times(1)).save(mockMenuItem1);
    assertEquals(newName, updatedMenuItem.getName());
  }

  @Test
  public void getAvailableMenuItemNames() {
    final ArrayList<MenuItemName> expectedMenuItemNames = new ArrayList<MenuItemName>() {{
      add(MenuItemName.KIDS);
      add(MenuItemName.RESTAURANTS);
      add(MenuItemName.SERVICES);
      add(MenuItemName.SHOPS);
      add(MenuItemName.SPORT);
    }};
    List<MenuItemName> menuItemNames = menuItemService.getAvailableMenuItemNames();
    assertTrue(expectedMenuItemNames.size() == menuItemNames.size()
        && expectedMenuItemNames.stream().allMatch(name -> menuItemNames.contains(name)));
  }
}