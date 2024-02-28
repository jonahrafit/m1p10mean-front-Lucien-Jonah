import { Component, OnInit } from '@angular/core';
import { NgxApexchartsModule } from 'ngx-apexcharts';

@Component({
  selector: 'app-reservation-par-jour',
  standalone: true,
  imports: [NgxApexchartsModule],
  templateUrl: './reservation-par-jour.component.html',
  styleUrl: './reservation-par-jour.component.css'
})
export class ReservationParJourComponent implements OnInit {
  chartOptions: any = {};
  reservationsData: number[] = [];
  labels: string[] = [];
  granularity: 'jour' | 'mois' = 'jour';

  constructor() { }

  ngOnInit(): void {
    this.generateData();
    this.setChartOptions();
  }

  generateData(): void {
    if (this.granularity === 'jour') {
      this.labels = ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'];
      this.reservationsData = [1, 2, 3, 4, 1, 1, 2];
    } else {
      this.labels = ['Mars', 'Avr', 'Mai', 'Jui', 'Juil', 'Sept', 'Oct', 'Nov', 'Déc', 'Jan', 'Fév'];
      this.reservationsData = [0, 0, 0, 0, 0, 0, 2, 3, 2, 6, 14];
    }
  }

  setChartOptions(): void {
    this.chartOptions = {
      series: [{
        name: 'Nombre de réservations',
        data: this.reservationsData
      }],
      chart: {
        type: 'line',
      },
      xaxis: {
        categories: this.labels,
        title: {
          text: this.granularity === 'jour' ? 'Jour' : 'Mois'
        }
      },
      yaxis: {
        title: {
          text: 'Nombre de réservations'
        },
        forceNiceScale: true
      },
      title: {
        text: `Nombre de réservations par ${this.granularity}`
      },
      legend: {
        position: 'top'
      }
    };
  }

  toggleGranularity(granularity: 'jour' | 'mois'): void {
    this.granularity = granularity;
    this.generateData();
    this.setChartOptions();
  }

}
