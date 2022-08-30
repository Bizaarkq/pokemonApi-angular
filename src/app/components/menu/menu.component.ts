import { Component, OnInit } from '@angular/core';
import { PokemonapiService } from 'src/app/services/pokemonapi.service';
import { Router } from '@angular/router';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  titulo: string = 'Hola mundo';
  titulo2: any = 'hola mundo';

  pokemonList: any[] = [];
  idPokemon:any = 1;
  linkMenuAnterior: any;
  linkMenuPosterior: any;

  constructor(
    private pokemonapiService: PokemonapiService,
    private router:Router,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.obtenerListadoPokemons(); 
  }


  obtenerListadoPokemons(link:any =null){

    this.pokemonapiService.obtenerListadoPokemons(link)
    .subscribe({
      next: (resultado :any) => {
        this.pokemonList = resultado.results.map((pok:any) => {
          let id = pok.url.split('/');
          id.pop();
          return {
            id: id.pop(),
            nombre: pok.name
          }
        });
        this.linkMenuAnterior = resultado.previous;
        this.linkMenuPosterior = resultado.next;
      },
      error: (error) => {
      },
      complete: () => {
      }
    });
  }

  redireccionarDetalle(){
    console.log('entra al evento');
    
    this.titulo2 = 'Se cambio desde el evento';
    //this.router.navigate(['/pokemon']);
  }

  mensajeFavorito(evento:any){
    this.snackBar.open('Pokemon: ' + evento.nombre + ' de tipo ' + evento.tipo + ' agregado a favoritos', 'Cerrar', );
  }
}
