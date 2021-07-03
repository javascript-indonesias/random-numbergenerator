import { calculationRandomByRangeInclusive } from './random-number-helper';
import ToastModalInitiator from './toast-dialog-initiator';
import getYearDate from './date-utils';
import createListResultTemplate from './result-template-creator';
import { showElement, hideElement } from './show-hide-utils';

const AppNumberGeneratorPage = {
    init() {
        this.startRangeEl = document.querySelector('#input-start-range');
        this.endRangeEl = document.querySelector('#input-end-range');
        this.maxDataResultEl = document.querySelector('#input-maxresult');
        this.buttonRandomEl = document.querySelector('.action-button');
        this.h3FooterEl = document.querySelector('.footer h3');
        this.resultListDiv = document.querySelector('.result-list');

        this.cardResultEl = document.querySelector('.card-result');

        this.dataInput = {
            lowerlimit: 1,
            upperlimit: 4,
            maxcount: 1,
        };

        ToastModalInitiator.init();
        this.initListenerButton();
        this.setDateFooter();

        hideElement(this.cardResultEl);
    },
    initListenerButton() {
        this.buttonRandomEl.addEventListener('click', (event) => {
            event.preventDefault();
            event.stopPropagation();

            this.checkDataInput();
        });

        this.h3FooterEl.addEventListener('click', (event) => {
            event.preventDefault();
            event.stopPropagation();

            this.openPageAbout();
        });
    },
    setDateFooter() {
        const intYear = getYearDate();
        this.h3FooterEl.innerHTML = `Gulajava &copy; ${intYear} - Random Number Generator`;
    },
    checkDataInput() {
        hideElement(this.cardResultEl);

        const intStartRange = Number.parseInt(this.startRangeEl.value, 10);
        const intEndRange = Number.parseInt(this.endRangeEl.value, 10);
        const intMaxDataResult = Number.parseInt(
            this.maxDataResultEl.value,
            10,
        );

        let scoreValidation = 0;
        let isMaxCountLargerUpperLimit = false;
        let isStartLargerEnd = false;
        const rangeStartEnd = intEndRange - intStartRange;
        const rangeStartEndInclusive = rangeStartEnd + 1;

        if (intStartRange && intStartRange > 0) {
            // give score
            scoreValidation += 1;
        }

        if (intEndRange && intEndRange > 2) {
            // give score
            scoreValidation += 3;
        }

        if (
            intMaxDataResult &&
            intMaxDataResult > 0 &&
            intMaxDataResult <= rangeStartEndInclusive
        ) {
            // give score
            scoreValidation += 5;
        }

        if (intMaxDataResult > rangeStartEndInclusive) {
            isMaxCountLargerUpperLimit = true;
        } else {
            isMaxCountLargerUpperLimit = false;
        }

        if (intStartRange > intEndRange) {
            isStartLargerEnd = true;
        }

        // check result
        switch (scoreValidation) {
            case 0:
                this.showToaster('Fill all available field');
                break;
            case 1:
                this.showToaster('Fill upper limit and result count');
                break;
            case 3:
                this.showToaster('Fill lower limit and result count');
                break;
            case 5:
                this.showToaster('Fill lower and upper limit');
                break;
            case 4:
                if (isStartLargerEnd) {
                    this.showToaster('lower limit is larger than upper limit');
                } else if (isMaxCountLargerUpperLimit) {
                    this.showToaster('Result count too large');
                } else {
                    this.showToaster('Fill result count');
                }
                break;
            case 6:
                this.showToaster('Fill upper limit');
                break;
            case 8:
                this.showToaster('Fill lower limit');
                break;
            case 9:
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

        showElement(this.cardResultEl);
    },
    openPageAbout() {
        const ahrefElement = document.createElement('a');
        ahrefElement.href =
            'https://github.com/javascript-indonesias/random-numbergenerator';
        ahrefElement.target = '_blank';
        ahrefElement.setAttribute('rel', 'noopener noreferrer');
        ahrefElement.click();
    },
    showToaster(message = '') {
        ToastModalInitiator.showToast(message);
    },
};

export default AppNumberGeneratorPage;
