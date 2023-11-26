import React, { Component, useState } from 'react';
import { View, Text, ScrollView, Dimensions, TouchableOpacity, Linking } from 'react-native';
import { Header } from '../components/header';

const isCloseToBottom = ({ layoutMeasurement, contentOffset, contentSize }) => {
  const paddingToBottom = 20;
  return layoutMeasurement.height + contentOffset.y >=
    contentSize.height - paddingToBottom;
};

export default function TermsAndConditions({ navigation }) {

  const [accepted, setAccepted] = useState(false)
  return (
    <>
      <Header />
      <View style={styles.container}>
        <Text style={styles.title}>Termini e condizioni</Text>
        <ScrollView
          style={styles.tcContainer}
          onScroll={({ nativeEvent }) => {
            if (isCloseToBottom(nativeEvent)) {
              setAccepted(true)
            }
          }}
          scrollEventThrottle={30}
        >
          <Text>Questa Applicazione raccoglie alcuni Dati Personali dei propri Utenti.

            Questo documento può essere stampato utilizzando il comando di stampa presente nelle impostazioni di qualsiasi browser.

            Titolare del Trattamento dei Dati

            German Federico Ryjluk - Corso Racconigi 152, 10141 Torino, Italia

            Indirizzo email del Titolare: adtcup07@gmail.com

            Tipologie di Dati raccolti

            Fra i Dati Personali raccolti da questa Applicazione, in modo autonomo o tramite terze parti, ci sono: nome; cognome; email; username; password; posizione precisa.

            Dettagli completi su ciascuna tipologia di Dati Personali raccolti sono forniti nelle sezioni dedicate di questa privacy policy o mediante specifici testi informativi visualizzati prima della raccolta dei Dati stessi.
            I Dati Personali possono essere liberamente forniti dall'Utente o, nel caso di Dati di Utilizzo, raccolti automaticamente durante l'uso di questa Applicazione.
            Se non diversamente specificato, tutti i Dati richiesti da questa Applicazione sono obbligatori. Se l’Utente rifiuta di comunicarli, potrebbe essere impossibile per questa Applicazione fornire il Servizio. Nei casi in cui questa Applicazione indichi alcuni Dati come facoltativi, gli Utenti sono liberi di astenersi dal comunicare tali Dati, senza che ciò abbia alcuna conseguenza sulla disponibilità del Servizio o sulla sua operatività.
            Gli Utenti che dovessero avere dubbi su quali Dati siano obbligatori sono incoraggiati a contattare il Titolare.
            L’eventuale utilizzo di Cookie - o di altri strumenti di tracciamento - da parte di questa Applicazione o dei titolari dei servizi terzi utilizzati da questa Applicazione ha la finalità di fornire il Servizio richiesto dall'Utente, oltre alle ulteriori finalità descritte nel presente documento.

            L'Utente si assume la responsabilità dei Dati Personali di terzi ottenuti, pubblicati o condivisi mediante questa Applicazione.

            Modalità e luogo del trattamento dei Dati raccolti

            Modalità di trattamento

            Il Titolare adotta le opportune misure di sicurezza volte ad impedire l’accesso, la divulgazione, la modifica o la distruzione non autorizzate dei Dati Personali.
            Il trattamento viene effettuato mediante strumenti informatici e/o telematici, con modalità organizzative e con logiche strettamente correlate alle finalità indicate. Oltre al Titolare, in alcuni casi, potrebbero avere accesso ai Dati altri soggetti coinvolti nell’organizzazione di questa Applicazione (personale amministrativo, commerciale, marketing, legali, amministratori di sistema) ovvero soggetti esterni (come fornitori di servizi tecnici terzi, corrieri postali, hosting provider, società informatiche, agenzie di comunicazione) nominati anche, se necessario, Responsabili del Trattamento da parte del Titolare. L’elenco aggiornato dei Responsabili potrà sempre essere richiesto al Titolare del Trattamento.

            Luogo

            I Dati sono trattati presso le sedi operative del Titolare ed in ogni altro luogo in cui le parti coinvolte nel trattamento siano localizzate. Per ulteriori informazioni, contatta il Titolare.
            I Dati Personali dell’Utente potrebbero essere trasferiti in un paese diverso da quello in cui l’Utente si trova. Per ottenere ulteriori informazioni sul luogo del trattamento l’Utente può fare riferimento alla sezione relativa ai dettagli sul trattamento dei Dati Personali.

            Periodo di conservazione

            Se non diversamente indicato in questo documento, i Dati Personali sono trattati e conservati per il tempo richiesto dalla finalità per la quale sono stati raccolti e potrebbero essere conservati per un periodo più lungo a causa di eventuali obbligazioni legali o sulla base del consenso degli Utenti.

            Finalità del Trattamento dei Dati raccolti

            I Dati dell’Utente sono raccolti per consentire al Titolare di fornire il Servizio, adempiere agli obblighi di legge, rispondere a richieste o azioni esecutive, tutelare i propri diritti ed interessi (o quelli di Utenti o di terze parti), individuare eventuali attività dolose o fraudolente, nonché per le seguenti finalità: Registrazione ed autenticazione e Interazioni basate sulla posizione.

            Per ottenere informazioni dettagliate sulle finalità del trattamento e sui Dati Personali trattati per ciascuna finalità, l’Utente può fare riferimento alla sezione “Dettagli sul trattamento dei Dati Personali”.

            Dettagli sul trattamento dei Dati Personali

            I Dati Personali sono raccolti per le seguenti finalità ed utilizzando i seguenti servizi:

            Interazioni basate sulla posizione

            Geolocalizzazione non continua (questa Applicazione)

            Questa Applicazione può raccogliere, usare e condividere i Dati relativi alla posizione geografica dell’Utente, al fine di fornire servizi basati sulla posizione stessa.
            La maggior parte dei browser e dei dispositivi fornisce in modo predefinito degli strumenti per negare il tracciamento geografico. Qualora l’Utente abbia espressamente autorizzato tale possibilità, questa Applicazione può ricevere informazioni sulla sua effettiva posizione geografica.
            La localizzazione geografica dell’Utente avviene in maniera non continua, dietro specifica richiesta dell’Utente ovvero quando l’Utente non indichi nell’apposito campo il luogo in cui si trova e consenta all’applicazione il rilevamento automatico della posizione.

            Dati Personali trattati: posizione precisa.

            Registrazione ed autenticazione

            Con la registrazione o l’autenticazione l’Utente consente a questa Applicazione di identificarlo e di dargli accesso a servizi dedicati.
            A seconda di quanto indicato di seguito, i servizi di registrazione e di autenticazione potrebbero essere forniti con l’ausilio di terze parti. Qualora questo avvenga, questa Applicazione potrà accedere ad alcuni Dati conservati dal servizio terzo usato per la registrazione o l’identificazione.
            Alcuni dei servizi di seguito indicati potrebbero raccogliere Dati Personali anche per fini di targeting e profilazione; per saperne di più, si prega di fare riferimento alla descrizione di ciascun servizio.

            Firebase Authentication (Google LLC)

            Firebase Authentication è un servizio di registrazione ed autenticazione fornito da Google LLC. Per semplificare il processo di registrazione ed autenticazione, Firebase Authentication può utilizzare fornitori di identità di terze parti e salvare le informazioni sulla propria piattaforma.

            Dati Personali trattati: cognome; email; nome; password; username.

            Luogo del trattamento: Stati Uniti – Privacy Policy

            Ulteriori informazioni per gli utenti

            Base giuridica del trattamento

            Il Titolare tratta Dati Personali relativi all’Utente in caso sussista una delle seguenti condizioni:

            l’Utente ha prestato il consenso per una o più finalità specifiche; Nota: in alcuni ordinamenti il Titolare può essere autorizzato a trattare Dati Personali senza che debba sussistere il consenso dell’Utente o un’altra delle basi giuridiche specificate di seguito, fino a quando l’Utente non si opponga (“opt-out”) a tale trattamento. Ciò non è tuttavia applicabile qualora il trattamento di Dati Personali sia regolato dalla legislazione europea in materia di protezione dei Dati Personali;

            il trattamento è necessario all'esecuzione di un contratto con l’Utente e/o all'esecuzione di misure precontrattuali;

            il trattamento è necessario per adempiere un obbligo legale al quale è soggetto il Titolare;

            il trattamento è necessario per l'esecuzione di un compito di interesse pubblico o per l'esercizio di pubblici poteri di cui è investito il Titolare;

            il trattamento è necessario per il perseguimento del legittimo interesse del Titolare o di terzi.

            È comunque sempre possibile richiedere al Titolare di chiarire la concreta base giuridica di ciascun trattamento ed in particolare di specificare se il trattamento sia basato sulla legge, previsto da un contratto o necessario per concludere un contratto.

            Ulteriori informazioni sul tempo di conservazione

            Se non diversamente indicato in questo documento, i Dati Personali sono trattati e conservati per il tempo richiesto dalla finalità per la quale sono stati raccolti e potrebbero essere conservati per un periodo più lungo a causa di eventuali obbligazioni legali o sulla base del consenso degli Utenti.

            Pertanto:

            I Dati Personali raccolti per scopi collegati all’esecuzione di un contratto tra il Titolare e l’Utente saranno trattenuti sino a quando sia completata l’esecuzione di tale contratto.

            I Dati Personali raccolti per finalità riconducibili all’interesse legittimo del Titolare saranno trattenuti sino al soddisfacimento di tale interesse. L’Utente può ottenere ulteriori informazioni in merito all’interesse legittimo perseguito dal Titolare nelle relative sezioni di questo documento o contattando il Titolare.

            Quando il trattamento è basato sul consenso dell’Utente, il Titolare può conservare i Dati Personali più a lungo sino a quando detto consenso non venga revocato. Inoltre, il Titolare potrebbe essere obbligato a conservare i Dati Personali per un periodo più lungo in ottemperanza ad un obbligo di legge o per ordine di un’autorità.

            Al termine del periodo di conservazione i Dati Personali saranno cancellati. Pertanto, allo spirare di tale termine il diritto di accesso, cancellazione, rettificazione ed il diritto alla portabilità dei Dati non potranno più essere esercitati.

            Diritti dell’Utente

            Gli Utenti possono esercitare determinati diritti con riferimento ai Dati trattati dal Titolare.

            In particolare, nei limiti previsti dalla legge, l’Utente ha il diritto di:

            revocare il consenso in ogni momento. L’Utente può revocare il consenso al trattamento dei propri Dati Personali precedentemente espresso.

            opporsi al trattamento dei propri Dati. L’Utente può opporsi al trattamento dei propri Dati quando esso avviene in virtù di una base giuridica diversa dal consenso.

            accedere ai propri Dati. L’Utente ha diritto ad ottenere informazioni sui Dati trattati dal Titolare, su determinati aspetti del trattamento ed a ricevere una copia dei Dati trattati.

            verificare e chiedere la rettificazione. L’Utente può verificare la correttezza dei propri Dati e richiederne l’aggiornamento o la correzione.

            ottenere la limitazione del trattamento. L’Utente può richiedere la limitazione del trattamento dei propri Dati. In tal caso il Titolare non tratterà i Dati per alcun altro scopo se non la loro conservazione.

            ottenere la cancellazione o rimozione dei propri Dati Personali. L’Utente può richiedere la cancellazione dei propri Dati da parte del Titolare.

            ricevere i propri Dati o farli trasferire ad altro titolare. L’Utente ha diritto di ricevere i propri Dati in formato strutturato, di uso comune e leggibile da dispositivo automatico e, ove tecnicamente fattibile, di ottenerne il trasferimento senza ostacoli ad un altro titolare.

            proporre reclamo. L’Utente può proporre un reclamo all’autorità di controllo della protezione dei dati personali competente o agire in sede giudiziale.

            Gli Utenti hanno diritto di ottenere informazioni in merito alla base giuridica per il trasferimento di Dati all'estero incluso verso qualsiasi organizzazione internazionale regolata dal diritto internazionale o costituita da due o più paesi, come ad esempio l’ONU, nonché in merito alle misure di sicurezza adottate dal Titolare per proteggere i loro Dati.

            Dettagli sul diritto di opposizione

            Quando i Dati Personali sono trattati nell’interesse pubblico, nell’esercizio di pubblici poteri di cui è investito il Titolare oppure per perseguire un interesse legittimo del Titolare, gli Utenti hanno diritto ad opporsi al trattamento per motivi connessi alla loro situazione particolare.

            Si fa presente agli Utenti che, ove i loro Dati fossero trattati con finalità di marketing diretto, possono opporsi al trattamento in qualsiasi momento, gratuitamente e senza fornire alcuna motivazione. Qualora gli Utenti si oppongano al trattamento per finalità di marketing diretto, i Dati Personali non sono più oggetto di trattamento per tali finalità. Per scoprire se il Titolare tratti Dati con finalità di marketing diretto gli Utenti possono fare riferimento alle rispettive sezioni di questo documento.

            Come esercitare i diritti

            Per esercitare i propri diritti, gli Utenti possono indirizzare una richiesta ai recapiti del Titolare indicati in questo documento. La richiesta può essere depositate gratuitamente e il Titolare risponderà nel più breve tempo possibile, in ogni caso entro un mese, fornendo all’Utente tutte le informazioni previste dalla legge. Eventuali rettifiche, cancellazioni o limitazioni del trattamento saranno comunicate dal Titolare a ciascuno dei destinatari, se esistenti, a cui sono stati trasmessi i Dati Personali, salvo che ciò si riveli impossibile o implichi uno sforzo sproporzionato. Il Titolare comunica all'Utente tali destinatari qualora egli lo richieda.

            Ulteriori informazioni sul trattamento

            Difesa in giudizio

            I Dati Personali dell’Utente possono essere utilizzati da parte del Titolare in giudizio o nelle fasi preparatorie alla sua eventuale instaurazione per la difesa da abusi nell'utilizzo di questa Applicazione o dei Servizi connessi da parte dell’Utente.
            L’Utente dichiara di essere consapevole che il Titolare potrebbe essere obbligato a rivelare i Dati per ordine delle autorità pubbliche.

            Informative specifiche

            Su richiesta dell’Utente, in aggiunta alle informazioni contenute in questa privacy policy, questa Applicazione potrebbe fornire all'Utente delle informative aggiuntive e contestuali riguardanti Servizi specifici, o la raccolta ed il trattamento di Dati Personali.

            Log di sistema e manutenzione

            Per necessità legate al funzionamento ed alla manutenzione, questa Applicazione e gli eventuali servizi terzi da essa utilizzati potrebbero raccogliere log di sistema, ossia file che registrano le interazioni e che possono contenere anche Dati Personali, quali l’indirizzo IP Utente.

            Informazioni non contenute in questa policy

            Ulteriori informazioni in relazione al trattamento dei Dati Personali potranno essere richieste in qualsiasi momento al Titolare del Trattamento utilizzando gli estremi di contatto.

            Modifiche a questa privacy policy

            Il Titolare del Trattamento si riserva il diritto di apportare modifiche alla presente privacy policy in qualunque momento notificandolo agli Utenti su questa pagina e, se possibile, su questa Applicazione nonché, qualora tecnicamente e legalmente fattibile, inviando una notifica agli Utenti attraverso uno degli estremi di contatto di cui è in possesso. Si prega dunque di consultare con frequenza questa pagina, facendo riferimento alla data di ultima modifica indicata in fondo.

            Qualora le modifiche interessino trattamenti la cui base giuridica è il consenso, il Titolare provvederà a raccogliere nuovamente il consenso dell’Utente, se necessario.

            Definizioni e riferimenti legali

            Dati Personali (o Dati)

            Costituisce dato personale qualunque informazione che, direttamente o indirettamente, anche in collegamento con qualsiasi altra informazione, ivi compreso un numero di identificazione personale, renda identificata o identificabile una persona fisica.

            Dati di Utilizzo

            Sono le informazioni raccolte automaticamente attraverso questa Applicazione (anche da applicazioni di parti terze integrate in questa Applicazione), tra cui: gli indirizzi IP o i nomi a dominio dei computer utilizzati dall’Utente che si connette con questa Applicazione, gli indirizzi in notazione URI (Uniform Resource Identifier), l’orario della richiesta, il metodo utilizzato nell’inoltrare la richiesta al server, la dimensione del file ottenuto in risposta, il codice numerico indicante lo stato della risposta dal server (buon fine, errore, ecc.) il paese di provenienza, le caratteristiche del browser e del sistema operativo utilizzati dal visitatore, le varie connotazioni temporali della visita (ad esempio il tempo di permanenza su ciascuna pagina) e i dettagli relativi all’itinerario seguito all’interno dell’Applicazione, con particolare riferimento alla sequenza delle pagine consultate, ai parametri relativi al sistema operativo e all’ambiente informatico dell’Utente.

            Utente

            L'individuo che utilizza questa Applicazione che, salvo ove diversamente specificato, coincide con l'Interessato.

            Interessato

            La persona fisica cui si riferiscono i Dati Personali.

            Responsabile del Trattamento (o Responsabile)

            La persona fisica, giuridica, la pubblica amministrazione e qualsiasi altro ente che tratta dati personali per conto del Titolare, secondo quanto esposto nella presente privacy policy.

            Titolare del Trattamento (o Titolare)

            La persona fisica o giuridica, l'autorità pubblica, il servizio o altro organismo che, singolarmente o insieme ad altri, determina le finalità e i mezzi del trattamento di dati personali e gli strumenti adottati, ivi comprese le misure di sicurezza relative al funzionamento ed alla fruizione di questa Applicazione. Il Titolare del Trattamento, salvo quanto diversamente specificato, è il titolare di questa Applicazione.

            Questa Applicazione

            Lo strumento hardware o software mediante il quale sono raccolti e trattati i Dati Personali degli Utenti.

            Servizio

            Il Servizio fornito da questa Applicazione così come definito nei relativi termini (se presenti) su questo sito/applicazione.

            Unione Europea (o UE)

            Salvo ove diversamente specificato, ogni riferimento all’Unione Europea contenuto in questo documento si intende esteso a tutti gli attuali stati membri dell’Unione Europea e dello Spazio Economico Europeo.

            Riferimenti legali

            Ove non diversamente specificato, questa informativa privacy riguarda esclusivamente questa Applicazione.</Text>
        </ScrollView>

        <View style={{ flexDirection: 'row', justifyContent: 'space-around', bottom: 10 }}>
          <TouchableOpacity disabled={!accepted} onPress={() => { navigation.goBack() }} style={accepted ? styles.button : styles.buttonDisabled}><Text style={styles.buttonLabel}>Accetta</Text></TouchableOpacity>
          <TouchableOpacity onPress={() => { Linking.openURL('https://adtcupdeleteaccount.web.app/privacyPolicy.html') }} style={styles.button}><Text style={styles.buttonLabel}>Leggi formattato</Text></TouchableOpacity>
        </View>
      </View>
    </>
  );
}

const { width, height } = Dimensions.get('window');

const styles = {

  container: {
    marginTop: 20,
    marginLeft: 10,
    marginRight: 10
  },
  title: {
    fontSize: 22,
    alignSelf: 'center'
  },
  tcP: {
    marginTop: 10,
    marginBottom: 10,
    fontSize: 12
  },
  tcP: {
    marginTop: 10,
    fontSize: 12
  },
  tcL: {
    marginLeft: 10,
    marginTop: 10,
    marginBottom: 10,
    fontSize: 12
  },
  tcContainer: {
    marginTop: 15,
    marginBottom: 15,
    height: height * .7
  },

  button: {
    backgroundColor: '#136AC7',
    borderRadius: 5,
    padding: 10
  },

  buttonDisabled: {
    backgroundColor: '#999',
    borderRadius: 5,
    padding: 10
  },

  buttonLabel: {
    fontSize: 14,
    color: '#FFF',
    alignSelf: 'center'
  }

}