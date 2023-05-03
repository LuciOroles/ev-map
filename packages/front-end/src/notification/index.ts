
import { getProxyStations } from "../api";
import { Company, Origin } from "../types";

const anyCompany = "___";

export function companyListSelector(companyList: Company[]) {
    const selector = document.createElement('select');

    let option = document.createElement('option');
    option.setAttribute("value", anyCompany);
    option.innerText = 'Any';
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
    btn.addEventListener('click', () => {
        resetOrigin(origin);
        notify.style.display = 'none';
    });

    return btn;
}

export function createSearchNotification(notify: HTMLElement, origin: Origin, companies: Company[]) {
    const companySelect = companyListSelector(companies)
    const nrInput = document.createElement('input');
    nrInput.setAttribute('type', 'number');
    nrInput.classList.add('radius');
    nrInput.setAttribute('max', "800");
    nrInput.setAttribute('min', "10");

    const label = document.createElement('div');
    label.innerText = "Search Range";
    const proxySearch = document.createElement('button');
    proxySearch.setAttribute('type', 'button');
    proxySearch.innerText = "search";
    proxySearch.addEventListener('click', async () => {
        let company_id;
        let radius;
        if (companySelect.value == anyCompany) {
            company_id = null;
        } else {
            company_id = companySelect.value;
        }
        debugger;
        if (typeof nrInput.value === 'string') {
            let _temp = Number.parseInt(nrInput.value);
            if (_temp < 800 && _temp > 0) {
                radius =_temp;
            }
        }
        if (radius && company_id !== undefined) {
            const results = await getProxyStations({
                cx: origin.coords.cx,
                cy: origin.coords.cy,
                radius,
                company_id
            });

        } else {
            let invalidMessage = ""
            if (!radius) {
                invalidMessage = "Invalid radius!\n";
            }
            if (company_id === undefined) {
                invalidMessage += "Invalid company!\n"
            }
            alert(invalidMessage);
        }

    });


    const container = document.createElement('div');
    container.appendChild(label);
    container.appendChild(nrInput);
    container.appendChild(companySelect);
    const footer = document.createElement('div');
    footer.classList.add('action-bar')
    footer.appendChild(proxySearch);

    footer.appendChild(createResetButton(notify, origin));

    container.appendChild(footer);

    (notify.childNodes[1] as HTMLDivElement).innerHTML = "";
    notify.childNodes[1].appendChild(container);
}


