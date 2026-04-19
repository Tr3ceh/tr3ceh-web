---
title: "Hardening básico de un servidor Ubuntu expuesto"
description: "Pasos concretos para reducir la superficie de ataque de un servidor Ubuntu accesible desde Internet: SSH, firewall, actualizaciones y monitorización."
date: 2026-04-18
category: seguridad
difficulty: intermedio
featured: true
tags: [ubuntu, ssh, firewall, ufw, fail2ban, linux]
---

## El problema

Un servidor Ubuntu recién instalado y expuesto a Internet es un objetivo inmediato para bots automáticos que escanean rangos de IPs buscando credenciales débiles, puertos abiertos y servicios sin parchear.

Esta guía cubre los pasos mínimos que toda empresa debería aplicar antes de poner un servidor en producción.

---

## 1. Actualizar el sistema

Lo primero, siempre:

```bash
sudo apt update && sudo apt upgrade -y
sudo apt autoremove -y
```

Activa las actualizaciones de seguridad automáticas:

```bash
sudo apt install unattended-upgrades -y
sudo dpkg-reconfigure --priority=low unattended-upgrades
```

---

## 2. Configurar SSH de forma segura

Edita `/etc/ssh/sshd_config` y aplica estos cambios:

```
# Deshabilitar login con contraseña (solo clave pública)
PasswordAuthentication no
PermitRootLogin no

# Cambiar puerto por defecto (dificulta escaneos automatizados)
Port 2222

# Limitar usuarios permitidos
AllowUsers tuusuario

# Timeout de sesión inactiva
ClientAliveInterval 300
ClientAliveCountMax 2
```

Reinicia el servicio:

```bash
sudo systemctl restart ssh
```

> **Importante:** Antes de aplicar estos cambios, asegúrate de tener tu clave pública en `~/.ssh/authorized_keys` o perderás el acceso.

---

## 3. Configurar el firewall con UFW

```bash
sudo apt install ufw -y

# Denegar todo por defecto
sudo ufw default deny incoming
sudo ufw default allow outgoing

# Permitir solo lo necesario
sudo ufw allow 2222/tcp   # SSH (tu nuevo puerto)
sudo ufw allow 80/tcp     # HTTP
sudo ufw allow 443/tcp    # HTTPS

sudo ufw enable
sudo ufw status verbose
```

---

## 4. Instalar fail2ban

Bloquea IPs que intentan fuerza bruta:

```bash
sudo apt install fail2ban -y
```

Crea `/etc/fail2ban/jail.local`:

```ini
[DEFAULT]
bantime  = 3600
findtime = 600
maxretry = 5

[sshd]
enabled = true
port    = 2222
```

```bash
sudo systemctl enable fail2ban
sudo systemctl start fail2ban
```

Comprueba los baneos activos:

```bash
sudo fail2ban-client status sshd
```

---

## 5. Monitorización básica

Instala `logwatch` para recibir resúmenes diarios por email:

```bash
sudo apt install logwatch -y
```

Para ver intentos de acceso fallidos en tiempo real:

```bash
sudo journalctl -u ssh -f
sudo tail -f /var/log/auth.log
```

---

## Checklist de verificación

- [ ] Sistema actualizado y actualizaciones automáticas activas
- [ ] SSH solo con clave pública, sin login de root
- [ ] Puerto SSH cambiado del 22 por defecto
- [ ] UFW activo, solo puertos necesarios abiertos
- [ ] fail2ban instalado y configurado
- [ ] Monitorización básica en marcha

---

## Siguiente nivel

Si tu servidor está en producción y maneja datos sensibles, el siguiente paso es añadir **auditoría de accesos** con `auditd` y considerar una herramienta de detección de intrusiones como **OSSEC** o **Wazuh**.
