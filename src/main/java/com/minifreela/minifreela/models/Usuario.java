package com.minifreela.minifreela.models;

import java.time.LocalDate;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotNull;

@Entity
@Table(name = "usuarios")
public class Usuario {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", unique = true)
    private Long id;

    @Column(name = "nome", length = 255, nullable = false, unique = false)
    @NotNull
    private String nome;

    @Column(name = "email", length = 255, nullable = false, unique = true)
    @Email
    @NotNull
    private String email;

    @Column(name = "cpf", length = 15, nullable = false, unique = true)
    @NotNull
    private String cpf;

    @Column(name = "senha", length = 20, nullable = false, unique = false)
    @NotNull
    private String senha;

    @Column(name = "dataDeNascimento", length = 12, nullable = false, unique = false)
    @NotNull
    private LocalDate dataDeNascimento;

    @Column(name = "sexo", length = 1, nullable = false, unique = false)
    @NotNull
    private char sexo;

    @Column(name = "competencias", length = 255, nullable = false, unique = false)
    private String competencias;


    public Usuario() {
    }


    public Usuario(Long id, String nome, String email, String cpf, String senha, LocalDate dataDeNascimento, char sexo, String competencias) {
        this.id = id;
        this.nome = nome;
        this.email = email;
        this.cpf = cpf;
        this.senha = senha;
        this.dataDeNascimento = dataDeNascimento;
        this.sexo = sexo;
        this.competencias = competencias;
    }

    public Usuario(Long id, String nome, String email, String cpf, String senha, LocalDate dataDeNascimento, char sexo) {
        this.id = id;
        this.nome = nome;
        this.email = email;
        this.cpf = cpf;
        this.senha = senha;
        this.dataDeNascimento = dataDeNascimento;
        this.sexo = sexo;
    }

    public Long getId() {
        return this.id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNome() {
        return this.nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public String getEmail() {
        return this.email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getCpf() {
        return this.cpf;
    }

    public void setCpf(String cpf) {
        this.cpf = cpf;
    }

    public String getSenha() {
        return this.senha;
    }

    public void setSenha(String senha) {
        this.senha = senha;
    }

    public LocalDate getDataDeNascimento() {
        return this.dataDeNascimento;
    }

    public void setDataDeNascimento(LocalDate dataDeNascimento) {
        this.dataDeNascimento = dataDeNascimento;
    }

    public char getSexo() {
        return this.sexo;
    }

    public void setSexo(char sexo) {
        this.sexo = sexo;
    }

    public String getCompetencias() {
        return this.competencias;
    }

    public void setCompetencias(String competencias) {
        this.competencias = competencias;
    }
}
