// login.js - Funcionalidad de login con SweetAlert2

// Función para validar login (simulada)
function validateLogin(email, password) {
    // Aquí puedes agregar tu lógica de validación real
    // Por ejemplo, verificar contra una base de datos o API
    
    // Simulación de validación simple
    const validEmail = "usuario@ejemplo.com";
    const validPassword = "123456";
    
    return email === validEmail && password === validPassword;
}

// Función para inicializar el formulario de login
function initLoginForm() {
    const loginForm = document.getElementById('loginForm');
    if (!loginForm) {
        console.error('No se encontró el formulario con ID "loginForm"');
        return;
    }

    // Manejar el envío del formulario
    loginForm.addEventListener('submit', function(e) {
        e.preventDefault(); // Prevenir el envío normal del formulario
        
        const email = document.getElementById('inputEmail').value;
        const password = document.getElementById('inputPassword').value;
        
        // Validar que los campos no estén vacíos
        if (!email || !password) {
            showWarningAlert("Campos requeridos", "Por favor completa todos los campos");
            return;
        }
        
        // Validar formato de email
        if (!isValidEmail(email)) {
            showWarningAlert("Email inválido", "Por favor ingresa un correo electrónico válido");
            return;
        }
        
        // Procesar login
        processLogin(email, password);
    });
}

// Función para procesar el login
function processLogin(email, password) {
    // Mostrar loading
    showLoadingAlert('Iniciando sesión...', 'Por favor espera');
    
    // Simular delay de servidor (puedes reemplazar esto con tu llamada a la API)
    setTimeout(() => {
        if (validateLogin(email, password)) {
            handleSuccessfulLogin();
        } else {
            handleFailedLogin();
        }
    }, 1500);
}

// Manejar login exitoso
function handleSuccessfulLogin() {
    Swal.fire({
        icon: "success",
        title: "¡Bienvenido!",
        text: "Has iniciado sesión correctamente",
        timer: 2000,
        showConfirmButton: false
    }).then(() => {
        // Redirigir o realizar acción después del login exitoso
        console.log("Login exitoso - redireccionar al dashboard");
        // window.location.href = "dashboard.html";
        // O puedes llamar a una función específica:
        // redirectToDashboard();
    });
}

// Manejar login fallido
function handleFailedLogin() {
    Swal.fire({
        icon: "error",
        title: "Error de autenticación",
        text: "Credenciales incorrectas. Por favor verifica tu correo y contraseña.",
        footer: '<a href="html/Recuperar.html">¿Olvidaste tu contraseña?</a>',
        confirmButtonText: "Intentar de nuevo"
    });
}

// Función para validar formato de email
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Funciones reutilizables para diferentes tipos de alertas

// Alerta de carga/loading
function showLoadingAlert(title = 'Cargando...', text = 'Por favor espera') {
    Swal.fire({
        title: title,
        text: text,
        allowOutsideClick: false,
        didOpen: () => {
            Swal.showLoading();
        }
    });
}

// Alerta de advertencia
function showWarningAlert(title, text) {
    Swal.fire({
        icon: "warning",
        title: title,
        text: text,
        confirmButtonText: "Entendido"
    });
}

// Alerta de error personalizada
function showErrorAlert(title = "Oops...", text = "Something went wrong!", footer = null) {
    Swal.fire({
        icon: "error",
        title: title,
        text: text,
        footer: footer
    });
}

// Alerta de éxito
function showSuccessAlert(title, text, timer = null) {
    const config = {
        icon: "success",
        title: title,
        text: text,
        confirmButtonText: "Aceptar"
    };
    
    if (timer) {
        config.timer = timer;
        config.showConfirmButton = false;
    }
    
    return Swal.fire(config);
}

// Función para confirmar acciones
function confirmAction(title, text, confirmText = "Sí, continuar", cancelText = "Cancelar") {
    return Swal.fire({
        title: title,
        text: text,
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: confirmText,
        cancelButtonText: cancelText
    });
}

// Función para manejar el enlace de "¿Olvidaste tu contraseña?"
function initForgotPasswordLink() {
    const forgotPasswordLink = document.querySelector('a[href="html/Recuperar.html"]');
    if (forgotPasswordLink) {
        forgotPasswordLink.addEventListener('click', function(e) {
            e.preventDefault();
            
            confirmAction(
                "Recuperar contraseña",
                "¿Deseas ir a la página de recuperación de contraseña?",
                "Sí, ir",
                "Cancelar"
            ).then((result) => {
                if (result.isConfirmed) {
                    window.location.href = "html/Recuperar.html";
                }
            });
        });
    }
}

// Función para manejar errores de conexión/servidor
function handleServerError(error) {
    console.error('Error del servidor:', error);
    showErrorAlert(
        "Error de conexión",
        "No se pudo conectar con el servidor. Por favor intenta más tarde.",
        '<a href="#" onclick="location.reload()">Recargar página</a>'
    );
}

// Función para mostrar mensaje de sesión expirada
function showSessionExpiredAlert() {
    Swal.fire({
        icon: "warning",
        title: "Sesión expirada",
        text: "Tu sesión ha expirado. Por favor inicia sesión nuevamente.",
        confirmButtonText: "Iniciar sesión",
        allowOutsideClick: false
    }).then(() => {
        // Limpiar formulario o redirigir
        clearLoginForm();
    });
}

// Función para limpiar el formulario
function clearLoginForm() {
    const email = document.getElementById('inputEmail');
    const password = document.getElementById('inputPassword');
    const remember = document.getElementById('rememberCheck');
    
    if (email) email.value = '';
    if (password) password.value = '';
    if (remember) remember.checked = false;
}

// Función para validar formulario en tiempo real
function initRealTimeValidation() {
    const emailInput = document.getElementById('inputEmail');
    const passwordInput = document.getElementById('inputPassword');
    
    if (emailInput) {
        emailInput.addEventListener('blur', function() {
            const email = this.value.trim();
            if (email && !isValidEmail(email)) {
                this.classList.add('is-invalid');
            } else {
                this.classList.remove('is-invalid');
            }
        });
    }
    
    if (passwordInput) {
        passwordInput.addEventListener('input', function() {
            if (this.value.length > 0) {
                this.classList.remove('is-invalid');
            }
        });
    }
}

// Función de inicialización principal
function initLogin() {
    // Verificar que SweetAlert2 esté disponible
    if (typeof Swal === 'undefined') {
        console.error('SweetAlert2 no está cargado. Asegúrate de incluir la librería.');
        return;
    }
    
    // Inicializar componentes
    initLoginForm();
    initForgotPasswordLink();
    initRealTimeValidation();
    
    console.log('Sistema de login inicializado correctamente');
}

// Ejemplo de función para integración con API real
async function loginWithAPI(email, password) {
    try {
        showLoadingAlert('Autenticando...', 'Verificando credenciales');
        
        const response = await fetch('/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password })
        });
        
        const data = await response.json();
        
        if (response.ok) {
            // Login exitoso
            localStorage.setItem('authToken', data.token);
            handleSuccessfulLogin();
        } else {
            // Login fallido
            showErrorAlert('Error de autenticación', data.message || 'Credenciales incorrectas');
        }
    } catch (error) {
        handleServerError(error);
    }
}

// Inicializar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', initLogin);

// También funciona si se carga el script después del DOM
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initLogin);
} else {
    initLogin();
}