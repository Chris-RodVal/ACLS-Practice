/**
 * E-Sword Bible Integration Plugin - Entry Point
 * 
 * Registra widgets, comandos y configuraciones del plugin.
 */

import { declareIndexPlugin, ReactRNPlugin, WidgetLocation } from '@remnote/plugin-sdk';

async function onActivate(plugin: ReactRNPlugin) {
  // ---- Settings ----
  await plugin.settings.registerStringSetting({
    id: 'bridge-url',
    title: 'URL del Bridge Server',
    description: 'URL del servidor bridge local de E-Sword (por defecto: http://localhost:52914)',
    defaultValue: 'http://localhost:52914',
  });

  // ---- Widgets ----

  // Widget popup flotante principal (versiones comparativas, comentarios, diccionarios)
  await plugin.app.registerWidget('bible_popup', WidgetLocation.FloatingWidget, {
    dimensions: { width: 720, height: 'auto' },
  });

  // Widget del sidebar derecho (estado, módulos disponibles, búsqueda rápida)
  await plugin.app.registerWidget('esword_sidebar', WidgetLocation.RightSidebar, {
    dimensions: { height: 'auto', width: '100%' },
    widgetTabTitle: '📖 E-Sword',
    widgetTabIcon: 'https://img.icons8.com/fluency/48/holy-bible.png',
  });

  // ---- Commands ----

  // Función auxiliar para extraer texto de la selección
  async function extractSelectedText(): Promise<string> {
    const sel = await plugin.editor.getSelectedText();
    if (!sel) return '';
    const rich = (sel as any).richText || sel;
    if (Array.isArray(rich)) {
      return await plugin.richText.toString(rich);
    } else if (typeof (sel as any).text === 'string') {
      return (sel as any).text;
    }
    return '';
  }

  // Comando: Buscar referencia bíblica (Omnibar / slash)
  await plugin.app.registerCommand({
    id: 'esword-lookup',
    name: 'E-Sword: Buscar referencia bíblica',
    description: 'Abre la vista comparativa para una referencia bíblica',
    keywords: 'bible, biblia, esword, versiculo, pasaje, comparar, cita',
    quickCode: 'bible',
    action: async () => {
      const refText = await extractSelectedText();
      
      // Guardar la referencia en session storage para que el popup la lea
      await plugin.storage.setSession('pendingReference', refText || '');
      await plugin.storage.setSession('popupTrigger', Date.now());
      
      // Abrir el popup flotante
      await plugin.window.openFloatingWidget('bible_popup', {
        top: 100,
        left: Math.max(100, (window.innerWidth - 720) / 2),
      });
    },
  });

  // Comando: Buscar en diccionario
  await plugin.app.registerCommand({
    id: 'esword-dictionary',
    name: 'E-Sword: Buscar en diccionario multiléxico',
    description: 'Busca una palabra en los diccionarios de E-Sword',
    keywords: 'dict, diccionario, dictionary, lexico, strong, palabra, esword',
    quickCode: 'dict',
    action: async () => {
      const searchText = await extractSelectedText();

      await plugin.storage.setSession('pendingReference', searchText || '');
      await plugin.storage.setSession('popupTab', 'dictionary');
      await plugin.storage.setSession('popupTrigger', Date.now());

      await plugin.window.openFloatingWidget('bible_popup', {
        top: 100,
        left: Math.max(100, (window.innerWidth - 720) / 2),
      });
    },
  });

  // Comando: Buscar comentario
  await plugin.app.registerCommand({
    id: 'esword-commentary',
    name: 'E-Sword: Ver comentarios',
    description: 'Muestra los comentarios disponibles para una referencia bíblica',
    keywords: 'comm, comentario, comentarios, commentary, esword, biblia',
    quickCode: 'comm',
    action: async () => {
      const refText = await extractSelectedText();

      await plugin.storage.setSession('pendingReference', refText || '');
      await plugin.storage.setSession('popupTab', 'commentary');
      await plugin.storage.setSession('popupTrigger', Date.now());

      await plugin.window.openFloatingWidget('bible_popup', {
        top: 100,
        left: Math.max(100, (window.innerWidth - 720) / 2),
      });
    },
  });

  // Comando: Buscar número Strong
  await plugin.app.registerCommand({
    id: 'esword-strongs',
    name: 'E-Sword: Buscar número Strong',
    description: 'Busca un número Strong (H0001, G3056) en los léxicos',
    keywords: 'strong, hebreo, griego, lexico, esword, biblia',
    quickCode: 'strong',
    action: async () => {
      const searchText = await extractSelectedText();

      await plugin.storage.setSession('pendingReference', searchText || '');
      await plugin.storage.setSession('popupTab', 'dictionary');
      await plugin.storage.setSession('popupTrigger', Date.now());

      await plugin.window.openFloatingWidget('bible_popup', {
        top: 100,
        left: Math.max(100, (window.innerWidth - 720) / 2),
      });
    },
  });

  console.log('📖 E-Sword Bible Integration Plugin activated');
}

async function onDeactivate(_plugin: ReactRNPlugin) {
  console.log('📖 E-Sword Bible Integration Plugin deactivated');
}

declareIndexPlugin(onActivate, onDeactivate);
