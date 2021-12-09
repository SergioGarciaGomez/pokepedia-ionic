import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { Pokemon } from 'src/app/interfaces/pokemon';
Chart.register(...registerables);

@Component({
	selector: 'app-chart-stats',
	templateUrl: './chart-stats.component.html',
	styleUrls: [ './chart-stats.component.scss' ]
})
export class ChartStatsComponent implements OnChanges {

	// // Variables definidas como falses para activar un evento en un determinado momento
	// displayTotalPoints: boolean = false;
	// displayAverage: boolean = false;
	// displayTypicalDeviation: boolean = false;

	public myChart: Chart;

	// Objeto pokémon recibido de la clase padre `pokemon-info` inicializado
	@Input() pokemon: Pokemon;

	constructor() {}

	// Cada vez que detecta un cambio, ejecuta lo que hay dentro (no es necesario un SimpleChanges)
	ngOnChanges() {

		const { ps, attack, defense, specialAttack, specialDefense, speed } = this.pokemon
		
		// Si existe un Chart, lo destruye, ya que no pueden existir más de un Chart a la vez
		if(this.myChart) {
			this.myChart.destroy();
		}

		// Crea de nuevo el Chart actualizado con la nueva entrada
		this.myChart= new Chart('myChart', {
			type: 'bar',
			data: {
				labels: [ 'PS', 'Ataque', 'Defensa', 'Ataque Especial', 'Defensa Especial', 'Velocidad' ],
				datasets: [
					{
						label: 'Puntos base',
						data: [ ps, attack, defense, specialAttack, specialDefense, speed ],
						backgroundColor: [
							'rgba(255, 99, 132, 0.5)',
							'rgba(54, 162, 235, 0.5)',
							'rgba(255, 206, 86, 0.5)',
							'rgba(75, 192, 192, 0.5)',
							'rgba(153, 102, 255, 0.5)',
							'rgba(255, 159, 64, 0.5)'
						],
						borderColor: [
							'rgba(255, 99, 132, 1)',
							'rgba(54, 162, 235, 1)',
							'rgba(255, 206, 86, 1)',
							'rgba(75, 192, 192, 1)',
							'rgba(153, 102, 255, 1)',
							'rgba(255, 159, 64, 1)'
						],
						borderWidth: 4
					}
				]
			},
			options: {

				plugins : {
					legend: {
						display: false
					}
				},
				
				scales: {
					y: {
            display: false,
						beginAtZero: true,
						max: 255,
					},
					x: {
						ticks: {
							color: "#fff",
							font: {
								size: 12
							}
						},
						grid: {
							display: false
						}
					}
				}
			}
		});
	}

	// // Funciones show, para activar el evento de la ventana emergente
  //   showTotalPoints() {
  //       this.displayTotalPoints = true
  //   }

	// showAverage() {
  //       this.displayAverage = true
  //   }

	// showTypicalDeviation() {
  //       this.displayTypicalDeviation = true
  //   }

	// Devuelve el total de estadísticas de combate del pokémon
	totalStatPoints(): number {
		const { ps, attack, defense, specialAttack, specialDefense, speed } = this.pokemon;
		return ps + attack + defense + specialAttack + specialDefense + speed
	}

	// Devuelve la media de las estadísticas del pokémon
	averagePoints(): number {
		const { ps, attack, defense, specialAttack, specialDefense, speed } = this.pokemon;
		return (ps + attack + defense + specialAttack + specialDefense + speed) / 6
	}

	/*	La desviación típica se calcula cogiendo el datoNº1 y restándole la media, 
		y el resultado se eleva al cuadrado(esto con todos los datos).
		Después se suman todos los resultados y se dividen entre el número de datos totales.
		Finalmente se hace la raíz cuadrada del resultado.
	*/
	typicalDeviation(): number {
		const { ps, attack, defense, specialAttack, specialDefense, speed } = this.pokemon;
		const i: number = this.averagePoints() // Sacamos la media, que es necesaria para la desviación típica
		return Math.sqrt(
			(	Math.pow(ps - i, 2) + // Dato 1 - media ^2
				Math.pow(attack - i, 2) + 
				Math.pow(defense - i, 2) + 
				Math.pow(specialAttack - i, 2) + 
				Math.pow(specialDefense - i, 2) +  
				Math.pow(speed - i, 2)
		) 	/ 6)
	}
}
