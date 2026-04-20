# Aplicación Web Facebook-like

Una aplicación web moderna construida con Node.js, Express, EJS y Bootstrap que simula la interfaz de Facebook con módulos de perfil, álbumes, contactos y favoritos.

## 🚀 Características

### 🎨 **Interfaz Facebook-like**
- Diseño visual inspirado en Facebook
- Colores oficiales (#1877f2 azul principal, #f0f2f5 fondo)
- Tipografía del sistema para mejor rendimiento
- Bordes redondeados y sombras suaves
- Layout responsive con sidebar izquierda y contenido central

### 📱 **Módulos Principales**
- **Inicio**: Feed con publicaciones y navegación
- **Perfil**: Información personal con avatar y descripción
- **Álbumes**: Galería de fotos con sistema de reacciones (👍 Me gusta, 💬 Comentar, 🔗 Compartir)
- **Contactos**: Lista de contactos con gestión de favoritos
- **Favoritos**: Elementos guardados con badges y categorías

### ⚡ **Funcionalidades Avanzadas**

#### 🔍 **Sistema de Búsqueda**
- Búsqueda en tiempo real con debounce (300ms)
- Filtrado inteligente por página actual
- Atajos de teclado: `Ctrl+K` para enfocar búsqueda, `Escape` para limpiar
- Indicadores visuales de resultados

#### 🔔 **Notificaciones Toast**
- Mensajes de éxito, error y información
- Animaciones de entrada/desaparición automática
- Posicionamiento fijo en esquina superior derecha
- Diseño responsive para móviles

#### ⭐ **Sistema de Favoritos**
- Agregar/quitar elementos de favoritos
- Estados visuales con íconos (⭐ estrella llena/vacía)
- Sincronización automática entre páginas
- Persistencia en memoria del servidor

#### 🎭 **Reacciones Interactivas**
- Animaciones al hacer clic en botones
- Efectos visuales (escala, colores)
- Contadores que se actualizan en tiempo real
- Feedback visual con emojis flotantes

#### 🔄 **Actualización Automática**
- Auto-refresh cada 30 segundos
- Indicadores de carga con spinners
- Estados de carga en botones
- Manejo robusto de errores

### 🛠️ **Tecnologías Utilizadas**
- **Backend**: Node.js + Express.js
- **Frontend**: EJS templates + Bootstrap 5 + Bootstrap Icons
- **Estilos**: CSS3 con animaciones y transiciones
- **JavaScript**: ES6+ con async/await y fetch API
- **Datos**: Almacenamiento en memoria (dataStore.js)

## 📁 **Estructura del Proyecto**
```
src/
├── index.js                 # Servidor principal
├── routes/
│   ├── index.routes.js      # Rutas principales
│   └── api.routes.js        # API endpoints
├── controllers/
│   ├── profileController.js # Controlador principal
│   ├── contactController.js # Gestión de contactos
│   └── albumController.js   # Gestión de favoritos
├── models/
│   └── dataStore.js         # Datos en memoria
├── views/
│   ├── components/
│   │   └── navbar.ejs       # Barra de navegación
│   └── pages/
│       └── index.ejs        # Página principal
└── public/
    ├── css/
    │   └── style.css        # Estilos Facebook-like
    ├── js/
    │   ├── ajax-handler.js  # AJAX y notificaciones
    │   └── reactions.js     # Sistema de reacciones
    └── uploads/             # Archivos subidos
```

## 🚀 **Instalación y Uso**

1. **Instalar dependencias:**
   ```bash
   npm install
   ```

2. **Iniciar servidor:**
   ```bash
   npm start
   ```

3. **Acceder a la aplicación:**
   - Abrir `http://localhost:3000` en el navegador
   - Navegar entre secciones usando la barra superior
   - Usar `Ctrl+K` para búsqueda rápida

## 🎯 **Mejoras Implementadas**

### ✅ **Verificación de Funcionalidad**
- ✅ Todas las rutas responden correctamente (200 OK)
- ✅ Archivos estáticos se sirven correctamente
- ✅ Templates EJS se renderizan sin errores
- ✅ API endpoints funcionan correctamente

### 🎨 **Mejoras Visuales**
- ✅ Diseño completamente Facebook-like
- ✅ Íconos de Bootstrap Icons en botones y navbar
- ✅ Animaciones suaves y transiciones
- ✅ Tema de colores consistente
- ✅ Layout responsive optimizado

### ⚡ **Mejoras de UX**
- ✅ Sistema de notificaciones toast
- ✅ Búsqueda en tiempo real con indicadores
- ✅ Estados de carga visuales
- ✅ Atajos de teclado intuitivos
- ✅ Auto-refresh automático
- ✅ Manejo robusto de errores

### 🔧 **Mejoras Técnicas**
- ✅ Código JavaScript modular y organizado
- ✅ Funciones utilitarias (debounce, toast, etc.)
- ✅ Event listeners optimizados
- ✅ Compatibilidad cross-browser
- ✅ Performance optimizada

## 🎮 **Controles y Atajos**

- **Navegación**: Clic en enlaces del navbar o sidebar
- **Búsqueda**: `Ctrl+K` para enfocar, escribe para filtrar
- **Limpiar búsqueda**: `Escape` cuando el input está enfocado
- **Reacciones**: Clic en botones Me gusta/Comentar/Compartir
- **Favoritos**: Clic en botones Agregar/Quitar

## 🔮 **Próximas Mejoras Sugeridas**

- [ ] Persistencia de datos (base de datos)
- [ ] Autenticación de usuarios
- [ ] Subida de imágenes reales
- [ ] Sistema de comentarios expandido
- [ ] Notificaciones push
- [ ] Modo oscuro
- [ ] PWA (Progressive Web App)

---

**¡La aplicación está completamente funcional y lista para usar!** 🎉</content>
<parameter name="filePath">README.md# TareaWed
