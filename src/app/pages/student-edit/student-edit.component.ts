// Import Libraries
import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

// Import Services
import { StudentService } from '../../services/student.service';

// Import Models
import { Student } from '../../domain/task2_db/student';

// START - USED SERVICES
/**
* studentService.create
*	@description CRUD ACTION create
*
* studentService.update
*	@description CRUD ACTION update
*	@returns student
*
* studentService.get
*	@description CRUD ACTION get
*	@returns student
*
*/
// END - USED SERVICES

/**
 * This component allows to edit a  Student
 */
@Component({
    selector: 'app-student-edit',
    templateUrl: 'student-edit.component.html',
    styleUrls: ['student-edit.component.css']
})
export class StudentEditComponent implements OnInit {
    item: any = {};
    itemDoc: AngularFirestoreDocument<Student>;
    isNew: Boolean = true;
    formValid: Boolean;

    


    constructor(
        private studentService: StudentService,
        private route: ActivatedRoute,
        private location: Location) {
        // Init list
    }

    /**
     * Init
     */
    ngOnInit() {
        this.route.params.subscribe(param => {
            const id: string = param['id'];
            if (id !== 'new') {
                this.isNew = false;
                this.itemDoc = this.studentService.get(id);
                this.itemDoc.valueChanges().subscribe(item => this.item = item);

            }
            // Get relations
        });
    }



    /**
     * Save Student
     *
     * @param {boolean} formValid Form validity check
     * @param Student item Student to save
     */
    save(formValid: boolean): void {
        this.formValid = formValid;
        if (formValid) {
            if (this.isNew) {
                // Create
                this.studentService.create(this.item);
                this.isNew = false;
            } else {
                // Update
                this.studentService.update(this.itemDoc, this.item);
            }
            this.goBack();
        }
    }

    /**
     * Go Back
     */
    goBack(): void {
        this.location.back();
    }

}
