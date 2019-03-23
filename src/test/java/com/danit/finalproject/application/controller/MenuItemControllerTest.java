package com.danit.finalproject.application.controller;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertNotEquals;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.put;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import com.danit.finalproject.application.entity.MenuItem;
import com.danit.finalproject.application.service.MenuItemService;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.List;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.transaction.annotation.Transactional;

@RunWith(SpringRunner.class)
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.MOCK)
@AutoConfigureMockMvc
@Transactional
public class MenuItemControllerTest {

  @Autowired
  private MockMvc mockMvc;

  @Autowired
  private MenuItemService menuItemService;

  @Autowired
  private ObjectMapper objectMapper;

  private MenuItem mockMenuItem1;
  private MenuItem mockMenuItem2;

  @Before
  public void initMenuItemMocks() throws ParseException {
    final String MOCK_NAME_1 = "Shops";
    final String MOCK_DISPLAY_NAME_1 = "The Bazar";
    final String MOCK_NAME_2 = "Restaurants";
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
  public void getAllMenuItems() throws Exception {
    final int EXPECTED_MENU_ITEMS_SIZE = 2;
    List<MenuItem> menuItems = objectMapper.readValue(
        mockMvc.perform(get("/api/menu-items/"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8))
            .andReturn()
            .getResponse()
            .getContentAsString(),
        new TypeReference<List<MenuItem>>() {}
    );
    assertEquals(EXPECTED_MENU_ITEMS_SIZE, menuItems.size());
    assertEquals(mockMenuItem1, menuItems.get(0));
    assertNotEquals(mockMenuItem2, menuItems.get(0));
  }

  @Test
  public void updateMenuItem() throws Exception {
    final String NEW_DISPLAY_NAME = "Marketplace";
    final Long MENU_ITEM_ID = 1L;
    mockMenuItem1.setDisplayName(NEW_DISPLAY_NAME);
    String responseBody = mockMvc.perform(
        put("/api/menu-items/" + MENU_ITEM_ID)
            .content(objectMapper.writeValueAsString(mockMenuItem1))
            .contentType(MediaType.APPLICATION_JSON))
        .andExpect(status().isOk())
        .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8))
        .andReturn()
        .getResponse()
        .getContentAsString();
    MenuItem updatedMenuItem = objectMapper.readValue(responseBody, MenuItem.class);
    assertEquals(NEW_DISPLAY_NAME, updatedMenuItem.getDisplayName());
    assertEquals(NEW_DISPLAY_NAME, menuItemService.getAllMenuItems().get(0).getDisplayName());
  }

}