const createData= (item,idArray)=> 
    {
        
        //console.log("item",item)
        const baseURLImg = "https://image.tmdb.org/t/p/w200";
        
        return {  
        
            id: idArray,
            imagen: `${baseURLImg}${item.poster_path}`,
            title: item.title,
            overview: item.overview,     
            };
        
    }

  
export const getMovies_xmlhttp = async (sendData) => {
    try {
    const url ="https://api.themoviedb.org/3/discover/movie?api_key=";
    const discover= "&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1";
    const apiKEY="af158ebf42ce4f8e554bcd0ba82df8dc";

    const endpoint = `${url}${apiKEY}${discover}`;
    //invocar nueva instancia de XMLHttpRequest
    let xhr = new XMLHttpRequest(); 
    // llamar a la funcion exito si exitosa
    xhr.onload = ()=>{
      //convertir a JSON
      //console.log("rta",xhr.responseText)
      var datos = JSON.parse(xhr.responseText); 

      //Obtengo estrenos
      const estrenos = datos.results;
      //console.log("movie",estrenos[0])
      let movies = [];
      let i=0;
      estrenos.map(item=>{
          i++;
          movies.push(createData(item,i))
      })

      //console.log("movie",movies)
      sendData(movies);
    };
    xhr.onerror=error;  
    xhr.open('GET',endpoint)
    xhr.send();
     
    
   } catch (error) {
     console.error(error);
   } 
 }

 

// funcion para la llamada fallida
function error(err) {
    console.log('Solicitud fallida', err); //los detalles en el objecto "err"
}