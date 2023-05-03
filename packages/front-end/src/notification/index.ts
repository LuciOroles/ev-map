
import { Company, Origin } from "../types";


export function companyListSelector (companyList: Company[]) {
    const selector = document.createElement('select');
    
    let option = document.createElement('option');
    option.setAttribute("value", "___");
    option.innerText = 'All';
    selector.appendChild(option);
    for (const company of companyList) {
         option = document.createElement('option');
        option.setAttribute("value", company.id);
        option.innerText = company.name;
        selector.appendChild(option);
    }

    return selector;
}

export const notificationCreator = function () {
    let notifyElement = document.createElement('div');
    notifyElement.style.position = "absolute";
    notifyElement.classList.add('address-details');

    let notifyBody = document.createElement('div');
    const closeBtn = document.createElement('div');
    closeBtn.classList.add('close-btn')
    closeBtn.innerHTML = "&times;"
    closeBtn.addEventListener('click', (e) => {
        notifyElement.style.display = 'none';
    });

    notifyElement.appendChild(closeBtn);
    notifyElement.appendChild(notifyBody);
    
    return notifyElement;

};

function resetOrigin(origin: Origin) {
    if (origin.ref) {
        origin.ref.remove();
        origin.ref = null;
    }
}

export function createResetButton(notify: HTMLElement, origin: Origin) {
    const btn = document.createElement('button');
    btn.setAttribute('type', 'button');
    btn.innerText = 'reset';
    btn.addEventListener('click' , () => { 
        resetOrigin(origin);
        notify.style.display = 'none';
    });

    return btn;
}

export function createSearchNotification(notify: HTMLElement, origin: Origin, companies: Company []) {
    const nrInput = document.createElement('input');
    nrInput.setAttribute('type', 'number');
    nrInput.classList.add('radius');
    nrInput.setAttribute('max', "800");
    nrInput.setAttribute('min', "10");

    const label = document.createElement('div');
    label.innerText="Search Range";
    const btn = document.createElement('button');
    btn.setAttribute('type', 'button');
    btn.innerText="search";

    
    const container = document.createElement('div');
    container.appendChild(label);
    container.appendChild(nrInput);
    container.appendChild(companyListSelector(companies));
    const footer = document.createElement('div');

    footer.appendChild(btn);
    
    footer.appendChild(createResetButton(notify, origin));

    container.appendChild(footer);

    (notify.childNodes[1] as HTMLDivElement).innerHTML = "";
    notify.childNodes[1].appendChild(container);     
}


 