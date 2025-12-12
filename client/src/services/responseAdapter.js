/**
 * Adapta las respuestas del backend al formato esperado por el frontend
 */
export const adaptResponse = (response) => {
  // Si la respuesta tiene status 200-299, considerarla exitosa
  const isSuccess = response.status >= 200 && response.status < 300;
  
  return {
    ... response,
    success: isSuccess,
  };
};