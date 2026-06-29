-- ============================================================
--  Frenkel & Llopis Propiedades — Estructura de la base de datos
--  Se ejecuta con:  npm run db:setup
--  (recrea las tablas desde cero y carga datos de ejemplo)
-- ============================================================

-- Borramos las tablas si ya existen para poder recrear todo desde cero
DROP TABLE IF EXISTS propiedades CASCADE;
DROP TABLE IF EXISTS usuarios CASCADE;

-- ---------- Tabla de usuarios (TP4: autenticación) ----------
CREATE TABLE usuarios (
    id          SERIAL PRIMARY KEY,
    nombre      VARCHAR(100) NOT NULL,
    email       VARCHAR(150) UNIQUE NOT NULL,
    password    VARCHAR(255) NOT NULL,         -- se guarda HASHEADA (bcrypt), nunca en texto plano
    rol         VARCHAR(20)  NOT NULL DEFAULT 'admin',
    creado_en   TIMESTAMP    NOT NULL DEFAULT NOW()
);

-- ---------- Tabla de propiedades (TP3: CRUD) ----------
CREATE TABLE propiedades (
    id          SERIAL PRIMARY KEY,
    title       VARCHAR(150) NOT NULL,
    type        VARCHAR(50)  NOT NULL,         -- casa, departamento, ph, terreno
    operation   VARCHAR(50)  NOT NULL,         -- venta, alquiler
    price       NUMERIC(12,2) NOT NULL,
    address     VARCHAR(200),
    bedrooms    INTEGER DEFAULT 0,
    bathrooms   INTEGER DEFAULT 0,
    size        NUMERIC(10,2) DEFAULT 0,
    image       VARCHAR(255)
);

-- ---------- Datos de ejemplo ----------
INSERT INTO propiedades (title, type, operation, price, address, bedrooms, bathrooms, size, image) VALUES
('Casa moderna con jardín',      'casa',          'venta',    185000, 'Av. Las Heras 1240',     3, 2, 180, 'imagenes/propiedades/Casamoderna.jpeg'),
('Casa con amplio patio',        'casa',          'venta',    142000, 'Calle Belgrano 567',     3, 1, 160, 'imagenes/propiedades/Casaconpatio.jpg'),
('Casa económica para refaccionar', 'casa',       'venta',     78000, 'Pasaje San Martín 89',   2, 1, 110, 'imagenes/propiedades/casaeconomica.jpg'),
('Casa premium con pileta',      'casa',          'venta',    320000, 'Barrio Cerrado Los Robles', 4, 3, 280, 'imagenes/propiedades/casapremium.jpg'),
('Departamento céntrico',        'departamento',  'alquiler',    450, 'Mitre 850, Piso 4',      2, 1, 65,  'imagenes/propiedades/Dptocentrico.jpg'),
('Departamento moderno a estrenar', 'departamento', 'venta',   95000, 'Rivadavia 2100, Piso 7', 2, 1, 70,  'imagenes/propiedades/Dptomoderno.jpg'),
('Monoambiente pequeño',         'departamento',  'alquiler',    280, 'Sarmiento 430, Piso 2',  1, 1, 38,  'imagenes/propiedades/dptopeuqneo.jpg'),
('Terreno amplio en zona norte', 'terreno',       'venta',     65000, 'Ruta 9 km 12',           0, 0, 600, 'imagenes/propiedades/Terrenoampplio.jpeg');
