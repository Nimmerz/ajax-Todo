
import {InterviewPlate} from './interviewplate';

const
    mainUrl = 'https://api.mlab.com/api/1/databases/tododb/collections/peoplecollection',
    key = '?apiKey=ixbm_zV4f9EQ6EfbzPqHMBn5wyDB4IVb';

export class InterviewList {
    list: Array<string>;
    ul: HTMLElement;
    constructor() {
        this.list = [];
        this.ul = document.createElement('ul');
    }

    getList() {
        fetch(`${mainUrl}${key}`)
            .then(res => res.json())
            .then(res => {
                this.list = res;
                this.drawList();
            })
    }

    drawList() {
        this.ul.innerText = '';
        const list = this.list.map(item => {
            const card = new InterviewPlate(item, this.ul);
            return card.render();
        });
        const addForm = new InterviewPlate(this.ul);
        this.ul.appendChild(addForm.render());
        list.forEach((item) => {
            this.ul.appendChild(item);
        });
        if(document.body) document.body.appendChild(this.ul);
    }
}

const list = new InterviewList();
list.getList();
export {list, mainUrl, key};