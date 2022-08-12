	// loader
	window.addEventListener("load", function () {
		const loader = document.querySelector(".loader");
		loader.className += " hidden";
	}); // end loader



	// register
	const register = document.querySelector(".register");
	register.addEventListener("click", function () {
		//sweetAlert2
		Swal.fire({
			icon: 'error',
			title: 'Uyss...',
			text: 'Aun no se habilitan los registros!',
			footer: '<a href="mailto:soporte@pokegocl.com?Subject=Contacto%20web%20PokeGOCL">Contacta con el administrador</a>'
		})
	});