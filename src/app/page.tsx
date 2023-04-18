"use client";
import { Button, FormControl, InputLabel, MenuItem, Select, Stack } from "@mui/material";
import TextField from "@mui/material/TextField";
import style from "./page.module.css";
import { useState } from "react";
import * as EmailValidator from 'email-validator';
import { cnpj as cnpjValidator } from 'cpf-cnpj-validator';
import { createPost } from "./api/api";

export default function Home() {
  const[name, setName] = useState("Nome");
  const[email, setEmail] = useState("Email");
  const[phone, setPhone] = useState("Telefone");
  const[cnpj, setCnpj] = useState("Cnpj");
  const[enterpriseName, setEnterPriseName] = useState("Nome da Empresa");
  const[city, setCity] = useState("Cidade/Estado");
  const[sector, setSector] = useState("Setor");

  function handleSubmit() {
    if (!name || name === "Nome"){
      return setName('');
    }

    const emailValidator = EmailValidator.validate(email);
    if(!emailValidator || !email ){
      return setEmail("");
    }

    if (phone.length !== 11 || !phone || phone === "Telefone"){
      return setPhone("");
    }

    const cnpjValidate = cnpjValidator.isValid(cnpj) ;
    if (!cnpjValidate || !cnpj ){
      return setCnpj("");
    }

    if(!enterpriseName || enterpriseName === "Nome da Empresa"){
      return setEnterPriseName("");
    }

    if(!city || city === "Cidade/Estado"){
      return setCity("");
    }

    if(!sector || sector === "Setor"){
      return setSector("");
    }

    const data = { name, email, phone, cnpj, enterpriseName, city, sector }
    return createPost(data)
  }

  return (
    <div className={style.maxWidth}>
      <Stack
      component="form"
      sx={{
        width: '22%',
        height:'77%'
      }}
      spacing={1}
      noValidate
      autoComplete="off"
      display="flex"
      alignItems="center"
      justifyContent="center"
      bgcolor={"white"}
      borderRadius={2}
      >
        <TextField id="filled-basic" label="Nome" variant="filled" error={!name?true:false} required={!name?true:false} onChange={(e) => setName(e.target.value)} />
        <TextField id="filled-basic" label="Email" variant="filled" error={!email?true:false} required={!email?true:false} onChange={(e) => setEmail(e.target.value)} type="email"/>
        <TextField id="filled-basic" label="Telefone" variant="filled" error={!phone?true:false} required={!phone?true:false} onChange={(e) => setPhone(e.target.value)} type="tel"/>
        <TextField id="filled-basic" label="CNPJ" variant="filled" onChange={(e) => setCnpj(e.target.value)} error={!cnpj?true:false} required={!cnpj?true:false} type="number"/>
        <TextField id="filled-basic" label="Nome da Empresa" variant="filled" error={!enterpriseName?true:false} required={!enterpriseName?true:false} onChange={(e) => setEnterPriseName(e.target.value)}/>
        <TextField id="filled-basic" label="Cidade/Estado" variant="filled" error={!email?true:false} required={!email?true:false} onChange={(e) => setCity(e.target.value)}/>

      <FormControl sx={{ m: 1, width: 230 }}>
        <InputLabel id="demo-simple-select-label">Setor</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={sector}
          label="Setor"
          error={!sector?true:false} required={!sector?true:false}
          onChange={(e) => setSector(e.target.value as string)}
>
            <MenuItem value={"Utilidades Domesticas"}>Utilidades Domesticas</MenuItem>
            <MenuItem value={"Brinquedos"}>Brinquedos</MenuItem>
            <MenuItem value={"Puericultura"}>Puericultura</MenuItem>
            <MenuItem value={"Festas"}>Festas</MenuItem>
            <MenuItem value={"Descartaveis"}>Descartaveis</MenuItem>
            <MenuItem value={"Variedades"}>Variedades</MenuItem>
            <MenuItem value={"Decoração"}>Decoração</MenuItem>
            <MenuItem value={"Moda"}>Moda</MenuItem>
            <MenuItem value={"Confecções"}>Confecções</MenuItem>
            <MenuItem value={"Calçados"}>Calçados</MenuItem>
            <MenuItem value={"Outro"}>Outro</MenuItem>
        </Select>
      </FormControl>
      <Button variant="contained" onClick={handleSubmit} > Cadastrar</Button>
      </Stack>
    </div>
  )
}
