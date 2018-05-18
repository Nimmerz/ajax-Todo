// @flow

import {InterviewList} from './interviewlist';
import {list, mainUrl, key} from './interviewlist';

export class InterviewPlate {
    addCard: boolean;
    editMode: boolean;
    id: string;
    fullName: string;
    birthDate: string;
    phoneNumber: string;
    interviewNotes: string;
    parent: any;
    li: HTMLElement;
    inputName: any;
    inputDate: any;
    inputPhone: any;
    inputText: any;
    value: string;

    constructor(item: any, parent: any) {
        if (parent) {
            this.addCard = false;
            this.editMode = false;
            this.id = item._id.$oid;
            this.fullName = item.fullName;
            this.birthDate = item.birthDate;
            this.phoneNumber = item.phoneNumber;
            this.interviewNotes = item.interviewNotes;
            this.parent = parent;
        }
        else {
            this.addCard = true;
            this.editMode = true;
            this.fullName = '';
            this.birthDate = '';
            this.phoneNumber = '';
            this.interviewNotes = '';
            this.parent = item;
        }
        this.li = document.createElement('li');
        this.inputName = document.createElement('input');
        this.inputName.classList.add('input-name');
        this.inputName.value = this.fullName;
        this.inputDate = document.createElement('input');
        this.inputDate.classList.add('input-date');
        this.inputDate.setAttribute('type', 'date');
        this.inputDate.value = this.birthDate;
        this.inputPhone = document.createElement('input');
        this.inputPhone.classList.add('input-phone');
        this.inputPhone.value = this.phoneNumber;
        this.inputText = document.createElement('textarea');
        this.inputText.classList.add('input-area');
        this.inputText.value = this.interviewNotes;
    }

    destroy() {
        const options = {
            method: 'delete'
        };
        fetch(`${mainUrl}/${this.id}${key}`, options)
            .then(() => {
                this.parent.removeChild(this.li);
            });
    }

    remove() {
        this.value = '';
    }

    update() {
        const body = JSON.stringify({
            fullName: this.inputName.value,
            birthDate: this.inputDate.value,
            phoneNumber: this.inputPhone.value,
            interviewNotes: this.inputText.value
        });
        const options = {
            method: 'put',
            headers: {
                "Content-Type": "application/json"
            },
            body
        };
        fetch(`${mainUrl}/${this.id}${key}`, options)
            .then(res => res.json())
            .then(res => list.getList());
        this.render();
    }

    erase() {
        this.inputName.value = '';
        this.inputDate.value = '';
        this.inputPhone.value = '';
        this.inputText.value = '';
    }

    edit() {
        this.editMode = true;
        this.render();
    }

    cancel() {
        this.editMode = false;
        this.render();
    }

    addItem() {
        const body = JSON.stringify({
            fullName: this.inputName.value,
            birthDate: this.inputDate.value,
            phoneNumber: this.inputPhone.value,
            interviewNotes: this.inputText.value
        });
        const options = {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body
        };

        fetch(`${mainUrl}${key}`, options)
            .then(res => res.json())
            .then(res => {
                const newCard = new InterviewPlate(res, this.parent);
                this.parent.appendChild(newCard.render());
                this.inputName.value = '';
                this.inputDate.value = '';
                this.inputPhone.value = '';
                this.inputText.value = '';
            })
    }

    render() {
        this.li.innerText = '';
        this.li.classList.add('list-item');
        let headers = document.createElement('span');
        headers.classList.add('label');
        this.li.appendChild(headers);

        if (this.editMode) {
            let labelName = document.createElement('span');
            labelName.innerText = 'Full name';
            labelName.classList.add('label-text');
            if (!this.addCard) {
                const remove = document.createElement('button');
                remove.classList.add('remove-input');
                remove.addEventListener('click', this.remove.bind(this.inputName));
                this.li.appendChild(remove);
            }
            this.li.appendChild(labelName);
            this.li.appendChild(this.inputName);

        } else {
            let labelName = document.createElement('span');
            let inputName = document.createElement('p');
            labelName.innerText = 'Full name';
            inputName.classList.add('input-name');
            labelName.classList.add('label-text');
            inputName.innerText = this.fullName;
            this.li.appendChild(labelName);
            this.li.appendChild(inputName);
        }

        if (this.editMode) {
            let labelDate = document.createElement('span');
            labelDate.innerText = 'Birth date';
            labelDate.classList.add('label-text');
            if (!this.addCard) {
                const remove = document.createElement('button');
                remove.classList.add('remove-input');
                remove.addEventListener('click', this.remove.bind(this.inputDate));
                this.li.appendChild(remove);
            }
            this.li.appendChild(labelDate);
            this.li.appendChild(this.inputDate);
            this.inputDate.readOnly = false;

        } else {
            let inputDate = document.createElement('input');
            let labelDate = document.createElement('span');
            labelDate.innerText = 'Birth date';
            labelDate.classList.add('label-text');
            inputDate.classList.add('input-date');
            inputDate = this.inputDate;
            inputDate.readOnly = true;
            this.li.appendChild(labelDate);
            this.li.appendChild(inputDate);
        }

        if (this.editMode) {
            let labelPhone = document.createElement('span');
            labelPhone.innerText = 'Phone number';
            labelPhone.classList.add('label-text');
            if (!this.addCard) {
                const remove = document.createElement('button');
                remove.classList.add('remove-input');
                remove.addEventListener('click', this.remove.bind(this.inputPhone))
                this.li.appendChild(remove);
            }
            this.li.appendChild(labelPhone);
            this.li.appendChild(this.inputPhone);

        } else {
            let inputPhone = document.createElement('p');
            let labelPhone = document.createElement('span');
            labelPhone.innerText = 'Phone number';
            labelPhone.classList.add('label-text');
            inputPhone.classList.add('input-phone');
            inputPhone.innerText = this.phoneNumber;
            this.li.appendChild(labelPhone);
            this.li.appendChild(inputPhone);
        }

        if (this.editMode) {
            let labelInterview = document.createElement('span');
            labelInterview.innerText = 'Interview';
            labelInterview.classList.add('label-text');
            if (!this.addCard) {
                const remove = document.createElement('button');
                remove.classList.add('remove-input');
                remove.addEventListener('click', this.remove.bind(this.inputText));
                this.li.appendChild(remove);
            }
            this.li.appendChild(labelInterview);
            this.li.appendChild(this.inputText);

        } else {
            let inputText = document.createElement('p');
            let labelInterview = document.createElement('span');
            labelInterview.innerText = 'Interview';
            labelInterview.classList.add('label-text');
            inputText.classList.add('input-area');
            inputText.innerText = this.interviewNotes;
            this.li.appendChild(labelInterview);
            this.li.appendChild(inputText);
        }
        const buttonBlock = document.createElement('div');
        buttonBlock.classList.add('buttons');
        this.li.appendChild(buttonBlock);
        if (this.addCard) {
            const erase = document.createElement('button');
            erase.classList.add('erase');
            erase.addEventListener('click', this.erase.bind(this));
            buttonBlock.appendChild(erase);
            const add = document.createElement('button');
            add.innerText = '+';
            add.classList.add('button-plus');
            add.addEventListener('click', this.addItem.bind(this));
            buttonBlock.appendChild(add);

        } else {
            if (this.editMode) {
                const save = document.createElement('button');
                save.classList.add('save');
                save.addEventListener('click', this.update.bind(this));
                const cancel = document.createElement('button');
                cancel.classList.add('cancel');
                cancel.addEventListener('click', this.cancel.bind(this));
                buttonBlock.appendChild(save);
                buttonBlock.appendChild(cancel);

            } else {
                const edit = document.createElement('button');
                edit.classList.add('edit');
                edit.addEventListener('click', this.edit.bind(this));
                const del = document.createElement('button');
                del.classList.add('remove');
                del.addEventListener('click', this.destroy.bind(this));
                buttonBlock.appendChild(edit);
                buttonBlock.appendChild(del);
            }
        }
        return this.li;
    }
}

