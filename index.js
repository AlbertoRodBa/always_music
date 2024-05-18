const { Pool } = require('pg')

const config = {
    host: 'localhost',
    port: 5432,
    database: 'alwaysdb',
    user: process.env.USER,
    password: process.env.PASS
  };

const pool = new Pool(config)

// 1. Insertar nuevo estudiante
const insertEstudiante  = async () => {
  const text = 'INSERT INTO estudiantes (nombre, rut, curso, nivel) VALUES ($1, $2, $3, $4)';
  const value = ['Brian May', '12.345.678-9', 'guitarra', '7' ];

  const result = await pool.query(text, value)

  console.log(result)
}
// 2. Consultar estudiante por RUT
const selectEstudiantePorRut = async (rut) => {
  const text = 'SELECT * FROM estudiantes WHERE rut = $1';
  const values = [rut];

  const result = await pool.query(text, values);

  console.log(result.rows); // Muestra filas
};


// 3. Consultar por todos los estudiantes registrados
const obtenerTodosEstudiantes = async () => {
  const query = 'SELECT * FROM estudiantes';
  const result = await pool.query(query);
  console.log('Estudiantes registrados:', result.rows);
};


// 4. Actualizar los datos de un estudiante en la base de datos
const actualizarEstudiante = async () => {
  const text = 'UPDATE estudiantes SET nivel = $1 WHERE nivel = $2';
  const values = [ '10', '7'];            // Nuevo valor por viejo valor
  const result = await pool.query(text, values);
  console.log('Datos del estudiante actualizados:', result);
};


// 5. Eliminar un estudiante

const deleteEstudiante = async () => {
  const text = 'DELETE FROM estudiantes WHERE rut = $1'
  const values = ['12.345.678-9']

  const result = await pool.query(text, values)

  console.log('Estudiante ha sido eliminado:', result);
}

// insertEstudiante()                       1. Insertar estudiantes
// selectEstudiantePorRut('12.345.678-9');  2. Consulta por el estudiante según RUT
// obtenerTodosEstudiantes();               3. Obtener todos los estudiantes registrados
// actualizarEstudiante();                  4. Actualizar estudiante - Se cambia nivel de Brian de 7 a 10
// deleteEstudiante('12.345.678-9');        5. Eliminará estudiante según RUT
