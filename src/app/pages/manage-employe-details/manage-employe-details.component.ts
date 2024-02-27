import { ActivatedRoute } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { Component, signal, ChangeDetectorRef, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { FullCalendarComponent, FullCalendarModule } from '@fullcalendar/angular';
import { CalendarOptions, DateSelectArg, EventClickArg, EventApi, Calendar } from '@fullcalendar/core';
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
  @ViewChild('calendar') calendarComponent: FullCalendarComponent | undefined;
  calendar: Calendar | undefined;
  employee: IEmployee | undefined;
  event_list: any;

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const id = params['id'];
      console.log('Identifiant de l\'employé:', id);
      this.employeeService.getEmployeeById(id).subscribe(data => {
        console.log("🚀 ~ ManageEmployeComponent ~ this.employeeService.getEmployeeById ~ data:", data);
        this.employee = data as IEmployee;
      });
    })
  }

  constructor(private route: ActivatedRoute,
    private changeDetector: ChangeDetectorRef,
    private employeeService: EmployeeService,
    private dialog: MatDialog,
    private dialogHT: MatDialog) {
  }

  getCurrentDateString(): string {
    return new Date().toISOString().split('T')[0];
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
    selectable: false,
    selectMirror: true,
    dayMaxEvents: true,
    // select: this.handleDateSelect.bind(this),
    eventClick: this.handleEventClick.bind(this),
    eventsSet: this.handleEvents.bind(this),
    slotMinTime: '08:00:00',
    slotMaxTime: '19:00:00'
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
    this.dialog.open(DetailsRendezVousModalComponent, {
      data: clickInfo.event
    });
  }

  handleEvents(events: EventApi[]) {
    // events.forEach(event => {
    //   console.log('EVENTS ========= ', event.extendedProps);
    //   if (event.extendedProps && event.extendedProps['fait']) {
    //     event.setProp('backgroundColor', 'green'); // Change la couleur de fond de l'événement à vert
    //   }
    // });
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
  ngAfterViewInit(): void {
    // Accédez à l'instance du calendrier une fois que la vue est initialisée
    this.calendar = this.calendarComponent?.getApi();
    console.log('CALENDAR ', this.calendar);
    // Obtenez les dates de début et de fin actives
    this.calendar?.on('datesSet', (arg) => {
      const activeStart = arg.start;
      const activeEnd = arg.end;
      console.log('Dates de début et de fin actives :', activeStart, activeEnd);

      // Récupérez les événements entre les dates de début et de fin actives
      if (activeStart && activeEnd) {
        this.getEventsBetweenDates(this.employee?._id, activeStart, activeEnd);
      }
    });
  }

  getEventsBetweenDates(id: string | undefined, debut: Date | undefined, fin: Date | undefined) {
    if (id && debut && fin) {
      this.employeeService.getListRendezVousBetweenDate(id, debut.toISOString(), fin.toISOString())
        .subscribe(events => {
          this.event_list = events;
        });
    }
  }
}

