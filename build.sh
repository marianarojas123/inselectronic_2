#!/bin/bash

# Script de construcción para Netlify
echo "🚀 Iniciando construcción..."

# Limpiar cache de npm
npm cache clean --force

# Instalar dependencias con flags específicos
echo "📦 Instalando dependencias..."
npm install --legacy-peer-deps --no-optional

# Verificar que las dependencias se instalaron correctamente
if [ $? -ne 0 ]; then
    echo "❌ Error al instalar dependencias"
    exit 1
fi

# Construir la aplicación
echo "🔨 Construyendo aplicación..."
npm run build

# Verificar que la construcción fue exitosa
if [ $? -ne 0 ]; then
    echo "❌ Error al construir la aplicación"
    exit 1
fi

echo "✅ Construcción completada exitosamente" 