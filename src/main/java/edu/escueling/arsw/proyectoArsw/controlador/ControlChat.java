package edu.escueling.arsw.proyectoArsw.controlador;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;

@Controller
public class ControlChat {
    @GetMapping("/")
    public String formulariosala(Model model) {
        return "/index";
    }

    @GetMapping("/index")
    public String getIndex(Model model) {
        return "/index";
    }

    @PostMapping("/index")
    public String formularioChat(Model model) {
        return "redirect:/salachat";
    }

    @GetMapping("/salachat")
    public String chat(@RequestParam(value = "user") String user,
                       @RequestParam(value = "sala") String sala, Model model) {
        model.addAttribute("sala", sala);
        model.addAttribute("user", user);
        return "salachat";
    }
}
