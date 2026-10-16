/**
 * Datos de contacto y redes de Tecnología R.
 * Ajusta whatsapp / redes cuando los tengas definitivos.
 */
export const SITE = {
  name: "Tecnología R",
  email: "principal.tecnologiar@gmail.com",
  /** Solo dígitos con indicativo país, sin +. Vacío = usar correo. */
  whatsapp: "",
  phoneDisplay: "Consultar por correo",
  addressShort: "Medellín, Antioquia\nCentro Comercial Carrusel",
  addressFull:
    "CENTRO COMERCIAL CARRUSEL DEL ÉXITO, Cl. 48D #65A-57 Local 220-221-222, Laureles - Estadio, Medellín",
  social: {
    facebook: "",
    instagram: "",
    twitter: "",
    youtube: "https://www.youtube.com/@TecnologiaR",
  },
} as const;

/** Enlace WhatsApp con mensaje prellenado, o mailto si no hay número. */
export function productWhatsAppUrl(nombre: string, id: number): string {
  const text = encodeURIComponent(
    `Hola, me interesa el producto "${nombre}" (id ${id}). ¿Me pueden dar más información?`
  );
  if (SITE.whatsapp) {
    return `https://wa.me/${SITE.whatsapp}?text=${text}`;
  }
  const subject = encodeURIComponent(`Consulta: ${nombre}`);
  return `mailto:${SITE.email}?subject=${subject}&body=${text}`;
}
