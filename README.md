# CiberRetos

Plataforma educativa de evaluación de la competencia digital mediante retos gamificados para alumnado de Educación Secundaria Obligatoria (ESO).

El sistema permite realizar diferentes itinerarios de retos para 1.º, 2.º, 3.º y 4.º de ESO, registrar automáticamente las métricas generadas durante las sesiones y consultar posteriormente los resultados desde un panel destinado al profesorado.

El proyecto está diseñado para facilitar su utilización en un entorno educativo y proporcionar un sistema reproducible para la realización de las pruebas descritas en el Trabajo Fin de Máster (TFM).

---
## Versión estable y publicación en Zenodo

La versión estable del sistema utilizada como referencia en el Trabajo Fin
de Máster es la `v1.0.0`.

Esta versión ha sido publicada como Release estable en GitHub y archivada
en Zenodo para garantizar su conservación y facilitar la reproducibilidad
y citación del software.

DOI: https://doi.org/10.5281/zenodo.22143741

Referencia bibliográfica:

soniapalomo. (2026). *soniapalomo/Ciberretos: CiberRetos v1.0.0 —
Release estable (Version v1.0.0)* [Computer software]. Zenodo.

---

## 1. Descripción del proyecto

CiberRetos es una plataforma web orientada a la evaluación de competencias digitales mediante actividades contextualizadas en situaciones relacionadas con la vida cotidiana y el uso seguro de la tecnología.

El alumnado puede acceder a un itinerario correspondiente a su curso y resolver los retos de forma progresiva. Durante la realización de las actividades, la plataforma registra diferentes indicadores relacionados con el proceso de resolución.

El sistema incorpora:

- Retos diferenciados para 1.º, 2.º, 3.º y 4.º de ESO.
- Actividades de diferentes categorías de competencia digital.
- Pistas de ayuda durante la resolución.
- Retroalimentación después de las respuestas.
- Registro de intentos.
- Registro del tiempo empleado.
- Registro del nivel de confianza indicado por el alumnado.
- Registro de errores.
- Sistema de estrellas.
- Panel específico para el profesorado.
- Consulta de sesiones de evaluación.
- Consulta detallada de los retos realizados.
- Exportación de resultados en formato CSV.
- Almacenamiento de las métricas.
- Ejecución mediante Docker para facilitar la reproducción del sistema.

---

## 2. Estructura de los itinerarios

La plataforma incorpora cuatro itinerarios educativos:

| Curso | Itinerario | Número de retos |
|---|---|---:|
| 1.º ESO | Identidad Digital y Primeros Pasos | 6 |
| 2.º ESO | Amenazas, Malware y Red | 5 |
| 3.º ESO | Ingeniería Social, criptografía y análisis forense | 5 |
| 4.º ESO | Hacking ético y Seguridad Web | 5 |

Cada reto contiene la información necesaria para su resolución y puede incluir diferentes tipos de recursos, como imágenes, enlaces, simuladores o elementos interactivos.

La estructura de cada actividad puede incluir:

- título;
- narrativa o contexto;
- enunciado;
- categoría de competencia digital;
- recursos necesarios;
- respuesta o flag;
- pistas;
- retroalimentación;
- errores comunes;
- métricas asociadas a la resolución.

Algunos retos utilizan recursos gráficos almacenados en la carpeta `uploads/`.

Las imágenes utilizadas en los retos pueden ampliarse haciendo clic sobre ellas para facilitar su visualización.

---

## 3. Requisitos

### Opción recomendada: Docker

Para ejecutar la aplicación mediante Docker se necesita:

- Docker instalado y funcionando.
- Git, si se desea clonar el repositorio.

No es necesario instalar Node.js en el equipo cuando se utiliza Docker.

### Ejecución sin Docker

También es posible ejecutar el proyecto directamente mediante Node.js.

En este caso se necesita:

- Node.js.
- npm.

La aplicación utiliza un servidor HTTP implementado en Node.js y no requiere un sistema gestor de bases de datos externo.

---

## 4. Estructura del repositorio

La estructura principal del proyecto es la siguiente:

```text
ciberretos-docker/
├── data/
│   └── metrics.json
├── uploads/
│   ├── 1eso_reto3/
│   ├── 60c68994c0e4e3547ed90daf169cd64f/
│   ├── 8546791c85b5e00cb71bb95d3b22e3bc/
│   └── a7a30b5fb9e5064ef9ad7510f34a2a35/
├── .dockerignore
├── .gitignore
├── Dockerfile
├── datos_sinteticos_resumen.md
├── index.html
├── package.json
├── README.md
└── server.js
```

### Principales archivos

#### `index.html`

Contiene la interfaz de la plataforma, los itinerarios, los retos, las pistas, la retroalimentación, el registro de las métricas y la interfaz del panel docente.

#### `server.js`

Implementa el servidor HTTP utilizado por la aplicación.

Entre sus funciones se encuentran:

- servir la aplicación web;
- gestionar las peticiones de métricas;
- almacenar las sesiones;
- recuperar las sesiones registradas;
- eliminar los datos almacenados;
- gestionar la autenticación del panel docente mediante la variable de entorno `TEACHER_PASSWORD`.

#### `Dockerfile`

Define la imagen Docker utilizada para ejecutar la aplicación.

#### `data/metrics.json`

Archivo utilizado para almacenar las métricas de las sesiones registradas.

En el repositorio se incluye un conjunto de datos sintéticos de demostración para facilitar la comprobación del funcionamiento del panel docente.

#### `uploads/`

Contiene los recursos gráficos utilizados por determinados retos.

#### `datos_sinteticos_resumen.md`

Documento descriptivo del conjunto de datos sintéticos incluido para la demostración y reproducción del funcionamiento de la plataforma.

---

## 5. Ejecución mediante Docker

La forma recomendada de reproducir el sistema es mediante Docker.

### 5.1. Construcción de la imagen

Desde la carpeta raíz del proyecto:

```bash
docker build -t ciberretos .
```

### 5.2. Ejecución

En PowerShell de Windows:

```powershell
docker run --name ciberretos -p 8080:8080 -e TEACHER_PASSWORD=Panel_docente2026 -v "${PWD}\data:/app/data" ciberretos
```

En sistemas Linux o macOS:

```bash
docker run --name ciberretos -p 8080:8080 -e TEACHER_PASSWORD=Panel_docente2026 -v "$(pwd)/data:/app/data" ciberretos
```

La aplicación quedará disponible en:

```text
http://localhost:8080
```

### 5.3. Detener la aplicación

Para detener el contenedor:

```bash
docker stop ciberretos
```

Para volver a iniciarlo:

```bash
docker start ciberretos
```

Para eliminar el contenedor:

```bash
docker rm ciberretos
```

Si se modifica el código de la aplicación, es necesario reconstruir la imagen antes de crear un nuevo contenedor:

```bash
docker build -t ciberretos .
```

---

## 6. Configuración de la contraseña del panel docente

El acceso al panel docente está protegido mediante una contraseña que se configura mediante la variable de entorno:

```text
TEACHER_PASSWORD
```

La contraseña no está almacenada directamente en `index.html`.

Para la versión de demostración utilizada en la reproducción del TFM se utiliza:

```text
Panel_docente2026
```

Por tanto, el comando de ejecución de demostración es:

```powershell
docker run --name ciberretos -p 8080:8080 -e TEACHER_PASSWORD=Panel_docente2026 -v "${PWD}\data:/app/data" ciberretos
```

Cada instalación puede utilizar una contraseña diferente. Por ejemplo:

```powershell
docker run --name ciberretos -p 8080:8080 -e TEACHER_PASSWORD=MiClavePersonal -v "${PWD}\data:/app/data" ciberretos
```

En ese caso, la contraseña utilizada para acceder al panel docente será:

```text
MiClavePersonal
```

La contraseña incluida en este README es únicamente una credencial de demostración para facilitar la reproducción de la versión del TFM y no debe considerarse una credencial destinada a un entorno de producción.

---

## 7. Acceso a la plataforma

Una vez iniciado el contenedor, se puede acceder desde:

```text
http://localhost:8080
```

Desde la pantalla principal se puede seleccionar el itinerario correspondiente al curso:

- 1.º ESO.
- 2.º ESO.
- 3.º ESO.
- 4.º ESO.

El alumnado puede comenzar la evaluación sin necesidad de crear una cuenta ni introducir datos personales identificativos.

---

## 8. Uso en una red local

La plataforma también puede utilizarse desde diferentes equipos conectados a la misma red local.

Si Docker se ejecuta en el ordenador del profesor, los demás equipos pueden acceder utilizando la dirección IP de dicho ordenador:

```text
http://IP_DEL_PROFESOR:8080
```

Por ejemplo:

```text
http://192.168.1.50:8080
```

La dirección IP concreta dependerá de la configuración de la red utilizada durante la ejecución.

---

## 9. Panel docente

El panel docente permite consultar las sesiones registradas durante las evaluaciones.

El acceso se realiza desde la interfaz principal mediante la opción correspondiente al panel docente.

Para acceder a la versión de demostración se utiliza:

```text
Panel_docente2026
```

El panel permite:

- actualizar las sesiones mostradas;
- consultar el resumen global;
- consultar los resultados organizados por curso;
- consultar individualmente las sesiones;
- desplegar las sesiones para consultar los retos realizados;
- consultar métricas detalladas;
- exportar los resultados en formato CSV;
- eliminar las sesiones almacenadas.

---

## 10. Métricas registradas

Durante la realización de los retos se registran diferentes indicadores relacionados con la resolución de las actividades.

Entre ellos se encuentran:

- identificador de sesión;
- curso;
- fecha y hora de inicio;
- tiempo empleado;
- reto realizado;
- categoría del reto;
- estado de completado;
- número de estrellas;
- número de intentos;
- pistas utilizadas;
- nivel de confianza;
- errores detectados;
- tipo de error;
- información asociada a los intentos.

El registro detallado permite analizar tanto el resultado final de una actividad como el proceso seguido durante su resolución.

---

## 11. Almacenamiento de las métricas

Las métricas se almacenan en:

```text
data/metrics.json
```

El servidor mantiene este archivo como almacenamiento local de las sesiones registradas.

Cuando se utiliza Docker, se recomienda montar la carpeta `data` del proyecto como volumen:

```text
-v "${PWD}\data:/app/data"
```

De esta forma, el archivo `metrics.json` permanece en la carpeta del proyecto y los datos no dependen del ciclo de vida del contenedor.

El archivo incluido en el repositorio contiene datos sintéticos de demostración para permitir comprobar el funcionamiento del panel docente sin utilizar datos personales identificables del alumnado.

---

## 12. Datos sintéticos

Los datos incluidos en:

```text
data/metrics.json
```

son datos sintéticos destinados exclusivamente a la demostración y reproducción del sistema.

No se incluyen nombres, identificadores personales ni otros datos que permitan identificar al alumnado.

El archivo:

```text
datos_sinteticos_resumen.md
```

proporciona información adicional sobre el conjunto de datos utilizado para la demostración.

Los datos sintéticos permiten iniciar la aplicación y consultar el panel docente con información ya registrada, sin necesidad de realizar previamente una sesión completa de evaluación.

---

## 13. Ejecución de una prueba desde cero

Para comprobar el funcionamiento de la plataforma se puede realizar la siguiente prueba básica.

### Paso 1. Construir la imagen

```bash
docker build -t ciberretos .
```

### Paso 2. Iniciar el contenedor

En PowerShell:

```powershell
docker run --name ciberretos -p 8080:8080 -e TEACHER_PASSWORD=Panel_docente2026 -v "${PWD}\data:/app/data" ciberretos
```

### Paso 3. Abrir la plataforma

Acceder a:

```text
http://localhost:8080
```

### Paso 4. Seleccionar un itinerario

Seleccionar cualquiera de los itinerarios disponibles:

```text
1.º ESO
2.º ESO
3.º ESO
4.º ESO
```

### Paso 5. Resolver un reto

Completar una actividad siguiendo las instrucciones mostradas en pantalla.

Durante la actividad se pueden comprobar elementos como:

- pistas;
- intentos;
- retroalimentación;
- tiempo;
- nivel de confianza;
- errores;
- estrellas.

### Paso 6. Acceder al panel docente

Volver a la pantalla principal y acceder al panel docente.

Introducir:

```text
Panel_docente2026
```

### Paso 7. Comprobar las sesiones

El panel debe mostrar las sesiones registradas y permitir consultar:

- resultados generales;
- resultados por curso;
- sesiones individuales;
- detalle de los retos.

### Paso 8. Consultar el detalle

Desplegar una sesión para consultar las métricas asociadas a cada reto.

### Paso 9. Exportar los resultados

Utilizar la opción:

```text
Exportar CSV
```

para generar un archivo con los resultados registrados.

---

## 14. Exportación de resultados

El panel docente permite exportar las métricas registradas en formato CSV.

El archivo exportado puede utilizarse posteriormente con herramientas de análisis de datos como:

- Microsoft Excel;
- LibreOffice Calc;
- SPSS;
- R;
- otras herramientas compatibles con archivos CSV.

La exportación permite disponer de la información registrada en un formato tabular para facilitar el análisis posterior.

---

## 15. Recursos de los retos

Los recursos gráficos utilizados por los retos se encuentran en:

```text
uploads/
```

Esta carpeta forma parte del repositorio porque determinados retos requieren estas imágenes para poder reproducirse correctamente.

Entre los recursos incluidos se encuentran imágenes utilizadas en actividades de diferentes cursos.

Las imágenes se cargan directamente desde la aplicación y pueden ampliarse haciendo clic sobre ellas cuando se necesita una visualización de mayor tamaño.

---

## 16. Ejecución sin Docker

También puede ejecutarse la aplicación directamente mediante Node.js.

Desde la carpeta del proyecto:

```bash
npm start
```

La aplicación quedará disponible en:

```text
http://localhost:8080
```

En este modo de ejecución, las métricas se almacenan igualmente en:

```text
data/metrics.json
```

Para utilizar el panel docente es necesario establecer la variable de entorno `TEACHER_PASSWORD` antes de iniciar el servidor.

### PowerShell

```powershell
$env:TEACHER_PASSWORD="Panel_docente2026"
npm start
```

### Linux/macOS

```bash
TEACHER_PASSWORD=Panel_docente2026 npm start
```

---

## 17. Persistencia de los datos

La aplicación utiliza un archivo JSON como almacenamiento local de las métricas.

Al ejecutar Docker utilizando:

```text
-v "${PWD}\data:/app/data"
```

la carpeta `data` del proyecto queda vinculada al directorio utilizado por la aplicación dentro del contenedor.

Esto permite conservar las métricas aunque el contenedor se detenga o se elimine posteriormente, siempre que la carpeta `data` del proyecto se conserve.

---

## 18. Reproducibilidad

El proyecto se ha preparado para facilitar la reproducción del sistema presentado en el TFM.

La reproducción se basa en:

1. Obtener el código del repositorio.
2. Disponer de Docker.
3. Construir la imagen mediante el `Dockerfile`.
4. Ejecutar el contenedor.
5. Montar la carpeta `data` para conservar las métricas.
6. Utilizar los recursos incluidos en `uploads/`.
7. Acceder a la plataforma desde el navegador.
8. Comprobar la realización de los retos.
9. Acceder al panel docente.
10. Consultar y exportar las métricas.

El uso de Docker permite disponer de un entorno de ejecución homogéneo y evita tener que instalar manualmente las dependencias de Node.js para la ejecución principal.

---

## 19. Privacidad y protección de datos

El repositorio público no contiene datos personales identificables del alumnado.

Los datos incluidos en `data/metrics.json` son sintéticos y se utilizan exclusivamente para facilitar la demostración y reproducción del sistema.

No se publican registros reales asociados a nombres, identificadores personales ni otros datos que permitan identificar directamente a estudiantes.

Las imágenes y recursos incluidos en `uploads/` forman parte de los recursos necesarios para reproducir determinados retos de la plataforma.

---

## 20. Versión

La versión estable del proyecto utilizada como referencia para el TFM es:

```text
1.0.0
```

Esta versión será publicada mediante una Release del repositorio con la etiqueta:

```text
v1.0.0
```

La Release `v1.0.0` permitirá disponer de una referencia concreta y reproducible del estado del sistema presentado en el TFM.

---

## 21. Licencia y finalidad

Este repositorio se proporciona con finalidad académica y de investigación en el contexto del Trabajo Fin de Máster.

El contenido del repositorio corresponde a la implementación utilizada para desarrollar, probar y documentar la plataforma CiberRetos.
