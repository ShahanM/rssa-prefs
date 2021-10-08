import {AfterViewChecked, Component, OnInit} from '@angular/core';
import {Title} from "@angular/platform-browser";
import {FormGroup} from "@angular/forms";
import {ApiService} from "../../services/api.service";
import {FormlyFieldConfig} from "@ngx-formly/core";
import {questions} from "./questions";

@Component({
    selector: 'rssa-survey',
    templateUrl: './survey.component.html',
    styles: []
})
export class SurveyComponent implements OnInit, AfterViewChecked {


    // todo update responses (no opinion)

    constructor(private title: Title,
                private api: ApiService) {
    }


    // survey form
    form: FormGroup & { [k: string]: any } = new FormGroup({});
    fields: FormlyFieldConfig[] = [];
    model = {};

    // current question group name
    currentGroupIndex = 0;
    currentGroupName = Object.keys(questions)
        [this.currentGroupIndex];

    // for mturk code
    mturkCode = null;


    ngOnInit(): void {
        this.title.setTitle("Survey")

        Object.entries(questions).map((questionGroup, groupIndex) => {
            let groupName = questionGroup[0];
            let questions = questionGroup[1];
            questions.forEach((question, questionIndex) => {
                this.fields.push({
                    key: `${groupName.toLowerCase()
                        .replace(' ', '_')}_${questionIndex}`,
                    type: 'radio',
                    hideExpression: () => groupIndex != this.currentGroupIndex,
                    templateOptions: {
                        label: question,
                        required: true,
                        options: Object.values({
                            1: "Strongly disagree",
                            2: "Disagree",
                            3: "Somewhat disagree",
                            4: "Not sure",
                            5: "Somewhat agree",
                            6: "Agree",
                            7: "Strongly agree"
                        }).map((v, k) => ({
                            label: v, value: k
                        })),
                    }
                })

            })
        })
    }

    ngAfterViewChecked() {
        this.collapseRadios();
    }

    // get names of all question groups
    getGroups() {
        return Object.keys(questions);
    }

    // check if all questions on page answered
    pageIsComplete() {
         return document.querySelectorAll('input:checked').length >=
            ((questions as { [k: string]: string[] })[this.currentGroupName]?.length || 0)
    }


    // work-around to make radio buttons inline
    collapseRadios() {
        document.querySelectorAll('.custom-radio')
            .forEach(e => {
                e.classList.add('d-inline', 'ml-4')
            })
        return true;
    }


    // send survey on submit
    onSubmit() {
        if (this.form.valid) {
            this.api.sendSurvey({
                'survey': this.model,
            }).subscribe((res: any) => {
                this.mturkCode = res['code'];
            });
        } else {
            this.form['error'] = "Please complete all fields.";
        }
    }

}
