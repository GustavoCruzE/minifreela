package com.minifreela.minifreela.models;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;

@Entity
@Table(name = "vagas")
public class Vaga {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", unique = true)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "empresa_id", nullable = false, updatable = false)
    @NotNull
    private Empresa empresaId;

    @ManyToMany
    @JoinTable(
    name = "vagas_usuarios",
    joinColumns = @JoinColumn(name = "vaga_id"),
    inverseJoinColumns = @JoinColumn(name = "usuario_id"))
    private List<Usuario> candidatos = new ArrayList<>();

    @ManyToOne
    @JoinColumn(name = "usuario_id")
    private Usuario usuarioId;

    @Column(name = "local", length = 100, nullable = false, unique = false)
    @NotNull
    private String local;

    @Column(name = "tecnologias", length = 100, nullable = false, unique = false)
    @NotNull
    private String tecnologias;

    @Column(name = "descricao", nullable = false, unique = false)
     @NotNull
    private String descricao;

    @Column(name = "ativa", nullable = false)
    private boolean ativa = true;

    public Vaga() {
    }

    public Vaga(Long id, Empresa empresaId, String local, String tecnologias, String descricao, boolean ativa) {
        this.id = id;
        this.empresaId = empresaId;
        this.local = local;
        this.tecnologias = tecnologias;
        this.descricao = descricao;
        this.ativa = ativa;
    }

    public Vaga(Long id, Empresa empresaId, List<Usuario> candidatos, Usuario usuarioId, String local, String tecnologias, String descricao, boolean ativa) {
        this.id = id;
        this.empresaId = empresaId;
        this.candidatos = candidatos;
        this.usuarioId = usuarioId;
        this.local = local;
        this.tecnologias = tecnologias;
        this.descricao = descricao;
        this.ativa = ativa;
    }

    public Long getId() {
        return this.id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Empresa getEmpresaId() {
        return this.empresaId;
    }

    public void setEmpresaId(Empresa empresaId) {
        this.empresaId = empresaId;
    }

    public String getLocal() {
        return this.local;
    }

    public void setLocal(String local) {
        this.local = local;
    }

    public String getTecnologias() {
        return this.tecnologias;
    }

    public void setTecnologias(String tecnologias) {
        this.tecnologias = tecnologias;
    }

    public String getDescricao() {
        return this.descricao;
    }

    public void setDescricao(String descricao) {
        this.descricao = descricao;
    }

    public boolean isAtiva() {
        return this.ativa;
    }

    public boolean getAtiva() {
        return this.ativa;
    }

    public void setAtiva(boolean ativa) {
        this.ativa = ativa;
    }

    public List<Usuario> getCandidatos() {
        return this.candidatos;
    }

    public void setCandidatos(List<Usuario> candidatos) {
        this.candidatos = candidatos;
    }

    public Usuario getUsuarioId() {
        return this.usuarioId;
    }

    public void setUsuarioId(Usuario usuarioId) {
        this.usuarioId = usuarioId;
    }
}
