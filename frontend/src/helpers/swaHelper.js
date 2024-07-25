import Swal from 'sweetalert2';
const Toast = Swal.mixin({
  toast: true,
  position: "top-end",
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,
  didOpen: (toast) => {
    toast.onmouseenter = Swal.stopTimer;
    toast.onmouseleave = Swal.resumeTimer;
  }
});

export const showCrearReserva = async () => {
  await Toast.fire({
    icon: "success",
    title: "Reserva creada exitosamente!"
  });
};

export const showErrorCrearReserva = async () => {
    await Toast.fire({
      icon: "error",
      title: "Error al crear Reserva"
    });
}

export const showCancelarReserva = async () => {
    const result = await Swal.fire({
      title: "¿Estás seguro de cancelar la reserva?",
      text: "Esta acción no se puede deshacer.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí, cancelar reserva",
      cancelButtonText: "No, mantener reserva",
      reverseButtons: true,
      customClass: {
        confirmButton: "bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded",
        cancelButton: "bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded"
      },
      buttonsStyling: false,
    });
  
    if (result.isConfirmed) {
      await Toast.fire({
        icon: "success",
        title: "Se ha Cancelado la reserva"
      });
    } else if (result.dismiss === Swal.DismissReason.cancel) {
      await Swal.fire({
        title: "Cancelado",
        text: "La reserva sigue vigente :)",
        icon: "info"
      });
    }
  
    return result.isConfirmed;
  };

export const showEliminarEdificio = async () => {
  await Toast.fire({
    icon: "success",
    title: "Edificio eliminado con exito"
  });
};

export const showCrearEdificio = async () => {
  await Toast.fire({
    icon: "success",
    title: "Edificio Creado con exito"
  });
}

export const showErrorCrearEdificio = async () => {
  await Toast.fire({
    icon: "error",
    title: "Error al crear el Edificio"
  });
}

export const showEliminarSala = async (response) => {
  await Toast.fire({
    icon: "success",
    title: "Sala Eliminada con exito"
  });
}

export const showCrearSala = async (error) => {
  await Toast.fire({
    icon: "success",
    title: "Sala creada con exito"
  });
}

export const showErrorCrearSala = async () => {
  await Toast.fire({
    icon: "error",
    title: "Error al Crear una sala"
  });
};

