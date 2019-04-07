package com.danit.finalproject.application.entity;

import org.springframework.security.core.GrantedAuthority;

public enum Permission implements GrantedAuthority {
  MANAGE_USER_ROLES,
  MANAGE_BUILDING_TYPES,
  MANAGE_ROLES,
  MANAGE_BUSINESS_CATEGORIES,
  MANAGE_PLACE_CATEGORIES,
  MANAGE_PLACES,
  MANAGE_BUSINESSES,
  MANAGE_EVENT_CATEGORIES,
  MANAGE_EVENTS,
  ADMIN_USER;

  @Override
  public String getAuthority() {
    return this.toString();
  }
}
