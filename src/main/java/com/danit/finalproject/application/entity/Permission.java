package com.danit.finalproject.application.entity;

import org.springframework.security.core.GrantedAuthority;

public enum Permission implements GrantedAuthority {
  MANAGE_USER_ROLES,
  MANAGE_BUILDING_TYPES,
  MANAGE_ROLES,
  MANAGE_BUSINESS_CATEGORIES,
  MANAGE_PLACE_CATEGORIES;

  @Override
  public String getAuthority() {
    return this.toString();
  }
}
