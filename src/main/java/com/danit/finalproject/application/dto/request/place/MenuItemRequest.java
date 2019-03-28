package com.danit.finalproject.application.dto.request.place;

import com.danit.finalproject.application.entity.menuitem.MenuItemName;
import lombok.Data;

@Data
public class MenuItemRequest {
  private Long id;
  private MenuItemName name;
  private String displayName;
}
