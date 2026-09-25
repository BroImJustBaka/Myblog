# Práctica 3: Componentes en Astro

**Alumno:** Santiago Becerra Arias
**Registro:** 23300648

## Marco teórico

### ¿Qué es Astro?

Astro es un framework para hacer sitios web que se enfoca en el contenido (blogs, portafolios, documentación). Su idea principal es mandar al navegador la menor cantidad posible de JavaScript: las páginas se generan en HTML estático durante el *build* y solo se envía código al cliente cuando de verdad hace falta.

### Componentes `.astro`

Un componente es un pedazo de interfaz que se puede reutilizar en varias páginas. En Astro un archivo `.astro` tiene dos partes:

- **Frontmatter (la zona entre `---`)**: es JavaScript/TypeScript que corre en tiempo de construcción, en el servidor, nunca en el navegador. Ahí se importan otros componentes, se declaran variables y se leen las propiedades recibidas.
- **Plantilla**: es HTML con expresiones entre llaves `{}`, parecido a JSX, donde se pueden usar las variables del frontmatter.

### Importar y anidar componentes

Para usar un componente se importa en el frontmatter y se escribe como etiqueta con la primera letra en mayúscula (`<Footer />`). Un componente también puede importar a otros, por lo que se forman árboles: en esta práctica `Footer` contiene varios `Social`, y `Header` contiene a `Menu` y a `Navigation`.

### Props

Las *props* son los datos que un componente padre le pasa a un hijo como atributos (`<Social plataforma="github" />`). El hijo las recibe con `Astro.props` y normalmente se desestructuran:

```
const { plataforma, usuario } = Astro.props;
```

Con esto un mismo componente sirve para muchos casos distintos.

### Estilos con alcance (scoped)

Las etiquetas `<style>` dentro de un componente Astro solo afectan a ese componente, porque Astro les agrega una clase única automáticamente. Para estilos que sí deben aplicar a todo el sitio se usa un archivo CSS global importado en las páginas.

### Diseño responsivo y *mobile-first*

Mobile-first significa escribir primero los estilos para pantallas chicas y después agregar `@media (min-width: ...)` para ajustar cuando la pantalla crece. En la práctica el menú se ve como botón de hamburguesa en celular y como una fila de enlaces en pantallas anchas.

### JavaScript en el cliente

El JavaScript del frontmatter corre en el build, pero una etiqueta `<script>` dentro de la plantilla se manda al navegador y ahí se ejecuta cuando el usuario interactúa. Astro procesa y empaqueta esos scripts, y permite importar archivos `.js` externos desde ellos, lo cual ayuda a mantener el código ordenado.

### Despliegue

El sitio se compila con `npm run build` a HTML estático en la carpeta `dist`, y se publica en Netlify conectando el repositorio de GitHub, de forma que cada push vuelve a construir el sitio.

## Desarrollo de la práctica

Se partió del blog que ya tenía páginas de inicio, sobre mí, blog y tres publicaciones en Markdown, más el componente de navegación. Se hicieron los pasos de la unidad 3 del tutorial de Astro:

1. **Footer y Social**: se creó `Footer.astro` y `Social.astro`. Social recibe `plataforma`, `usuario` y un `chiste` como props, y el Footer lo usa tres veces. El pie de página muestra el nombre y registro del autor.
2. **Header y navegación responsiva**: se creó `Header.astro` que junta `Menu` y `Navigation`. Los enlaces se esconden en celular y se muestran en pantallas de 640px o más.
3. **Primer script para el navegador**: `Menu.astro` tiene un botón de hamburguesa que, con `src/scripts/menu.js`, agrega o quita la clase `abierto` a los enlaces.
4. Las tres páginas (`index`, `about`, `blog`) usan `<Header />` arriba y `<Footer />` abajo. Además, el autor de las publicaciones cambió a Santiago Becerra Arias.

Archivos nuevos: `src/components/Footer.astro`, `Social.astro`, `Header.astro`, `Menu.astro` y `src/scripts/menu.js`.

## Lo que aprendí

Aprendí que los componentes en Astro son básicamente como funciones que regresan HTML, y que lo bonito es que puedo escribir el footer una sola vez y aparece en todas las páginas, en vez de copiar y pegar. Lo de las props me costó un poco al inicio, pero ya entendí que es como pasarle parámetros al componente, y que con `Astro.props` los "recibo" del otro lado.

También entendí (más o menos) la diferencia entre el código del frontmatter y el del `<script>`: el primero se ejecuta cuando se construye el sitio y el segundo ya se va al navegador. Me llamó la atención que el JavaScript de la parte de arriba nunca llega al cliente, eso hace que la página sea muy ligera. Lo del `<style>` con alcance también estuvo interesante, porque no tengo que preocuparme de que un estilo de un componente rompa a otro, aunque para el menú tuve que dejar los estilos de los enlaces en el CSS global porque el script les cambia la clase.

De responsivo aprendí lo del enfoque mobile-first: primero dejo todo bien para celular y ya con el `@media` lo acomodo para pantallas grandes. Y de paso vi que el `build` genera todo en HTML estático y por eso se puede subir a Netlify sin mucho problema.

## Conclusiones

La práctica me sirvió para entender cómo se organiza un proyecto en Astro: páginas por un lado, componentes reutilizables por otro y scripts aparte. Creo que la ventaja más grande es la reutilización, porque cambiar algo (como el nombre en el footer) se hace en un solo archivo. También me quedó claro que Astro trata de mandar poco JavaScript al navegador y que solo lo que necesita interactividad, como el botón del menú, lleva un `<script>`.

Todavía no domino del todo cómo se combinan estilos globales con los de cada componente ni qué pasa cuando hay muchos componentes anidados, pero con el ejercicio ya me siento más cómodo para seguir con las siguientes unidades del tutorial (layouts y contenido). Al final el sitio quedó publicado en Netlify desde el repositorio de GitHub y funciona en celular y en pantalla grande.
