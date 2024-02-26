import { ActivatedRoute } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { Component, signal, ChangeDetectorRef, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { FullCalendarModule } from '@fullcalendar/angular';
import { CalendarOptions, DateSelectArg, EventClickArg, EventApi } from '@fullcalendar/core';
import interactionPlugin from '@fullcalendar/interaction';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import frLocale from '@fullcalendar/core/locales/fr';
import { INITIAL_EVENTS } from '../../services/events.utils';
import { createEventId } from '../../services/events.utils';
import { MatDialog } from '@angular/material/dialog';
import { DetailsRendezVousModalComponent } from '../../component/details-rendez-vous-modal/details-rendez-vous-modal.component';
import { IEmployee } from '../../models/IEmployee';
import { EmployeeService } from '../../services/employee/employee.service';
import { MatIconModule } from '@angular/material/icon';
import { AjoutHoraireTravailComponent } from '../../component/ajout-horaire-travail/ajout-horaire-travail.component';
@Component({
  selector: 'app-manage-employe-details',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    FullCalendarModule,
    MatCardModule,
    MatButtonModule,
    MatListModule,
    MatIconModule
  ],
  templateUrl: './manage-employe-details.component.html',
  styleUrl: './manage-employe-details.component.css'
})
export class ManageEmployeDetailsComponent implements OnInit {
  employee: IEmployee | undefined;

  private getEmployeeById(id: string) {
    this.employeeService.getEmployeeById(id).subscribe(data => {
      console.log("🚀 ~ ManageEmployeComponent ~ this.employeeService.getEmployeeById ~ data:", data);
      this.employee = data as IEmployee;
    });
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      const id = params['id'];
      console.log('Identifiant de l\'employé:', id);
      this.getEmployeeById(id);
    })
  }

  constructor(private route: ActivatedRoute,
    private changeDetector: ChangeDetectorRef,
    private employeeService: EmployeeService,
    private dialog: MatDialog,
    private dialogHT: MatDialog) {
  }

  currentEvents = signal<EventApi[]>([]);

  calendarVisible = signal(true);
  calendarOptions = signal<CalendarOptions>({
    plugins: [
      interactionPlugin,
      dayGridPlugin,
      timeGridPlugin,
      listPlugin,
    ],
    locales: [frLocale], // Définir la localisation française
    locale: 'fr', // Définir la langue du calendrier en français
    headerToolbar: {
      left: 'prev,next today',
      center: 'title',
      right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek'
    },
    // initialView: 'dayGridMonth',
    initialView: 'timeGridWeek',
    initialEvents: INITIAL_EVENTS, // alternatively, use the `events` setting to fetch from a feed
    weekends: true,
    editable: true,
    selectable: true,
    selectMirror: true,
    dayMaxEvents: true,
    select: this.handleDateSelect.bind(this),
    eventClick: this.handleEventClick.bind(this),
    eventsSet: this.handleEvents.bind(this)
  });

  handleCalendarToggle() {
    this.calendarVisible.update((bool) => !bool);
  }

  handleWeekendsToggle() {
    this.calendarOptions.update((options) => ({
      ...options,
      weekends: !options.weekends,
    }));
  }

  handleDateSelect(selectInfo: DateSelectArg) {
    const title = prompt('Please enter a new title for your event');
    const calendarApi = selectInfo.view.calendar;

    calendarApi.unselect(); // clear date selection

    if (title) {
      calendarApi.addEvent({
        id: createEventId(),
        title,
        start: selectInfo.startStr,
        end: selectInfo.endStr,
        allDay: selectInfo.allDay
      });
    }
  }

  // Dans la méthode handleEventClick
  handleEventClick(clickInfo: EventClickArg) {
    const dialogRef = this.dialog.open(DetailsRendezVousModalComponent, {
      data: clickInfo.event
    });
  }

  handleEvents(events: EventApi[]) {
    /* events.forEach(event => {
      if (event.extendedProps && event.extendedProps['fait']) {
        event.setProp('backgroundColor', 'green'); // Change la couleur de fond de l'événement à vert
      }
    }); */
    this.currentEvents.set(events);
    this.changeDetector.detectChanges(); // workaround for pressionChangedAfterItHasBeenCheckedError
  }

  openModalAjoutHoraireTravail() {
    this.dialogHT.open(AjoutHoraireTravailComponent);
  }

  joursSemaine = ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche'];
  // Assurez-vous d'avoir la date actuelle du logiciel
  dateActuelle = new Date();

  // Créez une fonction pour formater les plages horaires
  formatPlagesHoraires(plagesHoraires: any[]) {
    let plagesFormatees = '';

    plagesHoraires.forEach(plage => {
      const debut = plage.temps_debut;
      const fin = plage.temps_fin;
      plagesFormatees += `${debut}:00 - ${fin}:00<br>`;
    });

    return plagesFormatees;
  }

  // Créez une fonction pour vérifier si la date de création est avant la date actuelle
  horaireEstActif(dateCreation: string) {
    const dateCreationPlage = new Date(dateCreation);
    return dateCreationPlage <= this.dateActuelle;
  }


}

