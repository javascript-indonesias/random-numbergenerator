import { calculationRandomByRangeInclusive } from './random-number-helper';
import ToastModalInitiator from './toast-dialog-initiator';
import getYearDate from './date-utils';
import createListResultTemplate from './result-template-creator';

const AppNumberGeneratorPage = {
    init() {
        this.startRangeEl = document.querySelector('#input-start-range');
        this.endRangeEl = document.querySelector('#input-end-range');
        this.maxDataResultEl = document.querySelector('#input-maxresult');
        this.buttonRandomEl = document.querySelector('.action-button');
        this.h3FooterEl = document.querySelector('.footer h3');
        this.resultListDiv = document.querySelector('.result-list');

        this.dataInput = {
            lowerlimit: 1,
            upperlimit: 4,
            maxcount: 1,
        };

        ToastModalInitiator.init();
        this.initListenerButton();
        this.setDateFooter();
    },
    initListenerButton() {
        this.buttonRandomEl.addEventListener('click', (event) => {
            event.preventDefault();
            event.stopPropagation();

            this.checkDataInput();
        });
    },
    setDateFooter() {
        const intYear = getYearDate();
        this.h3FooterEl.innerHTML = `Copyright &copy; ${intYear} - Random Number Generator`;
    },
    checkDataInput() {
        const intStartRange = Number.parseInt(this.startRangeEl.value, 10);
        const intEndRange = Number.parseInt(this.endRangeEl.value, 10);
        const intMaxDataResult = Number.parseInt(
            this.maxDataResultEl.value,
            10,
        );

        let scoreValidation = 0;
        if (intStartRange && intStartRange > 0) {
            // give score
            scoreValidation += 1;
        }

        if (intEndRange && intEndRange > 2) {
            // give score
            scoreValidation += 2;
        }

        if (intMaxDataResult && intMaxDataResult > 0) {
            // give score
            scoreValidation += 3;
        }

        // check result
        switch (scoreValidation) {
            case 0:
                this.showToaster('Fill all available field');
                break;
            case 1:
                this.showToaster('Fill upper limit and maximum count');
                break;
            case 2:
                this.showToaster('Fill lower limit and maximum count');
                break;
            case 3:
                this.showToaster('Fill lower and upper limit');
                break;
            case 4:
                this.showToaster('Fill upper limit');
                break;
            case 5:
                this.showToaster('Fill lower limit');
                break;
            case 6:
                this.dataInput.lowerlimit = intStartRange;
                this.dataInput.upperlimit = intEndRange;
                this.dataInput.maxcount = intMaxDataResult;
                this.generateNumber();
                break;
            default:
                break;
        }
    },
    async generateNumber() {
        const resultArrayValue = await calculationRandomByRangeInclusive(
            this.dataInput,
        );

        this.setResultData(resultArrayValue);
    },
    async setResultData(resultlist) {
        const listRandomNumberEl = await createListResultTemplate(resultlist);
        this.resultListDiv.innerHTML = '';
        this.resultListDiv.appendChild(listRandomNumberEl);
    },
    showToaster(message = '') {
        ToastModalInitiator.showToast(message);
    },
};

export default AppNumberGeneratorPage;
