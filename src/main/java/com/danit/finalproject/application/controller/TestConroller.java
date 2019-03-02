package com.danit.finalproject.application.controller;

import com.danit.finalproject.application.error.KnownException;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
public class TestConroller {

  // TODO remove this method after implementing real
  @GetMapping("/testUnknownExc")
  @ResponseBody
  public String testUnknownExc() {
    throw new RuntimeException("UNKNOWN EXCEPTION");
  }

  @GetMapping("/testKnownExc")
  @ResponseBody
  public String testKnownExc() {
    throw new KnownException("KNOWN EXCEPTION");
  }

}
