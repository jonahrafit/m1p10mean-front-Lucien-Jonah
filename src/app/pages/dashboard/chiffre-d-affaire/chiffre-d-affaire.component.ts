import { Component, OnInit } from '@angular/core';
import { NgxApexchartsModule } from 'ngx-apexcharts';

@Component({
  selector: 'app-chiffre-d-affaire',
  standalone: true,
  imports: [NgxApexchartsModule],
  templateUrl: './chiffre-d-affaire.component.html',
  styleUrl: './chiffre-d-affaire.component.css'
})
export class ChiffreDAffaireComponent implements OnInit {
  chartOptions: any = {};
  chiffreAffaireData: number[] = [];
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
      this.chiffreAffaireData = [15000, 25000, 3500, 45000, 5000, 15000, 2000];
    } else {
      this.labels = ['Mars', 'Avr', 'Mai', 'Jui', 'Juil', 'Sept', 'Oct', 'Nov', 'Déc', 'Jan', 'Fév'];
      this.chiffreAffaireData = [10300, 0, 0, 0, 10300, 10300, 10302, 10303, 10300, 6300, 64000];
    }
  }

  setChartOptions(): void {
    this.chartOptions = {
      series: [{
        name: "Chiffre d'affaire",
        data: this.chiffreAffaireData
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
          text: 'Montant'
        },
        forceNiceScale: true
      },
      title: {
        text: `Chiffre d'affaire par ${this.granularity}`
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
