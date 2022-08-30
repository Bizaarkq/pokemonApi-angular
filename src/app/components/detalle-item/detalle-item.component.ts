import { Component, Input, OnInit, OnChanges, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PokemonapiService } from 'src/app/services/pokemonapi.service';

interface pokemon {
  id ?: number;
  nombre?: string;
  especie?: string;
  habilidad?: Array<string>;
  altura?: number;
  peso?: number;
  tipo?: Array<string>;
  stats?: Array<any>;
}

@Component({
  selector: 'app-detalle-item',
  templateUrl: './detalle-item.component.html',
  styleUrls: ['./detalle-item.component.css'],
})
export class DetalleItemComponent implements OnInit, OnChanges {

  @Input() idpokemon: any;
  @Output() favorito = new EventEmitter<any>();

  DetallePokemon: pokemon = {};
  idPokemon: any;

  constructor(
    private activatedRoute: ActivatedRoute,
    private pokemonapiService: PokemonapiService
  ) {}

  ngOnInit(): void {
    //console.log(this.idpokemon); //viene desde el componente padre
    this.idPokemon = this.activatedRoute.snapshot.paramMap.get('idPokemon');
    //console.log(this.idPokemon); //viene desde el parametro en la ruta
    this.idPokemon = this.idPokemon ?? this.idpokemon;
    this.getDetalle(this.idPokemon);
  }

  ngOnChanges(): void {
    //console.log(this.idpokemon); //viene desde el componente padre
    this.getDetalle(this.idpokemon);
  }

  getDetalle(idPokemon: any) {
    this.pokemonapiService.ObtenerDetallePokemon(idPokemon).subscribe({
      next: (resultados: any) => {
        const {
          ['name']: nombre,
          ['abilities']: habilidades,
          ['height']: altura,
          ['weight']: peso,
          ['types']: tipo,
          ['stats']: estadisticas,
          ['species']: especie,
        } = resultados;

        this.DetallePokemon = {
          id: idPokemon,
          nombre : nombre,
          especie: especie.name,
          habilidad : habilidades.map((habilidad: any) => habilidad.ability.name),
          altura : altura,
          peso : peso,
          tipo : tipo.map((e: any) => e.type.name),
          stats : estadisticas.map((e: any) => {
            return {
              nombre: e.stat.name,
              valor: e.base_stat,
            };
          }),
        };
      },
      error: (error: any) => {},
    });
  }

  setFavorito(){
    this.favorito.emit({
      nombre: this.DetallePokemon.nombre,
      tipo: this.DetallePokemon.tipo
    });
  }

}
