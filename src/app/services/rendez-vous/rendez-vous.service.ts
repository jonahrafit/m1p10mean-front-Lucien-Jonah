import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RendezVousService {

  constructor() { }

  public transformRendezVousData(rendezVousData: any) {
    const events: any[] = [];

    console.log('RENDEZ VOUS DATA', rendezVousData);
    rendezVousData.rendezVous.forEach((rendezVous: { _id: any; client: any; employee: any; date_created: any; date_rendez_vous: any; services: any; fait: any; }, index: any) => {
      const { _id, client, employee, date_created, date_rendez_vous, services, fait } = rendezVous;
      const startTime = new Date(date_rendez_vous);
      const endTime = new Date(startTime.getTime() + services.duree * 60000); // Fin de rendez-vous, ajusté selon la durée du service

      events.push({
        id: _id,
        title: services.nom,
        start: startTime,
        end: endTime,
        extendedProps: {
          client: {
            id: client.id,
            nom: client.nom,
            mail: client.email
          },
          employee: {
            id: employee.id,
            nom: employee.nom,
            mail: employee.email
          },
          services: {
            id: services.id,
            nom: services.nom,
            commission: services.commission,
            duree: services.duree
          },
          fait: fait,
          date_created: new Date(date_created),
          date_rendez_vous: new Date(date_rendez_vous)
        }
      });
    });

    console.log('EVENTS ', events);
    return events;
  }

}
