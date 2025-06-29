package com.minifreela.minifreela.controllers;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.minifreela.minifreela.models.Usuario;
import com.minifreela.minifreela.models.Vaga;
import com.minifreela.minifreela.repositories.UsuarioRepository;
import com.minifreela.minifreela.repositories.VagaRepository;

@RestController
@RequestMapping("/api/vagas")
public class VagaController {

    @Autowired
    private VagaRepository vagaRepository;

    @Autowired
    private UsuarioRepository usuarioRepository;  // <<<<< INJETANDO o repository aqui

    @GetMapping
    public List<Vaga> listarTodas() {
        return vagaRepository.findAll();
    }

    @PostMapping
    public Vaga criarVaga(@RequestBody Vaga vaga) {
        return vagaRepository.save(vaga);
    }

    @GetMapping("/empresa/{empresaId}")
    public List<Vaga> listarVagasPorEmpresa(@PathVariable Long empresaId) {
        return vagaRepository.findByEmpresaId_Id(empresaId);
    }

    @PatchMapping("/encerrar/{id}")
    public ResponseEntity<?> encerrarVaga(@PathVariable Long id) {
        Optional<Vaga> vagaOpt = vagaRepository.findById(id);
        if (!vagaOpt.isPresent()) return ResponseEntity.notFound().build();

        Vaga vaga = vagaOpt.get();
        vaga.setAtiva(false);
        vagaRepository.save(vaga);
        return ResponseEntity.ok().build();
    }

    @PutMapping("/{id}/candidatar")
    public ResponseEntity<String> candidatarUsuario(@PathVariable Long id, @RequestBody Long usuarioId) {
        Optional<Vaga> optionalVaga = vagaRepository.findById(id);
        Optional<Usuario> optionalUsuario = usuarioRepository.findById(usuarioId);

        if (optionalVaga.isPresent() && optionalUsuario.isPresent()) {
            Vaga vaga = optionalVaga.get();
            Usuario usuario = optionalUsuario.get();

            // Verificar se o usuário já está na lista de candidatos
            if (!vaga.getCandidatos().contains(usuario)) {
                vaga.getCandidatos().add(usuario);
                vagaRepository.save(vaga);
                return ResponseEntity.ok("Candidatura registrada com sucesso!");
            } else {
                return ResponseEntity.status(HttpStatus.CONFLICT).body("Usuário já está candidato nesta vaga.");
            }
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Vaga ou usuário não encontrados.");
        }
    }

    @DeleteMapping("/{vagaId}/candidatos/{usuarioId}")
    public ResponseEntity<String> removerCandidato(@PathVariable Long vagaId, @PathVariable Long usuarioId) {
        Optional<Vaga> optionalVaga = vagaRepository.findById(vagaId);
        Optional<Usuario> optionalUsuario = usuarioRepository.findById(usuarioId);

        if (!optionalVaga.isPresent() || !optionalUsuario.isPresent()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Vaga ou usuário não encontrados.");
        }

        Vaga vaga = optionalVaga.get();
        Usuario usuario = optionalUsuario.get();

        if (vaga.getCandidatos() != null && vaga.getCandidatos().contains(usuario)) {
            vaga.getCandidatos().remove(usuario);
            vagaRepository.save(vaga);
            return ResponseEntity.ok("Candidatura removida com sucesso.");
        } else {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Usuário não é candidato desta vaga.");
        }
    }

    @PutMapping("/{vagaId}/candidatos/{usuarioId}/aceitar")
    public ResponseEntity<String> aceitarCandidatura(@PathVariable Long vagaId, @PathVariable Long usuarioId) {
        Optional<Vaga> optionalVaga = vagaRepository.findById(vagaId);
        Optional<Usuario> optionalUsuario = usuarioRepository.findById(usuarioId);

        if (!optionalVaga.isPresent() || !optionalUsuario.isPresent()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Vaga ou usuário não encontrados.");
        }

        Vaga vaga = optionalVaga.get();
        Usuario usuario = optionalUsuario.get();

        if (vaga.getCandidatos() == null || !vaga.getCandidatos().contains(usuario)) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Usuário não é candidato desta vaga.");
        }

        // Define o usuário selecionado
        vaga.setUsuarioId(usuario);

        // Encerra a vaga
        vaga.setAtiva(false);

        // Opcional: limpa a lista de candidatos porque vaga foi preenchida
        vaga.getCandidatos().clear();

        vagaRepository.save(vaga);

        return ResponseEntity.ok("Candidatura aceita e vaga encerrada com sucesso.");
    }
}
