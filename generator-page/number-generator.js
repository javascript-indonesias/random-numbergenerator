import { calculationRandomByRangeInclusive } from './random-number-helper';
import ToastModalInitiator from './toast-dialog-initiator';

const AppNumberGeneratorPage = {
    init() {
        this.startRangeEl = document.querySelector('#input-start-range');
        this.endRangeEl = document.querySelector('#input-end-range');
        this.maxDataResultEl = document.querySelector('#input-maxresult');
        this.buttonRandomEl = document.querySelector('.action-button');

        this.dataInput = {
            lowerlimit: 1,
            upperlimit: 4,
            maxcount: 1,
        };

        ToastModalInitiator.init();
        this.initListenerButton();
    },
    initListenerButton() {
        this.buttonRandomEl.addEventListener('click', (event) => {
            event.preventDefault();
            event.stopPropagation();

            this.checkDataInput();
        });
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
        console.log(resultArrayValue);
    },
    setResultData() {},
    showToaster(message = '') {
        ToastModalInitiator.showToast(message);
    },
};

export default AppNumberGeneratorPage;
