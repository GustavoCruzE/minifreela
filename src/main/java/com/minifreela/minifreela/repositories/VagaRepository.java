package com.minifreela.minifreela.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.minifreela.minifreela.models.Vaga;
import com.minifreela.minifreela.models.Usuario;

@Repository
public interface VagaRepository extends JpaRepository<Vaga, Long> {

    List<Vaga> findByCandidatosContaining(Usuario usuario);

    List<Vaga> findByLocalContainingIgnoreCase(String local);

    List<Vaga> findByTecnologiasContainingIgnoreCase(String tecnologia);

    List<Vaga> findByEmpresaId_Id(Long empresaId);

}
