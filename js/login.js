// Lista de usuarios 
const usuarios = [
    { email: "juan@correo.com", password: "jua123" },
    { email: "maria@correo.com", password: "mar123" },
    { email: "carlos@correo.com", password: "car123" },
    { email: "laura@correo.com", password: "lau123" },
    { email: "andres@correo.com", password: "and123" },
    { email: "camila@correo.com", password: "cam123" },
    { email: "david@correo.com", password: "dav123" },
    { email: "paula@correo.com", password: "Pau123" },
    { email: "jose@correo.com", password: "jos123" },
    { email: "valentina@correo.com", password: "val123" }
];

document.getElementById("loginForm").addEventListener("submit", function(e) {
    e.preventDefault();

    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();

    // Validaciones básicas
    if (!email || !password) {
        Swal.fire("Campos vacíos", "Por favor llena todos los campos.", "warning");
        return;
    }

    const formatoCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formatoCorreo.test(email)) {
        Swal.fire("Correo inválido", "Por favor escribe un correo válido.", "error");
        return;
    }

    const usuarioValido = usuarios.find(u => u.email === email && u.password === password);

    if (usuarioValido) {
        Swal.fire({
            title: "¡Bienvenido!",
            text: "Inicio de sesión exitoso.",
            icon: "success",
            timer: 2000,
            showConfirmButton: false
        }).then(() => {
            window.location.href = "html/pagina_principal.html";
        });
    } else {
        Swal.fire("Error", "Correo o contraseña incorrectos.", "error");
    }
});