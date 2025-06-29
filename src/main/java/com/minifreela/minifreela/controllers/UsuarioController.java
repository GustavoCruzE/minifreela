package com.minifreela.minifreela.controllers;

import java.time.LocalDate;
import java.time.Period;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.minifreela.minifreela.models.Usuario;
import com.minifreela.minifreela.repositories.UsuarioRepository;


// UsuarioController (apenas ajustes pontuais)
@RestController
@RequestMapping("/api/usuarios")
public class UsuarioController {

    @Autowired
    private UsuarioRepository usuarioRepository;

    @GetMapping
    public List<Usuario> listarUsuarios() {
        return usuarioRepository.findAll();
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public Usuario criarUsuario(@RequestBody Usuario usuario) {
        LocalDate hoje = LocalDate.now();
        LocalDate dataNascimento = usuario.getDataDeNascimento();

        if (dataNascimento == null) {
            throw new IllegalArgumentException("Data de nascimento é obrigatória.");
        }

        int idade = Period.between(dataNascimento, hoje).getYears();

        if (idade < 18) {
            throw new IllegalArgumentException("O usuário precisa ter pelo menos 18 anos.");
        }

        return usuarioRepository.save(usuario);
}


    @PostMapping("/login")
    public ResponseEntity<?> loginUsuario(@RequestBody Usuario usuarioLogin) {
        Optional<Usuario> usuarioOptional = usuarioRepository.findByEmail(usuarioLogin.getEmail());

        if (usuarioOptional.isPresent()) {
            Usuario usuario = usuarioOptional.get();
            if (usuario.getSenha().equals(usuarioLogin.getSenha())) {
                Map<String, Object> resposta = new HashMap<>();
                resposta.put("id", usuario.getId());
                resposta.put("nome", usuario.getNome());
                resposta.put("mensagem", "Login de usuário bem-sucedido!");

                return ResponseEntity.ok(resposta);
            } else {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Senha incorreta.");
            }
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Email não encontrado.");
        }
}


}

