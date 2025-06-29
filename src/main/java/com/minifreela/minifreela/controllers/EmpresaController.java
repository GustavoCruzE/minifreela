package com.minifreela.minifreela.controllers;

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
import org.springframework.web.bind.annotation.RestController;

import com.minifreela.minifreela.models.Empresa;
import com.minifreela.minifreela.repositories.EmpresaRepository;


@RestController
@RequestMapping("/api/empresas")
public class EmpresaController {

    @Autowired
    private EmpresaRepository empresaRepository;

    @GetMapping
    public List<Empresa> listarEmpresas() {
        return empresaRepository.findAll();
    }

    @PostMapping
    public Empresa criarEmpresa(@RequestBody Empresa empresa) {
        return empresaRepository.save(empresa);
    }

    @PostMapping("/login")
    public ResponseEntity<?> loginEmpresa(@RequestBody Empresa empresaLogin) {
        Optional<Empresa> empresaOptional = empresaRepository.findByCnpj(empresaLogin.getCnpj());

        if (empresaOptional.isPresent()) {
            Empresa empresa = empresaOptional.get();
            if (empresa.getSenha().equals(empresaLogin.getSenha())) {
                // Criando um "map" com os dados que você quer retornar
                Map<String, Object> resposta = new HashMap<>();
                resposta.put("id", empresa.getId());
                resposta.put("nome", empresa.getNome());
                resposta.put("mensagem", "Login de empresa bem-sucedido!");

                return ResponseEntity.ok(resposta);
            } else {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Senha incorreta.");
            }
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("CNPJ não encontrado.");
        }
    }


}
