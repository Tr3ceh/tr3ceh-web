---
title: "WireGuard VPN para acceso remoto de empleados"
description: "Configura una VPN empresarial moderna con WireGuard: más rápida y segura que OpenVPN, ideal para equipos en remoto que necesitan acceso seguro a la red interna."
date: 2026-04-18
category: infraestructura
difficulty: intermedio
featured: true
tags: [wireguard, vpn, linux, acceso-remoto, infraestructura]
---

## Por qué WireGuard y no OpenVPN

WireGuard es el estándar moderno para VPN. Comparado con OpenVPN:

| | WireGuard | OpenVPN |
|---|---|---|
| Código base | ~4.000 líneas | ~70.000 líneas |
| Velocidad | Muy alta | Media |
| Configuración | Simple | Compleja |
| Auditoría de seguridad | Fácil | Difícil |
| Soporte en kernels Linux | Nativo (5.6+) | Módulo externo |

Para una empresa pequeña o mediana, WireGuard es la opción correcta.

---

## Arquitectura

```
Internet
    │
    ▼
[Servidor VPN] ← Ubuntu 22.04, IP pública
    │
    ▼
[Red interna] ← Recursos internos (NAS, servidores, BBDD)
    ▲
    │
[Empleado remoto] ← Laptop/móvil con cliente WireGuard
```

El servidor actúa como punto central. Cada empleado tiene un par de claves único.

---

## Instalación en el servidor (Ubuntu 22.04)

```bash
sudo apt update
sudo apt install wireguard -y
```

Genera el par de claves del servidor:

```bash
wg genkey | sudo tee /etc/wireguard/server_private.key | \
  wg pubkey | sudo tee /etc/wireguard/server_public.key
sudo chmod 600 /etc/wireguard/server_private.key
```

Anota ambas claves, las necesitarás en la configuración.

---

## Configuración del servidor

Crea `/etc/wireguard/wg0.conf`:

```ini
[Interface]
Address = 10.0.0.1/24
ListenPort = 51820
PrivateKey = <CLAVE_PRIVADA_SERVIDOR>

# Reenvío de tráfico hacia la red interna
PostUp = iptables -A FORWARD -i wg0 -j ACCEPT; \
         iptables -t nat -A POSTROUTING -o eth0 -j MASQUERADE
PostDown = iptables -D FORWARD -i wg0 -j ACCEPT; \
           iptables -t nat -D POSTROUTING -o eth0 -j MASQUERADE

# Empleado 1 (genera sus claves en su máquina)
[Peer]
PublicKey = <CLAVE_PUBLICA_EMPLEADO_1>
AllowedIPs = 10.0.0.2/32

# Empleado 2
[Peer]
PublicKey = <CLAVE_PUBLICA_EMPLEADO_2>
AllowedIPs = 10.0.0.3/32
```

Activa el reenvío de paquetes:

```bash
echo "net.ipv4.ip_forward=1" | sudo tee -a /etc/sysctl.conf
sudo sysctl -p
```

Inicia WireGuard:

```bash
sudo systemctl enable wg-quick@wg0
sudo systemctl start wg-quick@wg0
```

Abre el puerto en el firewall:

```bash
sudo ufw allow 51820/udp
```

---

## Configuración del cliente (empleado)

En la máquina del empleado:

```bash
# Linux/Mac
wg genkey | tee private.key | wg pubkey > public.key
```

Crea el archivo de configuración del cliente (`empleado1.conf`):

```ini
[Interface]
Address = 10.0.0.2/24
PrivateKey = <CLAVE_PRIVADA_EMPLEADO>
DNS = 1.1.1.1

[Peer]
PublicKey = <CLAVE_PUBLICA_SERVIDOR>
Endpoint = <IP_PUBLICA_SERVIDOR>:51820
AllowedIPs = 10.0.0.0/24    # Solo tráfico a la red interna
# AllowedIPs = 0.0.0.0/0    # Todo el tráfico por la VPN
PersistentKeepalive = 25
```

> Usa `AllowedIPs = 10.0.0.0/24` para split tunneling (solo la red interna va por VPN). Usa `0.0.0.0/0` si quieres que todo el tráfico del empleado pase por la VPN.

**En Windows/Mac/iOS/Android:** usa la app oficial de WireGuard e importa el `.conf` o el QR generado con:

```bash
qrencode -t ansiutf8 < empleado1.conf
```

---

## Gestión de empleados

**Añadir nuevo empleado:**
1. El empleado genera su par de claves
2. Te envía su clave pública (nunca la privada)
3. Añades un bloque `[Peer]` en `wg0.conf` con su clave pública y una IP libre
4. `sudo systemctl restart wg-quick@wg0`

**Revocar acceso:**
1. Elimina el bloque `[Peer]` correspondiente en `wg0.conf`
2. Reinicia el servicio

No hay certificados que gestionar ni CAs que mantener — cada empleado tiene su propio par de claves.

---

## Verificación

En el servidor, comprueba las conexiones activas:

```bash
sudo wg show
```

Desde el cliente, verifica que la VPN funciona:

```bash
ping 10.0.0.1          # Servidor VPN
curl ifconfig.me       # Comprueba tu IP pública
```

---

## Checklist de despliegue

- [ ] Servidor con IP pública estática o dominio DNS
- [ ] Puerto 51820/UDP abierto en el firewall
- [ ] Reenvío de paquetes activo (`ip_forward=1`)
- [ ] Par de claves único por empleado
- [ ] Proceso documentado para altas y bajas
- [ ] Backup de la configuración del servidor

---

## Costes

El servidor más barato en Hetzner o DigitalOcean cuesta **~5€/mes** y soporta perfectamente 10-20 empleados. La VPN en sí es software libre y gratuito.
