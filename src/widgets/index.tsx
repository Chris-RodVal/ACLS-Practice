import { declareIndexPlugin, type ReactRNPlugin, WidgetLocation } from '@remnote/plugin-sdk';
import '../style.css';
import '../index.css';

async function onActivate(plugin: ReactRNPlugin) {
  // 1. Registrar el Powerup que identificará al bloque de Nutrición Diaria
  await plugin.app.registerPowerup(
    'Nutrición Diaria',
    'nutrition-powerup',
    'Añade un diario de registro nutricional a este bloque.',
    {
      slots: [
        { code: 'data', name: 'Datos' }
      ]
    }
  );

  // 2. Registrar el widget para que aparezca debajo del Rem que tenga el Powerup
  await plugin.app.registerWidget(
    'nutrition_widget',
    WidgetLocation.UnderRemEditor,
    {
      dimensions: { height: 'auto', width: '100%' },
      powerupFilter: 'nutrition-powerup'
    }
  );

  // 3. Registrar el comando de barra oblicua (slash command) "/nutricion"
  await plugin.app.registerCommand({
    id: 'insert-nutrition-widget',
    name: 'Nutrición Diaria',
    description: 'Inserta el widget de registro nutricional diario',
    quickCode: 'nutricion',
    action: async () => {
      const selection = await plugin.editor.getSelection();
      let remId: string | undefined = undefined;
      if (selection) {
        if (selection.type === 'Text') {
          remId = selection.remId;
        } else if (selection.type === 'Rem') {
          remId = selection.remIds[0];
        }
      }

      if (remId) {
        const rem = await plugin.rem.findOne(remId);
        if (rem) {
          await rem.addPowerup('nutrition-powerup');
          return;
        }
      }
      await plugin.app.toast('Por favor, haz clic en un bloque de texto antes de insertar el widget.');
    }
  });

  // Mostrar mensaje de activación discreto
  await plugin.app.toast('Plugin de Nutrición Diaria activado con éxito. Escribe /nutricion para usarlo.');
}

async function onDeactivate(_: ReactRNPlugin) {}

declareIndexPlugin(onActivate, onDeactivate);
