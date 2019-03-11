package com.danit.finalproject.application.controller;

import com.danit.finalproject.application.mock.DummyUser;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;


@Controller
@RequestMapping(value = "/users")
public class UserController {

    @GetMapping("/current")
    @ResponseBody
    public String user() {
        DummyUser dummyUser = new DummyUser("trump@whitehouse.gov.us",
                "password",
                "https://upload.wikimedia.org/wikipedia/commons/thumb/5/56/Donald_Trump_official_portrait.jpg" +
                        "/330px-Donald_Trump_official_portrait.jpg",
        "Donald",
        "Trump",
                72L, true);
        ObjectMapper objectMapper = new ObjectMapper();

        try {
            return objectMapper.writeValueAsString(dummyUser);
        } catch (JsonProcessingException e) {
            return e.getMessage();
        }
    }
}