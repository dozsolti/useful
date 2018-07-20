<h1>Ordinea atributelor in html </h1>
<p>Ex.: <ion-list no-lines reorder="true" class="phrases-container" (ionItemReorder)="reorderItems($event)"> </p>
<ul>
	<li> atribute fara valoare explicita (din exemplu: no-lines)</li>
	<li> atribute pentru configurarea componentului (din exemplu: reorder="true")</li>
	<li> atribute definite de catre mine care nu au legatura de event sau binding (din exemplu: class="phrases-container")</li>
	<li> atribute de binding sau events (din exemplu: (ionItemReorder)="reorderItems($event)")</li>
</ul>
<h1>Conventii</h1>
<h3>constructor-ul unei clase</h3>
<ul>
        <li>Pe prima linie: componente ionic implicite: Toast,Event,Alert etc</li>
        <li>Pe linia a doua: componente ionic care trebuiesc instalate(cele Native): Camera etc</li>
        <li>Pe linia a treia: providerele mele </li>
</ul>
<li> Data pipe: <code>| date : 'dd MMM. yyyy HH:mm'</code></li>
<h1>Error Manager</h1>
<h3>in API (endpointuri)</h3>
<pre>
	statuses:
		success:
			ex. {status:"success",content:...}
			lucrurile in aplicatie continua
		warning:
			ex. {status:"warning",message:"..."}
			actiunea nu s-a putut efectua dintr-un motiv. ( message-ul va contine motivul )	
		error:
			ex. {status:"warning",message:"..."}
                        s-a intamplat ceva, trebuie redirectionat catre pagina de logare
</pre>
<h3>in APP (app.component.ts)</h3>
<pre>
ErrorManager:
        Manager(err){
               if(err.status>=200 && err.status<300){
                        this.ManageResponse(err.json());
               }else
                        this.ManagerConnection(err);
        }
        ManageResponse(err){
                let status = err.status;
                if(status==="success")
                        return;
                if(status==="warning")
                        ShowWarningAlert(err.message);
                else if(status==="error"){
                        ShowErrorAlert(err.message);
                        logout
                        setRoot('LoginPage');
                }
        }
        ManagerConnection(err){
                let code = err.status;
                if(code === 0){
                        // ?
                }
                if(code === 401){
                        // show warning alert
                }else if(code===500){
                        // show warning alert
                }
        }
</pre>