package com.danit.finalproject.application.dto.response.place;

import com.danit.finalproject.application.entity.menuitem.MenuItem;
import com.fasterxml.jackson.annotation.JsonIgnore;
import java.util.List;
import lombok.Data;
import lombok.ToString;

@Data
public class PlacePhotoResponse {
  private Long id;
  private String photo;
  @JsonIgnore
  @ToString.Exclude
  private PlaceResponse place;
  @JsonIgnore
  @ToString.Exclude
  private List<MenuItem> menuItems;
}
