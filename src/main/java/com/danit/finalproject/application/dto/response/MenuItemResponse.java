package com.danit.finalproject.application.dto.response;

import com.danit.finalproject.application.entity.menuitem.MenuItemName;
import lombok.Data;

@Data
public class MenuItemResponse {
  private Long id;
  private MenuItemName name;
  private String displayName;
}
