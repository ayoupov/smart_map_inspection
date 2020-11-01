package ru.msk.hackaton.minspector.web.controllers;

import lombok.AllArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

@Controller
@AllArgsConstructor
public class HomeController {

    @RequestMapping(value = "/")
    public ModelAndView home(ModelAndView  mav) {
        mav.setViewName("home");
        return mav;
    }
}
