package com.danit.finalproject.application.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

@Controller
public class RootController {

  @GetMapping("admin")
  public String redirectToAdmin() {
    return "forward:/admin/index.html";
  }

  @GetMapping("admin/{path:^(?:(?!static|.html).)*$}/**")
  public String redirectToAdmin(@PathVariable String path) {
    return "forward:/admin/index.html";
  }

  @GetMapping("screen")
  public String redirectToScreen() {
    return "forward:/screen/index.html";
  }

  @GetMapping("screen/{path:^(?:(?!static|.html).)*$}/**")
  public String redirectToScreen(@PathVariable String path) {
    return "forward:/screen/index.html";
  }

  @GetMapping("mobile")
  public String redirectToMobile() {
    return "forward:/mobile/index.html";
  }

  @GetMapping("mobile/{path:^(?:(?!static|.html).)*$}/**")
  public String redirectToMobile(@PathVariable String path) {
    return "forward:/mobile/index.html";
  }
}
