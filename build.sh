#!/bin/bash

# Script de construcción para Netlify
echo "🚀 Iniciando construcción..."

# Limpiar cache de npm
npm cache clean --force

# Eliminar node_modules y package-lock.json para instalación limpia
echo "🧹 Limpiando instalación anterior..."
rm -rf node_modules package-lock.json

# Instalar dependencias con flags específicos
echo "📦 Instalando dependencias..."
npm install --legacy-peer-deps --include=optional

# Verificar que las dependencias se instalaron correctamente
if [ $? -ne 0 ]; then
    echo "❌ Error al instalar dependencias"
    exit 1
fi

# Instalar específicamente la dependencia de Rollup para Linux
echo "🔧 Instalando dependencias específicas de Rollup..."
npm install @rollup/rollup-linux-x64-gnu@4.9.5 --legacy-peer-deps

# Construir la aplicación
echo "🔨 Construyendo aplicación..."
npm run build

# Verificar que la construcción fue exitosa
if [ $? -ne 0 ]; then
    echo "❌ Error al construir la aplicación"
    exit 1
fi

echo "✅ Construcción completada exitosamente" 