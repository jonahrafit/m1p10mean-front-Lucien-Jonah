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
import { MatDialog } from '@angular/material/dialog';
import { DetailsRendezVousModalComponent } from '../../component/details-rendez-vous-modal/details-rendez-vous-modal.component';
import { IEmployee } from '../../models/IEmployee';
import { EmployeeService } from '../../services/employee/employee.service';
import { MatIconModule } from '@angular/material/icon';
import { AjoutHoraireTravailComponent } from '../../component/ajout-horaire-travail/ajout-horaire-travail.component';
import { RendezVousService } from '../../services/rendez-vous/rendez-vous.service';
import { v4 as uuidv4 } from 'uuid';
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
export class ManageEmployeDetailsComponent {
  @ViewChild('calendar') calendarComponent: FullCalendarComponent | undefined;
  calendar: Calendar | undefined;
  employee: IEmployee | undefined;
  event_list: any[] = []; // Déclarer event_list comme un tableau d'objets de type any

  constructor(private route: ActivatedRoute,
    private changeDetector: ChangeDetectorRef,
    private employeeService: EmployeeService,
    private rendezVousService: RendezVousService,
    private dialog: MatDialog,
    private dialogHT: MatDialog) {
    this.route.params.subscribe(params => {
      const id = params['id'];
      console.log('Identifiant de l\'employé:', id);
      this.getRendezVousByEmploye(id);
      this.updateCalendarOptions();
    });
  }

  getRendezVousByEmploye(id: string) {
    this.employeeService.getEmployeeById(id).subscribe(data => {
      console.log("🚀 ~ Employee By Id ~ data:", data);
      this.employee = data as IEmployee;
    });
    this.employeeService.getListRendezVous(id).subscribe(data => {
      console.log("🚀 ~ Rendezvous by employe ~ data:", data);
      this.event_list = this.rendezVousService.transformRendezVousData(data);
    });
  }

  updateCalendarOptions() {
    this.calendarOptions.update(options => ({
      ...options,
      initialEvents: this.event_list
    }));
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
    locales: [frLocale],
    locale: 'fr',
    headerToolbar: {
      left: 'prev,next today',
      center: 'title',
      right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek'
    },
    initialView: 'timeGridWeek',
    initialEvents: this.event_list,
    weekends: true,
    editable: true,
    selectable: false,
    selectMirror: true,
    dayMaxEvents: true,
    // select: this.handleDateSelect.bind(this),
    eventClick: this.handleEventClick.bind(this),
    eventsSet: this.handleEvents.bind(this),
    // slotMinTime: '08:00:00',
    // slotMaxTime: '19:00:00'
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

    calendarApi.unselect();

    if (title) {
      calendarApi.addEvent({
        id: uuidv4(),
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
    this.updateCalendarOptions();
    this.currentEvents.set(events);
    this.changeDetector.detectChanges();
  }

  openModalAjoutHoraireTravail() {
    this.dialogHT.open(AjoutHoraireTravailComponent);
  }

  joursSemaine = ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche'];
  dateActuelle = new Date();
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

