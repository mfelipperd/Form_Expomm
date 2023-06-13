"use client";
import { Alert, AlertTitle, Button, FormControl, FormControlLabel, InputLabel, MenuItem, Select, Stack } from "@mui/material";
import TextField from "@mui/material/TextField";
import style from "../styles/page.module.css";
import React, { useEffect, useState } from "react";
import * as EmailValidator from 'email-validator';
import { cnpj as cnpjFormat } from 'cpf-cnpj-validator';
import { createPost } from "./api/api";
import { isValidCNPJ } from 'js-cnpj-validation'
import Image from "next/image";

declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
  }
}

export default function Home() {
  const[name, setName] = useState("Nome");
  const[email, setEmail] = useState("Email");
  const[phone, setPhone] = useState("Telefone");
  const[cnpj, setCnpj] = useState("Cnpj");
  const[enterpriseName, setEnterPriseName] = useState("Nome da Empresa");
  const[city, setCity] = useState("Cidade/Estado");
  const[sector, setSector] = useState("Setor");
  const[marketing, setMarketing] = useState("Como soube da feira?")
  const[disabled, setDisabled] = useState(true) 
  const [sucessed, setSucessed] = useState(false)
  const [isInitialized, setIsInitialized] = useState(false);

useEffect(() => {
  if (!isInitialized) {
    (function (f: any, b: any, e: any, v: any, n: any, t: any, s: any) {
      if (f.fbq) return;
      n = f.fbq = function () {
        n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments);
      };
      if (!f._fbq) {
        f._fbq = n;
      }
      n.push = n;
      n.loaded = true;
      n.version = '2.0';
      n.queue = [];
      t = b.createElement(e);
      t.async = true;
      t.src = v;
      s = b.getElementsByTagName(e)[0];
      if (s.parentNode) {
        s.parentNode.insertBefore(t, s);
      }
    })(window, document, 'script', 'https://connect.facebook.net/en_US/fbevents.js', {}, {}, {});

    setIsInitialized(true);
  }
}, [isInitialized]);

  function handleChange(e: { target: { checked: any; }; }) {

    const checked = e.target.checked;
    checked?setDisabled(false):setDisabled(true)
  }

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

    const cnpjFormated = cnpjFormat.format(cnpj);
    const isValid = isValidCNPJ(cnpjFormated);
    if (!isValid||!cnpj ){
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

    if(!marketing || marketing === "Como soube da feira?"){
      return setMarketing("");
    }
    
      if(window.fbq){
        window.fbq('track', 'Lead');
    }
    
    if (typeof window.gtag !== 'undefined') {
      window.gtag('event', 'conversion', {
        send_to: 'AW-11164998549/eJnJCO38lqMYEJW38csp',
        event_callback: function() {
        },
      });
    
    const data = { name, email, phone, cnpj, enterpriseName, city, sector, marketing }
    createPost(data);
    setSucessed(true);
  setTimeout(() => {
  window.location.href = 'https://www.expomultimix.com';
  }, 10000);
  }}

const form = <div className={style.maxWidth}>
      <Stack
      component="form"
      sx={{
        width: 380,
        height: 750
      }}
      spacing={1}
      noValidate
      autoComplete="off"
      display="flex"
      alignItems="center"
      justifyContent="center"
      bgcolor={"white"}                             
      borderRadius={2}
      marginTop={10}
      marginBottom={10}
      >
        <Image src="/logo.png" alt="logo expomm" width={80} height={80} />
        <TextField id="filled-basic" label="Nome" variant="filled" error={!name?true:false} required={!name?true:false} onChange={(e) => setName(e.target.value)} />
        <TextField id="filled-basic" label="Email" variant="filled" error={!email?true:false} required={!email?true:false} onChange={(e) => setEmail(e.target.value)} type="email"/>
        <TextField id="filled-basic" label="Telefone" variant="filled" error={!phone?true:false} required={!phone?true:false} onChange={(e) => setPhone(e.target.value)} type="tel"/>
        <TextField id="filled-basic" label="CNPJ" variant="filled" onChange={(e) => setCnpj(e.target.value)} error={!cnpj?true:false} required={!cnpj?true:false} />
        <TextField id="filled-basic" label="Nome da Empresa" variant="filled" error={!enterpriseName?true:false} required={!enterpriseName?true:false} onChange={(e) => setEnterPriseName(e.target.value)}/>
        <TextField id="filled-basic" label="Cidade/Estado" variant="filled" error={!email?true:false} required={!email?true:false} onChange={(e) => setCity(e.target.value)}/>

      <FormControl sx={{ m: 1, width: 230 }}>
        <InputLabel id="demo-simple-select-label">Setor</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={sector}
          label={sector}
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
      <FormControl sx={{ m: 1, width: 230 }}>
        <InputLabel id="marketing">Como soube da feira?</InputLabel>
        <Select
          labelId="marketing"
          id="marketing"
          value={marketing}
          label="Como soube da feira?"
          error={!marketing?true:false} required={!marketing?true:false}
          onChange={(e) => setMarketing(e.target.value as string)}
>
            <MenuItem value={"google"}>Google</MenuItem>
            <MenuItem value={"facebook"}>Facebook</MenuItem>
            <MenuItem value={"instagram"}>Instagram</MenuItem>
            <MenuItem value={"whatsapp"}>Whatsapp</MenuItem>
            <MenuItem value={"outros"}>Outros</MenuItem>
        </Select>
      </FormControl>
      <Stack
      sx={{
        width: 240,
        height: 90
      }}
      > 
        <label htmlFor="checkbox">
        <input type="checkbox" onChange={(e) => handleChange(e)}/>
        Sim, eu aceito os
        <a href="https://www.expomultimix.com/pol%C3%ADtica-de-privacidade/" target="_blank"> Termos de uso</a>
        </label>
        <Button variant="contained" onClick={handleSubmit} disabled={disabled} > Cadastrar</Button>
      </Stack>
      </Stack>

    </div>
const sucess = <div className={style.maxWidth}>
<Stack
component="form"
sx={{
  width: 380,
  height: 670
}}
spacing={1}
noValidate
autoComplete="off"
display="flex"
alignItems="center"
justifyContent="center"
bgcolor={"white"}                             
borderRadius={2}
marginTop={10}
marginBottom={10}
>
  <Stack
  sx={{
    width: 320,
  }}
  >
  <h2 className={style.title}>Inscrição confirmada com sucesso!</h2>
  <h4 className={style.title}>A confirmação da inscrição foi enviada por e-mail. Verifique sua caixa de entrada (inclusive a caixa de Spam)</h4>
  <h4 className={style.title}>Acompanhe as novidades da Expo MultiMix 2023 nas redes sociais</h4>
  
  </Stack>
  <Stack
  display={"flex"}
  alignItems={"center"}
  justifyContent={"space-evenly"}
  flexDirection={"row"}
  width={250}
  paddingBottom={5}
  >
      <a href="https://www.instagram.com/expomultimix/" target="_blank" rel="noopener noreferrer">
      <Image src="/instagram.png" alt="instagram" width={50} height={50}/>
      </a>
      <a href="https://pt-br.facebook.com/expomultimix/" target="_blank" rel="noopener noreferrer">
      <Image src="/facebook.png" alt="facebook" width={50} height={50}/>
      </a>
      <a href="https://www.linkedin.com/company/oficina-d-ideias/" target="_blank" rel="noopener noreferrer">
        <Image src="/linkedin.png" alt="linkedin"width={50} height={50}/>
      </a>
    
  </Stack>
<h3>Organização</h3>
<a href="https://oficinadideias.com/" target="_blank" rel="noopener noreferrer">
  <Image src="/oficina.png" alt="oficina d'ideias" width={150} height={80}/>
</a>

</Stack>
</div>
  return sucessed? sucess : form
}
