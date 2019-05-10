package com.danit.finalproject.application.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class RootController {

  @GetMapping("admin")
  public String redirectToAdmin() {
    return "forward:/admin/index.html";
  }

  @GetMapping("screen")
  public String redirectToScreen() {
    return "forward:/screen/index.html";
  }

  @GetMapping("mobile")
  public String redirectToMobile() {
    return "forward:/mobile/index.html";
  }
}
