import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PokemonapiService {

  constructor(
    private httpClient: HttpClient
  ) { }

  obtenerListadoPokemons(url:any = null){
    let urlBase = url ? url : 'https://pokeapi.co/api/v2/pokemon';
    return this.httpClient.get(urlBase)
    .pipe(
      map((resultados: any) => {
        return resultados;
      })
    );
  }

  ObtenerDetallePokemon(idPokemon:any){
    let url = 'https://pokeapi.co/api/v2/pokemon/' + idPokemon;
    return this.httpClient.get(url)
    .pipe(
      map((resultados: any) => {
        return resultados;
      })
    )
  }

}
