#!/bin/bash
# ============================================
# E-Sword × RemNote — Script de inicio rápido
# ============================================

echo ""
echo "═══════════════════════════════════════════════════"
echo "  📖 E-Sword × RemNote Plugin — Iniciando..."
echo "═══════════════════════════════════════════════════"
echo ""

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"

# Iniciar Bridge Server
echo "🚀 Iniciando Bridge Server (puerto 52914)..."
cd "$SCRIPT_DIR/bridge" && node server.js &
BRIDGE_PID=$!

sleep 1

# Iniciar Plugin Dev Server
echo "🚀 Iniciando Plugin Dev Server (puerto 8080)..."
cd "$SCRIPT_DIR/plugin" && npx vite --port 8080 &
PLUGIN_PID=$!

sleep 2

echo ""
echo "═══════════════════════════════════════════════════"
echo "  ✅ Ambos servicios están activos:"
echo "  🔗 Bridge: http://localhost:52914"
echo "  🔌 Plugin: http://localhost:8095"
echo ""
echo "  📖 Para activar en RemNote:"
echo "  1. Abre RemNote"
echo "  2. Ve a Settings (Configuración) → Plugins"
echo "  3. En la pestaña 'Build' (o Desarrollar), pulsa 'Develop from localhost'"
echo "  4. Escribe: http://localhost:8095"
echo "═══════════════════════════════════════════════════"
echo ""
echo "  Presiona Ctrl+C para detener ambos servidores."
echo ""

trap "echo ''; echo '🛑 Deteniendo servidores...'; kill $BRIDGE_PID $PLUGIN_PID 2>/dev/null; exit 0" INT TERM

wait
