package com.danit.finalproject.application.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
public class TestConroller {

  // TODO remove this method after implementing real
  @GetMapping("/test")
  @ResponseBody
  public String doStuff() {
    throw new RuntimeException("TEST EXCEPTION");
  }

}
