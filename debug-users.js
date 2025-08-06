const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
require('dotenv').config();

// Importar el modelo
const User = require('./src/domain/models/user.model');

async function diagnosticarUsuarios() {
    try {
        // Conectar a MongoDB
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('📡 Conectado a MongoDB');

        // Listar todos los usuarios
        const users = await User.find({});
        console.log('\n👥 Usuarios en la base de datos:');
        console.log('=====================================');
        
        if (users.length === 0) {
            console.log('❌ No hay usuarios en la base de datos');
            
            // Crear un usuario de prueba
            console.log('\n🔧 Creando usuario de prueba...');
            const testUser = new User({
                email: 'test@test.com',
                password: '123456',
                displayName: 'Usuario de Prueba'
            });
            
            await testUser.save();
            console.log('✅ Usuario de prueba creado: test@test.com / 123456');
        } else {
            users.forEach((user, index) => {
                console.log(`${index + 1}. Email: ${user.email}`);
                console.log(`   ID: ${user._id}`);
                console.log(`   Google User: ${user.isGoogleUser}`);
                console.log(`   Google ID: ${user.googleId || 'N/A'}`);
                console.log(`   Display Name: ${user.displayName || 'N/A'}`);
                console.log(`   Password Hash: ${user.password ? 'Sí (hash presente)' : 'No'}`);
                console.log(`   Creado: ${user.createdAt}`);
                console.log('   ---');
            });
        }

        // Probar login con el primer usuario no-Google
        const regularUser = users.find(u => !u.isGoogleUser);
        if (regularUser) {
            console.log(`\n🔍 Probando login con: ${regularUser.email}`);
            
            // Probar diferentes contraseñas comunes
            const testPasswords = ['123456', 'password', 'test', regularUser.email.split('@')[0]];
            
            for (const testPassword of testPasswords) {
                try {
                    const isValid = await regularUser.comparePassword(testPassword);
                    console.log(`   Probando "${testPassword}": ${isValid ? '✅ VÁLIDA' : '❌ Inválida'}`);
                    if (isValid) break;
                } catch (error) {
                    console.log(`   Probando "${testPassword}": ❌ Error - ${error.message}`);
                }
            }
        }

        console.log('\n📋 Resumen:');
        console.log(`- Total usuarios: ${users.length}`);
        console.log(`- Usuarios Google: ${users.filter(u => u.isGoogleUser).length}`);
        console.log(`- Usuarios regulares: ${users.filter(u => !u.isGoogleUser).length}`);

    } catch (error) {
        console.error('❌ Error:', error);
    } finally {
        await mongoose.disconnect();
        console.log('\n📡 Desconectado de MongoDB');
    }
}

// Ejecutar diagnóstico
diagnosticarUsuarios();
