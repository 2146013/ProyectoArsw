package edu.escueling.arsw.proyectoArsw.controlador;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;

@Controller
public class ControlChat {
    
    @PostMapping("/index")
    public String chatForm(Model model) {
        return "redirect:/salaapuesta";
    }

    @GetMapping("/salaapuesta")
    public String salaapuesta(@RequestParam(value = "nombreusuario") String username,
                       @RequestParam(value = "sala") String room, Model model) {
        model.addAttribute("sala", room);
        model.addAttribute("nombreusuario", username);
        return "salaapuesta";
    }
    @GetMapping("/")
    public String roomForm(Model model) {
        return "/index";
    }

    @GetMapping("/index")
    public String getIndex(Model model) {
        return "/index";
    }


}
