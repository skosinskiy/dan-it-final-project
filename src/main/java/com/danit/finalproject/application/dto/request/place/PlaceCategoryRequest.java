package com.danit.finalproject.application.dto.request.place;

import com.danit.finalproject.application.entity.LayoutItem;
import com.danit.finalproject.application.entity.menuitem.MenuItem;
import java.util.List;
import lombok.Data;

@Data
public class PlaceCategoryRequest {
  private Long id;
  private String name;
  private boolean multisync;
  private List<MenuItem> menuItems;
  private String description;
  private List<LayoutItem> layoutItems;
}
