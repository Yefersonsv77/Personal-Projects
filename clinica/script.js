const API_URLS = {
            pacientes: {
                listar: 'Pacientes/listar_paciente.php',
                crear: 'Pacientes/crear_paciente.php',
                actualizar: 'Pacientes/actualizar_datos.php',
                eliminar: 'Pacientes/eliminar_paciente.php'
            },
            citas: {
                listar: 'Citas/listar_cita.php',
                crear: 'Citas/crear_cita.php',
                eliminar: 'Citas/eliminar_cita.php',
                cambiarEstado: 'Citas/cambiar_estado.php'
            }
        };

        // Variables globales
        let pacientes = [];
        let citas = [];
        let editandoPaciente = false;
        let editandoCita = false;

        // Inicialización
        document.addEventListener('DOMContentLoaded', function() {
            cargarPacientes();
            cargarCitas();
            configurarEventos();
        });

        // Configurar eventos
        function configurarEventos() {
            // Formulario de pacientes
            document.getElementById('pacienteForm').addEventListener('submit', manejarSubmitPaciente);
            document.getElementById('cancelarPaciente').addEventListener('click', cancelarEdicionPaciente);

            // Formulario de citas
            document.getElementById('citaForm').addEventListener('submit', manejarSubmitCita);
            document.getElementById('cancelarCita').addEventListener('click', cancelarEdicionCita);

            // Eventos de tabs
            document.getElementById('citas-tab').addEventListener('shown.bs.tab', function() {
                cargarPacientesEnSelect();
            });
        }

        // Funciones para mostrar alertas
        function mostrarAlerta(elemento, mensaje, tipo = 'success') {
            const alertaHtml = `
                <div class="alert alert-${tipo} alert-dismissible fade show" role="alert">
                    ${mensaje}
                    <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
                </div>
            `;
            document.getElementById(elemento).innerHTML = alertaHtml;
            
            // Auto-ocultar después de 5 segundos
            setTimeout(() => {
                const alerta = document.querySelector(`#${elemento} .alert`);
                if (alerta) {
                    alerta.remove();
                }
            }, 5000);
        }

        // FUNCIONES PARA PACIENTES
        async function cargarPacientes() {
            try {
                const response = await fetch(API_URLS.pacientes.listar);
                const data = await response.json();
                
                if (Array.isArray(data)) {
                    pacientes = data;
                    mostrarPacientes(data);
                } else {
                    throw new Error(data.message || 'Error al cargar pacientes');
                }
            } catch (error) {
                console.error('Error:', error);
                document.getElementById('tablaPacientes').innerHTML = `
                    <tr>
                        <td colspan="6" class="text-center text-danger py-4">
                            <i class="fas fa-exclamation-triangle"></i> Error al cargar pacientes: ${error.message}
                        </td>
                    </tr>
                `;
            }
        }

        function mostrarPacientes(pacientes) {
            const tbody = document.getElementById('tablaPacientes');
            
            if (pacientes.length === 0) {
                tbody.innerHTML = `
                    <tr>
                        <td colspan="6" class="text-center text-muted py-4">
                            <i class="fas fa-inbox"></i> No hay pacientes registrados
                        </td>
                    </tr>
                `;
                return;
            }

            tbody.innerHTML = pacientes.map(paciente => `
                <tr>
                    <td>${paciente.id}</td>
                    <td>${paciente.nombre}</td>
                    <td>${paciente.documento}</td>
                    <td>${paciente.telefono}</td>
                    <td>${paciente.correo}</td>
                    <td>
                        <div class="btn-group btn-group-sm" role="group">
                            <button class="btn btn-outline-primary" onclick="editarPaciente(${paciente.id})" title="Editar">
                                <i class="fas fa-edit"></i>
                            </button>
                            <button class="btn btn-outline-danger" onclick="eliminarPaciente(${paciente.id})" title="Eliminar">
                                <i class="fas fa-trash"></i>
                            </button>
                        </div>
                    </td>
                </tr>
            `).join('');
        }

        async function manejarSubmitPaciente(e) {
            e.preventDefault();
            
            const pacienteData = {
                nombre: document.getElementById('pacienteNombre').value.trim(),
                documento: document.getElementById('pacienteDocumento').value.trim(),
                telefono: document.getElementById('pacienteTelefono').value.trim(),
                correo: document.getElementById('pacienteCorreo').value.trim()
            };

            try {
                let response;
                
                if (editandoPaciente) {
                    const id = document.getElementById('pacienteId').value;
                    response = await fetch(API_URLS.pacientes.actualizar, {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ id: parseInt(id), ...pacienteData })
                    });
                } else {
                    response = await fetch(API_URLS.pacientes.crear, {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ paciente: pacienteData })
                    });
                }

                const result = await response.json();
                
                if (result.success) {
                    mostrarAlerta('pacienteAlert', result.message, 'success');
                    document.getElementById('pacienteForm').reset();
                    cancelarEdicionPaciente();
                    cargarPacientes();
                } else {
                    mostrarAlerta('pacienteAlert', result.message, 'danger');
                }
            } catch (error) {
                console.error('Error:', error);
                mostrarAlerta('pacienteAlert', 'Error de conexión', 'danger');
            }
        }

        function editarPaciente(id) {
            const paciente = pacientes.find(p => p.id == id);
            if (!paciente) return;

            document.getElementById('pacienteId').value = paciente.id;
            document.getElementById('pacienteNombre').value = paciente.nombre;
            document.getElementById('pacienteDocumento').value = paciente.documento;
            document.getElementById('pacienteTelefono').value = paciente.telefono;
            document.getElementById('pacienteCorreo').value = paciente.correo;

            document.getElementById('pacienteFormTitle').textContent = 'Editar Paciente';
            document.getElementById('pacienteSubmitText').textContent = 'Actualizar Paciente';
            document.getElementById('cancelarPaciente').style.display = 'block';
            
            editandoPaciente = true;
        }

        function cancelarEdicionPaciente() {
            document.getElementById('pacienteForm').reset();
            document.getElementById('pacienteFormTitle').textContent = 'Crear Paciente';
            document.getElementById('pacienteSubmitText').textContent = 'Crear Paciente';
            document.getElementById('cancelarPaciente').style.display = 'none';
            editandoPaciente = false;
        }

        async function eliminarPaciente(id) {
            if (!confirm('¿Está seguro de que desea eliminar este paciente?')) return;

            try {
                const response = await fetch(API_URLS.pacientes.eliminar, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ id: id })
                });

                const result = await response.json();
                
                if (result.success) {
                    mostrarAlerta('pacienteAlert', result.message, 'success');
                    cargarPacientes();
                } else {
                    mostrarAlerta('pacienteAlert', result.message, 'danger');
                }
            } catch (error) {
                console.error('Error:', error);
                mostrarAlerta('pacienteAlert', 'Error de conexión', 'danger');
            }
        }

        // FUNCIONES PARA CITAS
        async function cargarCitas() {
            try {
                const response = await fetch(API_URLS.citas.listar);
                const data = await response.json();
                
                if (Array.isArray(data)) {
                    citas = data;
                    mostrarCitas(data);
                } else {
                    throw new Error(data.message || 'Error al cargar citas');
                }
            } catch (error) {
                console.error('Error:', error);
                document.getElementById('tablaCitas').innerHTML = `
                    <tr>
                        <td colspan="7" class="text-center text-danger py-4">
                            <i class="fas fa-exclamation-triangle"></i> Error al cargar citas: ${error.message}
                        </td>
                    </tr>
                `;
            }
        }

        function mostrarCitas(citas) {
            const tbody = document.getElementById('tablaCitas');
            
            if (citas.length === 0) {
                tbody.innerHTML = `
                    <tr>
                        <td colspan="7" class="text-center text-muted py-4">
                            <i class="fas fa-inbox"></i> No hay citas registradas
                        </td>
                    </tr>
                `;
                return;
            }

            tbody.innerHTML = citas.map(cita => {
                let estadoBadge = '';
                switch(cita.estado) {
                    case 'Pendiente':
                        estadoBadge = '<span class="badge bg-warning text-dark estado-badge">Pendiente</span>';
                        break;
                    case 'Confirmada':
                        estadoBadge = '<span class="badge bg-success estado-badge">Confirmada</span>';
                        break;
                    case 'Cancelada':
                        estadoBadge = '<span class="badge bg-danger estado-badge">Cancelada</span>';
                        break;
                    default:
                        estadoBadge = `<span class="badge bg-secondary estado-badge">${cita.estado}</span>`;
                }

                return `
                    <tr>
                        <td>${cita.id}</td>
                        <td>${cita.paciente_id}</td>
                        <td>${cita.fecha}</td>
                        <td>${cita.hora}</td>
                        <td>${cita.odontologo}</td>
                        <td>${estadoBadge}</td>
                        <td>
                            <div class="btn-group btn-group-sm" role="group">
                                <button class="btn btn-outline-info" onclick="cambiarEstadoCita(${cita.id})" title="Cambiar Estado">
                                    <i class="fas fa-sync-alt"></i>
                                </button>
                                <button class="btn btn-outline-danger" onclick="eliminarCita(${cita.id})" title="Eliminar">
                                    <i class="fas fa-trash"></i>
                                </button>
                            </div>
                        </td>
                    </tr>
                `;
            }).join('');
        }

        async function cargarPacientesEnSelect() {
            try {
                if (pacientes.length === 0) {
                    await cargarPacientes();
                }
                
                const select = document.getElementById('citaPacienteId');
                select.innerHTML = '<option value="">Seleccionar paciente...</option>';
                
                pacientes.forEach(paciente => {
                    select.innerHTML += `<option value="${paciente.id}">${paciente.nombre} (${paciente.documento})</option>`;
                });
            } catch (error) {
                console.error('Error al cargar pacientes en select:', error);
            }
        }

        async function manejarSubmitCita(e) {
            e.preventDefault();
            
            const citaData = {
                paciente_id: parseInt(document.getElementById('citaPacienteId').value),
                fecha: document.getElementById('citaFecha').value,
                hora: document.getElementById('citaHora').value,
                odontologo: document.getElementById('citaOdontologo').value.trim(),
                estado: document.getElementById('citaEstado').value
            };

            try {
                const response = await fetch(API_URLS.citas.crear, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ cita: citaData })
                });

                const result = await response.json();
                
                if (result.success) {
                    mostrarAlerta('citaAlert', result.message, 'success');
                    document.getElementById('citaForm').reset();
                    cargarCitas();
                } else {
                    mostrarAlerta('citaAlert', result.message, 'danger');
                }
            } catch (error) {
                console.error('Error:', error);
                mostrarAlerta('citaAlert', 'Error de conexión', 'danger');
            }
        }

        function cancelarEdicionCita() {
            document.getElementById('citaForm').reset();
            document.getElementById('citaFormTitle').textContent = 'Crear Cita';
            document.getElementById('citaSubmitText').textContent = 'Crear Cita';
            document.getElementById('cancelarCita').style.display = 'none';
            editandoCita = false;
        }

        async function cambiarEstadoCita(id) {
            try {
                const response = await fetch(API_URLS.citas.cambiarEstado, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ id: id })
                });

                const result = await response.json();
                
                if (result.success) {
                    mostrarAlerta('citaAlert', result.message, 'success');
                    cargarCitas();
                } else {
                    mostrarAlerta('citaAlert', result.message, 'danger');
                }
            } catch (error) {
                console.error('Error:', error);
                mostrarAlerta('citaAlert', 'Error de conexión', 'danger');
            }
        }

        async function eliminarCita(id) {
            if (!confirm('¿Está seguro de que desea eliminar esta cita?')) return;

            try {
                const response = await fetch(API_URLS.citas.eliminar, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ id: id })
                });

                const result = await response.json();
                
                if (result.success) {
                    mostrarAlerta('citaAlert', result.message, 'success');
                    cargarCitas();
                } else {
                    mostrarAlerta('citaAlert', result.message, 'danger');
                }
            } catch (error) {
                console.error('Error:', error);
                mostrarAlerta('citaAlert', 'Error de conexión', 'danger');
            }
        }