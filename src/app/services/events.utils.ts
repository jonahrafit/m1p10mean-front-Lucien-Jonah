import { EventInput } from '@fullcalendar/core';

let eventGuid = 0;
const TODAY_STR = new Date().toISOString().replace(/T.*$/, ''); // YYYY-MM-DD of today

// Fonction pour générer un nombre aléatoire dans une plage donnée
function getRandomInt(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Fonction pour générer un identifiant aléatoire
export function createEventId() {
    return String(eventGuid++);
}

// Fonction pour générer des rendez-vous aléatoires
export function generateRandomEvents(): EventInput[] {
    const events: EventInput[] = [];

    // Génération de 5 rendez-vous aléatoires
    for (let i = 0; i < 10; i++) {
        const clientId = createEventId();
        const serviceId = createEventId();
        const serviceDuration = getRandomInt(30, 120); // Durée du service en minutes (30 à 120 minutes)
        const serviceCommission = getRandomInt(5, 20) / 100; // Commission du service (5% à 20%)
        const date = new Date(Date.now() + getRandomInt(-7, 7) * 24 * 60 * 60 * 1000); // Date aléatoire dans les 7 jours à venir
        const startTime = new Date(date.getTime() + getRandomInt(9, 17) * 60 * 60 * 1000); // Heure de début aléatoire entre 9h et 17h
        const endTime = new Date(startTime.getTime() + serviceDuration * 60 * 1000); // Heure de fin calculée à partir de la durée du service

        events.push({
            id: createEventId(),
            title: 'Rendez-vous chez un salon de beauté',
            start: startTime,
            end: endTime,
            extendedProps: {
                client: {
                    id: clientId,
                    nom: `Client ${i + 1}`,
                    mail: 'client@gmail.com'
                },
                services: {
                    id: serviceId,
                    nom: `Service ${i + 1}`,
                    commission: serviceCommission,
                    duree: serviceDuration
                },
                fait: Math.random() < 0.5, // 50% de chance que le rendez-vous soit déjà fait
                date_created: new Date(),
                date_rendez_vous: startTime
            }
        });
    }

    return events;
}

// Utilisation de la fonction pour initialiser INITIAL_EVENTS
export const INITIAL_EVENTS: EventInput[] = generateRandomEvents();
