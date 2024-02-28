import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { NgxApexchartsModule } from 'ngx-apexcharts';

@Component({
  selector: 'app-temps-moyen-de-travail',
  standalone: true,
  imports: [CommonModule, MatCardModule, NgxApexchartsModule],
  templateUrl: './temps-moyen-de-travail.component.html',
  styleUrl: './temps-moyen-de-travail.component.css'
})
export class TempsMoyenDeTravailComponent {
  chartOptions: any = {};
  employeLabels = ['Jonah Fitia', 'Niko Rakoto', 'Marie anne', 'Elsa Randria'];
  tempsTravailData = [5, 7, 8, 7.5];

  constructor() { }

  ngOnInit(): void {
    this.chartOptions = {
      series: [{
        name: 'Temps de travail moyen (en heures)',
        data: this.tempsTravailData
      }],
      chart: {
        type: 'bar'
      },
      plotOptions: {
        bar: {
          horizontal: true,
        }
      },
      xaxis: {
        categories: this.employeLabels,
        title: {
          text: 'Temps de travail (en heures)'
        }
      },
      yaxis: {
        title: {
          text: 'Employé'
        }
      },
      title: {
        text: 'Temps moyen de travail par employé'
      },
    };
  }
}
